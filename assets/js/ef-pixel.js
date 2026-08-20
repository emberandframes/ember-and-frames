/* =====================================================================
   Ember & Frames — Meta Pixel + Conversions API bridge
   ---------------------------------------------------------------------
   Consent gated. Nothing is loaded from Meta and no cookie is set until
   the visitor opts in. Events fired before that are held in memory and
   flushed on opt-in, or dropped on opt-out.

   Every event carries a generated event_id that is sent to BOTH the
   browser pixel and the server-side relay, so Meta deduplicates the two
   reports of the same action into one.

   Public API:
     EFPixel.track(name, customData, identity) -> event_id
     EFPixel.consent.status() / .grant() / .deny() / .reset() / .open()
   ===================================================================== */
(function (w, d) {
  "use strict";

  var CONFIG = {
    /* Paste the 15-16 digit Meta Pixel (dataset) ID from Events Manager.
       Empty means the whole module stays inert. See worklog/meta-pixel.md. */
    pixelId: "3263707654016654",

    /* URL of the server-side Conversions API relay, e.g. a Cloudflare Worker.
       Empty means browser pixel only. See worklog/capi/worker.js. */
    capiEndpoint: "",

    /* TEST12345 code from Events Manager > Test events. Server events only;
       the browser pixel is tested with the Meta Pixel Helper extension.
       Must be cleared before going live. */
    testEventCode: "",

    debug: false
  };

  var CONSENT_KEY = "ef:consent";
  var CONSENT_VERSION = 1;
  var QUEUE_LIMIT = 20;
  var SDK = "https://connect.facebook.net/en_US/fbevents.js";

  var pending = [];
  var sdkRequested = false;
  var banner = null;

  function log() {
    if (CONFIG.debug && w.console) w.console.log.apply(w.console, ["[ef-pixel]"].concat([].slice.call(arguments)));
  }

  /* =====================================================================
     CONSENT
     ===================================================================== */

  /* Global Privacy Control is a legally recognised opt-out in several
     jurisdictions, so honour it without ever showing the banner. */
  function optedOutBySignal() {
    return w.navigator && (w.navigator.globalPrivacyControl === true || w.navigator.globalPrivacyControl === "1");
  }

  function readConsent() {
    try {
      var raw = w.localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var saved = JSON.parse(raw);
      if (!saved || saved.version !== CONSENT_VERSION) return null;
      return saved.status === "granted" ? "granted" : "denied";
    } catch (e) {
      return null;
    }
  }

  function writeConsent(status) {
    try {
      w.localStorage.setItem(CONSENT_KEY, JSON.stringify({
        status: status,
        version: CONSENT_VERSION,
        at: new Date().toISOString()
      }));
    } catch (e) {
      /* Private browsing can refuse storage. The choice then lasts the page only. */
    }
  }

  function status() {
    if (optedOutBySignal()) return "denied";
    return readConsent() || "unknown";
  }

  /* Meta sets _fbp/_fbc on the registrable domain, so clear every scope the
     current host could have written. Withdrawing consent has to remove the
     identifier, not just stop sending events. */
  function clearMetaCookies() {
    var host = w.location.hostname;
    var scopes = ["", host, "." + host];
    var bare = host.replace(/^www\./, "");
    if (bare !== host) scopes.push(bare, "." + bare);
    ["_fbp", "_fbc"].forEach(function (name) {
      scopes.forEach(function (domain) {
        d.cookie = name + "=; Max-Age=0; path=/" + (domain ? "; domain=" + domain : "");
      });
    });
  }

  function grant() {
    writeConsent("granted");
    closeBanner();
    flush();
  }

  function deny() {
    writeConsent("denied");
    closeBanner();
    pending.length = 0;
    clearMetaCookies();
    /* fbevents.js cannot be unloaded once it is in the page, so if consent is
       withdrawn after it ran, reload to leave a genuinely untracked page. */
    if (sdkRequested) w.location.reload();
  }

  function reset() {
    try { w.localStorage.removeItem(CONSENT_KEY); } catch (e) {}
  }

  /* =====================================================================
     BANNER
     ===================================================================== */

  var BANNER_CSS =
    ".ef-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;" +
    "max-width:560px;margin:0 auto;padding:18px 20px;border-radius:14px;" +
    "background:var(--cream-soft,#FBF7F1);color:var(--charcoal,#1E1E1E);" +
    "border:1px solid var(--line-strong,rgba(201,168,76,.4));" +
    "box-shadow:0 18px 44px rgba(30,30,30,.18);" +
    "font-family:var(--body,'DM Sans',-apple-system,'Segoe UI',sans-serif);" +
    "font-size:14px;line-height:1.55;display:flex;flex-direction:column;gap:14px}" +
    ".ef-consent p{margin:0}" +
    ".ef-consent-actions{display:flex;gap:10px;flex-wrap:wrap}" +
    ".ef-consent button{font:inherit;font-size:13px;letter-spacing:.02em;cursor:pointer;" +
    "padding:9px 20px;border-radius:999px;border:1px solid var(--line-strong,rgba(201,168,76,.4));" +
    "background:transparent;color:inherit;transition:background .2s,color .2s,border-color .2s}" +
    ".ef-consent button:hover{border-color:var(--ember,#C97B3A);color:var(--ember,#C97B3A)}" +
    ".ef-consent button[data-ef-accept]{background:var(--ember,#C97B3A);border-color:var(--ember,#C97B3A);color:#fff}" +
    ".ef-consent button[data-ef-accept]:hover{background:var(--terracotta,#B05C3A);border-color:var(--terracotta,#B05C3A);color:#fff}" +
    ".ef-consent button:focus-visible{outline:2px solid var(--gold,#C9A84C);outline-offset:2px}" +
    ".ef-consent-open .wa-fab{display:none}" +
    ".ef-consent-link{display:block;margin:18px auto;background:none;border:0;padding:6px 10px;" +
    "font:inherit;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:inherit;" +
    "opacity:.6;cursor:pointer;text-decoration:underline}" +
    ".ef-consent-link:hover{opacity:1}" +
    "@media(max-width:520px){.ef-consent{left:10px;right:10px;bottom:10px;padding:14px 16px;" +
    "font-size:13px;line-height:1.45;gap:10px}" +
    ".ef-consent button{padding:8px 16px}" +
    ".ef-consent-actions button{flex:1 1 auto}}";

  function injectCss() {
    if (d.getElementById("ef-consent-css")) return;
    var style = d.createElement("style");
    style.id = "ef-consent-css";
    style.textContent = BANNER_CSS;
    d.head.appendChild(style);
  }

  /* The banner is fixed, so it sits over whatever is at the foot of the viewport.
     Reserving its height means anything it covers can still be scrolled clear. */
  function reserveSpace() {
    if (!banner) return;
    var gap = parseInt(w.getComputedStyle(banner).bottom, 10) || 0;
    d.body.style.paddingBottom = (banner.offsetHeight + gap * 2) + "px";
  }

  function openBanner() {
    if (banner || !CONFIG.pixelId) return;
    injectCss();

    banner = d.createElement("div");
    banner.className = "ef-consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Cookie choices");

    var copy = d.createElement("p");
    copy.textContent = "We would like to use Meta\u2019s advertising cookies to see which of our " +
      "posts actually bring people here. Nothing loads until you say yes, and you can change " +
      "your mind any time from the footer.";

    var actions = d.createElement("div");
    actions.className = "ef-consent-actions";

    var yes = d.createElement("button");
    yes.type = "button";
    yes.setAttribute("data-ef-accept", "");
    yes.textContent = "Accept";
    yes.addEventListener("click", grant);

    var no = d.createElement("button");
    no.type = "button";
    no.textContent = "Decline";
    no.addEventListener("click", deny);

    actions.appendChild(yes);
    actions.appendChild(no);
    banner.appendChild(copy);
    banner.appendChild(actions);
    d.body.appendChild(banner);
    d.body.classList.add("ef-consent-open");
    reserveSpace();
    w.addEventListener("resize", reserveSpace);
    yes.focus({ preventScroll: true });
  }

  function closeBanner() {
    if (!banner) return;
    w.removeEventListener("resize", reserveSpace);
    banner.parentNode.removeChild(banner);
    banner = null;
    d.body.classList.remove("ef-consent-open");
    d.body.style.paddingBottom = "";
  }

  /* Withdrawal has to be as easy as consenting. Pages that render their own
     control (the main site footer) keep it; pages that do not get this one. */
  function ensureConsentControl() {
    if (!CONFIG.pixelId || d.querySelector("[data-consent]")) return;
    injectCss();
    var link = d.createElement("button");
    link.type = "button";
    link.className = "ef-consent-link";
    link.setAttribute("data-consent", "");
    link.textContent = "Cookie settings";
    link.addEventListener("click", function () { reset(); openBanner(); });
    var host = d.querySelector("footer .wrap") || d.querySelector("footer") || d.body;
    host.appendChild(link);
  }

  /* =====================================================================
     PIXEL LOADER (Meta's stub, written out rather than minified)
     ===================================================================== */

  function loadSdk() {
    if (sdkRequested || !CONFIG.pixelId) return;
    sdkRequested = true;

    if (!w.fbq) {
      var fbq = function () {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
        else fbq.queue.push(arguments);
      };
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      w.fbq = fbq;
      if (!w._fbq) w._fbq = fbq;
    }

    var tag = d.createElement("script");
    tag.async = true;
    tag.src = SDK;
    d.head.appendChild(tag);

    /* Off by default so the pixel only reports the events declared in the
       consent notice. Left on, Meta adds its own automatic button-click and
       advanced-matching collection that we never asked the visitor about. */
    w.fbq("set", "autoConfig", false, CONFIG.pixelId);
    w.fbq("init", CONFIG.pixelId);
    log("sdk requested", CONFIG.pixelId);
  }

  /* =====================================================================
     IDENTIFIERS
     ===================================================================== */

  function uuid() {
    var c = w.crypto;
    if (c && c.randomUUID) return c.randomUUID();
    if (c && c.getRandomValues) {
      var b = new Uint8Array(16);
      c.getRandomValues(b);
      b[6] = (b[6] & 0x0f) | 0x40;
      b[8] = (b[8] & 0x3f) | 0x80;
      var hex = "";
      for (var i = 0; i < 16; i++) hex += (b[i] + 0x100).toString(16).slice(1);
      return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join("-");
    }
    return "ef-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  function cookie(name) {
    var parts = d.cookie ? d.cookie.split("; ") : [];
    for (var i = 0; i < parts.length; i++) {
      var eq = parts[i].indexOf("=");
      if (eq > -1 && parts[i].slice(0, eq) === name) return decodeURIComponent(parts[i].slice(eq + 1));
    }
    return "";
  }

  function clickId() {
    var existing = cookie("_fbc");
    if (existing) return existing;
    var fbclid = new URLSearchParams(w.location.search).get("fbclid");
    return fbclid ? "fb.1." + Date.now() + "." + fbclid : "";
  }

  function sha256(value) {
    var subtle = w.crypto && w.crypto.subtle;
    if (!value || !subtle) return Promise.resolve("");
    var bytes = new TextEncoder().encode(String(value));
    return subtle.digest("SHA-256", bytes).then(function (buf) {
      var view = new Uint8Array(buf);
      var out = "";
      for (var i = 0; i < view.length; i++) out += (view[i] + 0x100).toString(16).slice(1);
      return out;
    }).catch(function () { return ""; });
  }

  /* Meta expects digits only, country code included. Bare 10-digit numbers
     here are Indian, so assume 91 rather than dropping the match entirely. */
  function normalisePhone(raw) {
    var digits = String(raw || "").replace(/\D/g, "");
    if (!digits) return "";
    if (digits.length === 10) return "91" + digits;
    return digits.replace(/^0+/, "");
  }

  function buildUserData(identity) {
    var id = identity || {};
    return Promise.all([
      sha256(String(id.email || "").trim().toLowerCase()),
      sha256(normalisePhone(id.phone))
    ]).then(function (hashed) {
      var user = {};
      if (hashed[0]) user.em = [hashed[0]];
      if (hashed[1]) user.ph = [hashed[1]];
      var fbp = cookie("_fbp");
      var fbc = clickId();
      if (fbp) user.fbp = fbp;
      if (fbc) user.fbc = fbc;
      user.client_user_agent = w.navigator.userAgent;
      return user;
    });
  }

  /* =====================================================================
     DISPATCH
     ===================================================================== */

  function sendToRelay(evt) {
    if (!CONFIG.capiEndpoint || typeof w.fetch !== "function") return;
    buildUserData(evt.identity).then(function (user) {
      var payload = {
        event_name: evt.name,
        event_id: evt.id,
        event_time: evt.at,
        event_source_url: evt.url,
        action_source: "website",
        user_data: user,
        custom_data: evt.params
      };
      if (CONFIG.testEventCode) payload.test_event_code = CONFIG.testEventCode;

      /* keepalive so the request survives the mailto/WhatsApp navigation
         that immediately follows an enquiry. */
      w.fetch(CONFIG.capiEndpoint, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(function () { /* never let measurement break the page */ });
    });
  }

  function dispatch(evt) {
    loadSdk();
    if (w.fbq) w.fbq("track", evt.name, evt.params, { eventID: evt.id });
    sendToRelay(evt);
    log("sent", evt.name, evt.id, evt.params);
  }

  function flush() {
    if (status() !== "granted") return;
    var held = pending.slice();
    pending.length = 0;
    held.forEach(dispatch);
  }

  function track(name, customData, identity) {
    if (!name || !CONFIG.pixelId) return "";
    var evt = {
      name: name,
      id: uuid(),
      params: customData || {},
      identity: identity || null,
      url: w.location.href,
      at: Math.floor(Date.now() / 1000)
    };
    if (status() === "granted") {
      dispatch(evt);
    } else if (status() === "unknown" && pending.length < QUEUE_LIMIT) {
      pending.push(evt);
      log("queued", evt.name);
    }
    return evt.id;
  }

  /* =====================================================================
     BOOT
     ===================================================================== */

  var PAGE_CONTENT = {
    fnb: "Food & Beverage",
    interiors: "Interiors & Architecture",
    events: "Events",
    hospitality: "Hospitality",
    lifestyle: "Lifestyle",
    products: "Products"
  };

  function start() {
    if (!CONFIG.pixelId) {
      log("no pixelId configured, staying inert");
      return;
    }

    track("PageView");

    var page = d.body.getAttribute("data-page");
    if (page && PAGE_CONTENT[page]) {
      track("ViewContent", {
        content_name: PAGE_CONTENT[page],
        content_category: "Portfolio",
        content_ids: [page],
        content_type: "product_group"
      });
    }

    if (status() === "unknown") openBanner();
    else flush();

    /* Deferred so pages whose own footer is injected on DOMContentLoaded have
       already rendered their [data-consent] control by the time we check. */
    w.setTimeout(ensureConsentControl, 0);
  }

  w.EFPixel = {
    config: CONFIG,
    track: track,
    consent: {
      status: status,
      grant: grant,
      deny: deny,
      open: openBanner,
      reset: function () { reset(); openBanner(); }
    }
  };

  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", start);
  else start();
})(window, document);

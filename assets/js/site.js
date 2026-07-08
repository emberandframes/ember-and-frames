/* =====================================================================
   Ember & Frames — site engine
   ---------------------------------------------------------------------
   Injects the shared chrome (header, footer, about, contact, enquire,
   lightbox), renders every gallery from the data layer, and wires the
   interactions. Page-specific hero + section copy stays in each HTML
   file; anything that repeats lives here so it is written once.
   ===================================================================== */
(function () {
  "use strict";

  var EF = window.EF || {};
  var SITE = EF.site || {};
  var BODY = document.body;
  var PAGE = BODY.getAttribute("data-page") || "home";

  /* ---------- tiny helpers ---------- */
  function h(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  function getByPath(obj, path) {
    return path.split(".").reduce(function (acc, k) {
      return acc == null ? undefined : acc[k];
    }, obj);
  }
  function amp(str) {
    return String(str).replace(/&(?!amp;|lt;|gt;|#)/g, "&amp;");
  }
  /* escape a value for safe use inside a double-quoted HTML attribute */
  function escAttr(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function prefersReduced() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function scrollBehavior() { return prefersReduced() ? "auto" : "smooth"; }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function qsa(sel, root) { return (root || document).querySelectorAll(sel); }

  var LOGO = 'Ember <span class="brand-amp">&amp;</span> Frames';
  var TAB_UID = 0;

  /* =====================================================================
     HEADER
     ===================================================================== */
  function buildHeader() {
    var nav = EF.nav || [];
    var cats = nav.map(function (n) {
      var active = n.key === PAGE ? " is-active" : "";
      var soon = n.live ? "" : '<span class="soon">Soon</span>';
      return '<a class="nav-cat' + active + '" href="' + n.href + '">' + (n.short || n.label) + soon + "</a>";
    }).join("");

    var header = h(
      '<header class="nav">' +
        '<a class="nav-logo" href="index.html">' + LOGO + "</a>" +
        '<nav class="nav-links" aria-label="Primary">' +
          cats +
          '<span class="nav-divider" aria-hidden="true"></span>' +
          '<a href="#about">About</a>' +
          '<a href="#contact">Contact</a>' +
          '<a class="nav-pill" href="#enquire">Enquire</a>' +
        "</nav>" +
        '<button class="hamburger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      "</header>"
    );

    var mobileLinks = nav.map(function (n) {
      var soon = n.live ? "" : '<span class="soon">Soon</span>';
      var active = n.key === PAGE ? ' class="is-active"' : "";
      return '<a href="' + n.href + '"' + active + ">" + n.label + soon + "</a>";
    }).join("");
    var mobile = h(
      '<div class="mobile-menu">' +
        '<span class="mm-label">Our Work</span>' +
        mobileLinks +
        '<span class="mm-label">Studio</span>' +
        '<a href="#about">About</a>' +
        '<a href="#contact">Contact</a>' +
        '<a href="#enquire">Enquire</a>' +
      "</div>"
    );

    mount("header", header);
    BODY.appendChild(mobile);

    /* the off-canvas menu is hidden from AT + keyboard until opened */
    mobile.setAttribute("inert", "");
    mobile.setAttribute("aria-hidden", "true");

    function setMenu(open) {
      BODY.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { mobile.removeAttribute("inert"); mobile.setAttribute("aria-hidden", "false"); }
      else { mobile.setAttribute("inert", ""); mobile.setAttribute("aria-hidden", "true"); }
    }

    /* interactions */
    var burger = header.querySelector(".hamburger");
    burger.addEventListener("click", function () {
      setMenu(!BODY.classList.contains("menu-open"));
    });
    each(mobile.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }

  /* =====================================================================
     SHARED SECTIONS
     ===================================================================== */
  function buildAbout() {
    var a = EF.about; if (!a) return;
    var steps = (a.process || []).map(function (p, i) {
      return (
        '<div class="reveal">' +
          '<div class="process-num">0' + (i + 1) + "</div>" +
          '<div class="process-name">' + p.name + "</div>" +
          '<div class="process-desc">' + p.desc + "</div>" +
        "</div>"
      );
    }).join("");
    var about = h(
      '<section class="about" id="about">' +
        '<div class="about-inner">' +
          '<div class="about-head reveal">' +
            '<span class="eyebrow">The Studio</span>' +
            '<h2>' + a.heading + "</h2>" +
            '<p class="about-lede">' + a.lede + "</p>" +
            '<p class="about-body">' + a.body + "</p>" +
          "</div>" +
          '<div class="process">' +
            '<div class="process-head reveal"><span class="section-label">How we work</span></div>' +
            '<div class="process-steps">' + steps + "</div>" +
          "</div>" +
          '<div class="about-foot reveal">' +
            '<p class="about-foot-quote">\u201C' + a.footQuote + "\u201D</p>" +
            '<p class="about-foot-tag">' + a.footTag + "</p>" +
            '<a class="btn-primary" href="#enquire">Start a project</a>' +
          "</div>" +
        "</div>" +
      "</section>"
    );
    mount("about", about);
  }

  function buildServices() {
    var s = (EF.services || {})[PAGE]; if (!s) return;
    var items = (s.items || []).map(function (it, i) {
      return (
        '<div class="service-item reveal">' +
          '<div class="service-num">' + (i + 1 < 10 ? "0" : "") + (i + 1) + "</div>" +
          "<div>" +
            '<div class="service-name">' + it.name + "</div>" +
            '<div class="service-desc">' + it.desc + "</div>" +
          "</div>" +
        "</div>"
      );
    }).join("");
    var section = h(
      '<section class="services">' +
        '<div class="reveal">' +
          '<span class="eyebrow">' + (s.eyebrow || "What We Offer") + "</span>" +
          "<h2>" + s.heading + "</h2>" +
          (s.note ? '<p class="services-note">' + s.note + "</p>" : "") +
        "</div>" +
        '<div class="services-list">' + items + "</div>" +
      "</section>"
    );
    mount("services", section);
  }

  function buildContact() {
    var c = EF.contact; if (!c) return;
    var brand = SITE.name || "Ember & Frames";
    var mailPrefill = "?subject=" + encodeURIComponent("A shoot in mind") +
      "&amp;body=" + encodeURIComponent("Hi " + brand + ",\n\nI came across your studio and I'd love to talk about a shoot. Here's a little about what I have in mind:\n\n");
    var waPrefill = "?text=" + encodeURIComponent("Hi " + brand + ", I came across your studio and I'd love to talk about a shoot.");
    var contact = h(
      '<section class="contact" id="contact">' +
        '<div class="contact-head reveal">' +
          '<span class="eyebrow">Contact</span>' +
          '<h2>' + c.heading + "</h2>" +
          "<p>" + c.sub + "</p>" +
        "</div>" +
        '<div class="contact-card reveal">' +
          '<div class="contact-item"><span class="contact-item-label">Email</span>' +
            '<span class="contact-item-value"><a href="mailto:' + SITE.email + mailPrefill + '">' + SITE.email + "</a></span></div>" +
          '<div class="contact-item"><span class="contact-item-label">Phone \u00B7 WhatsApp</span>' +
            '<span class="contact-item-value"><a href="https://wa.me/' + SITE.whatsapp + waPrefill + '" target="_blank" rel="noopener noreferrer">' + SITE.phoneDisplay + "</a></span></div>" +
          '<div class="contact-item"><span class="contact-item-label">Based in</span>' +
            '<span class="contact-item-value">' + SITE.city + "</span></div>" +
          '<div class="contact-item contact-item--full"><span class="contact-item-label">Instagram</span>' +
            '<span class="contact-item-value"><a href="' + SITE.instagram + '" target="_blank" rel="noopener noreferrer">' + SITE.instagramHandle + "</a></span></div>" +
        "</div>" +
      "</section>"
    );
    mount("contact", contact);
  }

  function buildEnquire() {
    var e = EF.enquire; if (!e) return;
    var pills = (e.pills || []).map(function (p) {
      return '<button type="button" class="pill" aria-pressed="false">' + p + "</button>";
    }).join("");
    var form = h(
      '<section class="enquire" id="enquire">' +
        '<div class="enquire-head reveal">' +
          '<span class="eyebrow">Enquire</span>' +
          '<h2>' + e.heading + "</h2>" +
          "<p>" + e.sub + "</p>" +
        "</div>" +
        '<form class="contact-form reveal" novalidate>' +
          '<div class="form-row">' +
            '<div class="form-field"><label for="ef-name">Name</label><input id="ef-name" type="text" name="name" autocomplete="name" required></div>' +
            '<div class="form-field"><label for="ef-email">Email</label><input id="ef-email" type="email" name="email" autocomplete="email" required></div>' +
          "</div>" +
          '<div class="form-row">' +
            '<div class="form-field"><label for="ef-phone">Phone <span class="form-hint">(optional)</span></label><input id="ef-phone" type="tel" name="phone" autocomplete="tel"></div>' +
            '<div class="form-field"><label for="ef-brand">Brand / Project</label><input id="ef-brand" type="text" name="brand" required></div>' +
          "</div>" +
          '<div class="form-field" role="group" aria-labelledby="ef-need-label"><label id="ef-need-label">What do you need? <span class="form-hint">(pick any)</span></label>' +
            '<div class="pill-group">' + pills + "</div></div>" +
          '<div class="form-field"><label for="ef-message">Tell us a little more</label><textarea id="ef-message" name="message" rows="4" placeholder="Dates, location, references, budget range, whatever helps."></textarea></div>' +
          '<div class="form-actions">' +
            '<button type="submit" class="btn-form solid">Send Enquiry</button>' +
            '<button type="button" class="btn-form alt" data-wa>Send via WhatsApp</button>' +
          "</div>" +
          '<p class="form-status" role="status" aria-live="polite"></p>' +
        "</form>" +
      "</section>"
    );
    mount("enquire", form);
    wireForm(form);
  }

  function buildFooter() {
    var tagline = String(SITE.tagline || "")
      .split(".")
      .map(function (part) { return part.trim(); })
      .filter(Boolean)
      .join(" \u00B7 ");
    var footer = h(
      '<footer class="footer">' +
        '<span class="footer-brand">' +
          '<span class="footer-copy">\u00A9 ' + (SITE.year || "") + "</span>" +
          '<span class="footer-wordmark">' + LOGO + "</span>" +
        "</span>" +
        (tagline ? '<span class="footer-tagline">' + tagline + "</span>" : "") +
        '<a href="#top" data-top>Back to top \u2191</a>' +
      "</footer>"
    );
    mount("footer", footer);
    var top = footer.querySelector("[data-top]");
    if (top) top.addEventListener("click", function (ev) {
      ev.preventDefault();
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    });
  }

  function buildLightbox() {
    var lb = h(
      '<div class="lightbox" role="dialog" aria-modal="true" aria-label="Media viewer">' +
        '<button class="lightbox-close" aria-label="Close">\u00D7</button>' +
        '<button class="lightbox-nav lightbox-prev" aria-label="Previous">\u2039</button>' +
        '<div class="lightbox-stage"></div>' +
        '<button class="lightbox-nav lightbox-next" aria-label="Next">\u203A</button>' +
      "</div>"
    );
    mount("lightbox", lb, true);
    wireLightbox(lb);
  }

  /* place a built element into its [data-region] slot, or fall back
     to a sensible default position */
  function mount(region, node, toBodyEnd) {
    var slot = document.querySelector('[data-region="' + region + '"]');
    if (slot) { slot.replaceWith(node); return; }
    if (toBodyEnd) { BODY.appendChild(node); return; }
    if (region === "header") { BODY.insertBefore(node, BODY.firstChild); return; }
    if (region === "footer") { BODY.appendChild(node); return; }
    var main = document.getElementById("main") || BODY;
    main.appendChild(node);
  }

  /* =====================================================================
     GALLERY RENDERING
     ===================================================================== */
  function imgTag(src, alt) {
    return '<img data-lazy loading="lazy" decoding="async" src="' + escAttr(src) + '" alt="' + escAttr(alt || "") + '">';
  }

  /* Resolve an image entry that may be a bare path string or a {src, alt} object,
     falling back to the container-level label when no per-image alt is given. */
  function entrySrc(it) { return typeof it === "string" ? it : it.src; }
  function entryAlt(it, label) {
    return (it && typeof it === "object" && it.alt) ? it.alt : label;
  }

  /* Keyboard-operable image tile (opens in the lightbox). The tile is exposed as a
     button; its accessible name comes from the child <img> alt, so no aria-label is
     needed. data-alt carries the description through to the lightbox. */
  function imageTile(src, alt, extraClass) {
    var a = alt || "";
    return '<div class="item' + (extraClass ? " " + extraClass : "") +
      '" data-full="' + escAttr(src) + '" data-alt="' + escAttr(a) +
      '" role="button" tabindex="0">' + imgTag(src, a) + "</div>";
  }
  /* Filmstrip frame — same behaviour, different class hook. */
  function frameTile(src, alt) {
    var a = alt || "";
    return '<div class="frame" data-full="' + escAttr(src) + '" data-alt="' + escAttr(a) +
      '" role="button" tabindex="0">' + imgTag(src, a) + "</div>";
  }
  /* Video tile — the poster is decorative; the button label conveys the action. */
  function videoTile(posterSrc, videoSrc, alt) {
    var a = alt || "";
    var label = "Play video" + (a ? ": " + a : "");
    return '<div class="item play" data-video="' + escAttr(videoSrc) + '" data-alt="' + escAttr(a) +
      '" role="button" tabindex="0" aria-label="' + escAttr(label) + '">' + imgTag(posterSrc, "") + "</div>";
  }

  function renderGalleries() {
    // Filmstrips
    each(qsa("[data-filmstrip]"), function (strip) {
      var arr = getByPath(EF, strip.getAttribute("data-filmstrip")) || [];
      var label = strip.getAttribute("data-alt") || "";
      strip.innerHTML = arr.map(function (it) {
        return frameTile(entrySrc(it), entryAlt(it, label));
      }).join("");
    });

    // Plain image grids / walls (array of strings OR {src, alt})
    each(qsa("[data-gallery]"), function (grid) {
      var arr = getByPath(EF, grid.getAttribute("data-gallery")) || [];
      var label = grid.getAttribute("data-alt") || "";
      grid.innerHTML = arr.map(function (it) {
        return imageTile(entrySrc(it), entryAlt(it, label));
      }).join("");
    });

    // Video reels (array of {src, poster, alt?})
    each(qsa("[data-videos]"), function (grid) {
      var arr = getByPath(EF, grid.getAttribute("data-videos")) || [];
      var label = grid.getAttribute("data-alt") || "";
      grid.innerHTML = arr.map(function (v) {
        return videoTile(v.poster, v.src, v.alt || label);
      }).join("");
    });

    // Interiors projects (tabbed work grid — one tab per project)
    each(qsa("[data-projects]"), function (host) {
      var data = getByPath(EF, host.getAttribute("data-projects"));
      if (!data || !data.projects) return;
      var base = data.imgBase || "";
      var scope = "tg" + (++TAB_UID);
      var tabs = data.projects.map(function (p, i) {
        return '<button class="tab' + (i === 0 ? " is-active" : "") + '" role="tab" id="' + scope + '-tab-p' + i +
          '" aria-controls="' + scope + '-panel-p' + i + '" aria-selected="' + (i === 0 ? "true" : "false") +
          '" data-tab="p' + i + '">' + p.title + "</button>";
      }).join("");
      var panels = data.projects.map(function (p, i) {
        var space = (p.meta || []).join(" &middot; ");
        if (p.role) space += (space ? " &middot; " : "") + p.role;
        var photos = (p.photos || []).map(function (id, k) {
          var src = base + id + ".jpg";
          var alt = (p.captions && p.captions[k]) ? p.captions[k] : p.title;
          return imageTile(src, alt);
        }).join("");
        return (
          '<div class="tab-panel' + (i === 0 ? " is-active" : "") + '" role="tabpanel" id="' + scope + '-panel-p' + i +
            '" aria-labelledby="' + scope + '-tab-p' + i + '" tabindex="0" data-panel="p' + i + '">' +
            '<div class="brief reveal">' +
              "<div><div class=\"brief-label\">The Space</div><div class=\"brief-text\">" + space + "</div></div>" +
              "<div><div class=\"brief-label\">What We Did</div><div class=\"brief-text\">" + p.blurb + "</div></div>" +
            "</div>" +
            '<div class="grid">' + photos + "</div>" +
          "</div>"
        );
      }).join("");
      host.innerHTML = '<div class="tabgroup" data-tabscope><div class="tabs" role="tablist" aria-label="Projects">' + tabs + "</div>" + panels + "</div>";
    });

    // Events collections (tabbed work grid — one tab per collection)
    each(qsa("[data-collections]"), function (host) {
      var cols = getByPath(EF, host.getAttribute("data-collections")) || [];
      var scope = "tg" + (++TAB_UID);
      var tabs = cols.map(function (c, i) {
        return '<button class="tab' + (i === 0 ? " is-active" : "") + '" role="tab" id="' + scope + '-tab-c' + i +
          '" aria-controls="' + scope + '-panel-c' + i + '" aria-selected="' + (i === 0 ? "true" : "false") +
          '" data-tab="c' + i + '">' + c.title + "</button>";
      }).join("");
      var panels = cols.map(function (c, i) {
        var items = (c.items || []).map(function (it) {
          var alt = it.alt || c.title;
          if (it.type === "video") {
            return videoTile(it.poster, it.src, alt);
          }
          return imageTile(it.src, alt);
        }).join("");
        var note = c.note ? '<p class="brief-text reveal" style="max-width:640px;margin:0 auto 28px;text-align:center">' + c.note + "</p>" : "";
        return (
          '<div class="tab-panel' + (i === 0 ? " is-active" : "") + '" role="tabpanel" id="' + scope + '-panel-c' + i +
            '" aria-labelledby="' + scope + '-tab-c' + i + '" tabindex="0" data-panel="c' + i + '">' +
            note +
            '<div class="grid' + (c.reels ? " grid--reels" : "") + '">' + items + "</div>" +
          "</div>"
        );
      }).join("");
      host.innerHTML = '<div class="tabgroup" data-tabscope><div class="tabs" role="tablist" aria-label="Collections">' + tabs + "</div>" + panels + "</div>";
    });

    // Coming-soon teasers
    each(qsa("[data-teasers]"), function (host) {
      var arr = getByPath(EF, host.getAttribute("data-teasers")) || [];
      var label = host.getAttribute("data-alt") || "";
      host.innerHTML = arr.map(function (it) {
        return '<div class="t">' + imgTag(entrySrc(it), entryAlt(it, label)) + "</div>";
      }).join("");
    });

    wireLazy();
  }

  /* =====================================================================
     LAZY FADE-IN
     ===================================================================== */
  function wireLazy() {
    each(qsa("img[data-lazy]"), function (img) {
      if (img.complete && img.naturalWidth) { img.classList.add("loaded"); return; }
      img.addEventListener("load", function () { img.classList.add("loaded"); });
      img.addEventListener("error", function () { img.classList.add("loaded"); });
    });
  }

  /* =====================================================================
     TABS (generic, supports nested subtabs via [data-tabscope])
     ===================================================================== */
  function wireTabs() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-tab]");
      if (!btn) return;
      var scope = btn.closest("[data-tabscope]");
      if (!scope) return;
      var key = btn.getAttribute("data-tab");

      each(scope.querySelectorAll("[data-tab]"), function (b) {
        if (b.closest("[data-tabscope]") !== scope) return;
        var on = b === btn;
        b.classList.toggle("is-active", on);
        if (b.hasAttribute("role")) b.setAttribute("aria-selected", on ? "true" : "false");
      });
      each(scope.querySelectorAll("[data-panel]"), function (p) {
        if (p.closest("[data-tabscope]") !== scope) return;
        p.classList.toggle("is-active", p.getAttribute("data-panel") === key);
      });
    });
  }

  /* =====================================================================
     FILMSTRIP NAV
     ===================================================================== */
  function wireFilmstrip() {
    each(qsa("[data-dir]"), function (btn) {
      btn.addEventListener("click", function () {
        var wrap = btn.closest(".filmstrip-wrap") || document;
        var strip = wrap.querySelector(".filmstrip");
        if (!strip) return;
        var dx = strip.clientWidth * 0.82 * (btn.getAttribute("data-dir") === "next" ? 1 : -1);
        strip.scrollBy({ left: dx, behavior: scrollBehavior() });
      });
    });
  }

  /* =====================================================================
     LIGHTBOX
     ===================================================================== */
  var LB = { el: null, stage: null, list: [], i: 0 };

  function collectFrom(container) {
    var out = [];
    each(container.querySelectorAll("[data-full], [data-video]"), function (node) {
      var alt = node.getAttribute("data-alt") || "";
      if (node.hasAttribute("data-video")) out.push({ type: "video", src: node.getAttribute("data-video"), alt: alt });
      else out.push({ type: "image", src: node.getAttribute("data-full"), alt: alt });
    });
    return out;
  }

  function lbRender() {
    var item = LB.list[LB.i];
    if (!item) return;
    LB.stage.innerHTML = "";
    var media;
    if (item.type === "video") {
      media = document.createElement("video");
      media.src = item.src;
      media.controls = true;
      media.autoplay = true;
      media.playsInline = true;
      media.setAttribute("playsinline", "");
      media.setAttribute("aria-label", item.alt || "Video");
    } else {
      media = document.createElement("img");
      media.src = item.src;
      media.alt = item.alt || "";
    }
    media.className = "lightbox-media";
    LB.stage.appendChild(media);
    var multi = LB.list.length > 1;
    LB.el.querySelector(".lightbox-prev").style.display = multi ? "" : "none";
    LB.el.querySelector(".lightbox-next").style.display = multi ? "" : "none";
  }

  function lbOpen(list, i) {
    LB.list = list; LB.i = i;
    LB.trigger = document.activeElement;
    LB.el.classList.add("open");
    BODY.style.overflow = "hidden";
    lbRender();
    var closeBtn = LB.el.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
  }
  function lbClose() {
    LB.el.classList.remove("open");
    LB.stage.innerHTML = "";
    BODY.style.overflow = "";
    if (LB.trigger && typeof LB.trigger.focus === "function") LB.trigger.focus();
    LB.trigger = null;
  }
  function lbStep(d) {
    LB.i = (LB.i + d + LB.list.length) % LB.list.length;
    lbRender();
  }

  function wireLightbox(lb) {
    LB.el = lb;
    LB.stage = lb.querySelector(".lightbox-stage");
    lb.querySelector(".lightbox-close").addEventListener("click", lbClose);
    lb.querySelector(".lightbox-prev").addEventListener("click", function (e) { e.stopPropagation(); lbStep(-1); });
    lb.querySelector(".lightbox-next").addEventListener("click", function (e) { e.stopPropagation(); lbStep(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lbClose(); });

    function focusables() {
      return Array.prototype.filter.call(
        lb.querySelectorAll(".lightbox-close, .lightbox-prev, .lightbox-next, .lightbox-stage video"),
        function (el) { return el.offsetParent !== null; }
      );
    }

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") { lbClose(); return; }
      if (e.key === "ArrowLeft") { lbStep(-1); return; }
      if (e.key === "ArrowRight") { lbStep(1); return; }
      if (e.key === "Tab") {
        var f = focusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // open a tile's group in the lightbox, starting at the clicked node
    function openFromNode(node, container) {
      var list = collectFrom(container);
      var idx = 0;
      each(container.querySelectorAll("[data-full], [data-video]"), function (n, k) {
        if (n === node) idx = k;
      });
      lbOpen(list, idx);
    }
    function tileFromEvent(e) {
      var t = e.target;
      if (!t || !t.closest) return null;
      var node = t.closest("[data-full], [data-video]");
      if (!node) return null;
      var container = node.closest(".grid, .filmstrip");
      return container ? { node: node, container: container } : null;
    }

    document.addEventListener("click", function (e) {
      var hit = tileFromEvent(e);
      if (hit) openFromNode(hit.node, hit.container);
    });
    // tiles are exposed as buttons — activate with Enter / Space
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
      var hit = tileFromEvent(e);
      if (!hit) return;
      e.preventDefault();
      openFromNode(hit.node, hit.container);
    });
  }

  /* =====================================================================
     REVEAL ON SCROLL
     ===================================================================== */
  function wireReveal() {
    var els = qsa(".reveal");
    if (!("IntersectionObserver" in window)) {
      each(els, function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    each(els, function (el) { io.observe(el); });
  }

  /* =====================================================================
     ENQUIRE FORM
     ===================================================================== */
  function wireForm(form) {
    each(form.querySelectorAll(".pill"), function (pill) {
      pill.addEventListener("click", function () {
        var on = pill.getAttribute("aria-pressed") === "true";
        pill.setAttribute("aria-pressed", on ? "false" : "true");
      });
    });

    function picks() {
      var out = [];
      each(form.querySelectorAll('.pill[aria-pressed="true"]'), function (p) {
        out.push(p.textContent.trim());
      });
      return out;
    }
    function val(name) {
      var f = form.querySelector('[name="' + name + '"]');
      return f ? f.value.trim() : "";
    }
    function status(msg) { form.querySelector(".form-status").textContent = msg; }

    function validate() {
      var name = val("name"), email = val("email"), brand = val("brand");
      if (!name || !email || !brand) {
        status("Please add your name, email, and the brand or project name.");
        return null;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        status("That email address looks off. Mind checking it?");
        return null;
      }
      return { name: name, email: email, brand: brand, phone: val("phone"), message: val("message"), looking: picks() };
    }

    function compose(d) {
      var lines = [
        "Name: " + d.name,
        "Email: " + d.email
      ];
      if (d.phone) lines.push("Phone: " + d.phone);
      lines.push("Brand / Project: " + d.brand);
      if (d.looking.length) lines.push("Looking for: " + d.looking.join(", "));
      if (d.message) lines.push("Details: " + d.message);
      return lines.join("\n");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = validate(); if (!d) return;
      var subject = "Project enquiry from " + d.name + " (" + d.brand + ")";
      var body = compose(d);
      window.location.href = "mailto:" + SITE.email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      status("Opening your email app. If nothing happens, write to us at " + SITE.email + ".");
    });

    form.querySelector("[data-wa]").addEventListener("click", function () {
      var d = validate(); if (!d) return;
      var msg = "Hi " + (SITE.name || "Ember & Frames") + "! I would like to enquire.\n\n" + compose(d);
      window.open("https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
      status("Opening WhatsApp with your brief ready to send.");
    });
  }

  /* =====================================================================
     WHATSAPP FAB (desktop lifts above footer; touch never lifts)
     ===================================================================== */
  function buildWaFab() {
    if (!SITE.whatsapp) return;
    var msg = "Hi " + (SITE.name || "Ember & Frames") + ", I came across your studio and I'd love to talk about a shoot.";
    var fab = h(
      '<a class="wa-fab" href="https://wa.me/' + SITE.whatsapp + "?text=" + encodeURIComponent(msg) + '" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">' +
        '<span class="wa-fab-label">Chat on WhatsApp</span>' +
        '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.001 3C9.376 3 4 8.373 4 14.99c0 2.64.875 5.105 2.36 7.121L4 29l7.062-2.297a12.05 12.05 0 0 0 4.94 1.061h.005c6.624 0 12-5.373 12-11.99 0-3.205-1.246-6.218-3.51-8.482A11.927 11.927 0 0 0 16.001 3zm0 21.97h-.004a9.96 9.96 0 0 1-5.073-1.388l-.364-.216-4.19 1.362 1.376-4.084-.237-.376a9.96 9.96 0 0 1-1.527-5.297c0-5.5 4.478-9.974 9.978-9.974 2.665 0 5.171 1.04 7.054 2.926A9.91 9.91 0 0 1 25.98 14.99c0 5.5-4.478 9.98-9.979 9.98zm5.482-7.473c-.301-.151-1.78-.878-2.056-.978-.276-.1-.477-.151-.678.151s-.778.978-.954 1.179c-.176.201-.352.226-.653.075-.301-.151-1.27-.469-2.42-1.493-.894-.798-1.498-1.785-1.674-2.087-.176-.301-.019-.464.132-.615.135-.135.301-.352.452-.527.151-.176.201-.301.301-.502.1-.201.05-.377-.025-.527-.075-.151-.678-1.633-.929-2.236-.245-.587-.494-.507-.678-.517l-.578-.01c-.201 0-.527.075-.803.377-.276.301-1.054 1.029-1.054 2.51 0 1.481 1.079 2.911 1.229 3.112.151.201 2.123 3.241 5.144 4.541.719.31 1.279.495 1.717.633.722.229 1.378.197 1.898.12.579-.087 1.78-.728 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.201-.578-.352z"/></svg>' +
      "</a>"
    );
    BODY.appendChild(fab);

    var footer = document.querySelector(".footer");
    if (!footer) return;
    /* Only mouse-driven browsers (hover + fine pointer) lift the FAB above the footer.
       Touch devices (phones/tablets) never lift — the FAB stays at its CSS default. */
    function isDesktop() {
      return !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    }
    function update() {
      if (!isDesktop()) { fab.style.bottom = ""; return; }
      var rect = footer.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var overlap = vh - rect.top;
      fab.style.bottom = (overlap > 0 ? overlap + 12 : 22) + "px";
    }
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { update(); ticking = false; });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* =====================================================================
     SMOOTH ANCHORS (account for sticky header)
     ===================================================================== */
  function wireAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href").slice(1);
      if (!id || id === "top") return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    });
  }

  /* =====================================================================
     BOOT
     ===================================================================== */
  function boot() {
    buildHeader();
    renderGalleries();
    buildServices();
    buildAbout();
    buildContact();
    buildEnquire();
    buildFooter();
    buildLightbox();
    buildWaFab();
    wireTabs();
    wireFilmstrip();
    wireReveal();
    wireAnchors();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

/* =====================================================================
   Ember & Frames — Unified data layer
   ---------------------------------------------------------------------
   Single source of truth for shared copy + all portfolio media.
   To add or change work, edit the arrays below. Nothing else changes:
   drop the files into /assets/media/... and point the paths here.
   ===================================================================== */
window.EF = {

  site: {
    name: "Ember & Frames",
    tagline: "Warm. Intentional. Unforgettable.",
    city: "Hyderabad, India",
    email: "hello@emberandframes.com",
    phoneDisplay: "+91 84474 02780",
    phoneTel: "+918447402780",
    whatsapp: "918447402780",
    instagram: "https://www.instagram.com/emberandframes",
    instagramHandle: "@emberandframes",
    year: "2026"
  },

  /* Industry navigation — order matters. live:false renders a "coming soon" page.
     `label` is the full name (mobile menu); `short` is the compact header label. */
  nav: [
    { key: "fnb",         label: "F&B",                       short: "F&B",         href: "fnb.html",         live: true  },
    { key: "interiors",   label: "Interiors & Architecture",  short: "Interiors",   href: "interiors.html",   live: true  },
    { key: "events",      label: "Events",                    short: "Events",      href: "events.html",      live: true  },
    { key: "hospitality", label: "Hospitality",               short: "Hospitality", href: "hospitality.html", live: false },
    { key: "lifestyle",   label: "Lifestyle",                 short: "Lifestyle",   href: "lifestyle.html",   live: false },
    { key: "products",    label: "Products",                  short: "Products",    href: "products.html",    live: false }
  ],

  /* ---------- Shared: ABOUT ---------- */
  about: {
    heading: 'We make pictures worth <em>keeping</em>.',
    lede: "Ember <span class=\"brand-amp\">&amp;</span> Frames is a photography and film studio in Hyderabad. We work across food, spaces, and the people and moments that fill them, and we try to make the everyday feel worth holding on to.",
    body: "A good photograph does more than record a thing. It carries the warmth of a kitchen, the calm of a well made room, the buzz of a good night out. Across food and beverage, interiors and architecture, events and lifestyle, our job is to catch that feeling and hand it back to you in frames you are proud to put your name to. We shoot on location, style with intention, and edit so the work looks like you, never like a stock catalogue.",
    process: [
      { name: "Brief &amp; Discovery",  desc: "A short call to understand the brand, the space, and the mood. We follow up with a shot list and references before the shoot." },
      { name: "Conceptualisation",       desc: "Props, surfaces, light, and a running order. Most of the good stuff is decided long before the camera comes out." },
      { name: "Shoot Day",               desc: "Calm, efficient, with room to chase the happy accidents. Most clients leave with more than they came for." },
      { name: "Delivery",                desc: "Edited, retouched, and ready to use, sent on a private link for your team or your feed. Print and web exports on request." }
    ],
    footQuote: "You get a creative partner, not just a camera. We plan it, shoot it, edit it, and keep it on schedule, so you can stay with the thing you do best.",
    footTag: "If a dish, a space, or a moment deserves more than a quick phone shot, we would love to hear from you."
  },

  /* ---------- Shared: CONTACT ---------- */
  contact: {
    heading: 'Got a moment worth <em>keeping</em>?',
    sub: "Based in Hyderabad. Available for work across India and beyond."
  },

  /* ---------- Shared: ENQUIRE (merged pills from every portfolio) ---------- */
  enquire: {
    heading: 'Send <em>a quick brief</em>',
    sub: "Tell us about your project in a few lines. We reply within two working days.",
    pills: [
      "Menu &amp; Food Shoot",
      "Brand Campaign",
      "Social Content",
      "Reels &amp; Video",
      "Interiors &amp; Architecture",
      "Hospitality",
      "Event Coverage",
      "Lifestyle",
      "Product &amp; Packaging",
      "Editorial / Cookbook",
      "Other"
    ]
  },

  /* ---------- Shared: SERVICES (rendered per page by data-page key) ----------
     Same four-item format on every category page. Copy is tailored per
     discipline; the layout, styling, and order stay identical. ---------- */
  services: {
    fnb: {
      eyebrow: "What We Offer",
      heading: 'From plate to <em>post</em>.',
      note: "Full-day and monthly retainers. Packages tailored to the brief.",
      items: [
        { name: "Restaurants, Bars &amp; Hotels", desc: "Complete visual library for restaurants, bars and hotels: signature dishes, detail shots, ambience and the team in action." },
        { name: "Brand &amp; Packaging",          desc: "Product photography with mood-driven styling for FMCG, gourmet and speciality food brands." },
        { name: "Social Content",                desc: "Ongoing content for the brands we work with, paced to keep feeds consistent, fresh and on-brand." },
        { name: "Editorial &amp; Cookbooks",     desc: "Long-form food stories and recipe photography with a proper narrative thread." }
      ]
    },
    interiors: {
      eyebrow: "What We Offer",
      heading: 'From room to <em>frame</em>.',
      note: "Day rates and project pricing. Packages tailored to the space.",
      items: [
        { name: "Residential &amp; Show Flats",   desc: "Homes and show flats shot the way they are meant to be lived in, patient with the light." },
        { name: "Hospitality &amp; Retail",       desc: "Resorts and hotels framed for the escape they promise. Luxury and boutique stores styled for the walk-in moment. Every space shot with the mood that turns a glance into a visit." },
        { name: "Studios &amp; Workspaces",       desc: "Offices, studios, and creative spaces framed clean and honest about the materials." },
        { name: "Architecture &amp; Developers",  desc: "Facades, structures, and detail work for teams who care about the craft." }
      ]
    },
    events: {
      eyebrow: "What We Offer",
      heading: 'From first guest to final <em>frame</em>.',
      note: "Coverage by the day or the event. Photo, film, or both.",
      items: [
        { name: "Brand Launches &amp; Activations", desc: "Product drops, pop-ups, and experiential moments — captured for the recap and the archive." },
        { name: "Corporate &amp; Conferences",      desc: "Summits, offsites, and conferences, documented with the polish stakeholders expect and the detail that makes people actually watch the recap." },
        { name: "Cultural &amp; Editorial Events",  desc: "Exhibitions, showcases, panels, and press previews — shot with the eye for detail that makes for a strong story afterward." },
        { name: "Social &amp; Community Events",    desc: "Community gatherings, cultural moments, and shared experiences — framed with the warmth and energy that hold a room together." }
      ]
    },
    hospitality: {
      eyebrow: "What We Offer",
      heading: 'From lobby to last <em>light</em>.',
      note: "Property shoots by the day or the stay. Photo and film.",
      items: [
        { name: "Hotels &amp; Resorts",     desc: "Full property coverage, from the arrival to the view, shot with warmth and honest light." },
        { name: "Rooms &amp; Suites",       desc: "Interiors that make a room feel like somewhere you would rather be." },
        { name: "Restaurants &amp; Bars",   desc: "On-property dining and drinks, styled to match the house." },
        { name: "Amenities &amp; Details",  desc: "Spas, pools, and the small touches that turn a booking into a stay." }
      ]
    },
    lifestyle: {
      eyebrow: "What We Offer",
      heading: 'From candid to <em>campaign</em>.',
      note: "Sessions and content days. Packages tailored to the brief.",
      items: [
        { name: "Personal &amp; Portraits", desc: "Relaxed, natural portraits for people and the brands built around them." },
        { name: "Brand Faces",             desc: "Founders, teams, and talent, shot to feel human, not corporate." },
        { name: "Content &amp; Reels",      desc: "Batches of stills and short video, made for the feed and the site." },
        { name: "Editorial",                desc: "Story-led shoots with a proper narrative thread from first frame to last." }
      ]
    },
    products: {
      eyebrow: "What We Offer",
      heading: 'From shelf to <em>screen</em>.',
      note: "Per-shoot and catalogue pricing. Packages tailored to the range.",
      items: [
        { name: "Packaging &amp; Products",     desc: "Clean, considered product shots that hold up on a shelf and on a screen." },
        { name: "Catalogue &amp; E-commerce",   desc: "Consistent, high-volume imagery built for a store that needs to scale." },
        { name: "Campaign &amp; Hero",          desc: "Statement frames for launches, landing pages, and the top of the funnel." },
        { name: "Social Content",               desc: "Reels and stills shot in batches so your feed is never running on empty." }
      ]
    }
  },

  /* =====================================================================
     F&B — media
     Hero + section copy live in fnb.html. These are the galleries.
     ===================================================================== */
  fnb: {
    filmstrip: [
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Fish%20Pulimunchi.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03536.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01920.jpg",
      "assets/media/fnb/Light/Concu/DSC03332.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06786.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC04941.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03445.jpg",
      "assets/media/fnb/Light/Concu/DSC03583.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06763.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Shichimi%20Edamame.jpg",
      "assets/media/fnb/Light/Concu/DSC03876.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01382.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06718.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05601.jpg",
      "assets/media/fnb/Light/Concu/DSC04269.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03940.jpg"
    ],
  fnbGalleries: {
    ru: [
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Asparagus%20Black%20Garlic%20Dimsum.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Chicken%20Karaage.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC08978.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05125.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05114.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC04941.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC03256.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05206.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/_JOY0070.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Pharoah_s%20fizz.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20DSC07326.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC08516.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Kerala%20Fried%20Chicken.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Bidri%20of%20Banjara.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20DSC07351.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05044.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05089.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05186.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Khumb%20Peshawari.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05379.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Black%20Pepper%20Prawns.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05332.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05074.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Turnip%20Cake.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Fish%20Pulimunchi.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC03235.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Royyala%20Vepudu.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC07338.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05297.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05070.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC08462.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Dal%20Ru.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Moong%20Dal%20Halwa.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05527.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Smoked%20Pimiento.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC03286.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Shichimi%20Edamame.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05111.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Banarasi%20Malai%20Kofta.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC08330.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC08589.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/_JOY0064.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC08596.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC04944.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Paneer%20Tikka.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05008.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05680.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05255.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05460.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05269.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05179.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20DSC07344.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC04978.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05692.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05421.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05237.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05038.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05601.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05253.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05688.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC04946.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/Copy%20of%20Avocado%20Papdi%20Chaat.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05377.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05145.jpg",
      "assets/media/fnb/Light/Ru%20and%20Kinru/DSC05484.jpg",
    ],
    lunar: [
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03801.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03429.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03311.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03445.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03644.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03804.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03830.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03541.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03303.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03567.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03881.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03880.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03909.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03940.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03891.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03284.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03609.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03941.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03268.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03698.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03569.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03747.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03932.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03497.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03640.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03700.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03800.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03536.jpg",
      "assets/media/fnb/Light/Lunar%20Cafe/DSC03398.jpg",
    ],
    concu: [
      "assets/media/fnb/Light/Concu/DSC03919.jpg",
      "assets/media/fnb/Light/Concu/DSC03363.jpg",
      "assets/media/fnb/Light/Concu/DSC04713.jpg",
      "assets/media/fnb/Light/Concu/DSC04746.jpg",
      "assets/media/fnb/Light/Concu/DSC03332.jpg",
      "assets/media/fnb/Light/Concu/DSC04865.jpg",
      "assets/media/fnb/Light/Concu/DSC04806.jpg",
      "assets/media/fnb/Light/Concu/DSC04607.jpg",
      "assets/media/fnb/Light/Concu/DSC04046.jpg",
      "assets/media/fnb/Light/Concu/DSC04142.jpg",
      "assets/media/fnb/Light/Concu/DSC03452.jpg",
      "assets/media/fnb/Light/Concu/DSC04419.jpg",
      "assets/media/fnb/Light/Concu/DSC03686.jpg",
      "assets/media/fnb/Light/Concu/DSC03766.jpg",
      "assets/media/fnb/Light/Concu/DSC04429.jpg",
      "assets/media/fnb/Light/Concu/DSC03876.jpg",
      "assets/media/fnb/Light/Concu/DSC04773.jpg",
      "assets/media/fnb/Light/Concu/DSC04369.jpg",
      "assets/media/fnb/Light/Concu/DSC03756.jpg",
      "assets/media/fnb/Light/Concu/DSC03979.jpg",
      "assets/media/fnb/Light/Concu/DSC04352.jpg",
      "assets/media/fnb/Light/Concu/DSC04791.jpg",
      "assets/media/fnb/Light/Concu/DSC03810.jpg",
      "assets/media/fnb/Light/Concu/DSC04165.jpg",
      "assets/media/fnb/Light/Concu/DSC04479.jpg",
      "assets/media/fnb/Light/Concu/DSC04875.jpg",
      "assets/media/fnb/Light/Concu/DSC03583.jpg",
      "assets/media/fnb/Light/Concu/DSC04804.jpg",
      "assets/media/fnb/Light/Concu/DSC03358.jpg",
      "assets/media/fnb/Light/Concu/DSC04862.jpg",
      "assets/media/fnb/Light/Concu/DSC04269.jpg",
      "assets/media/fnb/Light/Concu/DSC03303.1.jpg",
      "assets/media/fnb/Light/Concu/DSC04223.jpg",
      "assets/media/fnb/Light/Concu/DSC04135.jpg",
      "assets/media/fnb/Light/Concu/DSC04034.jpg",
      "assets/media/fnb/Light/Concu/DSC04600.jpg",
      "assets/media/fnb/Light/Concu/DSC04873.jpg",
      "assets/media/fnb/Light/Concu/DSC03383.jpg",
      "assets/media/fnb/Light/Concu/DSC04637.jpg",
    ],
    concuHampers: [
      "assets/media/fnb/Light/Concu%20Hamper/DSC06194.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06202.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06228.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06293.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06303.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06322.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06395.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06406.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06410.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06459.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06571.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06577.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06583.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06664.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06710.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06718.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06723.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06763.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06786.jpg",
    ],
    tai: [
      "assets/media/fnb/Light/Tai%20Tai/DSC01920.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01749.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01382.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01653.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01664-2.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01545.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC02042.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01405.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01450.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01856.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01802.jpg",
      "assets/media/fnb/Light/Tai%20Tai/DSC01924.jpg",
    ],
  },
  fnbVideos: [
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/%F0%9D%90%96%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%AD%E2%80%99%F0%9D%90%AC%20%F0%9D%90%9B%F0%9D%90%9E%F0%9D%90%AD%F0%9D%90%AD%F0%9D%90%9E%F0%9D%90%AB%20%F0%9D%90%AD%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%A7%20%F0%9D%90%9A%20%F0%9D%90%A0%F0%9D%90%A8%F0%9D%90%A8%F0%9D%90%9D%20%F0%9D%90%9C%F0%9D%90%A8%F0%9D%90%9C%F0%9D%90%A4%F0%9D%90%AD%F0%9D%90%9A%F0%9D%90%A2%F0%9D%90%A5%F0%9D%90%80%20%F0%9D%90%9D%F0%9D%90%A2%F0%9D%90%AC%F0%9D%90%A1%20%F0%9D%90%AD%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%AD%20%F0%9D%90%A4%F0%9D%90%A7%F0%9D%90%A8%F0%9D%90%B0%F0%9D%90%AC%20%F0%9D%90%9E.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/%F0%9D%90%96%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%AD%E2%80%99%F0%9D%90%AC%20%F0%9D%90%9B%F0%9D%90%9E%F0%9D%90%AD%F0%9D%90%AD%F0%9D%90%9E%F0%9D%90%AB%20%F0%9D%90%AD%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%A7%20%F0%9D%90%9A%20%F0%9D%90%A0%F0%9D%90%A8%F0%9D%90%A8%F0%9D%90%9D%20%F0%9D%90%9C%F0%9D%90%A8%F0%9D%90%9C%F0%9D%90%A4%F0%9D%90%AD%F0%9D%90%9A%F0%9D%90%A2%F0%9D%90%A5%F0%9D%90%80%20%F0%9D%90%9D%F0%9D%90%A2%F0%9D%90%AC%F0%9D%90%A1%20%F0%9D%90%AD%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%AD%20%F0%9D%90%A4%F0%9D%90%A7%F0%9D%90%A8%F0%9D%90%B0%F0%9D%90%AC%20%F0%9D%90%9E.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/From%20the%20calm%20of%20our%20space%20to%20the%20comfort%20on%20your%20plate%20-%20R%C3%BC%20is%20a%20feeling%20you%20settle%20into.Book%20y.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/From%20the%20calm%20of%20our%20space%20to%20the%20comfort%20on%20your%20plate%20-%20R%C3%BC%20is%20a%20feeling%20you%20settle%20into.Book%20y.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/Just%20another%20night%20behind%20the%20Bar%20at%20Kin-R%C3%BC%20-%20Shakers%20spinning%2C%20smiles%20flashing%2C%20spirits%20high%20an.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/Just%20another%20night%20behind%20the%20Bar%20at%20Kin-R%C3%BC%20-%20Shakers%20spinning%2C%20smiles%20flashing%2C%20spirits%20high%20an.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/RU_Menu%20Main_45%20sec.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/RU_Menu%20Main_45%20sec.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/Kinru%20X%20The%20Johri_Cut%204.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/Kinru%20X%20The%20Johri_Cut%204.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/RU%20X%20FLIPSYD_new.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/RU%20X%20FLIPSYD_new.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/KinruxMuro%20Cut%203.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/KinruxMuro%20Cut%203.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/ROASTED%20BELL%20PEPPER.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/ROASTED%20BELL%20PEPPER.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/%F0%9D%90%80%20%F0%9D%90%AB%F0%9D%90%9E%F0%9D%90%9E%F0%9D%90%A5%20%F0%9D%90%A8%F0%9D%90%9F%20%F0%9D%90%AB%F0%9D%90%9E%F0%9D%90%9A%F0%9D%90%A5%20%F0%9D%90%A6%F0%9D%90%A8%F0%9D%90%A6%F0%9D%90%9E%F0%9D%90%A7%F0%9D%90%AD%F0%9D%90%AC%20%E2%80%94%20grins%20behind%20the%20craft%2C%20dancing%20flames%20in%20the%20kitchen.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/%F0%9D%90%80%20%F0%9D%90%AB%F0%9D%90%9E%F0%9D%90%9E%F0%9D%90%A5%20%F0%9D%90%A8%F0%9D%90%9F%20%F0%9D%90%AB%F0%9D%90%9E%F0%9D%90%9A%F0%9D%90%A5%20%F0%9D%90%A6%F0%9D%90%A8%F0%9D%90%A6%F0%9D%90%9E%F0%9D%90%A7%F0%9D%90%AD%F0%9D%90%AC%20%E2%80%94%20grins%20behind%20the%20craft%2C%20dancing%20flames%20in%20the%20kitchen.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/%F0%9D%90%93%F0%9D%90%A1%F0%9D%90%9E%20%F0%9D%90%9B%F0%9D%90%9A%F0%9D%90%AB%20%F0%9D%90%A2%F0%9D%90%AC%20%F0%9D%90%AD%F0%9D%90%A1%F0%9D%90%9E%F0%9D%90%A2%F0%9D%90%AB%20%F0%9D%90%9C%F0%9D%90%9A%F0%9D%90%A7%F0%9D%90%AF%F0%9D%90%9A%F0%9D%90%AC.%20%F0%9D%90%93%F0%9D%90%A1%F0%9D%90%9E%20%F0%9D%90%9C%F0%9D%90%A8%F0%9D%90%9C%F0%9D%90%A4%F0%9D%90%AD%F0%9D%90%9A%F0%9D%90%A2%F0%9D%90%A5%2C%20%F0%9D%90%AD%F0%9D%90%A1%F0%9D%90%9E%F0%9D%90%A2%F0%9D%90%AB%20%F0%9D%90%9A%F0%9D%90%AB%F0%9D%90%AD.Celebrate.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/%F0%9D%90%93%F0%9D%90%A1%F0%9D%90%9E%20%F0%9D%90%9B%F0%9D%90%9A%F0%9D%90%AB%20%F0%9D%90%A2%F0%9D%90%AC%20%F0%9D%90%AD%F0%9D%90%A1%F0%9D%90%9E%F0%9D%90%A2%F0%9D%90%AB%20%F0%9D%90%9C%F0%9D%90%9A%F0%9D%90%A7%F0%9D%90%AF%F0%9D%90%9A%F0%9D%90%AC.%20%F0%9D%90%93%F0%9D%90%A1%F0%9D%90%9E%20%F0%9D%90%9C%F0%9D%90%A8%F0%9D%90%9C%F0%9D%90%A4%F0%9D%90%AD%F0%9D%90%9A%F0%9D%90%A2%F0%9D%90%A5%2C%20%F0%9D%90%AD%F0%9D%90%A1%F0%9D%90%9E%F0%9D%90%A2%F0%9D%90%AB%20%F0%9D%90%9A%F0%9D%90%AB%F0%9D%90%AD.Celebrate.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/%F0%9D%90%8D%F0%9D%90%9E%F0%9D%90%B0%20%F0%9D%90%9F%F0%9D%90%A2%F0%9D%90%AB%F0%9D%90%9E%20%F0%9D%90%9F%F0%9D%90%AB%F0%9D%90%A8%F0%9D%90%A6%20%F0%9D%90%A8%F0%9D%90%AE%F0%9D%90%AB%20%F0%9D%90%A4%F0%9D%90%A2%F0%9D%90%AD%F0%9D%90%9C%F0%9D%90%A1%F0%9D%90%9E%F0%9D%90%A7!Plated%20to%20thrill%2C%20built%20to%20pair%2C%20and%20made%20to%20ling.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/%F0%9D%90%8D%F0%9D%90%9E%F0%9D%90%B0%20%F0%9D%90%9F%F0%9D%90%A2%F0%9D%90%AB%F0%9D%90%9E%20%F0%9D%90%9F%F0%9D%90%AB%F0%9D%90%A8%F0%9D%90%A6%20%F0%9D%90%A8%F0%9D%90%AE%F0%9D%90%AB%20%F0%9D%90%A4%F0%9D%90%A2%F0%9D%90%AD%F0%9D%90%9C%F0%9D%90%A1%F0%9D%90%9E%F0%9D%90%A7!Plated%20to%20thrill%2C%20built%20to%20pair%2C%20and%20made%20to%20ling.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/%F0%9D%97%98%F0%9D%97%AE%F0%9D%97%B0%F0%9D%97%B5%20%F0%9D%97%BD%F0%9D%97%BC%F0%9D%98%82%F0%9D%97%BF%20%F0%9D%97%AE%F0%9D%98%81%20%F0%9D%97%9E%F0%9D%97%B6%F0%9D%97%BB-%F0%9D%97%A5%C3%BC%20%E2%80%94%20%F0%9D%97%AE%20%F0%9D%97%BA%F0%9D%97%BC%F0%9D%97%BA%F0%9D%97%B2%F0%9D%97%BB%F0%9D%98%81%2C%20%F0%9D%97%AE%20%F0%9D%97%BA%F0%9D%97%BC%F0%9D%97%BC%F0%9D%97%B1%2C%20%F0%9D%97%AE%20%F0%9D%97%BA%F0%9D%97%AE%F0%9D%98%81%F0%9D%97%B0%F0%9D%97%B5.In%20the%20mood%20for%20.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/%F0%9D%97%98%F0%9D%97%AE%F0%9D%97%B0%F0%9D%97%B5%20%F0%9D%97%BD%F0%9D%97%BC%F0%9D%98%82%F0%9D%97%BF%20%F0%9D%97%AE%F0%9D%98%81%20%F0%9D%97%9E%F0%9D%97%B6%F0%9D%97%BB-%F0%9D%97%A5%C3%BC%20%E2%80%94%20%F0%9D%97%AE%20%F0%9D%97%BA%F0%9D%97%BC%F0%9D%97%BA%F0%9D%97%B2%F0%9D%97%BB%F0%9D%98%81%2C%20%F0%9D%97%AE%20%F0%9D%97%BA%F0%9D%97%BC%F0%9D%97%BC%F0%9D%97%B1%2C%20%F0%9D%97%AE%20%F0%9D%97%BA%F0%9D%97%AE%F0%9D%98%81%F0%9D%97%B0%F0%9D%97%B5.In%20the%20mood%20for%20.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/%F0%9D%97%A5%F0%9D%97%B2%F0%9D%97%B1%F0%9D%97%B1%F0%9D%98%86%20%F0%9D%97%AA%F0%9D%97%B6%F0%9D%97%BB%F0%9D%97%B2%F0%9D%98%80%20%F0%9D%97%A7%F0%9D%97%AE%F0%9D%98%84%F0%9D%97%AE%20%F0%9D%97%A0%F0%9D%97%AE%F0%9D%97%B0%F0%9D%97%B0%F0%9D%97%B5%F0%9D%97%B6%2C%20has%20always%20been%20a%20dish%20that%20drew%20a%20crowd%20%E2%80%94%20crisp%2C%20s.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/%F0%9D%97%A5%F0%9D%97%B2%F0%9D%97%B1%F0%9D%97%B1%F0%9D%98%86%20%F0%9D%97%AA%F0%9D%97%B6%F0%9D%97%BB%F0%9D%97%B2%F0%9D%98%80%20%F0%9D%97%A7%F0%9D%97%AE%F0%9D%98%84%F0%9D%97%AE%20%F0%9D%97%A0%F0%9D%97%AE%F0%9D%97%B0%F0%9D%97%B0%F0%9D%97%B5%F0%9D%97%B6%2C%20has%20always%20been%20a%20dish%20that%20drew%20a%20crowd%20%E2%80%94%20crisp%2C%20s.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/RUxFLIPSYD_Cut%207.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/RUxFLIPSYD_Cut%207.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/At%20R%C3%BC%2C%20every%20detail%20is%20crafted%20for%20you!Watch%20closely%20-%20your%20next%20favorite%20drink%20is%20being%20created.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/At%20R%C3%BC%2C%20every%20detail%20is%20crafted%20for%20you!Watch%20closely%20-%20your%20next%20favorite%20drink%20is%20being%20created.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/Kinru_Three%20Frames_Updated%20Music.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/Kinru_Three%20Frames_Updated%20Music.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/First%20time%20at%20R%C3%BC%20Hyderabad%20Begin%20with%20our%20chef%E2%80%99s%20%40chefthimma%20favourites.From%20the%20royal%20Patthar%20k.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/First%20time%20at%20R%C3%BC%20Hyderabad%20Begin%20with%20our%20chef%E2%80%99s%20%40chefthimma%20favourites.From%20the%20royal%20Patthar%20k.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/Kinru_Top%20down_Updated%20Music.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/Kinru_Top%20down_Updated%20Music.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/From%20the%20embers%2C%20a%20classic%20returns%20-%20Khumb%20Peshawari%2C%20where%20the%20humble%20mushroom%20meets%20centuries%20.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/From%20the%20embers%2C%20a%20classic%20returns%20-%20Khumb%20Peshawari%2C%20where%20the%20humble%20mushroom%20meets%20centuries%20.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/%F0%9D%90%92%F0%9D%90%A1%F0%9D%90%9E%F0%9D%90%AB-%F0%9D%90%91%C3%BC-%F0%9D%90%92%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%B2%F0%9D%90%9A%F0%9D%90%AB%F0%9D%90%A2%20-%20where%20Scotch%20meets%20Sauvignon%2C%20citrus%20meets%20honey%2C%20and%20every%20sip%20is.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/%F0%9D%90%92%F0%9D%90%A1%F0%9D%90%9E%F0%9D%90%AB-%F0%9D%90%91%C3%BC-%F0%9D%90%92%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%B2%F0%9D%90%9A%F0%9D%90%AB%F0%9D%90%A2%20-%20where%20Scotch%20meets%20Sauvignon%2C%20citrus%20meets%20honey%2C%20and%20every%20sip%20is.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/%F0%9D%97%9B%F0%9D%97%B2%F0%9D%97%BF%F0%9D%97%B2%20%F0%9D%97%AA%F0%9D%97%B2%20%F0%9D%97%96%F0%9D%97%BC%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%97%A7%F0%9D%97%BC%F0%9D%97%B4%F0%9D%97%B2%F0%9D%98%81%F0%9D%97%B5%F0%9D%97%B2%F0%9D%97%BF%20%E2%80%94%20%F0%9D%98%81%F0%9D%97%BC%20%F0%9D%98%80%F0%9D%97%B6%F0%9D%97%BD%2C%20%F0%9D%98%81%F0%9D%97%BC%20%F0%9D%97%B1%F0%9D%97%AE%F0%9D%97%BB%F0%9D%97%B0%F0%9D%97%B2%2C%20%F0%9D%98%81%F0%9D%97%BC%20%F0%9D%97%B0%F0%9D%97%B2%F0%9D%97%B9%F0%9D%97%B2%F0%9D%97%AF%F0%9D%97%BF%F0%9D%97%AE%F0%9D%98%81%F0%9D%97%B2%20.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/%F0%9D%97%9B%F0%9D%97%B2%F0%9D%97%BF%F0%9D%97%B2%20%F0%9D%97%AA%F0%9D%97%B2%20%F0%9D%97%96%F0%9D%97%BC%F0%9D%97%BA%F0%9D%97%B2%20%F0%9D%97%A7%F0%9D%97%BC%F0%9D%97%B4%F0%9D%97%B2%F0%9D%98%81%F0%9D%97%B5%F0%9D%97%B2%F0%9D%97%BF%20%E2%80%94%20%F0%9D%98%81%F0%9D%97%BC%20%F0%9D%98%80%F0%9D%97%B6%F0%9D%97%BD%2C%20%F0%9D%98%81%F0%9D%97%BC%20%F0%9D%97%B1%F0%9D%97%AE%F0%9D%97%BB%F0%9D%97%B0%F0%9D%97%B2%2C%20%F0%9D%98%81%F0%9D%97%BC%20%F0%9D%97%B0%F0%9D%97%B2%F0%9D%97%B9%F0%9D%97%B2%F0%9D%97%AF%F0%9D%97%BF%F0%9D%97%AE%F0%9D%98%81%F0%9D%97%B2%20.jpg" },
    { src: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/%F0%9D%97%A7%F0%9D%97%B5%F0%9D%97%B2%20%F0%9D%97%B5%F0%9D%97%B2%F0%9D%97%AE%F0%9D%97%BF%F0%9D%98%81%F0%9D%97%AF%F0%9D%97%B2%F0%9D%97%AE%F0%9D%98%81%20%F0%9D%97%BC%F0%9D%97%B3%20%F0%9D%97%A5%C3%BC%20-%20%F0%9D%97%A7%F0%9D%97%B5%F0%9D%97%B2%20%F0%9D%97%9E%F0%9D%97%B6%F0%9D%98%81%F0%9D%97%B0%F0%9D%97%B5%F0%9D%97%B2%F0%9D%97%BB!From%20kitchen%20hustle%20to%20crafted%20perfec.mp4", poster: "assets/media/fnb/Videos/Ru%20and%20Kinru/web/posters/%F0%9D%97%A7%F0%9D%97%B5%F0%9D%97%B2%20%F0%9D%97%B5%F0%9D%97%B2%F0%9D%97%AE%F0%9D%97%BF%F0%9D%98%81%F0%9D%97%AF%F0%9D%97%B2%F0%9D%97%AE%F0%9D%98%81%20%F0%9D%97%BC%F0%9D%97%B3%20%F0%9D%97%A5%C3%BC%20-%20%F0%9D%97%A7%F0%9D%97%B5%F0%9D%97%B2%20%F0%9D%97%9E%F0%9D%97%B6%F0%9D%98%81%F0%9D%97%B0%F0%9D%97%B5%F0%9D%97%B2%F0%9D%97%BB!From%20kitchen%20hustle%20to%20crafted%20perfec.jpg" },
  ],
  },

  /* =====================================================================
     INTERIORS & ARCHITECTURE — projects (rendered in order)
     ===================================================================== */
  interiors: {
    filmstrip: [
      "assets/media/interiors/p5.jpg",
      "assets/media/interiors/r1.jpg",
      "assets/media/interiors/s5.jpg",
      "assets/media/interiors/o1.jpg",
      "assets/media/interiors/p2.jpg",
      "assets/media/interiors/r4.jpg",
      "assets/media/interiors/s8.jpg",
      "assets/media/interiors/p7.jpg",
      "assets/media/interiors/o3.jpg",
      "assets/media/interiors/s2.jpg",
      "assets/media/interiors/r6.jpg",
      "assets/media/interiors/p9.jpg",
      "assets/media/interiors/s13.jpg",
      "assets/media/interiors/o5.jpg",
      "assets/media/interiors/p3.jpg",
      "assets/media/interiors/s11.jpg"
    ],
    imgBase: "assets/media/interiors/",
    projects: [
      {
        title: "Studio 512", meta: ["Music studio", "Hyderabad", "2025"],
        role: "Photography &amp; lighting",
        blurb: "A full-service recording facility with five rooms: two live rooms, a control room, an isolation booth, and a rehearsal space. We shot entirely under the studio\u2019s own red lighting, its ambience, not ours. The brief was to make the gear look as good as it sounds.",
        photos: ["s5","s1","s2","s13","s8","s11","s9","s17","s3","s15","s10","s6","s12","s7","s4","s16","s18","s14"]
      },
      {
        title: "R\u00fc Craft Bar", meta: ["Restaurant &amp; bar", "Hyderabad", "2025"],
        role: "Photography",
        blurb: "A warm, layered restaurant space built around handwoven lanterns, raw plaster walls, and a boulder that was simply left where it stood. We shot before service and again at peak, so the room reads both as a space and as the place it becomes when it is full.",
        photos: ["r4","r2","r1","r6","r5","r3","r7"]
      },
      {
        title: "IRA Moonglade", meta: ["Show flat", "Hyderabad", "2025"],
        role: "Lead photography",
        blurb: "A three-bedroom show flat completed for the developer\u2019s sales launch. Shot across a single day, the brief was to capture the space as it would feel to a buyer walking in: lived-in, warm, and full of natural light.",
        photos: ["p5","p1","p2","p3","p4","p6","p7","p8","p9","p10"]
      },
      {
        title: "Lunar Cafe", meta: ["Caf\u00e9", "Hyderabad", "2025"],
        role: "Photography",
        blurb: "An open-air dining garden built around a crescent moon sculpture and a hand-laid pebble mosaic. Shot twice, once in full afternoon light and again as the moon arch lit up at dusk. The space reads completely differently in each light.",
        photos: ["o1","o2","o3","o4","o5"]
      }
    ]
  },

  /* =====================================================================
     EVENTS — filmstrip + collections
     ===================================================================== */
  events: {
    filmstrip: [
      "assets/media/events/Photos/Arthi%20Sonthalia/DSC02835.jpg",
      "assets/media/events/Photos/Festival%20of%20Play/DSC00744.JPG",
      "assets/media/events/Photos/Arthi%20Sonthalia/DSC02801.jpg",
      "assets/media/events/Photos/Festival%20of%20Play/DSC00510.JPG",
      "assets/media/events/Photos/Arthi%20Sonthalia/DSC02817.jpg",
      "assets/media/events/Photos/Festival%20of%20Play/DSC00922.JPG",
      "assets/media/events/Photos/Arthi%20Sonthalia/DSC02788.jpg",
      "assets/media/events/Photos/Festival%20of%20Play/DSC00342.JPG"
    ],
    collections: [
      {
        title: "Arti Sonthalia",
        note: "Discoveri Oaks, Hyderabad",
        items: [
          { type: "video", src: "assets/media/events/Videos/Arthi%20Sonthalia/Discoveri%20Oaks%201.mp4", poster: "assets/media/events/Videos/Arthi%20Sonthalia/Discoveri%20Oaks%201.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02765.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02772.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02781.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02770.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02785.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02795.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02804.jpg" },
          { type: "video", src: "assets/media/events/Videos/Arthi%20Sonthalia/Discoveri%20Oaks%202.mp4", poster: "assets/media/events/Videos/Arthi%20Sonthalia/Discoveri%20Oaks%202.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02797.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02820.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02806.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02831.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02810.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02823.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02776.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02840.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02835.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02817.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02801.jpg" },
          { type: "photo", src: "assets/media/events/Photos/Arthi%20Sonthalia/DSC02788.jpg" }
        ]
      },
      {
        title: "Festival of Play",
        note: "",
        items: [
          { type: "photo", src: "assets/media/events/Photos/Festival%20of%20Play/DSC00228.JPG" },
          { type: "photo", src: "assets/media/events/Photos/Festival%20of%20Play/DSC00733.JPG" },
          { type: "photo", src: "assets/media/events/Photos/Festival%20of%20Play/DSC00332.JPG" },
          { type: "photo", src: "assets/media/events/Photos/Festival%20of%20Play/DSC00922.JPG" },
          { type: "photo", src: "assets/media/events/Photos/Festival%20of%20Play/DSC00342.JPG" },
          { type: "photo", src: "assets/media/events/Photos/Festival%20of%20Play/DSC01166.JPG" },
          { type: "photo", src: "assets/media/events/Photos/Festival%20of%20Play/DSC00510.JPG" },
          { type: "photo", src: "assets/media/events/Photos/Festival%20of%20Play/DSC00744.JPG" }
        ]
      },
      {
        title: "You Can Sit With Us",
        note: "A tiffin centre, reimagined for one night",
        reels: true,
        items: [
          { type: "video", src: "assets/media/events/Videos/You%20Can%20Sit%20With%20Us/A%20tiffin%20center%20transformed%20into%20something%20otherworldly.%20A%20glimpse%20into%20the%20world%20we%20reimagined%2C.mp4", poster: "assets/media/events/Videos/You%20Can%20Sit%20With%20Us/A%20tiffin%20center%20transformed%20into%20something%20otherworldly.%20A%20glimpse%20into%20the%20world%20we%20reimagined%2C.jpg" },
          { type: "video", src: "assets/media/events/Videos/You%20Can%20Sit%20With%20Us/You%20Can%20Sit%20With%20Us%20dinner%20experiences%20are%20anything%20but%20conventional.%20We%20transform%20the%20ordinary%20.mp4", poster: "assets/media/events/Videos/You%20Can%20Sit%20With%20Us/You%20Can%20Sit%20With%20Us%20dinner%20experiences%20are%20anything%20but%20conventional.%20We%20transform%20the%20ordinary%20.jpg" },
          { type: "video", src: "assets/media/events/Videos/You%20Can%20Sit%20With%20Us/%F0%9F%8F%AEFor%20one%20night%2C%20a%20South%20Indian%20tiffin%20center%20vanished%20and%20in%20its%20place%2C%20a%20Japanese%20yatai%20appear.mp4", poster: "assets/media/events/Videos/You%20Can%20Sit%20With%20Us/%F0%9F%8F%AEFor%20one%20night%2C%20a%20South%20Indian%20tiffin%20center%20vanished%20and%20in%20its%20place%2C%20a%20Japanese%20yatai%20appear.jpg" },
          { type: "video", src: "assets/media/events/Videos/You%20Can%20Sit%20With%20Us/%F0%9F%92%9B%20The%20air%20was%20alive%20with%20a%20symphony%20of%20flavors%2C%20each%20note%20harmonizing%20with%20the%20hum%20of%20hands%20at%20.mp4", poster: "assets/media/events/Videos/You%20Can%20Sit%20With%20Us/%F0%9F%92%9B%20The%20air%20was%20alive%20with%20a%20symphony%20of%20flavors%2C%20each%20note%20harmonizing%20with%20the%20hum%20of%20hands%20at%20.jpg" }
        ]
      }
    ]
  },

  /* =====================================================================
     COMING SOON pages — teaser images optional. Add media arrays here
     later (mirroring the live pages) and flip nav.live to true.
     ===================================================================== */
  hospitality: {
    teasers: [
      "assets/media/interiors/p5.jpg",
      "assets/media/interiors/r1.jpg",
      "assets/media/interiors/o1.jpg"
    ]
  },
  lifestyle: {
    teasers: [
      "assets/media/events/Photos/Festival%20of%20Play/DSC00744.JPG",
      "assets/media/events/Photos/Arthi%20Sonthalia/DSC02801.jpg",
      "assets/media/events/Photos/Festival%20of%20Play/DSC00922.JPG"
    ]
  },
  products: {
    teasers: [
      "assets/media/fnb/Light/Concu%20Hamper/DSC06786.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06763.jpg",
      "assets/media/fnb/Light/Concu%20Hamper/DSC06718.jpg"
    ]
  }
};

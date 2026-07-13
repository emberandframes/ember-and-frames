# Ember &amp; Frames

The unified studio site for Ember &amp; Frames, a content studio in
Hyderabad. One website, one design system, with a page for each industry we
shoot for: F&amp;B, Interiors &amp; Architecture, Events, and more on the way.

It is a plain static site. No build step, no framework, no dependencies. Open
`index.html` and it runs.

## Structure

```text
ember-and-frames/
  index.html            Home, with the industries grid
  fnb.html              F&B (live)
  interiors.html        Interiors & Architecture (live)
  events.html           Events (live)
  hospitality.html      Coming soon
  lifestyle.html        Coming soon
  products.html         Coming soon
  404.html              Not-found page
  favicon.svg           Site mark
  robots.txt
  .nojekyll             Tells GitHub Pages to serve files as-is
  assets/
    css/styles.css      The whole design system
    js/data.js          All copy and every media path (the one file you edit)
    js/site.js          Injects shared chrome, renders galleries, wires clicks
    media/              All photos and videos, grouped by industry
```

## How it fits together

The parts that repeat on every page (header, footer, about, contact, and the
enquiry form) are injected by `site.js`, so they are written once and stay in
sync. Each page's hero and section copy lives in that page's own HTML, because
it is unique and good for search.

The galleries are data driven. A container like
`<div class="grid" data-gallery="fnb.fnbGalleries.ru"></div>` is filled at load
from the matching array in `data.js`. To change the work on show, you edit the
paths in `data.js` and nothing else.

## The enquiry form

The contact section injects a short enquiry form (also from `site.js`). It never
POSTs to a server: on submit it composes a pre-filled brief and hands off to the
visitor's own app — **Send Enquiry** opens their mail client to
`hello@emberandframes.com`, and **Send via WhatsApp** opens `wa.me/918447402780`
with the same brief as text.

The "What do you need?" pills read from `enquire.pills` in `data.js`. Six of them
are industry categories — Food &amp; Beverage, Interiors &amp; Architecture,
Events, Hospitality, Lifestyle, and Products — and each is written as
`{ label, key }`, where `key` matches an entry in the `services` object. Clicking
a category pill expands a nested set of sub-pills built from that category's
"What We Offer" headings, so a visitor can narrow the brief with no extra copy to
maintain. The remaining pills (Branding &amp; Strategy, Social Media Management,
Brand Campaign, Other) are plain strings with no nested set. Collapsing a
category clears its sub-selections, and every pressed pill — parent or child — is
rolled into the "Looking for:" line of the enquiry.

## Adding or changing media

1. Drop the files into the right folder under `assets/media/...`.
2. Open `assets/js/data.js` and add or edit the paths in the matching array.
3. Refresh the page.

Paths are URL encoded (a space becomes `%20`). Keep that pattern for any new
file that has spaces or special characters in its name.

## Turning a "coming soon" page live

1. In `assets/js/data.js`, find the page in the `nav` array and set
   `live: true`.
2. Replace that page's HTML body with the same structure the live pages use
   (hero, then a gallery section pointing at your new data array).
3. Add the media and its paths to `data.js`.

The navigation, the home grid badges, and the mobile menu all read from `nav`,
so flipping `live` updates them everywhere at once.

## Running it locally

Any static server works. From this folder:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`. Opening the HTML file directly also works,
though a server is closer to how it behaves once deployed.

## Deploying to GitHub Pages

Push this folder to a repository and enable Pages on the default branch. The
`.nojekyll` file is already here so every asset is served untouched.

## Brand notes

- Fonts: Cormorant Garamond for display, DM Sans for body.
- Palette lives in the `:root` block at the top of `styles.css`. Change a colour
  once there and it updates across the whole site.
- Header accent: a faint trail of ember sparks drifts up behind the
  wordmark, and the ampersand glows warmly. Both are pure CSS in `styles.css`
  and are switched off under `prefers-reduced-motion`.
- Voice: warm, plain, and human. Say it the way you would to a client over
  coffee.

Fonts in this folder
====================

Cormorant Garamond, by Christian Thalmann (Catharsis Fonts)
DM Sans, by Colophon Foundry, Jonny Pinhorn and Indian Type Foundry

Both are licensed under the SIL Open Font License, Version 1.1, which permits
redistribution and hosting alongside a website. The full licence text is at
https://openfontlicense.org and on each family's page at fonts.google.com.

The files are the latin subset of the variable versions served by Google Fonts
(Cormorant Garamond v21, DM Sans v17). One file covers every weight the site
uses, which is why there are four rather than twelve.

They are served from this repository rather than from fonts.gstatic.com so that
no visitor's browser has to contact a third party to read the site, and so the
typefaces arrive with the page instead of after it.

To refresh them, request the Google Fonts CSS with a current browser user agent,
take the woff2 URLs from the latin blocks, and replace these files. The
@font-face rules live in assets/css/styles.css.

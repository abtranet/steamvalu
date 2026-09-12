# AboutCta

Source selector: `section#get-in-countrol-cta.cc-light`

## Content (real, verbatim)
- H1: "Get in control"
- Paragraph: "It's simple. To see all the possibilities, go to the App Store or Google Play and download the "reference site—digital twin" app."
- Buttons:
  - "Try for free" — `href="https://calendly.com/d/crvw-993-zd8/reference site-trial-setup-call-30-days-free?utm_content=try_for_free"`, opens new tab, white outline pill (`btn.btn-try-for-free.cc-secondary`).
  - "Book Demo" — `href="https://calendly.com/d/cr2r-cbx-n66/reference site-introduction?utm_content=reference site_introduction"`, opens new tab, filled brand-green pill (`btn`, default/primary style — same visual as header's primary CTA).

## Layout
- `.container > .row.row-justify-center > .col.col-lg-6.col-md-8.col-sm-12`, centered text, max-width column (~50%).
- H1: `56px/700`, plain white (NOT gradient — verified: `<h2 class="h1">Get in control</h2>`, no `u-text-gradient` class here, unlike other headings on this page).
- Paragraph: `paragraph-18`, color `rgb(128,128,128)`.
- Button group: `ul.button-group.cc-gap-small` — flex row, small gap, centered, wraps on small screens.

## Interaction model
Static section. Buttons have standard site-wide hover states (already implemented in shared button/Header styles — reuse the same `.btn` Tailwind classes/component used elsewhere in this codebase's shared Header, do not reinvent button styling here).

## Tailwind implementation notes
- `max-w-2xl mx-auto text-center`.
- Reuse whatever Button/pill component pattern the shared Header already established for "Try for free" / "Book Demo" (check `src/components/sites/reference-site/shared/Header.tsx` for the exact classes before writing new ones, to stay visually consistent with the nav's own CTA buttons).

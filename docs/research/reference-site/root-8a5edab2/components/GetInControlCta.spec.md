# Component: Get in control (final CTA)

Section 10. White/light background, narrow centered column, final call-to-action before the footer.

## Real content

- Heading (`.h1`, 56px/700, black): "Get in control"
- Paragraph (grey `#808080`, `paragraph-18`): "It's simple. To see all the possibilities, go to the App Store or Google Play and download the \"reference site—digital twin\" app."
- 2 buttons: "Try for free" (outline/secondary pill — white bg with border per `.btn-try-for-free.cc-secondary` — actually computed as `bg: rgb(58,252,151)` in one context and outline in another depending on section background; on THIS light section it should read as a light/outline button: `border border-black/15 bg-white text-black rounded-full px-6 py-4`), "Book Demo" (solid brand green pill, `bg-brand text-brand-foreground`).

Both link to the same Calendly URLs already defined in shared `Header.tsx` (`TRY_FREE_URL`, `BOOK_DEMO_URL` constants) — import/reuse those constants rather than re-typing the URLs, OR redefine identical local constants if the shared file doesn't export them (check first; prefer importing if exported).

## Layout

- Centered, `max-width: ~500px` (`col-lg-6`), `text-center`, generous vertical section padding (`py-24 md:py-32`).
- Buttons: `flex flex-row gap-4 justify-center flex-wrap` (they sit side by side on all breakpoints per source, wrapping only if truly needed on very narrow screens).

## Interaction model

Static.

## Assets

None beyond icons/buttons already defined.

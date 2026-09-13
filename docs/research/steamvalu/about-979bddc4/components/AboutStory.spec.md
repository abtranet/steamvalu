# AboutStory

Source selector: `section.cc-about-story`

## Content (real, verbatim)

Row 1 (two columns):
- Left (`col-lg-5`, `h4`, white): "We are creating a new market and new way of how people look up, access, and interact with complex information around them."
- Right (`col-lg-6`, gradient paragraph): "We are building a new type of Operating system, an operating system of reality that can be used not only in manufacturing but in healthcare, hospitality, home automation, security, and a multitude of industrial applications."

Row 2 (centered, `col-lg-9`):
- `h2`, bold, gradient: "Our goal? To help our customers to be at the edge of current technology."

Row 3 (two columns):
- Left (`col-lg-5`) — quote card:
  - Quote-mark SVG (42×32, two mirrored quote glyphs, fill = gradient white→`#B6B6B6`, `linearGradient` top-to-bottom) — inline SVG, reproduce exactly (see markup below).
  - Pull-quote (`h5`, gradient): "We are empowering people to self-growth and are helping people to be the best versions of themselves."
  - Author: circular avatar (56px, `/images/people/lubomira-bosanska.jpg`, alt "Lubomira Bosanska") + name "Lubomira Bosanska" (`u-wg-500`, white, 24px) + title "COO" (`paragraph-15`, color `rgb(128,128,128)` grey).
- Right (`col-lg-6`) — two gradient paragraphs:
  1. "This is achieved by providing excellent value to customers and scalability of products provided. We are empowering people to self-growth and are helping people to be the best versions of themselves. Not only professionally but also as humans. We are leading by example and encourage people to improve both mentally and physically."
  2. "We have a strong culture built around decades of experience, that supports teamwork and autonomy. We believe that people are capable of making good decisions and should be encouraged to express their opinions freely. We are a very feedback-driven company, where feedback is not only listened to but is also immediately worked into daily lives, and it works both ways, employees to management and vice versa."

## Quote SVG (exact, extracted from live HTML)
```svg
<svg viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 32V22.4924C0 19.7928 0.529412 17.0344 1.58823 14.2173C2.64706 11.4003 4.04412 8.74461 5.77941 6.25034C7.51471 3.75607 9.39706 1.67262 11.4265 0L19.7206 4.88583C18.0735 7.46814 16.7206 10.1678 15.6618 12.9849C14.6324 15.8019 14.1176 18.9418 14.1176 22.4044V32H0ZM22.2794 32V22.4924C22.2794 19.7928 22.8088 17.0344 23.8676 14.2173C24.9265 11.4003 26.3235 8.74461 28.0588 6.25034C29.7941 3.75607 31.6765 1.67262 33.7059 0L42 4.88583C40.3529 7.46814 39 10.1678 37.9412 12.9849C36.9118 15.8019 36.3971 18.9418 36.3971 22.4044V32H22.2794Z" fill="url(#paint0_linear_617_2644)"/>
<defs>
<linearGradient id="paint0_linear_617_2644" x1="21" y1="0" x2="21" y2="32" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#B6B6B6"/>
</linearGradient>
</defs>
</svg>
```
Rendered width: 42px (`.about-story_quote{width:4.2rem}`).

## Computed styles (live, 1440px)
- Row gap between stacked rows: `grid-row-gap:14rem` (224px) desktop, `8rem` (128px) ≤991px.
- h4 (row1 left): `32px/700/1.18em`, white (no gradient here — verified: only the right column paragraph and the h2/h5/paragraphs elsewhere use gradient; row-1-left h4 has no `u-text-gradient` class).
- Row1 right paragraph: gradient white→`#b6b6b6`, default paragraph size (16px/400 — no explicit size class, base body text).
- h2 ("Our goal?"): `48px/700`, gradient, centered, `<strong>` wraps full text (no visual difference).
- Quote card outer (`.about-story_card`): 1px gradient border via `background-image:linear-gradient(135deg, rgba(255,255,255,.15), rgba(255,255,255,0))` + `padding:1px` + `border-radius:16px` (the classic "gradient border" trick — outer has the gradient bg, inner card sits 1px inset with a solid dark bg so only a 1px gradient sliver shows as a border).
- Quote card inner (`.about-story_card-inner`): `background-image:linear-gradient(#333,#252525)`, `border-radius:16px`, `padding:48px` (desktop) / `32px 24px` (≤767px), flex column, `gap:64px` (desktop) / `40px` (≤767px) — gap here separates the quote block from the author block.
- Pull-quote h5: gradient, `24px/700/1.33em`.
- Author avatar: `56px` circle, `border-radius:50%`, `overflow:hidden`.
- Author name: `24px/500` (`u-wg-500`), white.
- Author title: `paragraph-15`, `rgb(128,128,128)`.
- Right-column culture paragraphs: gradient white→`#b6b6b6`, base paragraph size, `margin-bottom: 4rem (64px)` between the two paragraphs (`u-mb-4` wraps the first).

## Interaction model
Static — no hover/scroll effects.

## Tailwind implementation notes
- Gradient-border card: outer `div` with `p-px rounded-2xl bg-gradient-to-br from-white/[0.15] to-white/0`, inner `div` with `rounded-2xl bg-gradient-to-b from-[#333] to-[#252525] p-12 sm:p-6 flex flex-col gap-16 sm:gap-10`.
- Reuse the shared gradient-text utility class from AboutHero for every gradient string here.

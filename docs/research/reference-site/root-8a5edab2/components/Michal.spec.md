# Component: Meet Michal

Section 9. White background, 2-column desktop (bio+stats+links left, portrait photo right — note source markup has photo second in DOM but visually second column; on mobile the photo comes first via `col-md-first`).

## Real content

- Heading (`.h1`, 56px/700): "Meet Michal"
- Bio paragraph (grey `#808080`, `mb-4.8rem`): "An entrepreneur by heart. Keynote speaker. A sportsman. Doing business since the university, always on top of innovation. Previously in software development, now in the Industry 4.0 field. Bringing digital twins to the world of smart manufacturing."
- 2 stat blocks (stacked vertically, each: big number `100px/700` black + label `500 weight` + grey description):
  1. "100k+" — "Followers" — "Michal is the #15 influencer in innovation worldwide."
  2. "25+" — "Years of experience" — "Ups and downs teach what has value and what does not. Get in touch to find out more."
- 2 text links w/ chevron-right icon: "About us" → `/about`, "Michal's LinkedIn" → `https://www.linkedin.com/in/michalukropec` (external, `target="_blank"`)
- Photo: `michal-ceo.jpg` (1132×1408 portrait), `border-radius` matches card radius token (~2.4rem / `rounded-3xl`).

## Layout

- `grid grid-cols-1 md:grid-cols-2 gap-12 items-start`, container max-width 1132px, `py-16 md:py-24`.
- Mobile: photo first (`order-first md:order-last` on the image column), then heading/bio/stats/links.
- Stats: vertical stack, each with number left-aligned large, label+description to the right at md+ (source used `grid-template-columns: 12.5rem 1fr` at desktop) — implement as `flex gap-6 items-baseline` (number fixed-width column, text column).

## Assets

- `/sites/reference-site/root-8a5edab2/images/michal-ceo.jpg`

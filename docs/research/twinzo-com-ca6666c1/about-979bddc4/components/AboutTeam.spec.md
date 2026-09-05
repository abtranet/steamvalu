# AboutTeam

Source selector: `section.cc-grey-bg`

## Content (real, verbatim) — 6 team members, in this order
| Name | Role | Downloaded image |
|---|---|---|
| Michal Ukropec | CEO | `people/michal-ukropec-2.jpg` |
| Lubomira Bosanska | COO | `people/lubomira-bosanska-2.jpg` |
| Patrik Pasko | CTO | `people/pasko-cb2.png` |
| Tomas Vojtek | CSO | `people/tomas-vojtek.jpg` |
| Michal Celeng | Chief MacGyver Officer | `people/michal-celeng.jpg` |
| Jiri Zila | Head of Sales | `people/jiri-zila.jpg` |

Heading above the grid: "Our team" (`h4`, plain white, not gradient — verified: `<h2 class="h4">Our team</h2>`, no gradient class).

## Layout
- Section background: `rgba(0,0,0,0.031)` over the black page (near-imperceptibly lighter band) — implement as `bg-white/[0.03]`.
- Grid (`about-team_list`): `display:grid; grid-template-columns: 1fr 1fr 1fr; column-gap:24px; row-gap:48px` at desktop. `1fr 1fr` (2 cols) at ≤991px (this is the only breakpoint change — stays 2 cols through mobile too, per source CSS; no 1-column mobile rule was found).
- Each item: photo (`aspect-ratio:1; border-radius:16px; object-fit:cover`, grayscale-looking in the live screenshots — verify: this is NOT a CSS filter, the source photos are naturally desaturated/black-and-white photography, not `grayscale()` — download and use the images as-is, no filter needed) + `margin-top:24px` (`u-mt-2-4`) text block: name (`<p>`, white) then role (`paragraph-18`, appears visually dimmer than the name in the live screenshot — implement role at reduced opacity/tone, e.g. `text-white/70`, to match; exact computed color returned white in one probe which likely reflects a class-order/specificity quirk in the extraction, so trust the screenshot's visual contrast over the single computed-style read for this detail).

## Interaction model
Static grid, no hover states found in source CSS for `.about-team_item`/`.about-team_img`.

## Tailwind implementation notes
- `grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12`.
- Image: `aspect-square rounded-2xl object-cover w-full`.
- Name: `mt-6 text-white` (base body size). Role: `text-white/70` (or `text-base` `paragraph-18` size 18px) below name.

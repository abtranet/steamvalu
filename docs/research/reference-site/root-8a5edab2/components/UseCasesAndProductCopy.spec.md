# Component: UseCases + ProductCopy

Sections 6+7 from PAGE_TOPOLOGY.md. Both static, white background, grouped into one file since ProductCopy is a short plain-text block directly following UseCases with identical text styling (`u-text-gradient01` = grey body copy, computed `rgb(128,128,128)` per `.u-text-grey`).

## Real content — Use cases

- Eyebrow heading (`.h4`, 32px/700): "Use cases"
- Intro paragraph (grey `#808080`, max-width ~col-lg-7): "An operational digital twin has an endless list of use cases—the low-hanging fruit lies in logistics and process optimization. Connect your existing data sources, or use our RTLS (real-time location system), and gain real-time visibility of your factory's material ordering workflow."
- 3 cards, each: square image (424×424, `border-radius: 8px`, `object-fit: cover`), heading (`.subhead`, 24px/500), paragraph (18px), text link with chevron-right icon:
  1. img `usecase-logistics-optimization.jpg`, "Logistics optimization", "RTLS (real-time location service) data show you logistics from a new perspective. Identify waste, utilize your fleet, and save.", link text "Logistics optimization" → `/optimize-internal-logistics`
  2. img `usecase-production-monitoring.jpg`, "Logistics management", "Avoid production micro-stoppages via an Automated Ordering System (AOS). It's Uber, just for a factory.", link text "Logistics management" → `/material-order-automation`
  3. img `usecase-order-automation.jpg`, "Gemba, in 3D", "Have your Gemba Board 24/7 in your pocket. Production, quality, and logistics for all levels of command.", link text "Gemba in 3D" → `/monitor-production`

Note: source `img alt` text and file names are semantically swapped versus card position (alt="internal logistics optimization" on file `logistics-optimization.jpg` used for the "Logistics optimization" card is correct; just double-check card 2 uses `production-monitoring.jpg` with alt "automated material ordering" for the "Logistics management" card, and card 3 uses `order-automation.jpg` with alt "gemba walk in 3D" for "Gemba, in 3D" — reproduce exactly as extracted, do not re-pair by filename semantics).

## Real content — Product copy (plain text, no heading card styling beyond h4/h3)

- H2 (`.h4`): "Live 3D digital twin software for factories and warehouses"
- Paragraph 1: "reference site is a live 3D digital twin of your facility. It combines RTLS location data, IoT sensors, production KPIs, and material flow in one spatially accurate model that runs on phone, tablet, and desktop. Operations, logistics, and plant managers use it to see the shop floor in real time, find waste in internal transport, and act before micro-stoppages hit the line."
- Paragraph 2: "Connect the systems you already run, or deploy reference site RTLS. Typical first use cases are forklift fleet utilization, automated material ordering, and a 3D Gemba board for production, quality, and logistics. Plants using live location and 3D context cut decision time with always-on data and reach ROI in 3–8 months."
- H3 (`.h4`): "See, know, and manage in 3D — anytime, anywhere"
- 4 short paragraphs (See:/Know:/Manage:/pocket line) — reuse the exact See/Know/Manage copy from HeroSteps.spec.md verbatim, plus: "Your factory and your warehouse, in your pocket — on phone, tablet, and desktop."

Both paragraph color: grey `#808080`.

## Layout

- Container max-width 1132px, standard section vertical padding (`py-16 md:py-24`).
- Use cases: intro block max-width ~`60%`/`col-lg-7`; cards grid `grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12` (matches source: 2 cards row 1, 1 card row 2 wrapping — a plain 2-col grid achieves this).
- Product copy: single column, max-width `col-lg-8` (~66%), left-aligned, directly below Use cases with no visual divider (same white background, same section rhythm) — but there SHOULD be reasonable vertical spacing (`mt-16` or its own section padding) since it's a distinct semantic block on the source page.

## Interaction model

Static. Optional subtle fade/slide-up on scroll-into-view for the cards (IntersectionObserver, staggered) — cosmetic only, not required for fidelity but consistent with the rest of the page's reveal language.

## Assets

- `/sites/reference-site/root-8a5edab2/images/usecase-logistics-optimization.jpg`
- `/sites/reference-site/root-8a5edab2/images/usecase-production-monitoring.jpg`
- `/sites/reference-site/root-8a5edab2/images/usecase-order-automation.jpg`
- Chevron icon: `ChevronRightIcon` (added to shared `icons.tsx`)

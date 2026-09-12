# Language toggle specification

## Overview

- Targets: shared site chrome and all homepage sections.
- Interaction model: click-driven client-side language switch.
- Default language: French (`fr`).
- Alternate language: English (`en`).

## Behavior

- Render a compact `FR / EN` control in the desktop navigation and mobile menu.
- The active language is visually emphasized and exposed with `aria-pressed`.
- Switching language updates the shared navigation, footer, hero, workflow overlay, devices section, metrics, types, use cases, rollout, demo overview, and final CTA without navigation or page reload.
- Persist the selection in `localStorage` and synchronize `document.documentElement.lang`.
- Initial server/client render remains French to avoid hydration differences.

## Metrics translations

### French default

- `35%` — `Gain de temps` — `Prenez des décisions beaucoup plus rapidement grâce aux données en temps réel.`
- `3–8` — `Mois de retour sur investissement` — `Des informations directes pour un retour rapide sur votre investissement.`

### English

- `35%` — `Time savings` — `Make decisions much faster thanks to real-time data.`
- `3–8` — `Months ROI` — `Direct insights leading to fast return of your invested money.`

## Responsive behavior

- Desktop: place the toggle before the primary demo button.
- Mobile: place a full-width language selector above the bottom CTA buttons.

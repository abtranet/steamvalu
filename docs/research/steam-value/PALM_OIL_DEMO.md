# Palm oil factory demo

The `/demo` route is a standalone, full-screen Three.js / React Three Fiber viewer. Marketing pages retain their existing header and footer. The existing source project's procedural factory geometry was adapted into a browser-rendered palm oil process model; no realvirtual source code or assets are bundled.

## Reference

- Visual direction: https://web.realvirtual.io/demo
- Published reference screenshot and HMI explanation: https://realvirtual.io/en/blog/realvirtual-in-the-browser-3d-hmi/
- Palm oil processing sequence: https://www.fao.org/4/y4355e/y4355e04.htm
- Geometry starting point: `STEAM VALUE_Aboubacar_Traore/steam-value-demo/src/components/Factory3D.tsx`.

The connected browser was unavailable during initial inspection, so the official screenshot and documentation informed the viewer layout. This is an independently implemented interpretation, not a pixel-exact clone of the live viewer.

## Interaction

- Orbit, pan, zoom; perspective, top, and front camera presets; camera reset.
- Select process equipment from the scene, labels, explorer, or process strip.
- Inspect equipment readings and focus the camera on the selected equipment.
- Pause/resume, reset, and 0.5× / 1× / 2× / 4× simulation speed.
- Toggle grid and equipment labels.
- Simulate steam pressure loss, press overload, or clarification temperature drift. Affected stages and plant indicators reflect the selected scenario; alarms can be acknowledged or cleared.
- Full-screen control where supported; responsive equipment drawer on smaller screens.

## Scope

Seven representative process units: fresh-fruit reception, sterilisation, threshing, digestion/pressing, clarification, crude-oil storage, and biomass boiler/steam supply. The model illustrates a process layout rather than an engineered plant design. Readings, rates, thresholds, and effects are illustrative local simulation data, not operating instructions or live telemetry. No PLC connection or backend is required. A WebGL error fallback preserves access to the interface and simulation.

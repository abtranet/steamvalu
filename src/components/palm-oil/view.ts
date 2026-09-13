export type DemoView = "dashboard" | "3d";

/** The single place that maps a `view` query value onto a demo view. */
export function parseDemoView(value: string | string[] | undefined | null): DemoView | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "3d" || raw === "3D") return "3d";
  if (raw === "dashboard" || raw === "2d") return "dashboard";
  return null;
}

/** Canonical link for an entry point that must land straight in the 3D plant. */
export const PLANT_3D_HREF = "/demo?view=3d";

/** The only way into the 2D dashboard: every other demo link opens in 3D. */
export const DEMO_DASHBOARD_HREF = "/demo?view=dashboard";

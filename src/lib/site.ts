/**
 * Single source of truth for site identity, canonical URLs and external
 * destinations. Metadata, JSON-LD, sitemap and robots all read from here so the
 * canonical host is declared in exactly one place.
 */

/**
 * Canonical origin, no trailing slash.
 *
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment. The localhost
 * fallback keeps `next build` working locally, where absolute metadata URLs
 * would otherwise fail to resolve.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "SteamValu";

export const SITE_TAGLINE =
  "Real-Time 3D Digital Twin for Factories & Warehouses";

export const SITE_DESCRIPTION =
  "See your factory floor live in 3D. SteamValu tracks forklifts, assets and people in real time so you can cut fleet costs and idle time. Book a free demo.";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * External destinations.
 *
 * TODO(steamvalu): the booking, app-store and social links below still point at
 * the accounts of the site this layout was derived from. They are kept live so
 * the conversion path is not broken, but each needs to be repointed at a
 * SteamValu-owned account before launch. Replacing them here updates every
 * usage across the site.
 */
export const BOOK_DEMO_URL =
  "https://calendly.com/d/cr2r-cbx-n66/twinzo-introduction?utm_content=twinzo_introduction";

export const TRY_FREE_URL =
  "https://calendly.com/d/crvw-993-zd8/twinzo-trial-setup-call-30-days-free?utm_content=try_for_free";

export const EXPERT_SESSION_URL =
  "https://calendly.com/d/cv66-765-hyx/book-your-free-expert-session?utm_content=expert_session";

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/twinzo-digital-twin/id1561970281";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=eu.twinzo.digitaltwin";

export const WINDOWS_APP_URL =
  "https://twinzo.sharepoint.com/:f:/s/Publicdocumentation/EtQS6MEQ9IJNroIfJ6sxFt4BrWAGMDey1pyOUO2AZtGNyQ?e=vjzCOV";

export const LINKEDIN_URL = "https://www.linkedin.com/company/steamvalu";

export const YOUTUBE_URL = "https://www.youtube.com/@steamvalu";

/** SteamValu-operated subdomains. */
export const PLATFORM_URL = "https://platform.steamvalu.com/login";
export const PARTNER_PORTAL_URL = "https://partner.steamvalu.com/";
export const HELPDESK_URL =
  "https://partner.steamvalu.com/helpdesk/customer-care-1";
export const DOCS_URL = "https://docs.steamvalu.com/";
export const REST_API_DOCS_URL = "https://docs.steamvalu.com/rest-api";

/** Profiles emitted as `sameAs` in Organization JSON-LD. */
export const SOCIAL_PROFILES = [LINKEDIN_URL, YOUTUBE_URL];

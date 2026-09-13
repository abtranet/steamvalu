import type { Metadata } from "next";
import { WHATSAPP_DISPLAY } from "./contact";
import { PAGE_SEO, type PageKey } from "./seo-pages";
import { SITE_URL } from "./site";

const BRAND = "STEAM VALUE™";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Title, description, canonical URL and social cards for one page. */
export function pageMetadata(key: PageKey): Metadata {
  const { path, title, description } = PAGE_SEO[key];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: BRAND, locale: "fr_FR", url: path, title, description },
    twitter: { card: "summary", title, description },
  };
}

/** Organization, website and product entities shared by every page. */
export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "GFID",
      url: SITE_URL,
      logo: `${SITE_URL}/steam-value-logo.svg`,
      brand: { "@type": "Brand", name: BRAND },
      contactPoint: [{ "@type": "ContactPoint", contactType: "sales", telephone: WHATSAPP_DISPLAY, availableLanguage: ["French", "English"] }],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND,
      inLanguage: "fr-FR",
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: BRAND,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      inLanguage: "fr-FR",
      description: PAGE_SEO.home.description,
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

/** Home → page breadcrumb for an inner page. */
export function breadcrumbJsonLd(key: PageKey) {
  const page = PAGE_SEO[key];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: PAGE_SEO.home.breadcrumb, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: page.breadcrumb, item: `${SITE_URL}${page.path}` },
    ],
  };
}

/** FAQPage entity; the questions must match the FAQ shown on the page. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

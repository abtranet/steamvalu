"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** Records demo and WhatsApp link clicks site-wide as GA4 events, without instrumenting each link. */
export function CtaTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.getAttribute("href") ?? "";
      const text = (link.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 80);
      if (href.startsWith("/demo")) {
        trackEvent("select_content", { content_type: "demo", item_id: href, link_text: text, page_path: window.location.pathname });
      } else if (href.includes("wa.me/")) {
        trackEvent("generate_lead", { method: "whatsapp", page_path: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

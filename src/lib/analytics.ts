type EventParams = Record<string, string | number | boolean>;
type Gtag = (command: "event", name: string, params?: EventParams) => void;

/** Sends a GA4 event. The tag only loads on production, so this is a no-op elsewhere. */
export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  (window as Window & { gtag?: Gtag }).gtag?.("event", name, params);
}

/** Window event the contact widget listens for, so any button can open it. */
export const OPEN_CONTACT_EVENT = "steamvalue:open-contact";

export function openContact(source: string) {
  trackEvent("contact_open", { source });
  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_EVENT));
}

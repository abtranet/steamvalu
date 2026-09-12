/**
 * Contact channel configuration.
 *
 * The WhatsApp number is public by design — it is the number on the business
 * card. The destination email address is deliberately NOT here: it lives in
 * `src/app/api/contact/route.ts`, which only ever runs on the server, so it
 * never reaches the browser, the HTML or the JavaScript bundle.
 */

/** Business WhatsApp number in international format, digits only. */
export const WHATSAPP_NUMBER = "2250712997210";

/** Human-readable form of the same number. */
export const WHATSAPP_DISPLAY = "+225 07 12 99 72 10";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const CONTACT_LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  message: 4000,
} as const;

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  /** Honeypot: a real person never fills this in. */
  website?: string;
};

/** Shared validation so the form and the route agree on what is acceptable. */
export function validateContact(payload: Partial<ContactPayload>): string[] {
  const errors: string[] = [];
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (name.length < 2) errors.push("name");
  if (name.length > CONTACT_LIMITS.name) errors.push("name");
  // Deliberately permissive: the server is not the place to relitigate RFC 5322.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > CONTACT_LIMITS.email) errors.push("email");
  if (message.length < 10) errors.push("message");
  if (message.length > CONTACT_LIMITS.message) errors.push("message");
  if ((payload.company?.length ?? 0) > CONTACT_LIMITS.company) errors.push("company");

  return [...new Set(errors)];
}

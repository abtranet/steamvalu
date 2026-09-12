import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";

/**
 * Contact form endpoint.
 *
 * This module is server-only, which is the whole point: the destination
 * address is read here and never serialised to the client, so it does not
 * appear in the page, the HTML source or the JavaScript bundle.
 *
 * Configure with environment variables:
 *   CONTACT_TO_EMAIL    destination (defaults to the sales address)
 *   CONTACT_FROM_EMAIL  verified sender for the mail provider
 *   RESEND_API_KEY      provider credential; without it the endpoint reports
 *                       that email is unavailable rather than pretending to send
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO = process.env.CONTACT_TO_EMAIL ?? "sales@globalsabt.com";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "STEAM VALUE <onboarding@resend.dev>";
const API_KEY = process.env.RESEND_API_KEY;

function textBody(payload: ContactPayload) {
  return [
    `Nom      : ${payload.name}`,
    `Email    : ${payload.email}`,
    payload.company ? `Société  : ${payload.company}` : null,
    "",
    payload.message,
    "",
    "—",
    "Envoyé depuis le formulaire de contact steamvalu.vercel.app",
  ].filter(Boolean).join("\n");
}

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: silently accept so a bot gets no signal about what tripped it.
  if (payload.website) return NextResponse.json({ ok: true });

  const errors = validateContact(payload);
  if (errors.length > 0) {
    return NextResponse.json({ error: "invalid_fields", fields: errors }, { status: 422 });
  }

  const clean: ContactPayload = {
    name: payload.name!.trim(),
    email: payload.email!.trim(),
    company: payload.company?.trim() || undefined,
    message: payload.message!.trim(),
  };

  if (!API_KEY) {
    // Be honest rather than showing a success state for mail nobody sent.
    console.error("[contact] RESEND_API_KEY is not set — the message was not delivered.", {
      from: clean.email,
      at: new Date().toISOString(),
    });
    return NextResponse.json({ error: "email_unavailable" }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: clean.email,
        subject: `Contact STEAM VALUE — ${clean.name}${clean.company ? ` (${clean.company})` : ""}`,
        text: textBody(clean),
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error("[contact] provider rejected the message", response.status, await response.text());
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] could not reach the mail provider", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}

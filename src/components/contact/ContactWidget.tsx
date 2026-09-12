"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Loader2, Mail, X } from "lucide-react";
import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";
import { CONTACT_LIMITS, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

/** WhatsApp glyph, used only to label a link to the business number. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

const COPY = {
  fr: {
    open: "Nous contacter",
    close: "Fermer le formulaire de contact",
    title: "Parlons de votre site industriel",
    intro: "Écrivez-nous sur WhatsApp pour une réponse rapide, ou laissez un message et nous vous répondons par email.",
    whatsapp: "Écrire sur WhatsApp",
    whatsappHint: `Réponse la plus rapide · ${WHATSAPP_DISPLAY}`,
    or: "ou",
    name: "Nom",
    email: "Email",
    company: "Société (facultatif)",
    message: "Votre message",
    messagePlaceholder: "Décrivez brièvement votre site, vos équipements et ce que vous cherchez à observer.",
    send: "Envoyer le message",
    sending: "Envoi en cours…",
    sent: "Message envoyé. Nous revenons vers vous rapidement.",
    another: "Envoyer un autre message",
    errorFields: "Vérifiez les champs signalés.",
    errorSend: "L’envoi a échoué. Réessayez, ou écrivez-nous sur WhatsApp.",
    errorUnavailable: "Le formulaire email n’est pas encore actif. Écrivez-nous sur WhatsApp en attendant.",
    invalidName: "Indiquez votre nom.",
    invalidEmail: "Indiquez une adresse email valide.",
    invalidMessage: "Votre message doit faire au moins 10 caractères.",
    whatsappPrefill: "Bonjour, je découvre STEAM VALUE et je souhaite en savoir plus.",
  },
  en: {
    open: "Contact us",
    close: "Close the contact form",
    title: "Let’s talk about your plant",
    intro: "Message us on WhatsApp for the quickest reply, or leave a note and we will answer by email.",
    whatsapp: "Message on WhatsApp",
    whatsappHint: `Fastest reply · ${WHATSAPP_DISPLAY}`,
    or: "or",
    name: "Name",
    email: "Email",
    company: "Company (optional)",
    message: "Your message",
    messagePlaceholder: "Briefly describe your site, your equipment, and what you are trying to see.",
    send: "Send message",
    sending: "Sending…",
    sent: "Message sent. We will get back to you shortly.",
    another: "Send another message",
    errorFields: "Please check the highlighted fields.",
    errorSend: "Sending failed. Try again, or message us on WhatsApp.",
    errorUnavailable: "The email form is not live yet. Please use WhatsApp in the meantime.",
    invalidName: "Please enter your name.",
    invalidEmail: "Please enter a valid email address.",
    invalidMessage: "Your message needs at least 10 characters.",
    whatsappPrefill: "Hello, I came across STEAM VALUE and would like to know more.",
  },
} as const;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactWidget() {
  const { language } = useLanguage();
  const copy = COPY[language];

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorKey, setErrorKey] = useState<"fields" | "send" | "unavailable" | null>(null);
  const [invalid, setInvalid] = useState<string[]>([]);

  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const opener = trigger.current;
    firstField.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = panel.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([type="hidden"]), textarea',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [open]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    const problems: string[] = [];
    if (payload.name.trim().length < 2) problems.push("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email.trim())) problems.push("email");
    if (payload.message.trim().length < 10) problems.push("message");
    if (problems.length > 0) {
      setInvalid(problems);
      setStatus("error");
      setErrorKey("fields");
      panel.current?.querySelector<HTMLElement>(`[name="${problems[0]}"]`)?.focus();
      return;
    }

    setInvalid([]);
    setStatus("sending");
    setErrorKey(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      const body = await response.json().catch(() => ({}));
      setStatus("error");
      setErrorKey(response.status === 503 ? "unavailable" : body?.error === "invalid_fields" ? "fields" : "send");
      if (Array.isArray(body?.fields)) setInvalid(body.fields);
    } catch {
      setStatus("error");
      setErrorKey("send");
    }
  }

  const fieldError = (field: string) => invalid.includes(field);
  const inputClass = (field: string) =>
    cn(
      "w-full rounded-lg border bg-white px-3 py-2.5 text-[15px] text-[#102d40] outline-none transition-colors",
      "placeholder:text-[#8aa0ae] focus-visible:border-[#0d4a72] focus-visible:ring-2 focus-visible:ring-[#0d4a72]/25",
      fieldError(field) ? "border-[#c0392b]" : "border-[#cbd9e2]",
    );

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => { setOpen((value) => !value); setStatus("idle"); setErrorKey(null); }}
        aria-expanded={open}
        aria-controls="contact-panel"
        aria-label={open ? copy.close : copy.open}
        className={cn(
          "fixed right-4 bottom-4 z-[1050] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_28px_rgba(7,94,84,0.35)]",
          "transition-transform duration-200 hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100",
          "focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#078aa4] sm:right-6 sm:bottom-6",
          open ? "bg-[#0d4a72]" : "bg-[#25d366]",
        )}
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <WhatsAppIcon className="h-7 w-7" />}
      </button>

      {open && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[1040] cursor-default bg-[#081b29]/45 backdrop-blur-[2px] sm:bg-transparent sm:backdrop-blur-0"
          />
          <div
            ref={panel}
            id="contact-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              "fixed z-[1045] overflow-y-auto overscroll-contain rounded-2xl border border-[#d3e0e8] bg-white shadow-[0_24px_60px_rgba(8,27,41,0.25)]",
              "inset-x-3 bottom-[88px] max-h-[calc(100dvh-120px)]",
              "sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[380px]",
            )}
          >
            <div className="p-5 sm:p-6">
              <h2 id={titleId} className="pr-6 text-[19px] leading-snug font-semibold tracking-[-0.02em] text-[#102d40]">
                {copy.title}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-[#526a7b]">{copy.intro}</p>

              <a
                href={whatsappLink(copy.whatsappPrefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-[#25d366] px-4 py-3 text-[15px] font-semibold text-[#06301f] transition-colors hover:bg-[#1fbb59] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#078aa4]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {copy.whatsapp}
              </a>
              <p className="mt-1.5 text-center text-[12px] text-[#6b8496]">{copy.whatsappHint}</p>

              <div className="my-4 flex items-center gap-3 text-[12px] tracking-[0.12em] text-[#8aa0ae] uppercase">
                <span className="h-px flex-1 bg-[#dde7ed]" />
                {copy.or}
                <span className="h-px flex-1 bg-[#dde7ed]" />
              </div>

              {status === "sent" ? (
                <div className="rounded-lg border border-[#a7d8c4] bg-[#eefaf4] p-4 text-center" role="status">
                  <Mail className="mx-auto h-5 w-5 text-[#137a52]" aria-hidden="true" />
                  <p className="mt-2 text-[14px] leading-relaxed text-[#0f5c3f]">{copy.sent}</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-3 min-h-11 text-[14px] font-semibold text-[#0d4a72] underline underline-offset-4"
                  >
                    {copy.another}
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
                  {/* Honeypot — hidden from people and from assistive technology. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute h-px w-px -translate-x-[9999px] opacity-0"
                  />

                  <label className="flex flex-col gap-1.5 text-[13px] font-medium text-[#33566b]">
                    {copy.name}
                    <input
                      ref={firstField}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      maxLength={CONTACT_LIMITS.name}
                      aria-invalid={fieldError("name") || undefined}
                      className={inputClass("name")}
                    />
                    {fieldError("name") && <span className="text-[12px] font-normal text-[#c0392b]">{copy.invalidName}</span>}
                  </label>

                  <label className="flex flex-col gap-1.5 text-[13px] font-medium text-[#33566b]">
                    {copy.email}
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      maxLength={CONTACT_LIMITS.email}
                      aria-invalid={fieldError("email") || undefined}
                      className={inputClass("email")}
                    />
                    {fieldError("email") && <span className="text-[12px] font-normal text-[#c0392b]">{copy.invalidEmail}</span>}
                  </label>

                  <label className="flex flex-col gap-1.5 text-[13px] font-medium text-[#33566b]">
                    {copy.company}
                    <input
                      name="company"
                      type="text"
                      autoComplete="organization"
                      maxLength={CONTACT_LIMITS.company}
                      className={inputClass("company")}
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-[13px] font-medium text-[#33566b]">
                    {copy.message}
                    <textarea
                      name="message"
                      required
                      rows={4}
                      maxLength={CONTACT_LIMITS.message}
                      placeholder={copy.messagePlaceholder}
                      aria-invalid={fieldError("message") || undefined}
                      className={cn(inputClass("message"), "resize-y")}
                    />
                    {fieldError("message") && <span className="text-[12px] font-normal text-[#c0392b]">{copy.invalidMessage}</span>}
                  </label>

                  {status === "error" && errorKey && (
                    <p role="alert" className="rounded-lg border border-[#e8b4ad] bg-[#fdf1ef] px-3 py-2 text-[13px] leading-relaxed text-[#8e2f23]">
                      {errorKey === "fields" ? copy.errorFields : errorKey === "unavailable" ? copy.errorUnavailable : copy.errorSend}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0d4a72] px-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#083450] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#078aa4]"
                  >
                    {status === "sending" && <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />}
                    {status === "sending" ? copy.sending : copy.send}
                  </button>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

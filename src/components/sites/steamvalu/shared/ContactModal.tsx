"use client";

import { useState } from "react";
import { CheckIcon, CloseIcon } from "./icons";

export function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[520px] rounded-[24px] bg-white p-8 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-6 top-6 text-black"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-medium">Contact us</h2>
              <p className="mt-2 text-sm text-black/60">
                Contact us about anything related to our company or services.
                We&apos;ll do our best to get back to you as soon as
                possible.
              </p>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <Field label="Name" placeholder="Your company name" required />
              <Field
                label="Phone"
                type="tel"
                placeholder="Your phone number"
                required
              />
              <Field
                label="Email"
                type="email"
                placeholder="Your email"
                required
              />
              <Field label="Company" placeholder="Your name" required />
              <Field label="Subject" placeholder="Your name" required />
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  You want to become
                </label>
                <select
                  required
                  className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm"
                  defaultValue="Customer"
                >
                  <option value="Customer">Customer</option>
                  <option value="Partner">Partner</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Country</label>
                <select
                  required
                  className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm"
                  defaultValue=""
                >
                  <option value="">Select country...</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Your Question</label>
                <textarea
                  required
                  maxLength={5000}
                  rows={4}
                  className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-brand px-6 py-3.5 text-base font-medium text-brand-foreground"
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckIcon className="h-7 w-7 text-brand" />
            <h3 className="text-lg font-medium">Thank you</h3>
            <p className="text-sm text-black/60">
              Your message has been received. We&apos;ll get back to you as
              soon as possible.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm placeholder:text-black/40"
      />
    </div>
  );
}

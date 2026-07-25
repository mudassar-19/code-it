"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

type Fields = {
  name: string;
  email: string;
  message: string;
};

const EMPTY_FIELDS: Fields = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-600">{message}</p>;
}

const inputClasses = (hasError: boolean) =>
  `rounded-xl border px-4 py-2.5 text-navy outline-none transition-[border-color,box-shadow] duration-250 focus:border-primary-blue focus:ring-4 focus:ring-light-cyan/40 ${
    hasError ? "border-red-400" : "border-light-teal"
  }`;

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  function updateField<K extends keyof Fields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};
    if (fields.name.trim().length < 2) {
      nextErrors.name = "Enter your name.";
    }
    if (!EMAIL_PATTERN.test(fields.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (fields.message.trim().length < 10) {
      nextErrors.message = "Give us a few more details (at least 10 characters).";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fields.name,
          email: fields.email,
          description: fields.message,
          source: "contact-form",
          honeypot,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setSubmitError(result?.error ?? "Something went wrong. Please try again.");
        if (result?.fieldErrors) {
          const flattened: Record<string, string> = {};
          const fieldMap: Record<string, keyof Fields> = {
            fullName: "name",
            email: "email",
            description: "message",
          };
          for (const [key, messages] of Object.entries(result.fieldErrors)) {
            const mapped = fieldMap[key];
            if (mapped && Array.isArray(messages) && messages[0]) {
              flattened[mapped] = messages[0];
            }
          }
          setErrors((prev) => ({ ...prev, ...flattened }));
        }
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-2xl border border-teal/40 bg-white p-8 text-center shadow-card"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-light-teal text-teal">
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-navy">
          Message sent — thanks, {fields.name.split(" ")[0] || "there"}.
        </h3>
        <p className="mt-2 text-sm text-navy/70">
          We&apos;ll get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-light-teal bg-white p-8 shadow-soft"
    >
      {/* Honeypot: hidden from real users. See app/api/lead/route.ts. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Leave this field blank</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-navy">
          Name
        </label>
        <input
          id="contact-name"
          value={fields.name}
          onChange={(event) => updateField("name", event.target.value)}
          className={inputClasses(!!errors.name)}
        />
        <FieldError message={errors.name} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium text-navy">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={fields.email}
          onChange={(event) => updateField("email", event.target.value)}
          className={inputClasses(!!errors.email)}
        />
        <FieldError message={errors.email} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          className={inputClasses(!!errors.message)}
        />
        <FieldError message={errors.message} />
      </div>

      {submitError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-8 py-3 text-center font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 disabled:hover:brightness-100"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

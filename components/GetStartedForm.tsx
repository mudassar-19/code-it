"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, Loader2 } from "lucide-react";
import { industries } from "@/lib/industries";
import { industryIcons } from "@/lib/industryIcons";
import { getIndustryQuestions } from "@/lib/industryQuestions";

type Step = "industry" | "details" | "success";

type CommonFields = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  description: string;
};

const EMPTY_COMMON_FIELDS: CommonFields = {
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  description: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-.\s]{7,}$/;

const STEP_LABELS: { key: Step; label: string }[] = [
  { key: "industry", label: "Industry" },
  { key: "details", label: "Your Details" },
  { key: "success", label: "Done" },
];

function ProgressBar({ step }: { step: Step }) {
  const currentIndex = STEP_LABELS.findIndex((s) => s.key === step);

  return (
    <div className="mb-8 flex items-center" aria-label="Form progress">
      {STEP_LABELS.map((item, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === STEP_LABELS.length - 1;

        return (
          <div key={item.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-300 ${
                  isComplete
                    ? "border-teal bg-teal text-white"
                    : isCurrent
                      ? "border-teal text-teal"
                      : "border-light-teal text-navy/40"
                }`}
              >
                {isComplete ? <Check className="h-4 w-4" strokeWidth={2.5} /> : index + 1}
              </div>
              <span
                className={`text-xs font-medium ${
                  isCurrent || isComplete ? "text-navy" : "text-navy/40"
                }`}
              >
                {item.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`mx-2 mb-5 h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                  isComplete ? "bg-teal" : "bg-light-teal"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-error">{message}</p>;
}

const inputClasses = (hasError: boolean) =>
  `rounded-xl border bg-card px-4 py-2.5 text-navy outline-none placeholder:text-text-disabled transition-[border-color,box-shadow] duration-250 focus:border-primary-blue focus:ring-4 focus:ring-light-cyan/40 ${
    hasError ? "border-error" : "border-light-teal"
  }`;

export default function GetStartedForm() {
  const searchParams = useSearchParams();
  const preselectedIndustry = searchParams.get("industry") ?? "";
  const hasValidPreselect = industries.some(
    (industry) => industry.slug === preselectedIndustry,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<Step>(
    hasValidPreselect ? "details" : "industry",
  );
  const [selectedIndustry, setSelectedIndustry] = useState(
    hasValidPreselect ? preselectedIndustry : "",
  );
  const [fields, setFields] = useState<CommonFields>(EMPTY_COMMON_FIELDS);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const selectedIndustryData = useMemo(
    () => industries.find((industry) => industry.slug === selectedIndustry),
    [selectedIndustry],
  );
  const questions = useMemo(
    () => getIndustryQuestions(selectedIndustry),
    [selectedIndustry],
  );

  function updateField<K extends keyof CommonFields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function updateAnswer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  }

  function handleSelectIndustry(slug: string) {
    setSelectedIndustry(slug);
    setAnswers({});
    setErrors((prev) => ({ ...prev, industry: "" }));
  }

  function goToDetails() {
    if (!selectedIndustry) {
      setErrors((prev) => ({ ...prev, industry: "Select an industry to continue." }));
      return;
    }
    setStep("details");
  }

  function validateDetails(): boolean {
    const nextErrors: Record<string, string> = {};

    if (fields.fullName.trim().length < 2) {
      nextErrors.fullName = "Enter your full name.";
    }
    if (!EMAIL_PATTERN.test(fields.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!PHONE_PATTERN.test(fields.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (fields.businessName.trim().length < 1) {
      nextErrors.businessName = "Enter your business name.";
    }
    if (fields.description.trim().length < 10) {
      nextErrors.description = "Give us a few more details (at least 10 characters).";
    }
    for (const question of questions) {
      if (!answers[question.id]?.trim()) {
        nextErrors[question.id] = "This field is required.";
      }
    }

    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateDetails()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: selectedIndustry,
          ...fields,
          answers,
          source: "get-started-form",
          honeypot,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setSubmitError(
          result?.error ?? "Something went wrong. Please try again.",
        );
        if (result?.fieldErrors) {
          const flattened: Record<string, string> = {};
          for (const [key, messages] of Object.entries(result.fieldErrors)) {
            if (Array.isArray(messages) && messages[0]) flattened[key] = messages[0];
          }
          setErrors((prev) => ({ ...prev, ...flattened }));
        }
        return;
      }

      setStep("success");
      requestAnimationFrame(() => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setSubmitError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div ref={containerRef} className="mx-auto mt-10 w-full max-w-2xl scroll-mt-header">
      {step !== "success" && <ProgressBar step={step} />}

      <AnimatePresence mode="wait">
        {step === "industry" && (
          <motion.div
            key="industry"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-2xl border border-light-teal bg-card p-8 shadow-soft"
          >
            <h3 className="font-display text-lg font-semibold text-navy">
              What industry is your business in?
            </h3>
            <p className="mt-1 text-sm text-navy/70">
              We&apos;ll tailor a few questions to your industry next.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {industries.map((industry) => {
                const Icon = industryIcons[industry.icon];
                const isSelected = industry.slug === selectedIndustry;
                return (
                  <button
                    key={industry.slug}
                    type="button"
                    onClick={() => handleSelectIndustry(industry.slug)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-colors duration-200 ${
                      isSelected
                        ? "border-teal bg-light-teal/40"
                        : "border-light-teal hover:border-bright-cyan/50"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`h-6 w-6 ${isSelected ? "text-teal" : "text-navy/60"}`}
                        strokeWidth={2}
                      />
                    )}
                    <span className="text-xs font-medium leading-tight text-navy">
                      {industry.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <FieldError message={errors.industry} />

            <button
              type="button"
              onClick={goToDetails}
              className="mt-6 w-full rounded-2xl bg-brand-gradient px-8 py-3 text-center font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.02] hover:brightness-110 sm:w-fit"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === "details" && (
          <motion.form
            key="details"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-2xl border border-light-teal bg-card p-8 shadow-soft"
            noValidate
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-navy/70">
                Industry:{" "}
                <span className="font-semibold text-navy">
                  {selectedIndustryData?.name}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setStep("industry")}
                className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:text-bright-cyan"
              >
                <ChevronLeft className="h-4 w-4" /> Change
              </button>
            </div>

            {/* Honeypot: hidden from real users, left blank by them. Bots that
                fill every field in the DOM trip this and get silently no-op'd
                server-side. See app/api/lead/route.ts. */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="website">Leave this field blank</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-sm font-medium text-navy">
                  Full Name
                </label>
                <input
                  id="fullName"
                  value={fields.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  className={inputClasses(!!errors.fullName)}
                />
                <FieldError message={errors.fullName} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-navy">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={fields.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className={inputClasses(!!errors.email)}
                />
                <FieldError message={errors.email} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-medium text-navy">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={fields.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className={inputClasses(!!errors.phone)}
                />
                <FieldError message={errors.phone} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="businessName" className="text-sm font-medium text-navy">
                  Business Name
                </label>
                <input
                  id="businessName"
                  value={fields.businessName}
                  onChange={(event) => updateField("businessName", event.target.value)}
                  className={inputClasses(!!errors.businessName)}
                />
                <FieldError message={errors.businessName} />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="description" className="text-sm font-medium text-navy">
                  Brief description of what you need
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={fields.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  className={inputClasses(!!errors.description)}
                />
                <FieldError message={errors.description} />
              </div>
            </div>

            {questions.length > 0 && (
              <div className="mt-6 border-t border-light-teal pt-6">
                <h4 className="text-sm font-semibold text-navy">
                  A few quick questions about your {selectedIndustryData?.name.toLowerCase()} business
                </h4>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {questions.map((question) => (
                    <div key={question.id} className="flex flex-col gap-1.5">
                      <label htmlFor={question.id} className="text-sm font-medium text-navy">
                        {question.label}
                      </label>
                      {question.type === "select" ? (
                        <select
                          id={question.id}
                          value={answers[question.id] ?? ""}
                          onChange={(event) => updateAnswer(question.id, event.target.value)}
                          className={inputClasses(!!errors[question.id])}
                        >
                          <option value="">Select an option</option>
                          {question.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={question.id}
                          type="text"
                          placeholder={question.placeholder}
                          value={answers[question.id] ?? ""}
                          onChange={(event) => updateAnswer(question.id, event.target.value)}
                          className={inputClasses(!!errors[question.id])}
                        />
                      )}
                      <FieldError message={errors[question.id]} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {submitError && (
              <div className="mt-6 rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                {submitError}
              </div>
            )}

            <div className="mt-8 flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-8 py-3 text-center font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 disabled:hover:brightness-100"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </motion.form>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-2xl border border-teal/40 bg-card p-8 text-center shadow-card"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-light-teal text-teal">
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-navy">
              Thanks, {fields.fullName.split(" ")[0] || "there"} — we&apos;ll be in touch shortly.
            </h3>
            <p className="mt-2 text-navy/70">
              A member of the CodeIT team will review your {selectedIndustryData?.name.toLowerCase()}{" "}
              details and reach out to talk through a plan. Check your email for a confirmation.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

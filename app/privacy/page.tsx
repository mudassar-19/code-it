import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { brand } from "@/lib/theme";
import { contactInfo } from "@/lib/contact";

export const metadata: Metadata = {
  title: `Privacy Policy | ${brand.name}`,
  description: `How ${brand.name} collects, uses, and protects your information.`,
};

// PLACEHOLDER / TEMPLATE PRIVACY POLICY.
// Generic, editable boilerplate covering the standard sections a privacy
// policy needs (data collection, cookies, third-party services, contact).
// It is not a substitute for legal advice — have this reviewed by a
// qualified attorney before launch, and fill in the "[ ]" details once
// they're finalized (effective date, jurisdiction, specific vendors, etc.).
export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="bg-navy-deep px-6 pb-16 pt-32 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-white/70">
            Effective date: [To be set at launch]
          </p>
        </div>
      </section>

      <section className="bg-section px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start gap-3 rounded-2xl border-2 border-dashed border-orange/40 bg-orange/5 p-5">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 flex-none text-orange"
              strokeWidth={2}
            />
            <p className="text-sm text-navy/80">
              This is placeholder template text meant to illustrate the shape
              of a privacy policy, not a finished legal document. Please have
              this page reviewed — and customized to your actual data
              practices, vendors, and jurisdiction — by a qualified attorney
              before launch.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-10 text-navy/80">
            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Introduction
              </h2>
              <p className="mt-3 leading-relaxed">
                {brand.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                respects your privacy. This Privacy Policy explains what
                information we collect when you visit our website or submit a
                form, how we use it, and the choices available to you.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Information We Collect
              </h2>
              <p className="mt-3 leading-relaxed">
                We collect information you provide directly to us, such as
                your name, email address, phone number, business name, and
                any details you share through our &quot;Get Started&quot; or
                Contact forms. We also automatically collect limited
                technical information — such as browser type, device
                information, and pages visited — to help us understand how
                our site is used.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Cookies &amp; Similar Technologies
              </h2>
              <p className="mt-3 leading-relaxed">
                We may use cookies and similar tracking technologies to keep
                our site functioning properly, remember your preferences, and
                understand how visitors interact with our pages. You can
                usually adjust your browser settings to refuse cookies,
                though some parts of the site may not function as intended if
                you do.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Third-Party Services
              </h2>
              <p className="mt-3 leading-relaxed">
                We use a small number of third-party service providers to
                operate our business — for example, to send transactional
                emails, schedule consultations, and manage customer
                relationships. These providers only receive the information
                needed to perform their function and are not permitted to
                use it for their own marketing purposes. [List of specific
                third-party services to be added here once finalized.]
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                How We Use Your Information
              </h2>
              <p className="mt-3 leading-relaxed">
                We use the information we collect to respond to your
                inquiries, provide and improve our services, send you
                requested communications, and — only where you&apos;ve given
                us permission — send occasional updates about our services.
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Data Retention &amp; Security
              </h2>
              <p className="mt-3 leading-relaxed">
                We retain the information you provide for as long as
                necessary to fulfill the purposes described in this policy,
                or as required by law. We use reasonable administrative and
                technical safeguards to protect your information, though no
                method of storage or transmission over the internet is 100%
                secure.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Your Rights &amp; Choices
              </h2>
              <p className="mt-3 leading-relaxed">
                Depending on where you live, you may have the right to
                request access to, correction of, or deletion of your
                personal information. To make a request, contact us using the
                details below and we&apos;ll respond within a reasonable
                timeframe.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Children&apos;s Privacy
              </h2>
              <p className="mt-3 leading-relaxed">
                Our site and services are intended for business audiences and
                are not directed at children. We do not knowingly collect
                personal information from children.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Changes to This Policy
              </h2>
              <p className="mt-3 leading-relaxed">
                We may update this Privacy Policy from time to time. Any
                changes will be posted on this page with a revised effective
                date.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Contact Us
              </h2>
              <p className="mt-3 leading-relaxed">
                If you have questions about this Privacy Policy or how we
                handle your information, contact us at{" "}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-semibold text-teal hover:text-bright-cyan"
                >
                  {contactInfo.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

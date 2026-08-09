import type { Metadata } from "next";
import { brand } from "@/lib/theme";
import { contactInfo } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | CodeIT — Data, Cookie & Security Practices",
  description:
    "How CodeIT collects, uses, and protects the information you share through our contact and Get Started forms — data practices, cookies, third-party providers, and your rights.",
  path: "/privacy",
});

// A real, honest privacy policy describing CodeIT's actual data practices.
// It reflects what the site does today (lead/contact forms stored in our
// MongoDB database, transactional email via Resend, scheduling via Cal.com,
// media via Cloudinary). It is a reasonable starting draft, not legal advice
// — have it reviewed by a qualified attorney for your jurisdiction before
// launch.
const EFFECTIVE_DATE = "August 9, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="bg-navy-deep px-6 pb-16 pt-32 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-white/70">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="bg-section px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-10 text-navy/80">
            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Introduction
              </h2>
              <p className="mt-3 leading-relaxed">
                {brand.name} (&quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) is a software development agency. This Privacy
                Policy explains what information we collect when you visit this
                website or contact us, how we use it, who we share it with, and
                the choices you have. By using our site or submitting a form,
                you agree to the practices described here.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Information We Collect
              </h2>
              <p className="mt-3 leading-relaxed">
                <strong className="text-navy">
                  Information you give us.
                </strong>{" "}
                When you fill out our &quot;Get Started&quot; or Contact forms,
                we collect the details you provide — typically your name, email
                address, phone number, business name, the industry you operate
                in, and the message or project details you share. If you book a
                call, the scheduling provider also collects the information
                needed to set up that meeting.
              </p>
              <p className="mt-3 leading-relaxed">
                <strong className="text-navy">
                  Information collected automatically.
                </strong>{" "}
                Like most websites, we may receive limited technical
                information automatically, such as your browser type, device
                type, approximate location derived from your IP address, and
                which pages you view. We use your browser&apos;s local storage
                to remember non-personal preferences, such as your light or
                dark theme choice.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Cookies &amp; Similar Technologies
              </h2>
              <p className="mt-3 leading-relaxed">
                We keep cookies to a minimum. Today the site uses essential
                browser storage needed for it to work correctly (for example,
                remembering your theme preference) rather than advertising
                cookies. We may add privacy-friendly analytics in the future to
                understand which pages are useful; if we do, we will update this
                policy. You can adjust your browser settings to refuse cookies,
                though some parts of the site may not function as intended.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                How We Use Your Information
              </h2>
              <p className="mt-3 leading-relaxed">
                We use the information you provide to respond to your enquiry,
                prepare proposals and quotes, deliver and improve our services,
                and — only where you&apos;ve asked us to — send you occasional
                updates. We do not sell or rent your personal information to
                anyone, and we do not use it for third-party advertising.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Third-Party Providers
              </h2>
              <p className="mt-3 leading-relaxed">
                We rely on a small set of trusted service providers to run our
                business. They only receive the information needed to perform
                their function on our behalf and are not permitted to use it for
                their own marketing. These currently include:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed">
                <li>
                  <strong className="text-navy">Resend</strong> — delivers the
                  notification and confirmation emails triggered by our forms.
                </li>
                <li>
                  <strong className="text-navy">MongoDB Atlas</strong> — hosts
                  the database that stores your submitted lead and backs this
                  site.
                </li>
                <li>
                  <strong className="text-navy">Cal.com</strong> — powers
                  consultation scheduling when you book a call.
                </li>
                <li>
                  <strong className="text-navy">Cloudinary</strong> — hosts
                  images and media shown on the site.
                </li>
              </ul>
              <p className="mt-3 leading-relaxed">
                We may add or change providers over time and will keep this list
                current. We may also disclose information if required by law or
                to protect our rights.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Data Retention
              </h2>
              <p className="mt-3 leading-relaxed">
                We keep the information you submit for as long as it&apos;s
                needed to respond to you and, if we begin working together, for
                the duration of our relationship plus any period required for
                legal, accounting, or record-keeping purposes. When it&apos;s no
                longer needed, we delete it or remove details that identify you.
                You can ask us to delete your information sooner at any time (see
                &quot;Your Rights &amp; Choices&quot; below).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Security
              </h2>
              <p className="mt-3 leading-relaxed">
                We use reasonable administrative and technical safeguards to
                protect your information, including access controls and
                encrypted connections. No method of transmission or storage over
                the internet is completely secure, so while we work hard to
                protect your information, we can&apos;t guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Your Rights &amp; Choices
              </h2>
              <p className="mt-3 leading-relaxed">
                Depending on where you live, you may have the right to access,
                correct, or delete the personal information we hold about you, or
                to object to certain uses of it. To make a request — or to opt
                out of any updates we send — just email us using the address
                below and we&apos;ll respond within a reasonable timeframe.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Children&apos;s Privacy
              </h2>
              <p className="mt-3 leading-relaxed">
                Our site and services are intended for businesses and are not
                directed at children. We do not knowingly collect personal
                information from children.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Changes to This Policy
              </h2>
              <p className="mt-3 leading-relaxed">
                We may update this Privacy Policy as our practices evolve. When
                we do, we&apos;ll revise the effective date at the top of this
                page. Significant changes may be highlighted on the site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Contact Us
              </h2>
              <p className="mt-3 leading-relaxed">
                If you have questions about this Privacy Policy or how we handle
                your information, contact us at{" "}
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

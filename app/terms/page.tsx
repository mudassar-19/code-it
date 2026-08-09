import type { Metadata } from "next";
import { brand } from "@/lib/theme";
import { contactInfo } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | CodeIT",
  description:
    "The terms that govern your use of the CodeIT website — acceptable use, intellectual property, how project engagements are handled, and limitations of liability.",
  path: "/terms",
});

// A real, honest terms-of-service document for CodeIT's marketing site. It
// makes clear the site is informational and that paid work is governed by
// separate signed agreements. It is a reasonable starting draft, not legal
// advice — have it reviewed by a qualified attorney for your jurisdiction
// before launch.
const EFFECTIVE_DATE = "August 9, 2026";

export default function TermsOfServicePage() {
  return (
    <main>
      <section className="bg-navy-deep px-6 pb-16 pt-32 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-white/70">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="bg-section px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-10 text-navy/80">
            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Acceptance of These Terms
              </h2>
              <p className="mt-3 leading-relaxed">
                These Terms of Service (&quot;Terms&quot;) govern your use of the
                {" "}
                {brand.name} website. By accessing or using the site, you agree
                to these Terms. If you do not agree, please do not use the site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                About Our Services
              </h2>
              <p className="mt-3 leading-relaxed">
                {brand.name} is a software development agency. This website is an
                informational resource: it describes the kinds of web, mobile,
                and AI solutions we build and lets you get in touch or request a
                consultation. Any paid work we do for you is governed by a
                separate written agreement (such as a proposal, statement of
                work, or contract) that we sign together. Nothing on this site is
                an offer, quote, or binding commitment on its own, and submitting
                a form does not create a client relationship.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Acceptable Use
              </h2>
              <p className="mt-3 leading-relaxed">
                You agree to use the site only for lawful purposes. You must not
                attempt to disrupt or compromise the site, gain unauthorized
                access to any systems or accounts, submit false or misleading
                information, scrape or misuse content, or use the site to send
                spam or malicious code.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Intellectual Property
              </h2>
              <p className="mt-3 leading-relaxed">
                The content on this site — including text, branding, logos,
                design, and code — is owned by {brand.name} or its licensors and
                is protected by applicable intellectual-property laws. You may
                view and share the content for personal or internal business
                purposes, but you may not copy, republish, or use it
                commercially without our permission. Ownership of any custom work
                we deliver to clients is addressed in the separate agreement for
                that engagement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Third-Party Links &amp; Services
              </h2>
              <p className="mt-3 leading-relaxed">
                The site may link to or embed third-party services (for example,
                a scheduling tool). We don&apos;t control those services and
                aren&apos;t responsible for their content or practices. Your use
                of them is subject to their own terms and privacy policies.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Disclaimer
              </h2>
              <p className="mt-3 leading-relaxed">
                The site and its content are provided &quot;as is&quot; and
                &quot;as available&quot; without warranties of any kind, whether
                express or implied. While we aim to keep information accurate and
                up to date, we don&apos;t warrant that it is complete, current,
                or error-free, and the site may be unavailable from time to time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Limitation of Liability
              </h2>
              <p className="mt-3 leading-relaxed">
                To the fullest extent permitted by law, {brand.name} will not be
                liable for any indirect, incidental, or consequential damages
                arising from your use of — or inability to use — this website.
                This section does not limit any rights or remedies set out in a
                separate signed agreement for services we provide to you.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Changes to These Terms
              </h2>
              <p className="mt-3 leading-relaxed">
                We may update these Terms from time to time. When we do,
                we&apos;ll revise the effective date at the top of this page.
                Continuing to use the site after changes take effect means you
                accept the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Governing Law
              </h2>
              <p className="mt-3 leading-relaxed">
                These Terms are governed by the laws of the jurisdiction in
                which {brand.name} operates, without regard to conflict-of-law
                rules. The specific governing jurisdiction for any client
                engagement is set out in that engagement&apos;s written
                agreement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-navy">
                Contact Us
              </h2>
              <p className="mt-3 leading-relaxed">
                Questions about these Terms? Contact us at{" "}
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

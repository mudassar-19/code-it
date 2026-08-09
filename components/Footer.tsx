import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { brand, navLinks } from "@/lib/theme";
import { contactInfo } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-grid opacity-40 [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          {/* Footer sits on a dark navy background in both themes, so it
              always uses the dark-theme logo variant rather than switching
              with the toggle like the header does. */}
          <Link href="/#home" className="flex items-center transition-opacity hover:opacity-80">
            <Image
              src="/images/codeit-web-logo-dark.png"
              alt={`${brand.name} logo`}
              width={855}
              height={292}
              className="h-9 w-auto"
            />
          </Link>
        </div>

        <div>
          <h3 className="mb-4 eyebrow text-teal">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline text-sm text-white/80 transition-colors hover:text-bright-cyan"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 eyebrow text-teal">Contact</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="link-underline transition-colors hover:text-bright-cyan"
              >
                {contactInfo.email}
              </a>
            </li>
            <li>
              <a
                href={contactInfo.phoneHref}
                className="link-underline transition-colors hover:text-bright-cyan"
              >
                {contactInfo.phone}
              </a>
            </li>
            <li>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-bright-cyan"
              >
                <FaWhatsapp className="h-4 w-4" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-6 text-center text-sm text-white/60 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link href="/privacy" className="link-underline text-white/60 transition-colors hover:text-bright-cyan">
            Privacy Policy
          </Link>
          <Link href="/terms" className="link-underline text-white/60 transition-colors hover:text-bright-cyan">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

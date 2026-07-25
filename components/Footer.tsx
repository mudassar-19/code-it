import Image from "next/image";
import Link from "next/link";
import { brand, navLinks } from "@/lib/theme";
import { contactInfo } from "@/lib/contact";
import { socialIcons } from "@/lib/socialIcons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-grid opacity-40 [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
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
            <li>{contactInfo.email}</li>
            <li>{contactInfo.phone}</li>
            <li>{contactInfo.address}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 eyebrow text-teal">Follow Us</h3>
          <ul className="flex flex-wrap gap-3">
            {contactInfo.socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white/80 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-gradient hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-6 text-center text-sm text-white/60 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
        <Link href="/privacy" className="link-underline text-white/60 transition-colors hover:text-bright-cyan">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}

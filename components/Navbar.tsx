"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { brand, navLinks } from "@/lib/theme";
import { industries } from "@/lib/industries";
import { industryIcons } from "@/lib/industryIcons";
import ServicesDropdown from "@/components/ServicesDropdown";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsMobileServicesOpen(false);
  };

  const [homeLink, aboutLink, ...restLinks] = navLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-light-teal bg-white/90 backdrop-blur-sm dark:bg-navy-deep/[0.92]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/#home" className="flex items-center transition-opacity hover:opacity-80">
          {/* Both logos render; only one is ever visible via dark:, resolved
              from the class ThemeScript already set on <html> before paint —
              no JS/state and no flash on theme switch. */}
          <Image
            src="/images/codeit-web-logo.png"
            alt={brand.name}
            width={765}
            height={326}
            priority
            className="h-9 w-auto dark:hidden sm:h-10 lg:h-12"
          />
          <Image
            src="/images/codeit-web-logo-dark.png"
            alt={brand.name}
            width={855}
            height={292}
            priority
            className="hidden h-9 w-auto dark:block sm:h-10 lg:h-12"
          />
        </Link>

        <div className="flex items-center gap-6 lg:gap-8">
          <ul className="hidden items-center gap-8 lg:flex">
            <li>
              <Link
                href={homeLink.href}
                className="link-underline link-underline-gradient text-sm font-medium text-navy transition-colors hover:text-teal"
              >
                {homeLink.label}
              </Link>
            </li>
            <li>
              <Link
                href={aboutLink.href}
                className="link-underline link-underline-gradient text-sm font-medium text-navy transition-colors hover:text-teal"
              >
                {aboutLink.label}
              </Link>
            </li>
            <li>
              <ServicesDropdown />
            </li>
            {restLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline link-underline-gradient text-sm font-medium text-navy transition-colors hover:text-teal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-navy lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-col gap-1 border-t border-light-teal bg-card px-6 py-4 lg:hidden"
        >
          <Link
            href={homeLink.href}
            onClick={handleLinkClick}
            className="block rounded-xl px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-light-teal hover:text-teal"
          >
            {homeLink.label}
          </Link>
          <Link
            href={aboutLink.href}
            onClick={handleLinkClick}
            className="block rounded-xl px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-light-teal hover:text-teal"
          >
            {aboutLink.label}
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileServicesOpen((prev) => !prev)}
            className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-light-teal hover:text-teal"
            aria-expanded={isMobileServicesOpen}
          >
            Services
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isMobileServicesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMobileServicesOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-2 flex flex-col gap-1 border-l border-light-teal pl-3"
            >
              {industries.map((industry) => {
                const Icon = industryIcons[industry.icon];
                return (
                  <Link
                    key={industry.slug}
                    href={`/services/${industry.slug}`}
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-navy/80 transition-colors hover:bg-light-teal hover:text-teal"
                  >
                    {Icon && <Icon className="h-4 w-4" strokeWidth={2} />}
                    {industry.name}
                  </Link>
                );
              })}
              <Link
                href="/#industries"
                onClick={handleLinkClick}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-teal"
              >
                View all industries →
              </Link>
            </motion.div>
          )}

          {restLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block rounded-xl px-3 py-2 text-sm font-medium text-navy transition-colors hover:bg-light-teal hover:text-teal"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}

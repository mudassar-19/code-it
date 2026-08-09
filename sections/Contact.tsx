import { Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import SectionShell from "@/components/SectionShell";
import ContactForm from "@/components/ContactForm";
import { contactInfo } from "@/lib/contact";

export default function Contact() {
  return (
    <SectionShell id="contact" title="Contact" eyebrow="Get In Touch" className="bg-mist">
      <p className="mt-4 max-w-2xl text-lg text-navy/70">
        Have a question or just want to say hello? Reach out — a real person
        reads every message.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4 rounded-2xl border border-light-teal bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-light-teal text-teal">
              <Phone className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">Phone</p>
              <a
                href={contactInfo.phoneHref}
                className="link-underline text-sm text-navy/70 hover:text-teal"
              >
                {contactInfo.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-light-teal bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-light-teal text-teal">
              <Mail className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">Email</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="link-underline text-sm text-navy/70 hover:text-teal"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>

          <a
            href={contactInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-2xl border border-light-teal bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-light-teal text-teal">
              <FaWhatsapp className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">WhatsApp</p>
              <p className="text-sm text-navy/70 transition-colors group-hover:text-teal">
                Chat with us
              </p>
            </div>
          </a>
        </div>

        <ContactForm />
      </div>
    </SectionShell>
  );
}

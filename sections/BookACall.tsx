import Link from "next/link";
import SectionShell from "@/components/SectionShell";
import CalendarPlaceholder from "@/components/CalendarPlaceholder";

export default function BookACall() {
  return (
    <SectionShell
      id="book-a-call"
      title="Book a Consultation"
      eyebrow="Free Discovery Call"
      className="bg-white"
      align="center"
    >
      <p className="mt-4 max-w-2xl text-center text-lg text-navy/70">
        Grab 20 minutes on our calendar for a free discovery call — we&apos;ll
        talk through your business and what we could build for it.
      </p>

      <div className="mt-10 w-full max-w-2xl">
        <CalendarPlaceholder />
      </div>

      <p className="mt-6 text-center text-sm text-navy/70">
        Prefer email?{" "}
        <Link
          href="/#contact"
          className="font-semibold text-teal hover:text-navy"
        >
          Contact us directly
        </Link>
      </p>
    </SectionShell>
  );
}

import { Suspense } from "react";
import SectionShell from "@/components/SectionShell";
import GetStartedForm from "@/components/GetStartedForm";

export default function GetStarted() {
  return (
    <SectionShell
      id="get-started"
      title="Get Started"
      eyebrow="Let's Build"
      className="bg-mist"
      align="center"
    >
      <p className="mt-4 max-w-2xl text-lg text-navy/70">
        Tell us a bit about your business and we&apos;ll put together a plan —
        no obligation.
      </p>

      <Suspense fallback={null}>
        <GetStartedForm />
      </Suspense>
    </SectionShell>
  );
}

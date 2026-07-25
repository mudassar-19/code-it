import { Bot, BrainCircuit, CloudCog, Code2, Smartphone } from "lucide-react";
import SectionShell from "@/components/SectionShell";
import IconCard from "@/components/IconCard";

const services = [
  {
    icon: <Code2 className="h-6 w-6" strokeWidth={2} />,
    title: "Web & SaaS Development",
    description:
      "Custom websites and SaaS platforms engineered for performance, conversion, and scale — from marketing sites to full multi-tenant products.",
  },
  {
    icon: <Smartphone className="h-6 w-6" strokeWidth={2} />,
    title: "Mobile App Development",
    description:
      "Native and cross-platform apps that extend your business into your customers' pockets, built for speed, reliability, and real user adoption.",
  },
  {
    icon: <BrainCircuit className="h-6 w-6" strokeWidth={2} />,
    title: "AI & Machine Learning Solutions",
    description:
      "Predictive models, computer vision, and applied AI that turn your data into a competitive advantage — not just a proof of concept.",
  },
  {
    icon: <Bot className="h-6 w-6" strokeWidth={2} />,
    title: "Automation & Chatbot Systems",
    description:
      "Workflow automation, CRM integrations, and AI chatbots that qualify leads, resolve support, and keep your pipeline moving 24/7.",
  },
  {
    icon: <CloudCog className="h-6 w-6" strokeWidth={2} />,
    title: "Cloud & Custom Software",
    description:
      "Scalable cloud infrastructure and bespoke software built around how your business actually operates — secure, maintainable, and built to last.",
  },
];

const OFFSET_BY_COLUMN = ["lg:mt-0", "lg:mt-12", "lg:mt-0"];

export default function Services() {
  return (
    <SectionShell id="services" title="Our Services" eyebrow="What We Do" className="bg-white">
      <p className="mt-4 max-w-3xl text-lg text-navy/70">
        Five integrated technology disciplines, engineered to work together
        as one growth system.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div key={service.title} className={OFFSET_BY_COLUMN[index % 3]}>
            <IconCard index={index} {...service} />
          </div>
        ))}
      </div>

      <p className="mt-16 text-center font-display text-base font-medium italic text-navy/80">
        Every discipline above is delivered by one in-house team — no
        outsourcing, no hand-offs, just one accountable partner from
        strategy to launch.
      </p>
    </SectionShell>
  );
}

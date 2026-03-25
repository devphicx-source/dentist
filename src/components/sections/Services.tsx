"use client";

import {
  Stethoscope,
  Smile,
  Zap,
  ScanLine,
  Sparkles,
  HeartPulse,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";

const services = [
  {
    icon: <ScanLine size={28} />,
    title: "Invisalign & Braces",
    description:
      "Straighten your teeth discreetly with clear aligners or traditional braces. Customized treatment plans for every smile.",
  },
  {
    icon: <HeartPulse size={28} />,
    title: "Root Canal Treatment",
    description:
      "Pain-free endodontic procedures using advanced rotary technology. Save your natural teeth with expert precision.",
  },
  {
    icon: <Stethoscope size={28} />,
    title: "Dental Implants",
    description:
      "Permanent, natural-looking tooth replacements with titanium implants. Restore your bite and confidence.",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Teeth Whitening",
    description:
      "Professional in-office whitening for a brighter, radiant smile. See results in just one visit.",
  },
  {
    icon: <Smile size={28} />,
    title: "Smile Makeover",
    description:
      "Complete smile transformation combining veneers, bonding, and contouring. Design your dream smile.",
  },
  {
    icon: <Zap size={28} />,
    title: "Laser Dentistry",
    description:
      "Minimally invasive laser treatments for gum disease, fillings, and more. Faster healing, less discomfort.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <Container>
        <SectionHeading
          title="Our Dental Services"
          subtitle="Comprehensive dental care using the latest technology and techniques. Every treatment is tailored to your unique needs."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

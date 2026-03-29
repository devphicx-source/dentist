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
    icon: <Smile size={20} />,
    title: "Infant Oral Health",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    description:
      "Comprehensive dental exams for infants and toddlers including risk assessment for caries in mother and child.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "Preventive Care",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
    description:
      "Professional cleaning, fluoride treatments, and dental sealants to protect your child's teeth from decay.",
  },
  {
    icon: <Stethoscope size={20} />,
    title: "Cavity Treatment",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
    description:
      "Gentle cavity fillings and restorative treatments designed specifically for primary (baby) and permanent teeth.",
  },
  {
    icon: <ScanLine size={20} />,
    title: "Braces & Aligners",
    image: "https://images.unsplash.com/photo-1594142404563-64cccaf5a10f?auto=format&fit=crop&q=80&w=800",
    description:
      "Professional assessment and treatment for straightening teeth and correcting improper bites in children.",
  },
  {
    icon: <HeartPulse size={20} />,
    title: "Habit Counseling",
    image: "https://plus.unsplash.com/premium_photo-1668613402936-98ce515c5cc5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y291bnNlbGluZ3xlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&q=80&w=800",
    description:
      "Expert guidance for breaking habits like thumb sucking and pacifier use that can affect dental development.",
  },
  {
    icon: <Zap size={20} />,
    title: "Emergency Care",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    description:
      "Rapid care for dental emergencies such as fractured, displaced, or knocked-out teeth to ensure quick recovery.",
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
              image={service.image}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

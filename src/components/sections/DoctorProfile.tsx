"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BadgeCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const certifications = [
  { icon: <GraduationCap size={18} />, text: "BDS, MDS — Pediatric & Preventive Dentistry" },
  { icon: <Award size={18} />, text: "Specialist Pediatric Dentist & Pedodontist" },
  { icon: <BadgeCheck size={18} />, text: "Expert in Child Dental Care & Behavior Management" },
  { icon: <Award size={18} />, text: "Advanced Pediatric Treatments — Indore" },
];

export default function DoctorProfile() {
  return (
    <section id="doctor" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/3 pointer-events-none" />

      <Container>
        <SectionHeading
          title="Meet Your Doctor"
          subtitle="Trusted by thousands for expert dental care with a gentle, patient-first approach."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
              <img
                src="/images/doctor.png"
                alt="Dr. Navneet Agrawal"
                className="w-full h-full object-cover rounded-3xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80';
                }}
              />
            </div>
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 glass-strong rounded-2xl p-5 shadow-lg animate-float"
            >
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">15+</span>
                <p className="text-sm text-muted font-medium">Years of Excellence</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
              <BadgeCheck size={16} />
              Lead Dental Surgeon
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-2">
              Dr. Navneet Agrawal
            </h3>
            <p className="text-muted font-medium mb-6">
              BDS, MDS (Pediatric & Preventive Dentistry)
            </p>

            <p className="text-muted leading-relaxed mb-6">
              Dr. Navneet Agrawal is a highly skilled and compassionate pediatric
              dentist at Agrawal Dental Care Indore. With a focus on gentle and
              patient-friendly treatments, he ensures that every child has a
              positive and stress-free dental experience.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Known for his polite nature and expertise, Dr. Agrawal is dedicated
              to providing the best oral health care for kids in Indore. His 
              philosophy is simple — every child deserves a healthy, happy smile 
              without any fear of the dentist.
            </p>

            {/* Certifications */}
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {cert.icon}
                  </div>
                  <span className="text-foreground font-medium">{cert.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

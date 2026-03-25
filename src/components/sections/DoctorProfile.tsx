"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BadgeCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const certifications = [
  { icon: <GraduationCap size={18} />, text: "BDS, MDS — Prosthodontics" },
  { icon: <Award size={18} />, text: "Fellow, International Congress of Oral Implantologists" },
  { icon: <BadgeCheck size={18} />, text: "Member, Indian Dental Association" },
  { icon: <Award size={18} />, text: "Advanced Training — Germany & USA" },
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
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
                alt="Dr. Rajesh Kumar - Lead Dentist"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
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
              Dr. Rajesh Kumar
            </h3>
            <p className="text-muted font-medium mb-6">
              BDS, MDS (Prosthodontics & Implantology)
            </p>

            <p className="text-muted leading-relaxed mb-6">
              With over 15 years of clinical experience, Dr. Kumar is a pioneer
              in advanced implantology and cosmetic dentistry. He has
              successfully treated over 5,000 patients and is known for his
              gentle approach and commitment to pain-free dental care.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Having trained at premier institutions in Germany and the United
              States, Dr. Kumar brings world-class expertise to every procedure.
              His philosophy is simple — every patient deserves a confident,
              beautiful smile.
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

"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const contactInfo = [
  {
    icon: <MapPin size={22} />,
    title: "Visit Us",
    lines: ["MZ1, Onam Plaza, AB Rd, Near Industry House", "New Palasia, Indore, MP 452001"],
  },
  {
    icon: <Phone size={22} />,
    title: "Call Us",
    lines: ["+91 99774 51132", "0731-1234567"],
  },
  {
    icon: <Mail size={22} />,
    title: "Email Us",
    lines: ["info@agrawaldentalcare.com", "appointments@agrawaldentalcare.com"],
  },
  {
    icon: <Clock size={22} />,
    title: "Working Hours",
    lines: ["Mon – Sat: 11:00 AM – 8:00 PM", "Sunday: Closed"],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-gradient-to-b from-background to-white overflow-hidden">
      <Container>
        <SectionHeading
          title="Find Us Here"
          subtitle="Visit our state-of-the-art clinic or reach out to us for any queries."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h4>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-muted text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border border-border h-[350px] lg:h-[420px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0123456789!2d77.6389!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzgnMjAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DentaCare Clinic Location"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

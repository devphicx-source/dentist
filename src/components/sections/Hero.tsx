"use client";

import { motion } from "framer-motion";
import { Calendar, MessageCircle, Shield, Users, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const badges = [
  { icon: <Award size={16} />, text: "15+ Years Experience", delay: 0.8 },
  { icon: <Users size={16} />, text: "5,000+ Happy Patients", delay: 1.0 },
  { icon: <Shield size={16} />, text: "ISO Certified Clinic", delay: 1.2 },
];

export default function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Advanced Dental Care
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground"
            >
              Transform Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Smile.
              </span>
              <br />
              Restore Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                Confidence.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="mt-6 text-lg text-muted leading-relaxed max-w-lg"
            >
              Advanced, pain-free dental treatments with world-class care. Your
              journey to the perfect smile begins here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                href="#appointment"
                size="lg"
                icon={<Calendar size={20} />}
              >
                Book Appointment
              </Button>
              <Button
                href="https://wa.me/911234567890"
                variant="outline"
                size="lg"
                icon={<MessageCircle size={20} />}
              >
                WhatsApp Now
              </Button>
            </motion.div>

            {/* Trust Mini Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-10 flex items-center gap-8 text-sm text-muted"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-primary/30 to-secondary/30"
                    >
                      <img src={`/images/reviews/${i}.jpg`} alt="" className="w-8 h-8 rounded-full border-2" />
                    </div>
                  ))}
                </div>
                <span>
                  <strong className="text-foreground">4.9★</strong> from 500+ reviews
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right - Image + Floating Badges */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                  alt="Modern dental clinic with advanced equipment"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badges */}
              {badges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: badge.delay }}
                  className={`absolute glass-strong rounded-2xl px-4 py-3 shadow-lg ${
                    i === 0
                      ? "top-4 -left-4 sm:top-6 sm:-left-6 animate-float"
                      : i === 1
                      ? "bottom-20 -right-2 sm:bottom-24 sm:-right-4 animate-float-delayed"
                      : "-bottom-2 left-4 sm:-bottom-4 sm:left-8 animate-float"
                  }`}
                >
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <div className="text-primary">{badge.icon}</div>
                    <span className="text-sm font-semibold text-foreground">
                      {badge.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

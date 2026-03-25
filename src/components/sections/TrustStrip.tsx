"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Clock, Users, Star, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";

const stats = [
  { icon: <Clock size={24} />, value: 15, suffix: "+", label: "Years Experience" },
  { icon: <Users size={24} />, value: 5000, suffix: "+", label: "Happy Patients" },
  { icon: <Star size={24} />, value: 4.9, suffix: "★", label: "Patient Rating", isDecimal: true },
  { icon: <ShieldCheck size={24} />, value: 100, suffix: "%", label: "Safe Procedures" },
];

function CountUp({ target, isDecimal = false }: { target: number; isDecimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}
    </span>
  );
}

export default function TrustStrip() {
  return (
    <section className="relative py-8 bg-gradient-to-r from-primary via-primary-dark to-primary overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-4 justify-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-white/90 shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  <CountUp target={stat.value} isDecimal={stat.isDecimal} />
                  <span className="text-white/80">{stat.suffix}</span>
                </div>
                <div className="text-white/70 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

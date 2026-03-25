"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index?: number;
}

export default function ServiceCard({
  icon,
  title,
  description,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-glow cursor-pointer"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-5 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted leading-relaxed text-[15px]">{description}</p>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/[0.03] group-hover:to-secondary/[0.03] transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}

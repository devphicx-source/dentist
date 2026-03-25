"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  image: string;
  index?: number;
}

export default function ServiceCard({
  icon,
  title,
  description,
  image,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-glow cursor-pointer"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            {icon}
          </div>
          <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] text-white">
            {title}
          </h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-muted leading-relaxed text-[15px]">{description}</p>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/[0.03] group-hover:to-secondary/[0.03] transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

export default function GreetingBubble({ show, onDismiss }: { show: boolean, onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, x: 20 }}
      animate={show ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.5, x: 20 }}
      className="absolute bottom-20 right-0 pointer-events-auto"
    >
      <div className="relative bg-white p-4 rounded-2xl rounded-br-none shadow-xl border border-border w-56">
        <p className="text-sm font-medium text-foreground leading-tight">
          Hi 👋 I&apos;m your Dental Assistant. How can I help you today?
        </p>
        {/* Tail */}
        <div className="absolute -bottom-2 right-0 w-4 h-4 bg-white border-r border-b border-border rotate-45 transform origin-top-right shadow-[2px_2px_2px_rgba(0,0,0,0.05)]" />
        
        {/* Close button for bubble */}
        <button 
          onClick={onDismiss}
          className="absolute -top-2 -left-2 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-muted hover:bg-gray-200 transition-colors shadow-sm"
          suppressHydrationWarning
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}

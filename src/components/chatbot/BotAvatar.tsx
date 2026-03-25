"use client";

import { motion } from "framer-motion";

export default function BotAvatar({ isOpen, size = "w-12 h-12" }: { isOpen: boolean, size?: string }) {
  return (
    <motion.div
      className={`relative ${size} flex items-center justify-center`}
      animate={{ y: [0, -6, 0] }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        {/* Head Shell */}
        <rect
          x="15"
          y="20"
          width="70"
          height="60"
          rx="30"
          fill="white"
          className="filter drop-shadow-md"
        />
        <rect
          x="15"
          y="20"
          width="70"
          height="60"
          rx="30"
          stroke="#2563EB"
          strokeWidth="3"
        />

        {/* Face Display */}
        <rect
          x="25"
          y="35"
          width="50"
          height="30"
          rx="15"
          fill="#EEF2FF"
        />

        {/* Eyes (Blinking) */}
        <motion.ellipse
          cx="40"
          cy="50"
          rx="4"
          ry="4"
          fill="#2563EB"
          animate={{
            scaleY: [1, 0.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2,
            times: [0, 0.05, 0.1],
          }}
        />
        <motion.ellipse
          cx="60"
          cy="50"
          rx="4"
          ry="4"
          fill="#2563EB"
          animate={{
            scaleY: [1, 0.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2,
            times: [0, 0.05, 0.1],
          }}
        />

        {/* Smile */}
        <path
          d="M40 60C40 60 45 64 50 64C55 64 60 60 60 60"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Antenna */}
        <circle cx="50" cy="15" r="5" fill="#2563EB" />
        <line x1="50" y1="20" x2="50" y2="15" stroke="#2563EB" strokeWidth="3" />
        
        {/* Antenna Glow */}
        <motion.circle
          cx="50"
          cy="15"
          r="8"
          fill="#2563EB"
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Tooth Icon on Side */}
        <path
          d="M80 65C80 62.7909 81.7909 61 84 61C86.2091 61 88 62.7909 88 65V68C88 70.2091 86.2091 72 84 72C81.7909 72 80 70.2091 80 68V65Z"
          fill="#3B82F6"
          opacity="0.8"
        />
      </svg>
      
      {/* Bottom Ring Decoration */}
      <div className="absolute -bottom-1 w-8 h-1.5 bg-primary/20 blur-sm rounded-full" />
    </motion.div>
  );
}

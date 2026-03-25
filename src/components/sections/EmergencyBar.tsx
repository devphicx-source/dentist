"use client";

import { Phone, AlertTriangle } from "lucide-react";
import Container from "@/components/ui/Container";

export default function EmergencyBar() {
  return (
    <section className="bg-gradient-to-r from-emergency-dark via-emergency to-emergency-dark py-5 relative overflow-hidden">
      {/* Animated Pulse Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
      
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="font-bold text-lg font-[family-name:var(--font-poppins)]">
                Dental Emergency?
              </p>
              <p className="text-white/80 text-sm">
                Severe tooth pain? Don&apos;t wait — call us immediately!
              </p>
            </div>
          </div>
          <a
            href="tel:+911234567890"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emergency font-bold rounded-2xl hover:bg-white/90 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-[0.98]"
          >
            <Phone size={18} />
            Call Now: +91 12345 67890
          </a>
        </div>
      </Container>
    </section>
  );
}

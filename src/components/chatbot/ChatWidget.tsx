"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Phone, User, Calendar, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import BotAvatar from "./BotAvatar";
import GreetingBubble from "./GreetingBubble";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm your Dental Assistant. How can I help you today? 👋" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<"chat" | "booking_name" | "booking_phone" | "booking_complete">("chat");
  const [userData, setUserData] = useState({ name: "", phone: "", problem: "" });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show greeting bubble after 2 seconds on initial load
    const timer = setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 2000);

    // Hide greeting bubble after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Handle Appointment Flow logic
      if (stage === "booking_name") {
        setUserData({ ...userData, name: userMessage });
        setMessages((prev) => [...prev, { role: "bot", content: "Great! And what is your phone number so we can confirm the appointment?" }]);
        setStage("booking_phone");
        setIsLoading(false);
        return;
      }

      if (stage === "booking_phone") {
        if (!/^[0-9]{10}$/.test(userMessage.replace(/\D/g, ""))) {
          setMessages((prev) => [...prev, { role: "bot", content: "Please enter a valid 10-digit phone number. 📞" }]);
          setIsLoading(false);
          return;
        }
        setUserData({ ...userData, phone: userMessage });
        
        // Save lead to DB
        await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ 
            stage: "booking_complete", 
            userData: { ...userData, phone: userMessage } 
          }),
        });

        setMessages((prev) => [...prev, { role: "bot", content: "Thank you! Our team will contact you shortly to confirm your visit. Is there anything else I can help with?" }]);
        setStage("chat");
        setIsLoading(false);
        return;
      }

      // Default AI Chat
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ 
          message: userMessage, 
          history: messages.map(m => ({ 
            role: m.role === "user" ? "user" : "model", 
            parts: [{ text: m.content }] 
          })),
          stage 
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", content: data.message }]);

      if (data.intent === "appointment") {
        setMessages((prev) => [...prev, { role: "bot", content: "I can help you book that. May I know your full name?" }]);
        setStage("booking_name");
        setUserData({ ...userData, problem: userMessage });
      }

      if (data.intent === "urgent") {
        setMessages((prev) => [...prev, { role: "bot", content: "This sounds serious. Please call us immediately or WhatsApp us for faster response:" }]);
      }

    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", content: "I'm having a bit of trouble. Please try again or call us." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 pointer-events-none w-full md:w-auto">
      <AnimatePresence>
        {!isOpen && (
          <div className="absolute bottom-24 right-6 md:right-0">
            <GreetingBubble 
              show={showGreeting} 
              onDismiss={() => setShowGreeting(false)} 
            />
          </div>
        )}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="pointer-events-auto bg-white md:rounded-3xl shadow-2xl overflow-hidden w-full md:w-[400px] h-[80vh] md:h-[650px] flex flex-col border-t md:border border-border"
          >
            {/* Header */}
            <div className="bg-primary p-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md overflow-hidden p-1">
                  <BotAvatar isOpen={true} size="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Dental Assistant</h3>
                  <div className="flex items-center gap-1.5 text-xs text-secondary-light">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a 
                  href="tel:+919876543210" 
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  title="Call Us"
                >
                  <Phone size={20} />
                </a>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  suppressHydrationWarning
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed ${
                    m.role === "user" 
                      ? "bg-primary text-white rounded-tr-none shadow-md" 
                      : "bg-white text-foreground rounded-tl-none border border-border shadow-sm"
                  }`}>
                    {m.content}
                    
                    {/* Urgency Buttons */}
                    {m.content.includes("call us immediately") && (
                      <div className="mt-4 flex flex-col gap-2">
                        <a href="tel:+919876543210" className="flex items-center justify-center gap-2 bg-emergency text-white py-2.5 rounded-xl font-semibold hover:bg-emergency-dark transition-colors">
                          <Phone size={16} /> Call Now
                        </a>
                        <a href="https://wa.me/919876543210" className="flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                          <MessageSquare size={16} /> WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-border shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-sm text-muted">Assistant is typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-border flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask something..."
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50 transition-all shadow-md active:scale-95"
                suppressHydrationWarning
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!isOpen && (
        <div className="flex justify-end p-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => {
              setIsOpen(true);
              setShowGreeting(false);
            }}
            className="pointer-events-auto w-16 h-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center transition-all hover:bg-primary-dark border-4 border-white overflow-visible"
            suppressHydrationWarning
          >
            <BotAvatar isOpen={isOpen} />
          </motion.button>
        </div>
      )}

    </div>
  );
}

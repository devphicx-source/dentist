"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Stethoscope, CalendarDays, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const services = [
  "Invisalign / Braces",
  "Root Canal Treatment",
  "Dental Implants",
  "Teeth Whitening",
  "Smile Makeover",
  "Laser Dentistry",
  "General Checkup",
  "Other",
];

const steps = [
  { id: 1, label: "Your Name", icon: <User size={20} /> },
  { id: 2, label: "Phone", icon: <Phone size={20} /> },
  { id: 3, label: "Service", icon: <Stethoscope size={20} /> },
  { id: 4, label: "Date", icon: <CalendarDays size={20} /> },
];

export default function LeadForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1 && !formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }
    if (currentStep === 2) {
      if (!formData.phone.trim()) {
        newErrors.phone = "Please enter your phone number";
      } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
        newErrors.phone = "Enter a valid 10-digit phone number";
      }
    }
    if (currentStep === 3 && !formData.service) {
      newErrors.service = "Please select a service";
    }
    if (currentStep === 4 && !formData.date) {
      newErrors.date = "Please select a preferred date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (currentStep < 4) setCurrentStep((s) => s + 1);
    else {
      setSubmitted(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  if (submitted) {
    return (
      <section id="appointment" className="py-20 lg:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl p-10 shadow-xl"
          >
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={32} className="text-secondary" />
            </div>
            <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
              Appointment Requested!
            </h3>
            <p className="text-muted">
              Thank you, {formData.name}! We&apos;ll call you at {formData.phone} to
              confirm your {formData.service} appointment.
            </p>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section id="appointment" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <Container>
        <SectionHeading
          title="Book Your Appointment"
          subtitle="Schedule your visit in under a minute. We'll confirm your appointment within 30 minutes."
        />

        <div className="max-w-xl mx-auto">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-10">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-primary text-white shadow-lg"
                        : "bg-gray-100 text-muted"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium hidden sm:block ${
                      currentStep >= step.id ? "text-primary" : "text-muted"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-[2px] w-12 sm:w-20 mx-2 transition-colors duration-300 ${
                      currentStep > step.id ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      What&apos;s your name?
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                      className="w-full px-5 py-4 rounded-2xl border border-border bg-white/50 text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-base"
                    />
                    {errors.name && (
                      <p className="text-emergency text-sm mt-2">{errors.name}</p>
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Your phone number
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="px-4 py-4 rounded-2xl border border-border bg-gray-50 text-muted font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                          })
                        }
                        placeholder="10-digit phone number"
                        className="w-full px-5 py-4 rounded-2xl border border-border bg-white/50 text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-base"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-emergency text-sm mt-2">{errors.phone}</p>
                    )}
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Select a service
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((s) => (
                        <button
                          key={s}
                          onClick={() =>
                            setFormData({ ...formData, service: s })
                          }
                          className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200 cursor-pointer ${
                            formData.service === s
                              ? "bg-primary text-white shadow-lg"
                              : "bg-gray-50 text-foreground hover:bg-primary/5 border border-border"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="text-emergency text-sm mt-2">
                        {errors.service}
                      </p>
                    )}
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Preferred date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-5 py-4 rounded-2xl border border-border bg-white/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-base"
                    />
                    {errors.date && (
                      <p className="text-emergency text-sm mt-2">{errors.date}</p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 text-muted hover:text-foreground font-medium transition-colors cursor-pointer"
                >
                  <ArrowLeft size={18} /> Back
                </button>
              ) : (
                <div />
              )}
              <Button onClick={nextStep} icon={currentStep === 4 ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}>
                {currentStep === 4 ? "Submit Request" : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

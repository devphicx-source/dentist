import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import BeforeAfter from "@/components/sections/BeforeAfter";
import DoctorProfile from "@/components/sections/DoctorProfile";
import Testimonials from "@/components/sections/Testimonials";
import LeadForm from "@/components/sections/LeadForm";
import Contact from "@/components/sections/Contact";
import EmergencyBar from "@/components/sections/EmergencyBar";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <BeforeAfter />
        <DoctorProfile />
        <Testimonials />
        <LeadForm />
        <Contact />
        <EmergencyBar />
      </main>
      <Footer />
    </>
  );
}

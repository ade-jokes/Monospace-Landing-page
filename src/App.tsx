import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ClientLogos from "./components/ClientLogos";
import BrandQuote from "./components/BrandQuote";
import Services from "./components/Services";
import InteractiveDemo from "./components/InteractiveDemo";
import CaseStudies from "./components/CaseStudies";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import ClosingCTA from "./components/ClosingCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[#0B0B0F] text-[#ECECF0] font-sans antialiased relative min-h-screen">
      {/* Structural Global Background overlay for cinematic coherence */}
      <div className="fixed inset-0 bg-[#0B0B0F] pointer-events-none z-0" />

      {/* Floating global subtle background meshes */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-1 overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#00C853]/[0.03] filter blur-[140px] opacity-40" />
        <div className="absolute top-[60%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#635BFF]/[0.03] filter blur-[120px] opacity-30" />
      </div>

      {/* Decoupled Subcomponents Grid */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          {/* SECTION RHYTHM: 
              Hero (dark) → Logos (dark, subtle) → Quote (light #F6F9FC) → 
              Services (dark) → Demo (dark) → Work/Results (light #F6F9FC) → 
              Process (dark) → Testimonial (light #F6F9FC) → CTA (dark) → Footer (dark)
          */}
          <Hero />
          <ClientLogos />
          <BrandQuote />
          <Services />
          <InteractiveDemo />
          <CaseStudies />
          <Process />
          <Testimonials />
          <ClosingCTA />
        </main>

        <Footer />
      </div>
    </div>
  );
}

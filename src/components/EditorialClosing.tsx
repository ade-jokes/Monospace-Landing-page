import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { audioEngine } from "../utils/audioEngine";

gsap.registerPlugin(ScrollTrigger);

export default function EditorialClosing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const t1 = gsap.fromTo(
        container.querySelectorAll(".animate-closing"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      return () => {
        t1.kill();
      };
    }
  }, []);

  const handleContactClick = () => {
    audioEngine.playSweep();
    window.location.href = "mailto:hello@monospace.digital?subject=Project%20Inquiry";
  };

  return (
    <section
      id="closing-section"
      ref={containerRef}
      className="relative px-6 sm:px-12 md:px-24 py-48 bg-[#070708] text-[#EAE7E2] overflow-hidden"
    >
      {/* Absolute dark ambient backlight */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full pointer-events-none blur-[120px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
          left: "calc(50% - 225px)",
          top: "calc(50% - 225px)",
        }}
      />

      {/* Grid background layer */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />

      {/* Chapter Marker */}
      <div className="relative z-10 mb-24 font-mono text-[10px] tracking-widest text-[#10B981] uppercase">
        05 — INCEPTION
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-12">
        <h2 
          className="animate-closing font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-tight"
          id="closing-title"
        >
          Let us shape your next digital <span className="italic font-normal text-[#10B981]">statement</span>.
        </h2>

        <p 
          className="animate-closing font-sans text-xs sm:text-sm tracking-widest uppercase leading-relaxed max-w-md text-[#A5A29D]"
          id="closing-subtitle"
        >
          We are currently selecting three partners for autumn engagement. Reach out quietly to start the dialogue.
        </p>

        <button
          id="closing-contact-btn"
          onClick={handleContactClick}
          onMouseEnter={() => audioEngine.playClick()}
          className="animate-closing group flex items-center gap-3 px-8 py-4 border border-[#10B981]/30 bg-[#10B981]/5 hover:bg-[#10B981]/10 text-[#10B981] font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm hover:border-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.05)] hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]"
        >
          <span>INITIATE DIALOGUE</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface EditorialCredibilityProps {
  theme: "light" | "dark";
}

export default function EditorialCredibility({ theme }: EditorialCredibilityProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const t1 = gsap.fromTo(
        container.querySelectorAll(".animate-cred"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      return () => {
        t1.kill();
      };
    }
  }, []);

  return (
    <section
      id="credibility-section"
      ref={containerRef}
      className="relative px-6 sm:px-12 md:px-24 py-36 transition-colors duration-700"
      style={{
        backgroundColor: theme === "dark" ? "#0A0A0A" : "#FDFBF7",
      }}
    >
      {/* Chapter Marker */}
      <div className="mb-24 font-mono text-[10px] tracking-widest uppercase">
        <span 
          className="transition-colors duration-500"
          style={{ color: theme === "dark" ? "#10B981" : "#059669" }}
        >
          04 — DIALOGUE
        </span>
      </div>

      <div className="max-w-4xl mx-auto space-y-24">
        {/* Quiet line of client partners */}
        <div className="animate-cred">
          <p 
            className="font-mono text-xs uppercase tracking-widest leading-relaxed transition-colors duration-500"
            style={{
              color: theme === "dark" ? "#8A8782" : "#7C7A74",
            }}
            id="credibility-partners-text"
          >
            We deploy our systems in quiet partnership with forward-thinking teams, translating complex transactional logic into permanent digital form for leaders at Stripe, Vercel, Humane, and Aura Protocol.
          </p>
        </div>

        {/* Magazine Pull-Quote */}
        <div className="animate-cred relative pl-6 sm:pl-12 border-l"
          style={{
            borderColor: theme === "dark" ? "rgba(16,185,129,0.2)" : "rgba(5,150,105,0.22)",
          }}
        >
          {/* Typographic giant quotation mark */}
          <span 
            className="absolute -top-12 left-0 sm:left-4 font-serif text-[120px] font-light leading-none select-none opacity-20 transition-colors"
            style={{
              color: theme === "dark" ? "#10B981" : "#059669",
            }}
          >
            “
          </span>

          <blockquote 
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-light italic tracking-tight leading-snug transition-colors duration-500 relative z-10"
            style={{
              color: theme === "dark" ? "#EAE7E2" : "#1A1A1C",
            }}
            id="credibility-testimonial-quote"
          >
            Monospace Digital operates like a high-end publishing house for code. They took our sprawling transaction pipeline and shaped it into a quiet, high-performance visual object.
          </blockquote>

          <cite 
            className="block mt-6 font-mono text-[10px] tracking-widest uppercase not-italic transition-colors duration-500"
            style={{
              color: theme === "dark" ? "#10B981" : "#059669",
            }}
            id="credibility-testimonial-author"
          >
            — HEAD OF DESIGN, AURA PROTOCOL
          </cite>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SocialProofProps {
  theme: "light" | "dark";
}

export default function SocialProof({ theme }: SocialProofProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate client logos
      gsap.fromTo(
        logosRef.current?.children || [],
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: logosRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate testimonial quote
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const clients = [
    { name: "Vercel", glyph: "▲" },
    { name: "Linear", glyph: "⧉" },
    { name: "Stripe", glyph: "⟲" },
    { name: "Scale AI", glyph: "⌘" },
    { name: "Sentry", glyph: "⚙" }
  ];

  return (
    <section
      ref={containerRef}
      id="social-proof"
      className="py-24 sm:py-32 border-b transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#0A0A0A" : "#FAFAFA",
        borderColor: theme === "dark" ? "rgba(39, 39, 42, 0.5)" : "rgba(228, 228, 231, 0.5)",
        color: theme === "dark" ? "#FAFAFA" : "#0A0A0A"
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block mb-2">
            [ TRUSTED PARTNERSHIPS ]
          </span>
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">
            Client Network
          </h2>
        </div>

        {/* Client Logos Grid */}
        <div
          ref={logosRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-24"
        >
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center space-x-2 border py-5 px-6 rounded-sm font-mono text-xs tracking-wider uppercase transition-all duration-300 hover:border-[#10B981]"
              style={{
                borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.01)" : "rgba(0, 0, 0, 0.01)",
                color: theme === "dark" ? "#A1A1AA" : "#52525B"
              }}
              id={`client-logo-${client.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span style={{ color: "#10B981" }}>{client.glyph}</span>
              <span className="font-bold">{client.name}</span>
            </div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <div
          ref={quoteRef}
          className="max-w-3xl mx-auto border-l-2 pl-8 py-2 md:pl-12 opacity-0"
          style={{
            borderColor: "#10B981"
          }}
          id="testimonial-quote-block"
        >
          <Quote 
            className="w-6 h-6 mb-4 opacity-30" 
            style={{ color: "#10B981" }}
          />
          <blockquote className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6">
            "Monospace Digital delivers robust engineering. They don't just build websites; they craft cohesive, stable digital systems that scale predictably. Their direct, no-nonsense methodology saved us months of development time."
          </blockquote>
          <div className="font-mono text-xs uppercase tracking-wider">
            <span className="font-bold text-zinc-950 dark:text-zinc-100">Marcus Chen</span>
            <span className="text-zinc-400 dark:text-zinc-500"> // VP of Engineering, Vektor Technologies</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Shield, Cpu, Sparkles } from "lucide-react";
import { audioEngine } from "../utils/audioEngine";

gsap.registerPlugin(ScrollTrigger);

interface EditorialWorkProps {
  theme: "light" | "dark";
}

export default function EditorialWork({ theme }: EditorialWorkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;

    const anims: gsap.core.Tween[] = [];

    if (card1) {
      const t1 = gsap.fromTo(
        card1.querySelector(".work-cover-img"),
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: card1,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      anims.push(t1);
    }

    if (card2) {
      const t2 = gsap.fromTo(
        card2.querySelector(".work-cover-img"),
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: card2,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      anims.push(t2);
    }

    return () => {
      anims.forEach((anim) => anim.kill());
    };
  }, []);

  const projects = [
    {
      id: "project-aura",
      num: "I",
      title: "Aura Ledger",
      category: "REAL-TIME SEMANTIC CRYPTO-ROUTING",
      desc: "A custom high-throughput transaction ledger and neural routing platform, engineered to safely pipeline millions of micro-transactions per second with zero-latency compliance logic.",
      ref: card1Ref,
      accent: theme === "dark" ? "#10B981" : "#059669",
      mockup: (
        <div className="absolute inset-0 flex flex-col justify-between p-8 font-mono text-[10px] select-none">
          <div className="flex items-center justify-between border-b border-zinc-800/30 dark:border-zinc-800 pb-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" style={{ color: theme === "dark" ? "#10B981" : "#059669" }} />
              <span className="font-semibold tracking-wider text-zinc-800 dark:text-zinc-200 uppercase">SYS_LEDGER_AURA</span>
            </div>
            <span className="text-zinc-400 dark:text-zinc-500">v4.1.2</span>
          </div>

          {/* Minimal green digital data feed */}
          <div className="my-auto flex flex-col space-y-4">
            <div className="flex justify-between items-end border-b border-zinc-800/20 pb-1.5">
              <span className="text-zinc-400">LEDGER_STATE</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100" style={{ color: theme === "dark" ? "#10B981" : "#059669" }}>SYNCHRONIZED // 100%</span>
            </div>
            <div className="flex justify-between items-end border-b border-zinc-800/20 pb-1.5">
              <span className="text-zinc-400">THROUGHPUT</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">842,109 TPS</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-zinc-400">ROUTING_AI_AGENT</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">ACTIVE // SECURE</span>
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-zinc-400">
            <span>COORD: 34.05 // -118.24</span>
            <span>SYSTEM_SECURE_TRUST</span>
          </div>
        </div>
      ),
    },
    {
      id: "project-kallima",
      num: "II",
      title: "Kallima Labs",
      category: "AUTONOMOUS QUANT AGENTS",
      desc: "An intelligent quantitative portfolio supervisor driven by specialized LLM logic streams, monitoring real-time options anomalies and dispatching sovereign hedging protocols.",
      ref: card2Ref,
      accent: theme === "dark" ? "#10B981" : "#059669",
      mockup: (
        <div className="absolute inset-0 flex flex-col justify-between p-8 font-mono text-[10px] select-none">
          <div className="flex items-center justify-between border-b border-zinc-800/30 dark:border-zinc-800 pb-4">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4" style={{ color: theme === "dark" ? "#10B981" : "#059669" }} />
              <span className="font-semibold tracking-wider text-zinc-800 dark:text-zinc-200 uppercase">KALLIMA_QUANT_CORE</span>
            </div>
            <span className="text-zinc-400 dark:text-zinc-500">v1.0.8</span>
          </div>

          {/* Minimal beautiful graph */}
          <div className="h-28 border border-zinc-800/20 dark:border-zinc-800 bg-zinc-900/5 dark:bg-zinc-900/20 rounded-sm relative overflow-hidden flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" fill="none" preserveAspectRatio="none">
              <path 
                d="M0,90 Q60,20 120,80 T240,40 T360,70 T400,20" 
                stroke={theme === "dark" ? "rgba(16, 185, 129, 0.7)" : "rgba(5, 150, 105, 0.7)"} 
                strokeWidth="1.5" 
                fill="none" 
              />
              <circle cx="120" cy="80" r="3" fill={theme === "dark" ? "#10B981" : "#059669"} />
              <circle cx="240" cy="40" r="3" fill={theme === "dark" ? "#10B981" : "#059669"} />
            </svg>
            <div className="absolute top-2 left-3 bg-zinc-50 dark:bg-zinc-950 px-2 py-0.5 border border-zinc-200 dark:border-zinc-800 rounded-sm">
              <span className="text-[8px] text-zinc-500">HEURISTIC_PREDICT_SCORE: 98.4%</span>
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-zinc-400">
            <span>LLM_REASON_STREAM: ONLINE</span>
            <span>MODEL: OMNI_AGENT</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="work-section"
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
          03 — SELECTED WORK
        </span>
      </div>

      {/* Case Studies Stacked Elegantly */}
      <div className="max-w-7xl mx-auto space-y-48">
        {projects.map((project) => (
          <div
            key={project.id}
            ref={project.ref}
            id={project.id}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            {/* Project Cover - Full width image block placeholder */}
            <div className="lg:col-span-8 relative">
              <div 
                className="work-cover-img w-full aspect-[16/9] border rounded-sm overflow-hidden relative shadow-2xl transition-all duration-700 hover:scale-[1.01]"
                style={{
                  backgroundColor: theme === "dark" ? "#121214" : "#F4F1EC",
                  borderColor: theme === "dark" ? "rgba(16,185,129,0.15)" : "rgba(5,150,105,0.15)",
                }}
              >
                {/* Background grid representation */}
                <div className={`absolute inset-0 opacity-15 pointer-events-none ${
                  theme === "dark" ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
                }`} />

                {/* Ambient Soft Green Backglow within cover */}
                <div 
                  className="absolute w-[200px] h-[200px] rounded-full blur-[60px] opacity-25 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background: theme === "dark"
                      ? "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 75%)"
                      : "radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 75%)",
                  }}
                />

                {/* Styled Placeholder Cover Layout */}
                {project.mockup}
              </div>
            </div>

            {/* Project Caption */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full pt-2">
              <div className="space-y-4">
                <div className="flex items-baseline space-x-3">
                  <span 
                    className="font-serif text-lg italic transition-colors"
                    style={{ color: project.accent }}
                  >
                    {project.num}
                  </span>
                  <h3 
                    className="font-serif text-3xl font-light tracking-tight transition-colors duration-500"
                    style={{
                      color: theme === "dark" ? "#EAE7E2" : "#1A1A1C",
                    }}
                  >
                    {project.title}
                  </h3>
                </div>

                <div 
                  className="font-mono text-[9px] tracking-widest uppercase transition-colors"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </div>

                <p 
                  className="font-sans text-xs tracking-wide leading-relaxed transition-colors duration-500"
                  style={{
                    color: theme === "dark" ? "#A5A29D" : "#5C5954",
                  }}
                >
                  {project.desc}
                </p>
              </div>

              {/* Minimalist interactive link */}
              <button
                id={`${project.id}-cta-btn`}
                onMouseEnter={() => audioEngine.playClick()}
                className="group mt-8 inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase transition-colors self-start"
                style={{
                  color: theme === "dark" ? "#10B981" : "#059669",
                }}
              >
                <span>VISUALIZE SYSTEM</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Metric-style stat line quietly added below selected work */}
      <div 
        className="max-w-7xl mx-auto border-t mt-36 pt-12 flex flex-col sm:flex-row items-baseline justify-between transition-colors duration-500"
        style={{
          borderColor: theme === "dark" ? "rgba(16,185,129,0.1)" : "rgba(5,150,105,0.12)"
        }}
      >
        <span 
          className="font-serif text-4xl sm:text-5xl font-light transition-colors duration-500"
          style={{ color: theme === "dark" ? "#EAE7E2" : "#1A1A1C" }}
        >
          40+ <span className="italic">projects shipped</span>
        </span>
        <span 
          className="font-mono text-[9px] tracking-widest uppercase mt-4 sm:mt-0 transition-colors duration-500"
          style={{ color: theme === "dark" ? "#7D7B77" : "#8C8983" }}
        >
          MAINTAINING 99.99% RUNTIME SLA SINCE 2020
        </span>
      </div>
    </section>
  );
}

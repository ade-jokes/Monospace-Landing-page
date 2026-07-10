import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ShieldCheck, Cpu, Layout } from "lucide-react";
import { audioEngine } from "../utils/audioEngine";
import { register3DTilt } from "../utils/tiltEffect";

gsap.registerPlugin(ScrollTrigger);

interface WorkShowcaseProps {
  theme: "light" | "dark";
}

export default function WorkShowcase({ theme }: WorkShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mockupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    mockupRefs.current.forEach((el) => {
      if (el) {
        const cleanup = register3DTilt(el, { maxRotation: 6, scale: 1.02 });
        cleanups.push(cleanup);
      }
    });
    return () => {
      cleanups.forEach((cb) => cb());
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectsRef.current.forEach((project) => {
        if (!project) return;
        const textElements = project.querySelectorAll(".animate-text");
        const visualElement = project.querySelector(".animate-visual");
        const isAura = project.id === "project-case-aura";

        if (isAura) {
          const auraHeader = project.querySelector(".aura-animate-header");
          const auraChart = project.querySelector(".aura-animate-chart");
          const auraStats = project.querySelectorAll(".aura-animate-stat");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          });

          tl.fromTo(
            visualElement,
            { opacity: 0, scale: 0.95, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" }
          ).fromTo(
            textElements,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            "-=0.45"
          ).fromTo(
            auraHeader,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "-=0.3"
          ).fromTo(
            auraChart,
            { opacity: 0, scale: 0.92, y: 15 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          ).fromTo(
            auraStats,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
            "-=0.15"
          );
        } else {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          });

          tl.fromTo(
            visualElement,
            { opacity: 0, scale: 0.95, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" }
          ).fromTo(
            textElements,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            "-=0.4"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: "vektor",
      title: "Vektor AI Engine",
      client: "Vektor Technologies",
      role: "AI Architecture & Interface Design",
      tech: ["React/Vite", "FastAPI", "TensorRT", "TailwindCSS"],
      desc: "Developed a mission-critical AI inference engine executing real-time logistics pipelines with latency metrics below 80ms globally.",
      link: "#",
      // Gradient / Mockup layout for browser mockup
      mockupBg: "from-slate-950 via-zinc-900 to-emerald-950",
      accent: "#10B981",
      visualContent: (
        <div className="p-6 h-full flex flex-col justify-between font-mono text-[10px]">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Cpu className="w-4 h-4" style={{ color: "#10B981" }} />
              <span className="font-semibold uppercase tracking-wider text-zinc-100">VEKTOR_NODE_v4.2</span>
            </div>
            <span className="text-emerald-400 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              <span>SYSTEM_LIVE</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 my-auto">
            <div className="p-3 border border-zinc-800 bg-zinc-900/50 rounded-sm">
              <span className="text-zinc-500 block">LATENCY</span>
              <span className="text-lg font-bold text-zinc-100">74.2 ms</span>
            </div>
            <div className="p-3 border border-zinc-800 bg-zinc-900/50 rounded-sm">
              <span className="text-zinc-500 block">THROUGHPUT</span>
              <span className="text-lg font-bold text-zinc-100">99.8%</span>
            </div>
            <div className="p-3 border border-zinc-800 bg-zinc-900/50 rounded-sm">
              <span className="text-zinc-500 block">ACCURACY</span>
              <span className="text-lg font-bold text-zinc-100">99.992%</span>
            </div>
          </div>

          <div className="border border-zinc-800 bg-zinc-950/80 p-3 rounded-sm space-y-1.5">
            <div className="flex justify-between text-zinc-400">
              <span>[06:46:12] Initializing model parameters...</span>
              <span className="text-emerald-500">OK</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>[06:46:15] Compiling TensorRT optimization pipelines...</span>
              <span className="text-emerald-500">OK</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span className="text-zinc-400">[06:46:21] WebGL Canvas listening on port 3000</span>
              <span style={{ color: "#10B981" }}>HOST_OK</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "aura",
      title: "Aura Protocol",
      client: "Aura Labs",
      role: "High-Frequency System Architecture",
      tech: ["Rust", "NextJS", "GraphQL", "WebSockets"],
      desc: "Designed and engineered the central web layout and real-time visualization layer for Aura's decentralized high-frequency routing pipeline.",
      link: "#",
      mockupBg: "from-zinc-950 via-zinc-900 to-emerald-950",
      accent: "#10B981",
      visualContent: (
        <div className="p-6 h-full flex flex-col justify-between font-mono text-[10px] transition-all duration-500 hover:bg-emerald-950/20 hover:shadow-[0_0_50px_rgba(16,185,129,0.25),_inset_0_0_30px_rgba(16,185,129,0.18)] group/aura">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 aura-animate-header opacity-0 transition-colors duration-300 group-hover/aura:border-emerald-800/40">
            <div className="flex items-center space-x-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4 transition-transform duration-700 group-hover/aura:rotate-[360deg]" style={{ color: "#10B981" }} />
              <span className="font-semibold uppercase tracking-wider text-zinc-100 group-hover/aura:text-emerald-400 transition-colors duration-300">AURA_ROUTING_SECURE</span>
            </div>
            <span className="text-emerald-400 group-hover/aura:text-emerald-300 transition-colors duration-300">v1.0.8</span>
          </div>

          <div className="relative border border-zinc-800 bg-zinc-900/20 p-4 h-32 rounded-sm flex items-center justify-center overflow-hidden aura-animate-chart opacity-0 transition-all duration-500 group-hover/aura:border-emerald-500/30 group-hover/aura:bg-zinc-900/40">
            {/* Visual graph line representing routing data in emerald */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" fill="none" preserveAspectRatio="none">
              <path 
                className="transition-all duration-500 group-hover/aura:stroke-emerald-400 group-hover/aura:[filter:drop-shadow(0_0_8px_#10B981)]"
                d="M0,90 Q50,30 100,70 T200,40 T300,80 T400,20" 
                stroke="rgba(16, 185, 129, 0.8)" 
                strokeWidth="2" 
                fill="none" 
              />
              <path d="M0,100 L0,90 Q50,30 100,70 T200,40 T300,80 T400,20 L400,120 Z" fill="url(#aura-grad)" opacity="0.15" />
              <defs>
                <linearGradient id="aura-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#09090B" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-2 left-3 bg-zinc-950/80 px-2 py-0.5 border border-zinc-800 rounded-sm transition-colors duration-300 group-hover/aura:border-emerald-500/40 group-hover/aura:text-emerald-400">
              <span className="text-zinc-400 group-hover/aura:text-emerald-300">FLOW_EFFICIENCY: 98.4%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="p-2.5 border border-zinc-800 bg-zinc-900/30 rounded-sm flex justify-between items-center aura-animate-stat opacity-0 transition-all duration-500 group-hover/aura:border-emerald-500/30 group-hover/aura:bg-emerald-950/10">
              <span className="text-zinc-500 group-hover/aura:text-emerald-500/80 transition-colors">PACKETS_SEC</span>
              <span className="text-emerald-300 font-bold group-hover/aura:text-emerald-200 transition-colors">14,204</span>
            </div>
            <div className="p-2.5 border border-zinc-800 bg-zinc-900/30 rounded-sm flex justify-between items-center aura-animate-stat opacity-0 transition-all duration-500 group-hover/aura:border-emerald-500/30 group-hover/aura:bg-emerald-950/10">
              <span className="text-zinc-500 group-hover/aura:text-emerald-500/80 transition-colors">COMPLIANCE</span>
              <span className="text-emerald-300 font-bold group-hover/aura:text-emerald-200 transition-colors">100% // HIGH</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "kinetik",
      title: "Kinetik Portal",
      client: "Kinetik Logistics",
      role: "Interface Design & Web Engineering",
      tech: ["React", "D3.js", "Node.js", "TailwindCSS"],
      desc: "An ultra-dense telemetry panel and core platform interface that optimizes high-volume warehouse transport and live vehicle tracking.",
      link: "#",
      mockupBg: "from-zinc-950 via-zinc-900 to-emerald-950",
      accent: "#10B981",
      visualContent: (
        <div className="p-6 h-full flex flex-col justify-between font-mono text-[10px]">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Layout className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider text-zinc-100">KINETIK_PORTAL_LIVE</span>
            </div>
            <span className="text-[#10B981] font-bold font-mono">GRID_A-9</span>
          </div>

          <div className="grid grid-cols-4 gap-2 my-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((block) => (
              <div 
                key={block} 
                className="h-10 border border-zinc-800 bg-zinc-900/40 rounded-sm flex flex-col items-center justify-center relative overflow-hidden"
              >
                <span className="text-zinc-500 block text-[8px]">BAY_{block}</span>
                <span className={`text-[10px] font-bold ${block % 3 === 0 ? "text-[#10B981]" : "text-zinc-300"}`}>
                  {block % 3 === 0 ? "92%" : "40%"}
                </span>
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-[#10B981]/40" 
                  style={{ width: block % 3 === 0 ? "92%" : "40%" }} 
                />
              </div>
            ))}
          </div>

          <div className="p-3 border border-zinc-800 bg-zinc-950 rounded-sm flex items-center justify-between">
            <span className="text-zinc-400">ACTIVE_FLEET_UNITS</span>
            <span className="text-[#10B981] font-bold font-mono">3,492 / 3,500 ONLINE</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section
      ref={containerRef}
      id="work"
      className="py-24 sm:py-32 border-b transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#0A0A0A" : "#FAFAFA",
        borderColor: theme === "dark" ? "rgba(39, 39, 42, 0.5)" : "rgba(228, 228, 231, 0.5)",
        color: theme === "dark" ? "#FAFAFA" : "#0A0A0A"
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block mb-2">
              [ CLIENT CASE STUDIES ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
              Selected Projects
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500 max-w-xs">
            WE DO NOT COMPROMISE ON INFRASTRUCTURE DESIGN // REAL SYSTEM RESULTS
          </p>
        </div>

        {/* Vertical List of Massive Case Studies */}
        <div className="space-y-32">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              ref={(el) => (projectsRef.current[idx] = el)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              id={`project-case-${proj.id}`}
            >
              {/* Left Column: Visual Mockup Browser Frame */}
              <div className="lg:col-span-7 animate-visual opacity-0 scale-95">
                {/* 
                  DEVELOPER NOTICE FOR SWAPPING IN REAL IMAGES:
                  To swap in a real project screenshot in place of the CSS browser-mockup:
                  Replace the entire inner contents of the browser frame div (lines below) with:
                  <img src="/path/to/screenshot.png" alt={proj.title} className="w-full h-auto object-cover" />
                */}
                <div 
                  ref={(el) => (mockupRefs.current[idx] = el)}
                  className="w-full border rounded-md shadow-2xl overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-[#10B981]/40 hover:shadow-[#10B981]/5 cursor-pointer"
                  onMouseEnter={() => { audioEngine.playClick(); }}
                  style={{
                    borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
                    boxShadow: theme === "dark" ? "0 25px 50px -12px rgba(0,0,0,0.6)" : "0 25px 50px -12px rgba(0,0,0,0.08)"
                  }}
                >
                  {/* Browser top-bar */}
                  <div 
                    className="flex items-center justify-between px-4 py-3 border-b text-xs font-mono"
                    style={{
                      backgroundColor: theme === "dark" ? "#121212" : "#F4F4F5",
                      borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                      color: theme === "dark" ? "#71717A" : "#71717A"
                    }}
                  >
                    {/* Traffic Lights */}
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                    </div>
                    {/* URL bar mock */}
                    <div className="bg-zinc-800/10 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 px-3 py-0.5 rounded text-[10px] w-64 text-center select-none truncate">
                      https://monospace.digital/case/{proj.id}
                    </div>
                    <div className="w-10" />
                  </div>

                  {/* Browser content */}
                  <div 
                    className={`aspect-[16/10] bg-gradient-to-br ${proj.mockupBg} relative overflow-hidden`}
                  >
                    {/* Abstract Grid background */}
                    <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
                    {proj.visualContent}
                  </div>
                </div>
              </div>

              {/* Right Column: Text Information */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 font-mono text-[10px] tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                    <span className="animate-text opacity-0">[{proj.client}]</span>
                    <span className="animate-text opacity-0">•</span>
                    <span className="animate-text opacity-0 uppercase">{proj.role}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight animate-text opacity-0">
                    {proj.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal animate-text opacity-0">
                  {proj.desc}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 animate-text opacity-0">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 font-mono text-[9px] tracking-wider border rounded-sm"
                      style={{
                        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                        backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)",
                        color: theme === "dark" ? "#D4D4D8" : "#27272A"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Case Study Link */}
                <div className="pt-4 animate-text opacity-0">
                  <a
                    href={proj.link}
                    onMouseEnter={() => { audioEngine.playClick(); }}
                    onClick={() => { audioEngine.playSweep(); }}
                    className="inline-flex items-center space-x-2 font-mono text-xs tracking-wider uppercase font-bold border-b-2 pb-1 hover:opacity-80 transition-opacity"
                    style={{
                      borderColor: "#10B981",
                      color: "#10B981"
                    }}
                  >
                    <span>Read_Full_Case_Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

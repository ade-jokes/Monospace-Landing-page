"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Sun, Moon, ArrowRight, ArrowUpRight, Cpu, 
  BrainCircuit, Compass, Workflow, ShieldCheck, 
  Layout, Quote, Search, Hammer, Activity, Zap, Terminal, ShieldAlert 
} from "lucide-react";

// Register ScrollTrigger safely in browser context
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MonospaceLandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState("web_dev");
  const [submitted, setSubmitted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Refs for GSAP
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const heroGridRef = useRef<HTMLDivElement>(null);
  
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const capItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const workRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const socialRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  
  const processRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const contactRef = useRef<HTMLDivElement>(null);
  const contactTextRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // Theme Sync effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  // GSAP Animations Effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Load Animation (Staggered sequence under 0.8s)
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set([headlineRef.current, subheadRef.current, ctaGroupRef.current, statusRef.current], {
        opacity: 0,
        y: 20
      });
      gsap.set(heroGridRef.current, { opacity: 0 });

      heroTl.to(heroGridRef.current, { opacity: 0.6, duration: 1.2 })
        .to(statusRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.8")
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .to(subheadRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
        .to(ctaGroupRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");

      // Interactive mouse-grid effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const { clientX, clientY } = e;
        const { width, height } = heroRef.current.getBoundingClientRect();
        const xPos = (clientX / width - 0.5) * 15;
        const yPos = (clientY / height - 0.5) * 15;

        gsap.to(heroGridRef.current, {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: "power2.out"
        });
      };
      window.addEventListener("mousemove", handleMouseMove);

      // 2. Capabilities Scroll Entrance
      const activeCaps = capItemsRef.current.filter((item): item is HTMLDivElement => item !== null);
      gsap.fromTo(
        activeCaps,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: capabilitiesRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Work Showcase Scroll Entrance
      projectsRef.current.forEach((project) => {
        if (!project) return;
        const textElements = project.querySelectorAll(".animate-text");
        const visualElement = project.querySelector(".animate-visual");

        const workTl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        });

        workTl.fromTo(
          visualElement,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" }
        ).fromTo(
          textElements,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.4"
        );
      });

      // 4. Social Proof Logos & Testimonial Reveal
      if (logosRef.current) {
        gsap.fromTo(
          logosRef.current.children,
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
      }
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

      // 5. Process Steps Entrance
      const activeSteps = stepsRef.current.filter((step): step is HTMLDivElement => step !== null);
      gsap.fromTo(
        activeSteps,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 6. Closing CTA Reveal
      gsap.fromTo(
        [contactTextRef.current, consoleRef.current],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitted(true);
    setLogs(["[SYSTEM_LOG] Initializing secure telemetry socket...", "CONNECTING TO HOST: monospace.digital_db..."]);

    const scriptLogs = [
      "[SYS_OK] Secure SSH handshake complete.",
      `[PAYLOAD] Routing target scope: ${scope.toUpperCase()}`,
      `[PAYLOAD] Client contact: ${email}`,
      "[SYS_TRANSACT] Committing request payload directly to distributed storage...",
      "[DB_COMMIT] Data block appended successfully (HASH: MD_f839a9b2).",
      "[SYS_COMPLETE] Project initiation submitted.",
      "[SYS_NOTIFICATION] Partner notified. ETA for callback: < 3 hours."
    ];

    scriptLogs.forEach((logText, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, logText]);
      }, (index + 1) * 400);
    });
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300 font-sans select-text selection:bg-cyan-400 selection:text-zinc-950"
      style={{
        backgroundColor: theme === "dark" ? "#0A0A0A" : "#FAFAFA",
        color: theme === "dark" ? "#FAFAFA" : "#0A0A0A"
      }}
    >
      {/* HEADER NAVBAR */}
      <nav 
        className="fixed top-0 left-0 w-full z-50 border-b backdrop-blur-md transition-colors duration-300 bg-opacity-80"
        style={{
          backgroundColor: theme === "dark" ? "rgba(10, 10, 10, 0.8)" : "rgba(250, 250, 250, 0.8)",
          borderColor: theme === "dark" ? "rgba(39, 39, 42, 0.8)" : "rgba(228, 228, 231, 0.8)",
          color: theme === "dark" ? "#F4F4F5" : "#18181B"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center space-x-2 font-mono text-sm tracking-widest font-semibold uppercase">
            <span className="p-1.5 bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 rounded-sm font-bold text-xs">
              M_D
            </span>
            <span className="hidden sm:inline">Monospace Digital</span>
          </a>

          <div className="hidden md:flex items-center space-x-8 text-xs tracking-wider uppercase font-mono">
            <a href="#capabilities" className="hover:text-cyan-400 transition-colors">01/ Capabilities</a>
            <a href="#work" className="hover:text-cyan-400 transition-colors">02/ Selected Work</a>
            <a href="#process" className="hover:text-cyan-400 transition-colors">03/ Our Process</a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 border rounded-md transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-cyan-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>

            <a
              href="#contact"
              className="flex items-center space-x-2 bg-zinc-950 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 px-4 py-2 text-xs tracking-wider uppercase font-mono font-medium hover:opacity-90 transition-opacity rounded-sm"
            >
              <span>Project_Initiate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden transition-colors duration-300"
        style={{
          backgroundColor: theme === "dark" ? "#0A0A0A" : "#FAFAFA",
          color: theme === "dark" ? "#FAFAFA" : "#0A0A0A"
        }}
      >
        <div
          ref={heroGridRef}
          className={`absolute inset-0 z-0 pointer-events-none opacity-40 transition-all duration-500 ${
            theme === "dark" ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
          }`}
          style={{
            backgroundSize: "40px 40px",
            backgroundImage: theme === "dark" 
              ? "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)"
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col justify-center items-start text-left">
          <div 
            ref={statusRef}
            className="flex items-center space-x-2 font-mono text-[10px] tracking-widest uppercase mb-6 px-2.5 py-1 rounded-sm border opacity-0"
            style={{
              borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)",
              color: theme === "dark" ? "#00F0FF" : "#0052FF"
            }}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>SYS_STATUS: READY // EST_2026</span>
          </div>

          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8 opacity-0"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            We build <br />
            <span style={{ color: theme === "dark" ? "#00F0FF" : "#0052FF" }}>digital systems</span> <br />
            that endure.
          </h1>

          <p
            ref={subheadRef}
            className="max-w-2xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-zinc-500 dark:text-zinc-400 mb-10 opacity-0"
          >
            Monospace Digital is a premium digital studio crafting high-performance web products, intelligent AI systems, and robust automation architectures for industry leaders.
          </p>

          <div ref={ctaGroupRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto opacity-0">
            <a
              href="#contact"
              className="group flex items-center justify-center space-x-3 px-8 py-4 text-xs tracking-widest font-mono font-medium uppercase rounded-sm transition-all duration-300"
              style={{
                backgroundColor: theme === "dark" ? "#FAFAFA" : "#0A0A0A",
                color: theme === "dark" ? "#0A0A0A" : "#FAFAFA"
              }}
            >
              <span>Start_a_Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <a
              href="#work"
              className="group flex items-center justify-center space-x-3 px-8 py-4 text-xs tracking-widest font-mono font-medium uppercase rounded-sm border transition-all duration-300"
              style={{
                borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
                color: theme === "dark" ? "#FAFAFA" : "#0A0A0A"
              }}
            >
              <span>View_Our_Work</span>
            </a>
          </div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section
        ref={capabilitiesRef}
        id="capabilities"
        className="py-24 sm:py-32 border-b transition-colors duration-300"
        style={{
          backgroundColor: theme === "dark" ? "#0A0A0A" : "#FAFAFA",
          borderColor: theme === "dark" ? "rgba(39, 39, 42, 0.5)" : "rgba(228, 228, 231, 0.5)"
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block mb-2">[ SERVICES & SCOPE ]</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">Our Core Capabilities</h2>
            </div>
            <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">ENGINEERED EFFICIENCY // HIGH-CONVICTION IMPLEMENTATION</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { index: "01", icon: Cpu, title: "Web Development", desc: "Full-stack high-fidelity engineering." },
              { index: "02", icon: BrainCircuit, title: "AI & Automation", desc: "Custom intelligent systems & agents." },
              { index: "03", icon: Compass, title: "Design", desc: "High-density system-driven interfaces." },
              { index: "04", icon: Workflow, title: "Consulting", desc: "High-leverage engineering advisement." }
            ].map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  ref={(el) => (capItemsRef.current[i] = el)}
                  className="relative border p-8 flex flex-col justify-between h-48 rounded-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-300 group opacity-0"
                  style={{
                    borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                    backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.01)" : "rgba(0, 0, 0, 0.01)"
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">{cap.index}//</span>
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" style={{ color: theme === "dark" ? "#00F0FF" : "#0052FF" }} />
                  </div>
                  <div className="mt-8">
                    <h3 className="font-display text-lg font-bold tracking-tight uppercase mb-1">{cap.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono font-medium">{cap.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section
        ref={workRef}
        id="work"
        className="py-24 sm:py-32 border-b transition-colors duration-300"
        style={{
          backgroundColor: theme === "dark" ? "#0A0A0A" : "#FAFAFA",
          borderColor: theme === "dark" ? "rgba(39, 39, 42, 0.5)" : "rgba(228, 228, 231, 0.5)"
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block mb-2">[ CLIENT CASE STUDIES ]</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">Selected Projects</h2>
            </div>
            <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500 max-w-xs">WE DO NOT COMPROMISE ON INFRASTRUCTURE DESIGN // REAL SYSTEM RESULTS</p>
          </div>

          <div className="space-y-32">
            {[
              {
                id: "vektor",
                title: "Vektor AI Engine",
                client: "Vektor Technologies",
                role: "AI Architecture & Interface Design",
                tech: ["React/Vite", "FastAPI", "TensorRT"],
                desc: "Developed a mission-critical AI inference engine executing real-time logistics pipelines with latency metrics below 80ms globally.",
                accent: "#00F0FF",
                visual: (
                  <div className="p-6 h-full flex flex-col justify-between font-mono text-[10px]">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <span className="text-cyan-400 font-bold">VEKTOR_NODE_v4.2</span>
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                        <span>SYSTEM_LIVE</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 border border-zinc-800 bg-zinc-900/50 rounded-sm">
                        <span className="text-zinc-500 block text-[8px]">LATENCY</span>
                        <span className="text-xs font-bold text-zinc-100">74.2 ms</span>
                      </div>
                      <div className="p-2 border border-zinc-800 bg-zinc-900/50 rounded-sm">
                        <span className="text-zinc-500 block text-[8px]">THROUGH</span>
                        <span className="text-xs font-bold text-zinc-100">99.8%</span>
                      </div>
                      <div className="p-2 border border-zinc-800 bg-zinc-900/50 rounded-sm">
                        <span className="text-zinc-500 block text-[8px]">ACCUR</span>
                        <span className="text-xs font-bold text-zinc-100">99.9%</span>
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
                tech: ["Rust", "NextJS", "GraphQL"],
                desc: "Designed and engineered the central web layout and real-time visualization layer for Aura's decentralized high-frequency routing pipeline.",
                accent: "#6366F1",
                visual: (
                  <div className="p-6 h-full flex flex-col justify-between font-mono text-[10px]">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <span className="text-indigo-400 font-bold">AURA_ROUTING_SECURE</span>
                      <span className="text-zinc-500">v1.0.8</span>
                    </div>
                    <div className="border border-zinc-800 bg-zinc-900/20 p-4 h-16 rounded-sm flex items-center justify-center">
                      <span className="text-indigo-300">SECURE_TUNNEL_ACTIVE</span>
                    </div>
                  </div>
                )
              }
            ].map((proj, idx) => (
              <div
                key={proj.id}
                ref={(el) => (projectsRef.current[idx] = el)}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                <div className="lg:col-span-7 animate-visual opacity-0 scale-95">
                  <div className="w-full border rounded-md overflow-hidden shadow-2xl" style={{ borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)" }}>
                    <div className="flex items-center justify-between px-4 py-2 border-b text-[10px] font-mono bg-zinc-900 text-zinc-500 border-zinc-800">
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500/60" />
                        <span className="w-2 h-2 rounded-full bg-amber-500/60" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
                      </div>
                      <div>https://monospace.digital/case/{proj.id}</div>
                      <div className="w-6" />
                    </div>
                    <div className="aspect-[16/10] bg-zinc-950 relative">
                      {proj.visual}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-1">
                    <div className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase animate-text opacity-0">[{proj.client}] // {proj.role}</div>
                    <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight animate-text opacity-0">{proj.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 animate-text opacity-0">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2 animate-text opacity-0">
                    {proj.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 font-mono text-[9px] tracking-wider border rounded-sm border-zinc-800 bg-zinc-900/10 text-zinc-400">{t}</span>
                    ))}
                  </div>
                  <div className="pt-2 animate-text opacity-0">
                    <a href="#" className="inline-flex items-center space-x-2 font-mono text-xs tracking-wider uppercase font-semibold border-b pb-0.5 hover:opacity-80" style={{ color: theme === "dark" ? "#00F0FF" : "#0052FF", borderColor: theme === "dark" ? "#00F0FF" : "#0052FF" }}>
                      <span>Read_Full_Case</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section
        ref={socialRef}
        id="social-proof"
        className="py-24 sm:py-32 border-b transition-colors duration-300"
        style={{
          backgroundColor: theme === "dark" ? "#0A0A0A" : "#FAFAFA",
          borderColor: theme === "dark" ? "rgba(39, 39, 42, 0.5)" : "rgba(228, 228, 231, 0.5)"
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block mb-2">[ TRUSTED PARTNERSHIPS ]</span>
            <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">Client Network</h2>
          </div>

          <div ref={logosRef} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-24">
            {["Vercel", "Linear", "Stripe", "Scale AI", "Sentry"].map((name) => (
              <div
                key={name}
                className="flex items-center justify-center space-x-2 border py-4 px-6 rounded-sm font-mono text-xs uppercase"
                style={{
                  borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                  backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.01)" : "rgba(0, 0, 0, 0.01)",
                  color: theme === "dark" ? "#A1A1AA" : "#52525B"
                }}
              >
                <span className="font-bold">{name}</span>
              </div>
            ))}
          </div>

          <div ref={quoteRef} className="max-w-3xl mx-auto border-l-2 pl-8 py-2 border-cyan-400 opacity-0">
            <Quote className="w-6 h-6 mb-4 opacity-30 text-cyan-400" />
            <blockquote className="text-base sm:text-lg md:text-xl text-zinc-700 dark:text-zinc-300 mb-6">
              "Monospace Digital delivers robust engineering. They don't just build websites; they craft cohesive, stable digital systems that scale predictably. Their direct, no-nonsense methodology saved us months of development time."
            </blockquote>
            <div className="font-mono text-xs uppercase">
              <span className="font-bold text-zinc-950 dark:text-zinc-100">Marcus Chen</span>
              <span className="text-zinc-400 dark:text-zinc-500"> // VP of Engineering, Vektor Technologies</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section
        ref={processRef}
        id="process"
        className="py-24 sm:py-32 border-b transition-colors duration-300"
        style={{
          backgroundColor: theme === "dark" ? "#0A0A0A" : "#FAFAFA",
          borderColor: theme === "dark" ? "rgba(39, 39, 42, 0.5)" : "rgba(228, 228, 231, 0.5)"
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block mb-2">[ THE PIPELINE ]</span>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight">Our Process</h2>
            </div>
            <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">NO FLUFF // RIGOROUS STAGES // ZERO DISCOVERY LAG</p>
          </div>

          <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 space-y-12">
            {[
              { num: "01", title: "TRIAGE & ARCHITECTURE", desc: "We define precise system boundaries, technology stacks, and performance SLAs up front." },
              { num: "02", title: "ENGINEERED CONSTRUCTION", desc: "Clean type-safe builds, high-fidelity layouts, and robust system code." },
              { num: "03", title: "PERFORMANCE VALIDATION", desc: "Comprehensive stress tests, loading speed tuning, and sub-100ms latency validations." },
              { num: "04", title: "DEPLOYMENT & EXECUTION", desc: "Immaculate production delivery backed by robust telemetry and scaling configurations." }
            ].map((step, idx) => (
              <div key={step.num} ref={(el) => (stepsRef.current[idx] = el)} className="relative pl-8 group opacity-0">
                <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full border bg-zinc-950 flex items-center justify-center border-zinc-800">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-2 font-mono text-xs tracking-wider font-bold text-cyan-400">PHASE_{step.num} //</div>
                  <div className="md:col-span-10 max-w-xl">
                    <h3 className="font-display text-sm font-bold uppercase tracking-tight mb-1">{step.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA (Always Dark) */}
      <section
        ref={contactRef}
        id="contact"
        className="py-24 sm:py-32 bg-zinc-950 text-zinc-100 border-b border-zinc-900 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div ref={contactTextRef} className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs tracking-widest text-cyan-400 font-bold uppercase block">[ CONTACT & INTAKE ]</span>
            <h2 className="font-display text-4xl font-black uppercase tracking-tighter leading-none">Ready to build <br /> at production <br /> capacity?</h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">We partner with high-conviction teams to construct enduring digital systems. Let's discuss requirements directly.</p>
          </div>

          <div ref={consoleRef} className="lg:col-span-6 border border-zinc-800 bg-zinc-900/40 p-6 rounded-sm shadow-2xl relative">
            {!submitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 font-mono text-[10px] text-zinc-400">
                  <span className="flex items-center space-x-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>PROJECT_INITIATION_SEQUENCE</span>
                  </span>
                </div>
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase text-zinc-400">Client_Email :</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-sm font-mono text-xs text-zinc-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button type="submit" className="w-full bg-cyan-400 text-zinc-950 py-3 text-xs tracking-widest font-mono font-bold uppercase rounded-sm hover:bg-cyan-300">
                  EXECUTE_INITIATE
                </button>
              </form>
            ) : (
              <div className="space-y-4 font-mono text-[10px]">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-cyan-400">
                  <span>TRANSACTION_SUCCESSFUL</span>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-sm h-32 overflow-y-auto space-y-1.5 text-zinc-300">
                  {logs.map((log, i) => <div key={i}>{log}</div>)}
                </div>
                <div className="flex items-center space-x-2 text-zinc-500 text-[9px] pt-1">
                  <ShieldAlert className="w-3 h-3 text-cyan-400" />
                  <span>Reviewing target scope. Callback initiated for {email}.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-12 border-t font-mono text-xs transition-colors duration-300"
        style={{
          backgroundColor: theme === "dark" ? "#0A0A0A" : "#FAFAFA",
          borderColor: theme === "dark" ? "rgba(39, 39, 42, 0.5)" : "rgba(228, 228, 231, 0.5)",
          color: theme === "dark" ? "#71717A" : "#71717A"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <span className="font-bold text-zinc-950 dark:text-zinc-100">MONOSPACE_DIGITAL</span>
            <span>© 2026 // All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#hero" className="hover:text-zinc-100">Top_▲</a>
            <a href="mailto:hello@monospace.digital" className="hover:text-zinc-100">hello@monospace.digital</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

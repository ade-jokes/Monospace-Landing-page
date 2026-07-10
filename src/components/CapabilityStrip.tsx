import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, BrainCircuit, Compass, Workflow } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface CapabilityStripProps {
  theme: "light" | "dark";
}

export default function CapabilityStrip({ theme }: CapabilityStripProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = itemsRef.current.filter((item): item is HTMLDivElement => item !== null);
      
      // Animate grid items as they enter the viewport
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // triggers when top of section enters 80% viewport height
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    {
      index: "01",
      icon: Cpu,
      title: "Web Development",
      desc: "Full-stack high-fidelity engineering."
    },
    {
      index: "02",
      icon: BrainCircuit,
      title: "AI & Automation",
      desc: "Custom intelligent systems & agents."
    },
    {
      index: "03",
      icon: Compass,
      title: "Design",
      desc: "High-density system-driven interfaces."
    },
    {
      index: "04",
      icon: Workflow,
      title: "Consulting",
      desc: "High-leverage engineering advisement."
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="py-24 sm:py-32 border-b transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#0A0A0A" : "#FAFAFA",
        borderColor: theme === "dark" ? "rgba(39, 39, 42, 0.5)" : "rgba(228, 228, 231, 0.5)",
        color: theme === "dark" ? "#FAFAFA" : "#0A0A0A"
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block mb-2">
              [ SERVICES & SCOPE ]
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              Our Core Capabilities
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
            ENGINEERED EFFICIENCY // HIGH-CONVICTION IMPLEMENTATION
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                ref={(el) => (itemsRef.current[i] = el)}
                className="relative border p-8 flex flex-col justify-between h-48 rounded-sm hover:border-[#10B981] dark:hover:border-[#10B981] transition-colors duration-300 group"
                style={{
                  borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                  backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.01)" : "rgba(0, 0, 0, 0.01)"
                }}
                id={`capability-${i}`}
              >
                {/* Meta Indicator - index + icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-wider text-[#10B981] font-bold">
                    {cap.index}//
                  </span>
                  <Icon 
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: "#10B981" }}
                  />
                </div>

                {/* Capability Info */}
                <div className="mt-8">
                  <h3 className="font-display text-lg font-black tracking-tight uppercase mb-1">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono font-bold">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

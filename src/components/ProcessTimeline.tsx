import { motion } from "motion/react";
import { Search, Code2, Rocket, LineChart } from "lucide-react";

interface ProcessTimelineProps {
  theme: "light" | "dark";
}

export default function ProcessTimeline({ theme }: ProcessTimelineProps) {
  const steps = [
    {
      stepNum: "01",
      title: "Audit & Discovery",
      icon: Search,
      desc: "We conduct exhaustive diagnostics of your digital assets, conversion funnels, and codebase. This data forms the baseline for all architectural and marketing decisions."
    },
    {
      stepNum: "02",
      title: "Software Engineering",
      icon: Code2,
      desc: "We build premium, type-safe custom applications designed for high load and enterprise scale. Our software is engineered for maximum performance and fluid motion."
    },
    {
      stepNum: "03",
      title: "Performance Launch",
      icon: Rocket,
      desc: "We launch multi-channel paid acquisition campaigns and search campaigns tuned for conversion velocity. No vanity metrics—just real, trackable revenue growth."
    },
    {
      stepNum: "04",
      title: "Data Intelligence Loop",
      icon: LineChart,
      desc: "We feed raw performance telemetry into unified decision engines and analytics dashboards. This loop ensures every digital Naira spent is fully optimized."
    }
  ];

  return (
    <section
      id="process"
      className="relative py-32 border-y border-emerald-950/20 overflow-hidden"
      style={{ backgroundColor: "#0D150D" }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-900/15 pb-8">
          <div className="max-w-xl">
            <span className="font-mono text-sm tracking-widest uppercase text-[#00C853] block mb-2">
              [ THE PIPELINE ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              Our Process
            </h2>
          </div>
          <p className="font-mono text-sm text-[#CCCCCC] max-w-xs uppercase tracking-wider">
            NO FLUFF // RIGOROUS STAGES // ZERO DISCOVERY LAG
          </p>
        </div>

        {/* Desktop Horizontal Line timeline indicator */}
        <div className="relative">
          <div 
            className="absolute top-[18px] left-[12%] right-[12%] h-[1.5px] bg-emerald-900/30 hidden md:block" 
          />
          
          {/* Main timeline step flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.stepNum}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start md:items-center text-left md:text-center group"
                >
                  {/* Desktop Bullet on Timeline Line */}
                  <div 
                    className="w-9 h-9 rounded-full border border-emerald-900/40 bg-[#0D150D] flex items-center justify-center mb-6 z-10 transition-colors duration-300 group-hover:border-[#00C853] hidden md:flex"
                  >
                    <Icon className="w-4 h-4 text-[#00C853]" />
                  </div>

                  {/* Big Number - 64px, semi-transparent green */}
                  <div className="text-[64px] font-mono font-extrabold leading-none select-none text-[#00C853]/30 tracking-tighter mb-4">
                    {step.stepNum}
                  </div>

                  {/* Title - 20px minimum */}
                  <h3 className="font-display text-[20px] font-bold tracking-tight text-white uppercase mb-3">
                    {step.title}
                  </h3>

                  {/* Description - 16px minimum, color #CCCCCC */}
                  <p className="text-base sm:text-[16px] leading-relaxed text-[#CCCCCC] font-normal max-w-xs md:px-2">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

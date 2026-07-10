import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import ParallaxMockup from "./ParallaxMockup";

interface MasterWorkProps {
  theme: "light" | "dark";
}

export default function MasterWork({ theme }: MasterWorkProps) {
  const accentColor = "var(--accent-custom)";
  const ruleColor = "var(--border-custom)";
  const textColorMuted = "text-muted-custom";

  const caseStudies = [
    {
      num: "01",
      client: "AMAZON PRIME VIDEO",
      category: "INTERACTIVE SOCIAL MARKETING",
      desc: "Built a custom localized sharing engine and interactive web environment for the blockbuster launch of 'Gangs of Lagos', driving immersive engagement and high-virality personalized graphics for consumers across Africa.",
      meta: {
        clientType: "Global Streaming Platform",
        service: "Web Tech & Moderation",
        outcome: "Highly Viral Launch Event"
      }
    },
    {
      num: "02",
      client: "PAGA",
      category: "PERFORMANCE MARKETING FUNNEL",
      desc: "Engineered data-driven paid advertising funnels across Google and Facebook. Lowered CPC significantly while multiplying in-app transactions and customer activities across regional fintech sectors.",
      meta: {
        clientType: "Fintech Leader (Africa)",
        service: "Paid Ads & Conversion Ops",
        outcome: "+38.94% Activity Boost"
      }
    },
    {
      num: "03",
      client: "NILE UNIVERSITY",
      category: "DECISION SYSTEMS & UNIFIED BI",
      desc: "Consolidated multi-channel digital performance pipelines from Facebook and Google Ads into an automated analytics report dashboard, enabling real-time decision support and campaign clarity.",
      meta: {
        clientType: "Leading Educational Institution",
        service: "Data BI & Reporting",
        outcome: "100% Unified Data Analytics"
      }
    }
  ];

  return (
    <section 
      id="work" 
      className="relative py-32 px-6 sm:px-12 md:px-24 overflow-hidden"
      style={{ 
        backgroundColor: "#0D1F0D", 
        border: "1px solid rgba(0, 255, 0, 0.15)" 
      }}
    >
      {/* Structural Borders drawing themselves on scroll entrance */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-12 sm:left-24 border-l origin-top" 
          style={{ borderColor: "rgba(0, 255, 0, 0.08)" }} 
        />
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 right-12 sm:right-24 border-r origin-bottom" 
          style={{ borderColor: "rgba(0, 255, 0, 0.08)" }} 
        />
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 border-b origin-right" 
          style={{ borderColor: "rgba(0, 255, 0, 0.08)" }} 
        />
      </div>

      {/* Chapter Marker */}
      <div className="relative z-10 border-b pb-8 mb-20" style={{ borderColor: "rgba(0, 255, 0, 0.15)" }}>
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="font-mono text-sm tracking-widest uppercase mb-4"
        >
          <span style={{ color: "#00C853" }}>WORK</span>
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#F0F0F0]"
        >
          Selected Case Studies
        </motion.h3>
      </div>

      {/* Main Cases Pacing - Convergent reveals with generous vertical margins */}
      <div className="relative z-10 space-y-36">
        {caseStudies.map((work, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-12%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
            >
              {/* Cover Mockup Panel with Butter-smooth Mouse Parallax */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-12%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className={`md:col-span-6 ${isEven ? "md:order-1" : "md:order-2"}`}
              >
                <ParallaxMockup
                  theme="dark"
                  num={work.num}
                  accentColor="#00C853"
                  ruleColor="rgba(0, 255, 0, 0.15)"
                />
              </motion.div>

              {/* Information Presentation */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-12%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className={`md:col-span-6 flex flex-col justify-center space-y-6 ${isEven ? "md:order-2" : "md:order-1"}`}
              >
                <div className="font-mono text-sm tracking-widest uppercase flex items-center space-x-2 text-[#CCCCCC]">
                  <span style={{ color: "#00C853" }}>{work.num}</span>
                  <span className="w-4 h-[1px]" style={{ backgroundColor: "#00C853" }} />
                  <span>{work.category}</span>
                </div>

                <h4 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F0F0F0]">
                  {work.client}
                </h4>

                <p 
                  className="font-sans text-base sm:text-[16px] font-normal leading-relaxed text-[#CCCCCC]"
                >
                  {work.desc}
                </p>

                {/* Real-time stats callouts specifically for Paga */}
                {work.client === "PAGA" && (
                  <div className="grid grid-cols-3 gap-3 py-2">
                    <div className="p-3 border border-emerald-900/30 bg-[#111811] rounded-md">
                      <div className="font-mono text-xl font-bold text-[#00C853]">+54%</div>
                      <div className="text-[14px] font-mono tracking-wider text-[#CCCCCC] uppercase mt-1">Activity Boost</div>
                    </div>
                    <div className="p-3 border border-emerald-900/30 bg-[#111811] rounded-md">
                      <div className="font-mono text-xl font-bold text-[#00C853]">-43%</div>
                      <div className="text-[14px] font-mono tracking-wider text-[#CCCCCC] uppercase mt-1">Lower CPC</div>
                    </div>
                    <div className="p-3 border border-emerald-900/30 bg-[#111811] rounded-md">
                      <div className="font-mono text-xl font-bold text-[#00C853]">+346%</div>
                      <div className="text-[14px] font-mono tracking-wider text-[#CCCCCC] uppercase mt-1">ROI</div>
                    </div>
                  </div>
                )}

                {/* Specific High-Trust Metadata Row */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t font-mono text-sm uppercase tracking-wider" style={{ borderColor: "rgba(0, 255, 0, 0.15)" }}>
                  <div>
                    <span className="block text-[#CCCCCC] mb-1">CLIENT TYPE</span>
                    <span className="font-semibold text-[#F0F0F0]">{work.meta.clientType}</span>
                  </div>
                  <div>
                    <span className="block text-[#CCCCCC] mb-1">SERVICE</span>
                    <span className="font-semibold text-[#F0F0F0]">{work.meta.service}</span>
                  </div>
                  <div>
                    <span className="block text-[#CCCCCC] mb-1">OUTCOME</span>
                    <span className="font-semibold text-[#00C853]">{work.meta.outcome}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    className="inline-flex items-center space-x-2 font-mono text-sm tracking-widest uppercase hover:opacity-80 transition-opacity"
                    style={{ color: "#00C853" }}
                  >
                    <span>VIEW ENGAGEMENT DETAIL</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

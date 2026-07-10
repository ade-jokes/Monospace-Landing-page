import { motion } from "motion/react";
import { Code2, Cpu, Layers, BarChart3 } from "lucide-react";

interface MasterServicesProps {
  theme: "light" | "dark";
}

export default function MasterServices({ theme }: MasterServicesProps) {
  const accentColor = "var(--accent-custom)";
  const ruleColor = "var(--border-custom)";
  const textColorMuted = "text-muted-custom";

  const services = [
    {
      num: "01",
      title: "Performance Marketing",
      icon: Layers,
      tagLine: "HIGH-ROI ACQUISITION ENGINE",
      desc: "Paid advertising, advanced campaign management, and conversion-optimized lead generation. Driven by exact ROI tracking to accelerate client acquisition and reduce advertising overhead."
    },
    {
      num: "02",
      title: "Web App Development",
      icon: Code2,
      tagLine: "SECURE & SCALABLE SOFTWARE",
      desc: "Custom web applications, robust corporate systems, and mobile platforms. Built using modern frameworks with a focus on responsive, secure, and production-ready architectures."
    },
    {
      num: "03",
      title: "Data Analytics & BI",
      icon: BarChart3,
      tagLine: "DECISION SUPPORT SYSTEMS",
      desc: "Interactive dashboards, unified reporting, and predictive analytics. We integrate complex data channels like Google and Facebook to drive insights based on actual evidence."
    },
    {
      num: "04",
      title: "Brand & SEO Strategy",
      icon: Cpu,
      tagLine: "STORYTELLING & ENGAGEMENT",
      desc: "Content marketing, local & technical SEO optimization, and automated email nurturing campaigns designed to amplify brand authority across Pan-African consumer spaces."
    }
  ];

  return (
    <section 
      id="services" 
      className="relative py-32 px-6 sm:px-12 md:px-24 overflow-hidden bg-bg-custom text-text-custom"
    >
      {/* Structural Borders drawing themselves on scroll entrance */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-12 sm:left-24 border-l origin-top" 
          style={{ borderColor: "var(--border-custom)" }} 
        />
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 right-12 sm:right-24 border-r origin-bottom" 
          style={{ borderColor: "var(--border-custom)" }} 
        />
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 border-b origin-right" 
          style={{ borderColor: "var(--border-custom)" }} 
        />
      </div>

      {/* Chapter Index Title */}
      <div className="relative z-10 border-b pb-8 mb-16" style={{ borderColor: "var(--border-custom)" }}>
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="font-mono text-sm tracking-widest uppercase mb-4"
        >
          <span style={{ color: "#00C853" }}>SERVICES</span>
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-text-custom"
        >
          Our Capabilities &amp; Digital Growth Services
        </motion.h3>
      </div>

      {/* 2x2 Grid with minimum 24px gap (using gap-8 which is 32px) */}
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-15%" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.1
            }
          }
        }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8" 
      >
        {services.map((svc, idx) => {
          const Icon = svc.icon;
          return (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 md:p-10 border group transition-all duration-300 cursor-pointer bg-[#111811] rounded-[12px]"
              style={{ 
                borderColor: "rgba(0, 200, 80, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 200, 80, 0.6)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 200, 80, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 200, 80, 0.2)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Card Header - Icon container */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-900/25">
                  <Icon 
                    className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" 
                    style={{ color: "#00C853" }} 
                  />
                </div>
                <span className="font-mono text-sm text-[#00C853] font-bold">
                  {svc.num}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 mb-4 relative z-10">
                <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase block text-[#AAAAAA]">
                  {svc.tagLine}
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {svc.title}
                </h4>
              </div>

              {/* Description - Minimum 16px, color #CCCCCC, maximum 2 sentences */}
              <p className="font-sans text-base sm:text-[16px] font-normal leading-relaxed relative z-10 text-[#CCCCCC]">
                {svc.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

import { motion } from "motion/react";
import { Quote } from "lucide-react";

interface MasterSocialProofProps {
  theme: "light" | "dark";
}

export default function MasterSocialProof({ theme }: MasterSocialProofProps) {
  const partners = [
    "AMAZON PRIME VIDEO",
    "PAGA",
    "NILE UNIVERSITY"
  ];

  return (
    <section 
      id="social-proof" 
      className="relative py-32 px-6 sm:px-12 md:px-24 overflow-hidden"
      style={{ backgroundColor: "#080F08" }}
    >
      {/* Structural Borders drawing themselves on scroll entrance */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-12 sm:left-24 border-l origin-top" 
          style={{ borderColor: "rgba(0, 200, 83, 0.1)" }} 
        />
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 right-12 sm:right-24 border-r origin-bottom" 
          style={{ borderColor: "rgba(0, 200, 83, 0.1)" }} 
        />
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 border-b origin-right" 
          style={{ borderColor: "rgba(0, 200, 83, 0.1)" }} 
        />
      </div>

      {/* Partner Logos Segment */}
      <div className="relative z-10 border-b pb-12 mb-16" style={{ borderColor: "rgba(0, 200, 83, 0.15)" }}>
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="font-mono text-sm tracking-widest uppercase mb-4 text-center sm:text-left text-[#00C853]"
        >
          CLIENT TRUST
        </motion.div>
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="font-mono text-sm tracking-[0.25em] uppercase text-[#CCCCCC] block mb-8 text-center sm:text-left"
        >
          TRUSTED BY INDUSTRY LEADERS
        </motion.span>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-10%" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="flex flex-wrap items-center justify-center sm:justify-between gap-8 sm:gap-4 opacity-80"
        >
          {partners.map((partner, idx) => (
            <motion.div 
              key={idx} 
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-sm sm:text-base font-bold tracking-[0.3em] text-[#CCCCCC] hover:text-white transition-colors"
            >
              {partner}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Testimonial Pull-Quote & Side Stats */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Quote Block */}
        <div className="lg:col-span-8 pl-6 sm:pl-12 border-l-2 relative" style={{ borderColor: "#00C853" }}>
          <Quote 
            className="absolute -top-6 left-2 sm:left-4 w-12 h-12 opacity-10 select-none pointer-events-none" 
            style={{ color: "#00C853" }} 
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-12%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[20px] sm:text-[24px] font-medium italic leading-relaxed text-white"
          >
            "We do not believe in aesthetic placeholders. Monospace Digital rebuilt our entire web system and coupled it with high-velocity marketing pipelines, giving us an undeniable competitive advantage."
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-12%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[14px] tracking-widest uppercase text-[#AAAAAA]"
          >
            <span className="w-4 h-[1px]" style={{ backgroundColor: "#00C853" }} />
            <span className="font-bold text-white">Head of Marketing Operations</span>
            <span>—</span>
            <span>Paga</span>
          </motion.div>
        </div>

        {/* Side Stats panel with highlighted metrics */}
        <div className="lg:col-span-4 flex flex-col md:flex-row lg:flex-col gap-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="p-6 rounded-[12px] bg-[#111811] border border-emerald-950/40 flex-1"
          >
            <div className="text-[36px] font-mono font-bold text-[#00C853] leading-none mb-2">
              +54%
            </div>
            <div className="text-[14px] font-mono tracking-widest text-[#AAAAAA] uppercase">
              Activity Boost
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-[12px] bg-[#111811] border border-emerald-950/40 flex-1"
          >
            <div className="text-[36px] font-mono font-bold text-[#00C853] leading-none mb-2">
              -43%
            </div>
            <div className="text-[14px] font-mono tracking-widest text-[#AAAAAA] uppercase">
              Reduction in CPC
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

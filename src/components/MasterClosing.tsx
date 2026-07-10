import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function MasterClosing() {
  const handleInquiryClick = () => {
    const email = "hello@monospace.digital";
    const subject = "Growth Partnership Inquiry";
    const body = "Dear Monospace Digital,\n\nWe would like to discuss our growth goals and explore how we can build something that performs.";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section 
      id="closing" 
      className="relative py-40 px-6 sm:px-12 md:px-24 text-white overflow-hidden flex flex-col justify-center min-h-[80vh]"
      style={{ backgroundColor: "#0D150D" }}
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-12 sm:left-24 border-l" style={{ borderColor: "rgba(0, 200, 83, 0.1)" }} />
        <div className="absolute inset-y-0 right-12 sm:right-24 border-r" style={{ borderColor: "rgba(0, 200, 83, 0.1)" }} />
        <div className="absolute inset-x-0 bottom-0 border-b" style={{ borderColor: "rgba(0, 200, 83, 0.1)" }} />
        
        {/* Soft emerald backlight glow centered */}
        <div 
          className="absolute w-[450px] h-[450px] rounded-full blur-[140px] opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #00C853 0%, transparent 70%)",
            left: "calc(50% - 225px)",
            top: "calc(50% - 225px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Chapter Marker */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-sm tracking-widest uppercase text-[#00C853]"
        >
          PARTNERSHIP
        </motion.div>

        {/* Cinematic Title Statement */}
        <motion.h2 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white"
          id="closing-title-header"
        >
          Ready to build something that actually performs?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.25 }}
          className="font-sans text-lg sm:text-[16px] text-[#CCCCCC] font-normal leading-relaxed max-w-xl mx-auto"
        >
          Let's talk about your growth goals.
        </motion.p>

        {/* Thick prominent green border CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.35 }}
          className="pt-6"
        >
          <button
            onClick={handleInquiryClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 font-mono text-sm uppercase tracking-widest transition-all duration-300 rounded-md bg-[#080F08] text-[#00C853] border-[#00C853] hover:bg-[#00C853] hover:text-black hover:scale-[1.01] shadow-lg font-bold"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

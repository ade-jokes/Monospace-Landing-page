import React, { useState, useEffect } from "react";
import { ScrollReveal } from "./SharedAnimations";

export default function ClosingCTA() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [isHoverSupported, setIsHoverSupported] = useState(false);

  useEffect(() => {
    setIsHoverSupported(window.matchMedia("(hover: hover)").matches);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
    }
  };

  const handleMouseEnter = () => {
    if (isHoverSupported) {
      setIsSectionHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isHoverSupported) {
      setIsSectionHovered(false);
    }
  };

  return (
    <section
      id="contact"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "linear-gradient(180deg, #0B0B0F 0%, #0D0A1E 100%)",
      }}
      className="py-[160px] px-6 text-center relative overflow-hidden"
    >
      {/* Animation 2: Large glowing purple orb behind content */}
      <div
        className="absolute pointer-events-none select-none animate-orb-2"
        style={{
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(99,91,255,0.10), transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      {/* Content wrapper */}
      <div className="max-w-[640px] mx-auto relative z-10">
        <ScrollReveal>
          <h2
            className="font-extrabold text-[#ECECF0] leading-[1.08] tracking-[-0.03em] mx-auto"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
          >
            Ready to build{" "}
            <span
              className="inline-block transition-all duration-300 transform-gpu"
              style={{
                transform: isSectionHovered ? "scale(1.05)" : "scale(1)",
                color: isSectionHovered ? "#00C853" : "inherit",
                transformOrigin: "center",
              }}
            >
              your growth engine
            </span>{" "}
            through technology?
          </h2>

          <p className="text-[18px] text-[#6B7280] mt-[16px] leading-[1.7] max-w-[500px] mx-auto">
            Tell us what you are building. We will tell you how to make it grow.
          </p>

          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="mt-[44px] text-left max-w-md mx-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#131318] border border-[rgba(255,255,255,0.06)] rounded-[8px] p-3 text-[14px] text-[#ECECF0] focus:border-[#00C853] focus:outline-none transition-colors"
                    placeholder="Marcus"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#131318] border border-[rgba(255,255,255,0.06)] rounded-[8px] p-3 text-[14px] text-[#ECECF0] focus:border-[#00C853] focus:outline-none transition-colors"
                    placeholder="marcus@paga.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">How can we help?</label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.msg}
                  onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                  className="w-full bg-[#131318] border border-[rgba(255,255,255,0.06)] rounded-[8px] p-3 text-[14px] text-[#ECECF0] focus:border-[#00C853] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your performance, development or AI automation goals..."
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="shimmer-btn animate-pulse-glow w-full bg-[#00C853] text-[#080808] font-bold text-[16px] px-[36px] py-[15px] rounded-[10px] transition-all duration-200 hover:bg-[#00A844] hover:-translate-y-[2px] hover:shadow-[0_12px_36px_rgba(0,200,83,0.28)] cursor-pointer"
                >
                  Start the conversation →
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-[44px] bg-[rgba(0,200,83,0.05)] border border-[rgba(0,200,83,0.2)] rounded-[12px] p-8 max-w-md mx-auto text-center transition-all duration-300 animate-in fade-in">
              <span className="text-3xl">🚀</span>
              <h3 className="text-[18px] font-bold text-[#ECECF0] mt-4 mb-2">Message Received</h3>
              <p className="text-[14px] text-[#6B7280]">
                Thank you, {formData.name}! A partner from Monospace Digital will review your request and get back to you within 24 hours.
              </p>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

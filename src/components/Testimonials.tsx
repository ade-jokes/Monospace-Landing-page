import React from "react";
import { ScrollReveal } from "./SharedAnimations";

export default function Testimonials() {
  return (
    <section
      className="bg-[#F6F9FC] py-[140px] px-6 text-center"
    >
      <div className="max-w-[700px] mx-auto">
        <ScrollReveal>
          {/* Large quote mark */}
          <div
            className="text-[#00C853] select-none mb-[8px] leading-[0.8]"
            style={{ fontSize: "80px", fontFamily: "Georgia, serif" }}
          >
            “
          </div>

          {/* Quote text */}
          <blockquote className="text-[21px] font-medium text-[#0A2540] leading-[1.68] italic tracking-tight">
            The campaigns Monospace Digital ran increased our platform activity by{" "}
            <span className="text-[#00C853] font-bold not-italic">38.94%</span>{" "}
            while reducing our Facebook advertising cost by{" "}
            <span className="text-[#00C853] font-bold not-italic">43.59%</span>
            . They think like business partners, not just vendors.
          </blockquote>

          {/* Attribution */}
          <div className="text-[13px] text-[#425466] tracking-[0.1em] uppercase font-bold mt-[28px]">
            — Client · Paga · Lagos, Nigeria
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

import React from "react";
import { ScrollReveal } from "./SharedAnimations";

export default function BrandQuote() {
  return (
    <section
      className="bg-[#F6F9FC] border-t border-[rgba(0,200,83,0.08)] border-b border-[rgba(0,200,83,0.08)] py-[120px] px-6 text-center"
    >
      <div className="max-w-[740px] mx-auto">
        <ScrollReveal>
          {/* Large quote mark */}
          <div
            className="text-[#00C853] select-none mb-[8px] leading-[0.8]"
            style={{ fontSize: "80px", fontFamily: "Georgia, serif" }}
          >
            “
          </div>

          {/* Quote text */}
          <blockquote className="text-[27px] font-bold text-[#0A2540] leading-[1.32] italic tracking-tight">
            We do not build websites. We build digital growth engines. Every
            project we take on is measured by one thing — does it move your
            business forward?
          </blockquote>

          {/* Attribution */}
          <div className="text-[13px] text-[#425466] tracking-[0.12em] uppercase font-semibold mt-[36px]">
            Monospace Digital — Victoria Island, Lagos · Est. 2019
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from "react";

export default function ClientLogos() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isHoverSupported, setIsHoverSupported] = useState(false);

  useEffect(() => {
    setIsHoverSupported(window.matchMedia("(hover: hover)").matches);
  }, []);

  const brands = [
    "MOËT & CHANDON",
    "BRITISH COUNCIL",
    "PULSE.NG",
    "RUFF N' TUMBLE",
    "AMAZON PRIME VIDEO",
    "WORLD HEALTH ORGANISATION",
    "PAGA",
    "COINTREAU",
    "WORKFORCE GROUP",
    "NILE UNIVERSITY",
  ];

  // Helper component to render a single track copy
  const renderTrack = (offset: number) => (
    <div className="marquee-track flex gap-[64px] pr-[64px] items-center shrink-0">
      {brands.map((brand, i) => {
        const globalIdx = i + offset;
        const isAnyHovered = hoveredIdx !== null && isHoverSupported;
        const isCurrentHovered = isAnyHovered && hoveredIdx === globalIdx;

        return (
          <span
            key={globalIdx}
            onMouseEnter={() => setHoveredIdx(globalIdx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              color: "#ECECF0",
              opacity: isAnyHovered ? (isCurrentHovered ? 1.0 : 0.25) : 0.40,
              transition: isAnyHovered ? "opacity 300ms ease" : "opacity 400ms ease",
            }}
            className="text-[13px] font-bold tracking-[-0.01em] uppercase cursor-default whitespace-nowrap"
          >
            {brand}
          </span>
        );
      })}
    </div>
  );

  return (
    <section
      className="bg-[#0B0B0F] border-t border-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.05)] py-[60px] overflow-hidden"
    >
      <div className="w-full text-center">
        {/* Centered Small Label */}
        <span className="block text-[12px] font-semibold text-[#4A4A54] tracking-[0.1em] uppercase mb-[32px] px-6">
          Trusted by leading brands across Africa
        </span>

        {/* Brand logo names in horizontal infinite scroll container */}
        <div className="marquee-container flex">
          {renderTrack(0)}
          {renderTrack(brands.length)}
          {renderTrack(brands.length * 2)}
        </div>
      </div>
    </section>
  );
}

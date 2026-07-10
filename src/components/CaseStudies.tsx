import React, { useEffect, useRef } from "react";
import { SectionHeader } from "./SharedAnimations";
import InteractiveCard from "./InteractiveCard";
import { gsap } from "gsap";

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            ".case-study-card-anim",
            { opacity: 0, y: 70, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.15,
              duration: 0.85,
              ease: "power3.out",
            }
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getGlowColor = (accent: string) => {
    const acc = accent.toLowerCase();
    if (acc === "#00c853") return "rgba(0,200,83,0.10)";
    if (acc === "#0ea5e9") return "rgba(14,165,233,0.10)";
    if (acc === "#f59e0b") return "rgba(245,159,11,0.10)";
    return "rgba(0,200,83,0.10)";
  };

  const cards = [
    {
      client: "PAGA",
      accent: "#00C853",
      headline: "346% increase in in-app sales.",
      description:
        "Performance marketing campaign delivering 38.94% user activity growth and 43.59% reduction in Facebook CPC across a 90-day campaign.",
      metric: "43%",
      metricLabel: "Lower cost per click",
    },
    {
      client: "AMAZON PRIME VIDEO",
      accent: "#0EA5E9",
      headline: "Gangs of Lagos — Pan-African launch experience.",
      description:
        "Built an interactive web experience with personalised social sharing and content moderation for the movie launch across Africa.",
      metric: "🌍",
      metricLabel: "Pan-African reach",
    },
    {
      client: "NILE UNIVERSITY",
      accent: "#F59E0B",
      headline: "Full marketing analytics infrastructure.",
      description:
        "Dashboards, reporting, and performance analytics integrating Google Analytics and Facebook Ads into one unified view.",
      metric: "3",
      metricLabel: "Data sources unified",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="work"
      className="bg-[#F6F9FC] py-[140px] px-6"
    >
      <div className="max-w-[1080px] mx-auto">
        {/* Section Header */}
        <SectionHeader
          label="PROVEN RESULTS"
          headline="Clients we have grown."
          subtext="Real campaigns. Real numbers. Real African businesses."
          theme="light"
          align="left"
          className="mb-[56px]"
        />

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {cards.map((card) => (
            <div key={card.client} className="case-study-card-anim opacity-0">
              <InteractiveCard
                accent={card.accent}
                glowColor={getGlowColor(card.accent)}
                className="group relative rounded-[16px] border border-[rgba(0,0,0,0.06)] bg-[#FFFFFF] p-[36px] h-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Client Name Label */}
                  <span
                    style={{ color: card.accent }}
                    className="block text-[12px] font-bold tracking-[0.12em] uppercase mb-[16px]"
                  >
                    {card.client}
                  </span>

                  {/* Headline */}
                  <h3 className="text-[20px] font-extrabold text-[#0A2540] leading-[1.2] mb-[14px]">
                    {card.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] text-[#425466] leading-[1.7] mb-[24px]">
                    {card.description}
                  </p>
                </div>

                <div>
                  {/* Divider */}
                  <div className="h-[1px] bg-[rgba(0,0,0,0.06)] mb-[24px]" />

                  {/* Metric Display */}
                  <div
                    style={{ color: card.accent }}
                    className="text-[40px] font-extrabold leading-none"
                  >
                    {card.metric}
                  </div>

                  {/* Metric Label */}
                  <div className="text-[13px] text-[#6B7280] font-medium mt-[6px]">
                    {card.metricLabel}
                  </div>
                </div>
              </InteractiveCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

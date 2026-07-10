import React, { useEffect, useRef } from "react";
import { SectionHeader } from "./SharedAnimations";
import InteractiveCard from "./InteractiveCard";
import { gsap } from "gsap";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate cards entry
          gsap.fromTo(
            ".process-card-anim",
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.7,
              ease: "power2.out",
            }
          );
          // Animate numbers with custom bounce ease
          gsap.fromTo(
            ".process-num-anim",
            { scale: 0.4, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              stagger: 0.12,
              duration: 0.8,
              ease: "back.out(1.6)",
              delay: 0.15,
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

  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "We learn your business, your market, and your goals before we write a single line of code or spend a single naira on ads.",
    },
    {
      num: "02",
      title: "Strategy",
      desc: "We map the solution — technology, channels, timeline, and the exact metrics we will use to measure success.",
    },
    {
      num: "03",
      title: "Execute",
      desc: "We build and launch fast. You see real progress every week, not every quarter.",
    },
    {
      num: "04",
      title: "Optimise",
      desc: "We measure everything after launch and keep improving. The relationship does not end at delivery.",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="process"
      className="bg-[#0B0B0F] py-[140px] px-6"
    >
      <div className="max-w-[1080px] mx-auto">
        {/* Section Header */}
        <SectionHeader
          label="HOW WE WORK"
          headline="Simple process. Measurable results."
          subtext=""
          theme="dark"
          align="left"
          className="mb-[80px]"
        />

        {/* 4 Steps Grid: 4 cols on desktop, vertical stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {steps.map((step) => (
            <div key={step.num} className="process-card-anim opacity-0">
              <InteractiveCard
                accent="#00C853"
                glowColor="rgba(0, 200, 83, 0.10)"
                className="group relative rounded-[12px] border border-transparent pt-[28px] pb-[20px] px-[20px] -mx-[20px] h-full bg-transparent"
              >
                {/* Visual matching of top border line */}
                <div className="absolute top-0 left-[20px] right-[20px] h-[2px] bg-[#00C853] z-30" />

                {/* Large translucent number */}
                <div
                  className="process-num-anim font-extrabold mb-[20px] select-none leading-none origin-left"
                  style={{
                    fontSize: "52px",
                    color: "rgba(0, 200, 83, 0.18)",
                  }}
                >
                  {step.num}
                </div>

                {/* Step Title */}
                <h3 className="text-[18px] font-bold text-[#ECECF0] mb-[12px]">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[15px] text-[#6B7280] leading-[1.7]">
                  {step.desc}
                </p>
              </InteractiveCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyMonospace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade-up reveal on scroll for standard sections
      gsap.fromTo(
        [titleRef.current, textRef.current, statRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="why-monospace"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-[#0D0D0D] border-t border-b border-border z-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Philosophy Headline */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[11px] font-extrabold text-accent uppercase tracking-[0.2em] block">
            Our Philosophy
          </span>
          <h2
            ref={titleRef}
            className="text-[2.2rem] sm:text-[3.2rem] font-extrabold text-foreground tracking-[-0.03em] leading-[1.08] max-w-xl"
          >
            We build digital growth engines. Not just websites.
          </h2>
          
          <div ref={textRef} className="space-y-4 max-w-xl text-muted-foreground text-[15px] sm:text-[16px] leading-relaxed">
            <p>
              Many agencies view delivery as the finish line. We view it as Day One. At Monospace Digital, we align as an integrated extension of your leadership, combining deep systems engineering with predictive marketing analytics.
            </p>
            <p>
              We measure our efficacy by actual, compounding outcomes—expanded EBITDA, decreased client acquisition costs, and verified pipeline velocity. If a line of code or a paid ad campaign doesn’t accelerate your financial trajectory, we do not deploy it.
            </p>
          </div>
        </div>

        {/* Right Large Outsized Stat Indicator */}
        <div ref={statRef} className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="bg-surface border border-border rounded-2xl p-8 max-w-sm w-full relative overflow-hidden group hover:border-accent/40 transition-colors duration-300">
            {/* Ambient visual hint */}
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-accent/5 filter blur-xl group-hover:bg-accent/10 transition-colors" />
            
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
              Aggregate Growth Recorded
            </div>
            
            <div className="text-6xl font-black text-foreground tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-accent">
              346%
            </div>
            
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Average growth delta observed across Monospace enterprise client partners in post-launch metrics audits.
            </p>

            <div className="mt-6 pt-5 border-t border-border flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                Audited Growth Indicator
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

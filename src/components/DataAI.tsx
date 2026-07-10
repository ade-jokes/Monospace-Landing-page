import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DataAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [infoRef.current, visualRef.current],
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
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="data-ai"
      className="relative py-28 md:py-36 px-6 md:px-12 bg-background z-10 overflow-hidden"
    >
      {/* Subtle purple background lighting */}
      <div className="absolute top-[30%] left-[35%] w-[450px] h-[450px] rounded-full bg-accent-violet/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left text description (5 cols) */}
        <div ref={infoRef} className="lg:col-span-5 space-y-6 relative z-10">
          <span className="text-[11px] font-extrabold text-accent-violet uppercase tracking-[0.2em] block">
            Intelligence
          </span>
          <h2 className="text-[2.2rem] sm:text-[3.2rem] font-extrabold text-foreground tracking-[-0.03em] leading-[1.08]">
            Predictive intelligence pipelines.
          </h2>
          <p className="text-muted-foreground text-[15px] sm:text-[16px] leading-relaxed">
            Data integration is only the beginning. We elevate standard dashboards by weaving predictive inference nodes directly into Nile University-style business data layers.
          </p>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Our engines analyze historical acquisition telemetry to automatically forecast seasonal performance shifts, optimize real-time campaign bids, and surface critical, decision-ready anomalies before they impact your financial metrics.
          </p>

          <div className="pt-4 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-violet animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              AI-SUPPORTED FORECASTING ACTIVE
            </span>
          </div>
        </div>

        {/* Right high-end visual representing predictive intelligence loops (7 cols) */}
        <div ref={visualRef} className="lg:col-span-7">
          <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-accent-violet/30 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-accent-violet/5 filter blur-3xl pointer-events-none" />

            {/* Simulation of a Live Predictive Analytics model node graph */}
            <div className="border border-border bg-[#0B0B0F] rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-bold text-foreground">Inference Pipeline: GA4 Anomalies</span>
                <span className="text-[10px] font-mono text-accent-violet bg-accent-violet/10 border border-accent-violet/20 px-2 py-0.5 rounded">
                  MODEL V4.2
                </span>
              </div>

              {/* Node nodes representation */}
              <div className="space-y-4">
                <div className="p-4 bg-surface rounded-lg border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-blue" />
                    <span className="text-xs text-foreground font-semibold">Attributed Lead Conversion Forecast</span>
                  </div>
                  <span className="text-xs font-bold text-accent">+14.2% (94% confidence)</span>
                </div>

                <div className="p-4 bg-surface rounded-lg border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-amber" />
                    <span className="text-xs text-foreground font-semibold">Anomalous Spend Detection</span>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">0 anomalies detected</span>
                </div>

                <div className="p-4 bg-surface rounded-lg border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-violet" />
                    <span className="text-xs text-foreground font-semibold">Acquisition Cost Convergence</span>
                  </div>
                  <span className="text-xs font-bold text-accent">Optimized (↓ 18.5%)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center text-xs text-muted-foreground font-mono">
              <span>MODEL TYPE: XGBOOST REGRESSOR</span>
              <span>INFERENCE INTERVAL: REAL-TIME</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

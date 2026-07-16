import React, { useEffect, useState } from "react";
import { AnimatedCounter } from "./SharedAnimations";
import StripeCanvas from "./StripeCanvas";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { analytics } from "../utils/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Staggered entrance sequence starts on mount
    const timer = setTimeout(() => {
      setMounted(true);
      analytics.trackComponentView("hero");
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 60;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0B0B0F] overflow-hidden flex flex-col justify-center items-center z-10"
      style={{ paddingTop: "150px", paddingBottom: "120px" }}
    >
      {/* Stripe-style Iconic Skewed Background Divider & Dynamic Canvas */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none z-0 overflow-hidden"
        style={{
          transform: "skewY(-8deg)",
          transformOrigin: "top left",
          height: "100%",
          background: "#08080C",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Unskew the active canvas inside to keep color nodes rendering as perfect circular fluid shapes */}
        <div
          className="absolute inset-0 w-full"
          style={{
            transform: "skewY(8deg)",
            height: "135%",
            top: "-20%",
          }}
        >
          <StripeCanvas />
        </div>
      </div>

      <div className="w-full max-w-[1080px] mx-auto px-6 text-center relative z-10">
        {/* Badge: opacity 0 -> 1, translateY(16px) -> 0, 500ms, delay 0ms */}
        <div
          style={{
            transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "0ms",
          }}
          className={`inline-flex items-center gap-[8px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[100px] px-[14px] py-[5px] mb-[28px] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[16px]"
          }`}
        >
          <div
            className="w-[6px] h-[6px] rounded-full"
            style={{
              background: "linear-gradient(135deg, #635BFF, #00C853)",
            }}
          />
          <span className="text-[12px] text-[#6B7280] font-semibold tracking-wide">
            Technology · Marketing · AI · Data — Victoria Island, Lagos
          </span>
        </div>

        {/* Headline: opacity 0 -> 1, translateY(32px) -> 0, 700ms, delay 150ms - EQUINOX STYLE */}
        <h1
          style={{
            fontSize: "clamp(4.2rem, 9vw, 7.5rem)",
            transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "150ms",
            lineHeight: "0.95",
          }}
          className={`font-extrabold text-[#ECECF0] tracking-[-0.05em] max-w-[1000px] mx-auto mb-[20px] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[32px]"
          }`}
        >
          ENGINEERED<br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              background: "linear-gradient(135deg, #00FF88 0%, #00FFFF 50%, #00C853 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.15em",
            }}
          >
            BEYOND PRECISION
          </span>
        </h1>

        {/* Subheadline: opacity 0 -> 1, translateY(20px) -> 0, 600ms, delay 300ms */}
        <p
          style={{
            transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "300ms",
          }}
          className={`text-[16px] text-[#A0A0B0] max-w-[620px] mx-auto mb-[44px] leading-[1.68] font-normal ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
          }`}
        >
          Software engineering, AI automation, performance marketing, and data intelligence — built for companies that measure success in outcomes, not outputs.
        </p>

        {/* CTAs: opacity 0 -> 1, translateY(16px) -> 0, 500ms, delay 450ms */}
        <div
          style={{
            transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "450ms",
          }}
          className={`flex flex-wrap items-center justify-center gap-[12px] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[16px]"
          }`}
        >
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="shimmer-btn animate-pulse-glow inline-block bg-[#00C853] text-[#080808] font-bold text-[15px] px-[26px] py-[12px] rounded-[9px] transition-all duration-200 hover:bg-[#00A844] hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(0,200,83,0.28)]"
          >
            Start a project →
          </a>
          <a
            href="#work"
            onClick={(e) => handleScrollTo(e, "work")}
            className="shimmer-btn inline-block bg-transparent text-[#6B7280] border border-[rgba(255,255,255,0.09)] font-semibold text-[15px] px-[26px] py-[12px] rounded-[9px] transition-all duration-200 hover:text-[#ECECF0] hover:border-[rgba(255,255,255,0.18)]"
          >
            See our work
          </a>
        </div>

        {/* Stat cards row */}
        <div className="mt-[80px] flex flex-wrap items-center justify-center gap-[16px]">
          {/* Card 1: Founded 2019 */}
          <div className="stat-card-hover cursor-default bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-[12px] px-[32px] py-[20px] text-center backdrop-blur-[10px] min-w-[200px]">
            <div
              className="stat-number text-[28px] font-extrabold bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, #00C853, #635BFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <AnimatedCounter target={2019} suffix="" />
            </div>
            <div className="text-[13px] text-[#6B7280] font-medium mt-[6px]">
              Founded
            </div>
          </div>

          {/* Card 2: Projects Delivered */}
          <div className="stat-card-hover cursor-default bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-[12px] px-[32px] py-[20px] text-center backdrop-blur-[10px] min-w-[200px]">
            <div
              className="stat-number text-[28px] font-extrabold bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, #00C853, #635BFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <AnimatedCounter target={50} suffix="+" />
            </div>
            <div className="text-[13px] text-[#6B7280] font-medium mt-[6px]">
              Projects delivered
            </div>
          </div>

          {/* Card 3: Client growth recorded */}
          <div className="stat-card-hover cursor-default bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-[12px] px-[32px] py-[20px] text-center backdrop-blur-[10px] min-w-[200px]">
            <div
              className="stat-number text-[28px] font-extrabold bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, #00C853, #635BFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <AnimatedCounter target={346} suffix="%" />
            </div>
            <div className="text-[13px] text-[#6B7280] font-medium mt-[6px]">
              Client growth recorded
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

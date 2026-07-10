import React, { useEffect, useState, useRef } from "react";

/**
 * Custom ScrollReveal component using IntersectionObserver.
 * Implements Animation 3 and general section scrolling reveal behavior.
 */
export function ScrollReveal({
  children,
  className = "",
  threshold = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  key?: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[600ms] cubic-bezier-custom ${
        revealed
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

/**
 * SectionHeader component with custom timing for:
 * - Section label (translateX)
 * - Section headline (translateY, delay 80ms)
 * - Section subtext (translateY, delay 160ms)
 */
export function SectionHeader({
  label,
  headline,
  subtext,
  theme = "dark",
  align = "left",
  className = "",
}: {
  label: string;
  headline: string;
  subtext: string;
  theme?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const textAlignment = align === "center" ? "text-center mx-auto" : "text-left";
  const flexAlignment = align === "center" ? "items-center justify-center text-center" : "items-start";

  const labelColor = theme === "dark" ? "text-[#00C853]" : "text-[#00C853]";
  const headColor = theme === "dark" ? "text-[#ECECF0]" : "text-[#0A2540]";
  const subColor = theme === "dark" ? "text-[#6B7280]" : "text-[#425466]";

  return (
    <div ref={ref} className={`flex flex-col ${flexAlignment} ${className}`}>
      {/* Label: translateX(-16px) -> 0, 400ms */}
      <span
        className={`inline-block text-[12px] font-semibold tracking-[0.15em] uppercase mb-4 transition-all duration-400 cubic-bezier-custom ${
          revealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        } ${labelColor}`}
      >
        {label}
      </span>

      {/* Headline: translateY(24px) -> 0, 600ms, delay 80ms */}
      <h2
        className={`font-extrabold tracking-[-0.03em] mb-4 text-3xl sm:text-4xl md:text-[2.8rem] leading-[1.1] transition-all duration-600 delay-[80ms] cubic-bezier-custom max-w-[800px] ${textAlignment} ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        } ${headColor}`}
      >
        {headline}
      </h2>

      {/* Subtext: translateY(16px) -> 0, 500ms, delay 160ms */}
      <p
        className={`text-[15px] sm:text-[16px] leading-relaxed max-w-[540px] transition-all duration-500 delay-[160ms] cubic-bezier-custom ${textAlignment} ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } ${subColor}`}
      >
        {subtext}
      </p>
    </div>
  );
}

/**
 * AnimatedCounter component using requestAnimationFrame.
 * Implements Animation 5.
 */
export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [started, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/**
 * StaggerReveal component for cards and grid items.
 * Implements Animation 4 - card stagger.
 */
export function StaggerReveal({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
  key?: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const delayMs = index * 80;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
      className={`${className} transition-all duration-500 cubic-bezier-custom ${
        revealed
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-[0.97]"
      }`}
    >
      {children}
    </div>
  );
}

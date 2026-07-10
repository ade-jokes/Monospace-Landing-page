import React, { MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Tv, CreditCard, GraduationCap, TrendingUp, BarChart2 } from "lucide-react";

interface ParallaxMockupProps {
  theme: "light" | "dark";
  num: string;
  accentColor: string;
  ruleColor: string;
}

export default function ParallaxMockup({ theme, num, accentColor, ruleColor }: ParallaxMockupProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const isActive = isHovered || isFocused;

  // Setup Framer Motion values for tracking cursor position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs configuration for damping and inertia
  const mouseX = useSpring(x, { stiffness: 120, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 25 });

  const gridX = useTransform(mouseX, [-0.5, 0.5], [8, -8]);
  const gridY = useTransform(mouseY, [-0.5, 0.5], [8, -8]);

  const glowX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  const midX = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const midY = useTransform(mouseY, [-0.5, 0.5], [-5, 5]);

  const foreX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const foreY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="w-full aspect-[16/10] border rounded-sm overflow-hidden relative select-none group outline-none transition-shadow"
      animate={{
        scale: isActive ? 1.015 : 1,
        borderColor: isActive ? accentColor : ruleColor,
        boxShadow: isActive
          ? theme === "dark"
            ? `0 0 35px rgba(0, 255, 102, 0.12)`
            : `0 0 25px rgba(0, 168, 84, 0.08)`
          : theme === "dark"
          ? "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.03)",
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: theme === "dark" ? "#0F0F11" : "#FAFAFA",
        perspective: 1000,
      }}
    >
      {/* 1. Background Grid */}
      <motion.div
        className={`absolute -inset-4 opacity-[0.08] ${
          theme === "dark" ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
        }`}
        style={{
          x: gridX,
          y: gridY,
        }}
      />

      {/* 2. Glow Orb */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full blur-[60px] -right-12 -bottom-12 pointer-events-none"
        animate={{
          opacity: isActive ? 0.35 : 0.15,
          scale: isActive ? 1.1 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 75%)`,
          x: glowX,
          y: glowY,
        }}
      />

      {/* 3. 3D Viewport wrapper */}
      <motion.div
        className="absolute inset-0 p-6 flex flex-col justify-between"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          ...(num === "01" ? { backgroundColor: "#ffffff" } : {}),
        }}
      >
        {/* Mockup Case 1: AMAZON PRIME VIDEO */}
        {num === "01" && (
          <>
            {/* Header */}
            <motion.div 
              className="flex items-center justify-between border-b pb-3 border-zinc-800/10 dark:border-zinc-800/40"
              style={{ x: midX, y: midY, transformStyle: "preserve-3d", translateZ: 10 }}
            >
              <div className="flex items-center space-x-2 font-mono text-[9px] uppercase tracking-wider">
                <Tv className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span 
                  className="font-bold text-zinc-800 dark:text-zinc-200"
                  style={{ borderColor: "#1a310f", backgroundColor: "#f4f4f4", color: "#0d220c", borderStyle: "solid", borderWidth: "1px", padding: "1px 4px", borderRadius: "2px" }}
                >
                  Gangs of Lagos — Campaign
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-500">Live</span>
            </motion.div>

            {/* Content Card */}
            <motion.div 
              className="my-auto flex flex-col space-y-3 font-mono text-[10px]"
              style={{ x: foreX, y: foreY, transformStyle: "preserve-3d", translateZ: 30 }}
            >
              <div className="flex justify-between items-end border-b pb-1.5 border-zinc-800/5 dark:border-zinc-800/10">
                <span className="text-zinc-500">Engagement Score</span>
                <span className="font-bold text-zinc-950 dark:text-zinc-50" style={{ color: accentColor }}>96.4% Positive</span>
              </div>
              <div className="flex justify-between items-end border-b pb-1.5 border-zinc-800/5 dark:border-zinc-800/10">
                <span className="text-zinc-500">Custom Assets Rendered</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">14,350 Generated</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-zinc-500">Moderation Latency</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">140ms</span>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div 
              className="flex justify-between items-center text-[8px] text-zinc-400 dark:text-zinc-500 pt-3 border-t border-zinc-800/10 dark:border-zinc-800/20 font-mono"
              style={{ x: midX, y: midY, transformStyle: "preserve-3d", translateZ: 10 }}
            >
              <span>CAMPAIGN SYSTEM ACTIVE</span>
              <span>AFRICA-FIRST IMPRESSIONS</span>
            </motion.div>
          </>
        )}

        {/* Mockup Case 2: PAGA */}
        {num === "02" && (
          <>
            {/* Header */}
            <motion.div 
              className="flex items-center justify-between border-b pb-3 border-zinc-800/10 dark:border-zinc-800/40"
              style={{ x: midX, y: midY, transformStyle: "preserve-3d", translateZ: 10 }}
            >
              <div className="flex items-center space-x-2 font-mono text-[9px] uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span 
                  className="font-bold text-zinc-800 dark:text-zinc-200"
                  style={{ color: "#212521" }}
                >
                  Paga Acquisition Funnel
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-500">Optimized</span>
            </motion.div>

            {/* Predictive Graph Simulation */}
            <motion.div 
              className="relative h-20 my-auto"
              style={{ x: foreX, y: foreY, transformStyle: "preserve-3d", translateZ: 40 }}
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" fill="none" preserveAspectRatio="none">
                <path 
                  d="M0,100 Q80,20 160,70 T320,30 T400,10" 
                  stroke={theme === "dark" ? "rgba(0, 255, 102, 0.45)" : "rgba(0, 168, 84, 0.45)"} 
                  strokeWidth="2" 
                  fill="none" 
                />
                <circle cx="320" cy="30" r="4.5" fill={accentColor} />
              </svg>
              <div className="absolute top-2 left-3 bg-white/95 dark:bg-zinc-900/95 px-2.5 py-1 border border-zinc-200 dark:border-zinc-800 rounded-sm font-mono flex items-center space-x-1.5">
                <TrendingUp className="w-3 h-3" style={{ color: accentColor }} />
                <span className="text-[8px] text-zinc-700 dark:text-zinc-300 font-bold">CPA EFFICIENCY: +43.59%</span>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div 
              className="flex justify-between items-center text-[8px] text-zinc-400 dark:text-zinc-500 pt-3 border-t border-zinc-800/10 dark:border-zinc-800/20 font-mono"
              style={{ x: midX, y: midY, transformStyle: "preserve-3d", translateZ: 10 }}
            >
              <span>GOOGLE & META APIS CONNECTED</span>
              <span>ROI ACCELERATING</span>
            </motion.div>
          </>
        )}

        {/* Mockup Case 3: NILE UNIVERSITY */}
        {num === "03" && (
          <>
            {/* Header */}
            <motion.div 
              className="flex items-center justify-between border-b pb-3 border-zinc-800/10 dark:border-zinc-800/40"
              style={{ x: midX, y: midY, transformStyle: "preserve-3d", translateZ: 10 }}
            >
              <div className="flex items-center space-x-2 font-mono text-[9px] uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span 
                  className="font-bold text-zinc-800 dark:text-zinc-200"
                  style={{ color: "#1e4709" }}
                >
                  Nile Univ unified BI
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-500">Consolidated</span>
            </motion.div>

            {/* Stats list */}
            <motion.div 
              className="my-auto flex flex-col space-y-2.5 font-mono text-[9px]"
              style={{ x: foreX, y: foreY, transformStyle: "preserve-3d", translateZ: 35 }}
            >
              <div className="flex space-x-2 items-center bg-white/80 dark:bg-zinc-900/80 p-2 border border-zinc-200 dark:border-zinc-800 rounded-sm">
                <BarChart2 className="w-3 h-3" style={{ color: accentColor }} />
                <span className="text-zinc-800 dark:text-zinc-200 tracking-wide font-medium">unified data sources: 100% synced</span>
              </div>
              <div className="flex space-x-2 items-center bg-white/80 dark:bg-zinc-900/80 p-2 border border-zinc-200 dark:border-zinc-800 rounded-sm">
                <span className="font-bold text-[8px]" style={{ color: accentColor }}>●</span>
                <span className="text-zinc-800 dark:text-zinc-200 tracking-wide font-medium">funnel reporting latency: real-time</span>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div 
              className="flex justify-between items-center text-[8px] text-zinc-400 dark:text-zinc-500 pt-3 border-t border-zinc-800/10 dark:border-zinc-800/20 font-mono"
              style={{ x: midX, y: midY, transformStyle: "preserve-3d", translateZ: 10 }}
            >
              <span>REPORT GENERATION OK</span>
              <span>DECISION SUPPORT ENABLED</span>
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

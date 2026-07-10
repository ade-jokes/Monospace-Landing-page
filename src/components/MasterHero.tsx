import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Cpu, Network, Sparkles, Terminal } from "lucide-react";

interface MasterHeroProps {
  theme: "light" | "dark";
}

export default function MasterHero({ theme }: MasterHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const accentColor = "#00C853";
  const ruleColor = "rgba(0, 200, 83, 0.15)";
  const textColorMuted = "text-muted-custom";

  // Framer Motion mouse values for luxurious coordinate-free parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery smooth springs
  const springConfig = { damping: 28, stiffness: 100, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Layered parallax transform calculations
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-45, 45]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-45, 45]);

  const canvasX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const canvasY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const cardBaseX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const cardBaseY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const cardTopX = useTransform(smoothX, [-0.5, 0.5], [24, -24]);
  const cardTopY = useTransform(smoothY, [-0.5, 0.5], [24, -24]);

  const cardBottomX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const cardBottomY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalized position from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // 3D Orbital Network Canvas simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let width = 450;
    let height = 450;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Generate 3D spherical point cloud representing our system grid
    const points: Array<{ x: number; y: number; z: number }> = [];
    const pointCount = 35;
    const radius = 130;

    for (let i = 0; i < pointCount; i++) {
      // Golden spiral distribution for perfectly balanced 3D distribution
      const theta = Math.acos(-1 + (2 * i) / pointCount);
      const phi = Math.sqrt(pointCount * Math.PI) * theta;

      points.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
      });
    }

    let angleY = 0.002;
    let angleX = 0.001;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate points slowly in 3D
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      points.forEach((p) => {
        // Rotate around Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate around X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y2;
        p.z = z2;
      });

      // Project 3D to 2D
      const perspective = 300;
      const center = { x: width / 2, y: height / 2 };

      const projected = points.map((p) => {
        const scale = perspective / (perspective + p.z);
        const mouseValX = mouseX.get(); // Get current raw mouse offsets
        const mouseValY = mouseY.get();

        // Dynamic spatial distortion: bend points slightly toward cursor plane for magnetic feel
        const magnetStrength = (1.2 - p.z / radius) * 20; // stronger closer to front
        const warpX = mouseValX * magnetStrength;
        const warpY = mouseValY * magnetStrength;

        return {
          x: center.x + p.x * scale + warpX,
          y: center.y + p.y * scale + warpY,
          z: p.z,
          scale,
        };
      });

      // Draw connections/edges based on 3D proximity
      ctx.lineWidth = 0.45;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];

          // Calculate raw distance in projected space
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            // Fade lines in/out based on depth (Z index)
            const avgZ = (points[i].z + points[j].z) / 2;
            const alpha = Math.max(0, 1 - (avgZ + radius) / (radius * 2)) * 0.25;

            ctx.strokeStyle = theme === "dark"
              ? `rgba(0, 255, 102, ${alpha})`
              : `rgba(0, 168, 84, ${alpha * 1.2})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw projected nodes
      projected.forEach((p) => {
        const nodeSize = Math.max(1, p.scale * 2.2);
        const alpha = Math.max(0.1, 1 - (p.z + radius) / (radius * 2));

        // Nodes in the front are brighter and glowing
        ctx.fillStyle = theme === "dark"
          ? `rgba(0, 255, 102, ${alpha * 0.85})`
          : `rgba(0, 168, 84, ${alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        // Soft front aura
        if (p.z < -60) {
          ctx.strokeStyle = theme === "dark"
            ? `rgba(0, 255, 102, ${alpha * 0.12})`
            : `rgba(0, 168, 84, ${alpha * 0.1})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeSize * 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Slowly rotate background angle slightly over time
      angleY = 0.0016;
      angleX = 0.0008;

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [theme]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero" 
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-12 px-6 sm:px-12 md:px-24"
      style={{
        backgroundColor: "#080F08",
        color: "#F0F0F0"
      }}
    >
      {/* Structural Wireframe Grid Lines underlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-y-0 left-12 sm:left-24 border-l transition-colors duration-500" 
          style={{ borderColor: ruleColor }} 
        />
        <div 
          className="absolute inset-y-0 right-12 sm:right-24 border-r transition-colors duration-500" 
          style={{ borderColor: ruleColor }} 
        />
        <div 
          className="absolute inset-x-0 top-1/2 border-t transition-colors duration-500" 
          style={{ borderColor: ruleColor }} 
        />
      </div>

      {/* Cinematic Top Meta Line Header */}
      <div className="relative z-20 flex items-center justify-between border-b pb-4" style={{ borderColor: ruleColor }}>
        <div className="flex items-center space-x-3 font-mono text-[10px] tracking-[0.25em] uppercase">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="font-extrabold text-zinc-100">MONOSPACE DIGITAL</span>
        </div>
        <div className="hidden md:flex items-center space-x-6 font-mono text-[10px] tracking-widest uppercase text-zinc-400">
          <span className="text-zinc-300">LAGOS, NIGERIA</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
          <span style={{ color: accentColor }} className="font-bold">ENGINEERING · MARKETING · ANALYTICS</span>
        </div>
      </div>

      {/* Main Container: Split Grid (Typography Left, Immersive Cinematic Depth Composition Right) */}
      <div className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-8">
        
        {/* Left Side: Dramatic Editorial Copy */}
        <div className="lg:col-span-7 space-y-8 text-left max-w-3xl relative">
          
          {/* Subtle green radial gradient glow behind the headline only */}
          <div 
            className="absolute -inset-12 -z-10 rounded-full blur-[80px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, #0A2A0A 0%, transparent 70%)",
              opacity: 0.95
            }}
          />

          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] mb-2 flex items-center space-x-3 text-zinc-400"
            >
              <span style={{ color: accentColor }} className="font-bold">ESTABLISHED 2019</span>
              <span className="w-8 h-[1px]" style={{ backgroundColor: ruleColor }} />
              <span>DIGITAL TRANSFORMATION CONSULTANCY</span>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.h1
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-[#F0F0F0] relative z-10"
            >
              We reject <br /> vanity metrics<span style={{ color: "#00C853" }}>.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-lg sm:text-xl font-normal leading-relaxed max-w-xl text-[#CCCCCC]"
            >
              We integrate robust software engineering, performance marketing, and data intelligence to build high-performance growth engines for African enterprises.
            </motion.p>
          </div>

          {/* Premium Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#closing"
              className="px-6 py-3.5 text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-sm font-semibold border flex items-center space-x-2.5 shadow-md hover:scale-[1.02] active:scale-95 text-black"
              style={{
                backgroundColor: "#00C853",
                borderColor: "#00C853",
                color: "#000000",
              }}
            >
              <span>Start the conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#work"
              className="px-6 py-3.5 text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-sm border flex items-center space-x-2 hover:bg-white/5"
              style={{
                borderColor: "rgba(0, 200, 83, 0.25)",
                backgroundColor: "rgba(0, 200, 83, 0.03)",
                color: "#F0F0F0",
              }}
            >
              <span>View Our Work</span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Immersive, Cinematic, Overlapping 3D Parallax Composition */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-[500px]">
          
          {/* Layer 1: Dynamic Ambient Backlight Glow (Deepest depth) */}
          <motion.div 
            className="absolute w-[320px] h-[320px] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-500"
            style={{
              backgroundColor: accentColor,
              x: glowX,
              y: glowY,
            }}
          />

          {/* Layer 2: 3D Procedural Canvas Grid Projection */}
          <motion.div
            style={{ x: canvasX, y: canvasY }}
            className="absolute z-10 pointer-events-none"
          >
            <canvas 
              ref={canvasRef} 
              className="opacity-70 dark:opacity-85 mix-blend-screen"
            />
          </motion.div>

          {/* Layer 3: Central Overlapping Glassmorphic Dashboard Panel (Base Layer) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[340px] h-[220px] rounded-md border backdrop-blur-xl bg-zinc-950/20 shadow-2xl p-6 flex flex-col justify-between"
            style={{ x: cardBaseX, y: cardBaseY, borderColor: ruleColor }}
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-400">Campaign Analytics</span>
              </div>
              <span className="font-mono text-[7px] text-zinc-500">Enterprise Growth Engine</span>
            </div>

            <div className="space-y-3 my-auto">
              <div className="flex items-center justify-between font-mono text-[9px] text-zinc-300">
                <span>Active Campaign ROI:</span>
                <span style={{ color: accentColor }} className="font-bold">+346% Growth</span>
              </div>
              {/* Clean modular track layout */}
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "88%" }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
              <p className="font-sans text-[10px] text-zinc-400 leading-normal">
                Integrating multi-channel ad spend and software conversions to optimize customer acquisition performance.
              </p>
            </div>

            <div className="flex justify-between items-center text-[7px] font-mono text-zinc-500 pt-2 border-t border-white/5">
              <span>PERFORMANCE: OPTIMAL</span>
              <span>DATA INTEGRITY: 100%</span>
            </div>
          </motion.div>

          {/* Layer 4: Floating UI Glass Card (Top Right overlap, floats forward) */}
          <motion.div
            style={{ x: cardTopX, y: cardTopY }}
            initial={{ opacity: 0, x: 60, y: -40, rotate: 4 }}
            animate={{ opacity: 1, x: 40, y: -80, rotate: 3 }}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 w-[190px] p-4 rounded-sm border backdrop-blur-md bg-black/40 border-white/10 shadow-xl flex items-start space-x-3 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="p-2 rounded-sm bg-white/5 border border-white/10">
              <Cpu className="w-3.5 h-3.5 animate-pulse" style={{ color: "var(--accent-custom)" }} />
            </div>
            <div>
              <span className="block font-mono text-[7px] text-zinc-400 uppercase tracking-wider leading-none mb-1">Acquisition Cost</span>
              <span className="block text-[11px] font-bold text-zinc-100 uppercase leading-tight">-43% CPC</span>
            </div>
          </motion.div>

          {/* Layer 5: Floating Graphic Glass Card (Bottom Left overlap, floats deeper) */}
          <motion.div
            style={{ x: cardBottomX, y: cardBottomY }}
            initial={{ opacity: 0, x: -70, y: 60, rotate: -6 }}
            animate={{ opacity: 1, x: -60, y: 90, rotate: -4 }}
            transition={{ duration: 1.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 w-[210px] p-3.5 rounded-sm border backdrop-blur-md bg-black/40 border-white/10 shadow-2xl flex items-center justify-between hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-full bg-white/5 border border-white/5">
                <Network className="w-3 h-3" style={{ color: "var(--accent-custom)" }} />
              </div>
              <div className="font-sans text-[10px] text-zinc-100 uppercase tracking-wide">
                User Activity
              </div>
            </div>
            <div className="font-mono text-xs font-bold animate-pulse" style={{ color: "var(--accent-custom)" }}>
              +54%
            </div>
          </motion.div>

        </div>

      </div>

      {/* Cinematic Base Specs Bar */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-t pt-5" style={{ borderColor: ruleColor }}>
        <div className="font-mono text-[9px] uppercase tracking-widest flex items-center space-x-6 text-zinc-500">
          <div>
            <span>HQ:</span>{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Victoria Island, Lagos</span>
          </div>
          <div className="hidden sm:block">
            <span>Clients:</span>{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Amazon Prime Video · Paga · Nile University</span>
          </div>
        </div>
        <div className="font-mono text-[9px] uppercase tracking-widest flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="text-zinc-400 dark:text-zinc-500">Established 2019</span>
        </div>
      </div>
    </section>
  );
}

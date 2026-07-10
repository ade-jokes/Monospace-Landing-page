import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { audioEngine } from "../utils/audioEngine";

interface EditorialHeroProps {
  theme: "light" | "dark";
}

export default function EditorialHero({ theme }: EditorialHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Fine-tuned constellation of green dust particles
    const particleCount = 28;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      baseAlpha: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        baseAlpha: Math.random() * 0.35 + 0.1,
        alpha: 0,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render ultra-soft ambient green glow at the center
      const centerX = width / 2;
      const centerY = height / 2;
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.min(width, height) * 0.6
      );

      if (theme === "dark") {
        gradient.addColorStop(0, "rgba(16, 185, 129, 0.06)");
        gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.02)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        gradient.addColorStop(0, "rgba(5, 150, 105, 0.05)");
        gradient.addColorStop(0.5, "rgba(5, 150, 105, 0.015)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      }

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width, height), 0, Math.PI * 2);
      ctx.fill();

      // Render slowly drifting nodes and connection lines
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary wrapping
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtly react to mouse position
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 220) {
          p.x += (dx / dist) * 0.15;
          p.y += (dy / dist) * 0.15;
          p.alpha = Math.min(0.85, p.baseAlpha + (1 - dist / 220) * 0.4);
        } else {
          p.alpha = p.baseAlpha;
        }

        // Draw elegant green nodes
        ctx.fillStyle = theme === "dark" 
          ? `rgba(16, 185, 129, ${p.alpha})` 
          : `rgba(5, 150, 105, ${p.alpha * 0.9})`;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw fine connection lines
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (ldist < 140) {
            const lineAlpha = (1 - ldist / 140) * 0.08;
            ctx.strokeStyle = theme === "dark"
              ? `rgba(16, 185, 129, ${lineAlpha})`
              : `rgba(5, 150, 105, ${lineAlpha * 0.8})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [theme, mousePos.x, mousePos.y]);

  const handleCtaClick = () => {
    audioEngine.playClick();
    const visionSection = document.getElementById("vision-section");
    if (visionSection) {
      visionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 md:px-24 pt-36 pb-16 overflow-hidden transition-colors duration-700"
      style={{
        backgroundColor: theme === "dark" ? "#0A0A0A" : "#FDFBF7",
      }}
    >
      {/* Background Interactive Nodes Canvas */}
      <canvas
        ref={canvasRef}
        id="hero-constellation-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Chapter Marker - Minimal Accent */}
      <div className="relative z-10 self-start font-mono text-[10px] tracking-widest uppercase">
        <span 
          className="transition-colors duration-500"
          style={{ color: theme === "dark" ? "#10B981" : "#059669" }}
        >
          01 — INTRO
        </span>
      </div>

      {/* Main Hero Copy - High Contrast Typography */}
      <div className="relative z-10 my-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[1.05] transition-colors duration-500"
          style={{
            color: theme === "dark" ? "#EAE7E2" : "#1A1A1C",
          }}
          id="hero-main-title"
        >
          We craft digital systems that <span className="italic font-normal" style={{ color: theme === "dark" ? "#10B981" : "#059669" }}>think</span>, speak, and endure.
        </motion.h1>

        {/* Quiet supporting sentence (magazine subtitle style) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.4 }}
          className="mt-8 font-sans text-xs sm:text-sm tracking-wider uppercase leading-relaxed max-w-md transition-colors duration-500"
          style={{
            color: theme === "dark" ? "#A5A29D" : "#6E6B65",
          }}
          id="hero-subtitle"
        >
          Monospace Digital is a premium, understated studio creating high-performance web systems and bespoke AI automation.
        </motion.p>
      </div>

      {/* Bottom Restrained CTA Section */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t pt-8"
        style={{
          borderColor: theme === "dark" ? "rgba(16,185,129,0.1)" : "rgba(5,150,105,0.12)"
        }}
      >
        <div className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: theme === "dark" ? "#7D7B77" : "#8C8983" }}
        >
          LOS ANGELES / MUNICH
        </div>

        <button
          id="hero-scroll-cta-btn"
          onClick={handleCtaClick}
          onMouseEnter={() => audioEngine.playSweep()}
          className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 self-start"
          style={{
            color: theme === "dark" ? "#10B981" : "#059669",
          }}
        >
          <span>Read our vision</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
        </button>
      </div>
    </section>
  );
}

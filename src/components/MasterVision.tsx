import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface MasterVisionProps {
  theme: "light" | "dark";
}

export default function MasterVision({ theme }: MasterVisionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDelta, setScrollDelta] = useState(0);

  const accentColor = "var(--accent-custom)";
  const ruleColor = "var(--border-custom)";
  const textColorMuted = "text-muted-custom";

  // Measure scrolling speed / acceleration to dynamically warp canvas rotations
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timer: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);
      setScrollDelta(Math.min(diff * 0.05, 12)); // Cap delta acceleration
      lastScrollY = currentScrollY;

      clearTimeout(timer);
      timer = window.setTimeout(() => {
        setScrollDelta(0);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Canvas based interactive floating structural geometry (Hashgraph / premium wireframe look)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 380;
    let height = 380;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    let angleX = 0.003;
    let angleY = 0.004;

    const drawSphericalGrid = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;

      ctx.strokeStyle = theme === "dark" 
        ? "rgba(0, 255, 102, 0.18)" 
        : "rgba(0, 168, 84, 0.22)";
      ctx.lineWidth = 0.6;

      // Concentric structural wireframe circles representing orbital computational pathways
      for (let i = 0; i < 4; i++) {
        const currentRadius = radius * (1 - i * 0.22);
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating complex lines
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
        // Boost angle rotation based on current scrollDelta
        const speedMultiplierX = 1 + scrollDelta * 1.5;
        const speedMultiplierY = 1 + scrollDelta * 1.2;

        const xOffset = Math.sin(angle + angleX * speedMultiplierX) * radius;
        const yOffset = Math.cos(angle + angleY * speedMultiplierY) * radius;
        ctx.moveTo(centerX - xOffset, centerY - yOffset);
        ctx.lineTo(centerX + xOffset, centerY + yOffset);
      }
      ctx.stroke();

      // Slow drift
      angleX += 0.002;
      angleY += 0.0015;

      animationFrameId = requestAnimationFrame(drawSphericalGrid);
    };

    drawSphericalGrid();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, scrollDelta]);

  return (
    <section 
      id="vision" 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-32 px-6 sm:px-12 md:px-24 bg-bg-custom text-text-custom"
    >
      {/* Structural Borders drawing themselves on scroll entrance */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-12 sm:left-24 border-l origin-top" 
          style={{ borderColor: ruleColor }} 
        />
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 right-12 sm:right-24 border-r origin-bottom" 
          style={{ borderColor: ruleColor }} 
        />
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 border-b origin-left" 
          style={{ borderColor: ruleColor }} 
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        {/* Left Column: Quiet Chapter Label & Abstract Sphere Canvas */}
        <div className="md:col-span-5 flex flex-col items-start justify-center relative">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-15%" }}
            transition={{ duration: 0.8 }}
            className="font-mono text-sm tracking-widest uppercase mb-12 text-[#00C853]"
          >
            <span>OUR VISION</span>
          </motion.div>

          <div className="relative w-full flex justify-center items-center">
            {/* Ambient Backlight Glow which expands dynamically with scroll speed */}
            <motion.div 
              animate={{
                scale: 1 + scrollDelta * 0.08,
                opacity: 0.2 + scrollDelta * 0.03,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute w-[240px] h-[240px] rounded-full blur-[70px] pointer-events-none"
              style={{
                background: theme === "dark"
                  ? "radial-gradient(circle, rgba(0, 255, 102, 0.25) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(0, 168, 84, 0.18) 0%, transparent 70%)"
              }}
            />
            <motion.div
              animate={{
                scale: 1 + scrollDelta * 0.02,
                rotate: scrollDelta * 5,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <canvas
                ref={canvasRef}
                className="relative z-10 transition-opacity duration-1000"
              />
            </motion.div>
          </div>
        </div>

        {/* Right Column: Statement with slow-reveal pacing */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-15%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-snug text-text-custom">
              "We reject vanity metrics. We integrate robust software engineering, performance marketing, and data intelligence to build high-performance growth engines for African enterprises."
            </h2>
            
            <p className={`font-sans text-sm sm:text-base font-light leading-relaxed max-w-xl ${textColorMuted}`}>
              Monospace Digital is a premium digital transformation consultancy headquartered in Victoria Island, Lagos. Founded in 2019, we design and build scalable digital solutions, integrate unified analytics dashboards, and run high-efficiency acquisition campaigns. Our mission is clear: delivering measurable, compounding business growth through rigorous design and engineering.
            </p>
 
            <div className="pt-6 font-mono text-sm tracking-widest uppercase flex items-center space-x-3">
              <span className="w-1.5 h-[1px]" style={{ backgroundColor: "#00C853" }} />
              <span className="text-[#AAAAAA]">MONOSPACE DIGITAL — EST. 2019 · LAGOS</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

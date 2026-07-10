import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface EditorialVisionProps {
  theme: "light" | "dark";
}

export default function EditorialVision({ theme }: EditorialVisionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Canvas animation for slow-morphing abstract ambient wireframe sphere
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

    let angle = 0;
    const drawSphere = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.35;

      ctx.strokeStyle = theme === "dark" 
        ? "rgba(16, 185, 129, 0.15)" 
        : "rgba(5, 150, 105, 0.18)";
      ctx.lineWidth = 0.8;

      // Draw beautiful concentric rotating ellipses to simulate a 3D wireframe sphere
      for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        const currentAngle = angle + (i * Math.PI) / 9;
        const widthMultiplier = Math.sin(currentAngle);
        
        ctx.ellipse(
          cx,
          cy,
          radius * Math.abs(widthMultiplier),
          radius,
          angle * 0.2,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      }

      // Slow drift
      angle += 0.003;
      animFrame = requestAnimationFrame(drawSphere);
    };

    drawSphere();

    // GSAP ScrollTrigger Pinning & Sequence reveal
    const container = containerRef.current;
    const textEl = textContainerRef.current;
    const sphereEl = sphereRef.current;

    if (container && textEl && sphereEl) {
      // Pin the section and sequence the components
      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      });

      // Animate elements as we scrub through the pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%",
          scrub: 1,
        },
      });

      // Reveal visual first, then text, then lock in place
      tl.fromTo(
        sphereEl,
        { opacity: 0, scale: 0.85, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }
      ).fromTo(
        textEl,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" },
        "-=0.4"
      );

      return () => {
        trigger.kill();
        tl.kill();
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animFrame);
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [theme]);

  return (
    <div
      id="vision-section"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-12 md:px-24 py-24 overflow-hidden transition-colors duration-700"
      style={{
        backgroundColor: theme === "dark" ? "#0A0A0A" : "#FDFBF7",
      }}
    >
      <div className="absolute top-12 left-6 sm:left-12 md:left-24 font-mono text-[10px] tracking-widest uppercase">
        <span 
          className="transition-colors duration-500"
          style={{ color: theme === "dark" ? "#10B981" : "#059669" }}
        >
          02 — VISION
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Side: Large slow-moving abstract rotating wireframe visual */}
        <div 
          ref={sphereRef}
          className="md:col-span-6 flex items-center justify-center relative min-h-[300px] sm:min-h-[400px]"
        >
          {/* Subtle soft green backlight glow */}
          <div 
            className="absolute w-[250px] h-[250px] rounded-full blur-[80px] opacity-25"
            style={{
              background: theme === "dark"
                ? "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(5, 150, 105, 0.15) 0%, transparent 70%)",
            }}
          />
          <canvas
            ref={canvasRef}
            id="vision-ambient-canvas"
            className="w-full h-[400px] z-10 pointer-events-none"
          />
        </div>

        {/* Right Side: The Vision Copy */}
        <div 
          ref={textContainerRef}
          className="md:col-span-6 flex flex-col items-start space-y-6"
        >
          <h2 
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-snug transition-colors duration-500"
            style={{
              color: theme === "dark" ? "#EAE7E2" : "#1A1A1C",
            }}
            id="vision-main-heading"
          >
            We believe digital products can be <span className="italic">literature</span>.
          </h2>

          <p 
            className="font-sans text-sm sm:text-base tracking-wide leading-relaxed transition-colors duration-500"
            style={{
              color: theme === "dark" ? "#A5A29D" : "#5C5954",
            }}
            id="vision-paragraph"
          >
            Not noisy utilities designed to yell for attention, but precise, unhurried forms that embody quiet craftsmanship. We eliminate SaaS clutter in favor of elegant architecture, letting spacing and premium code do the heavy lifting.
          </p>

          <div 
            className="h-[1px] w-12 transition-colors duration-500"
            style={{
              backgroundColor: theme === "dark" ? "rgba(16,185,129,0.3)" : "rgba(5,150,105,0.35)",
            }}
          />

          <span 
            className="font-mono text-[9px] tracking-widest uppercase transition-colors duration-500"
            style={{
              color: theme === "dark" ? "#7D7B77" : "#8C8983",
            }}
          >
            NO GLITCHES / NO GIMMICKRY / REAL INTENT
          </span>
        </div>
      </div>
    </div>
  );
}

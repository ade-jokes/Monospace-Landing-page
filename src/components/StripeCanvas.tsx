import React, { useEffect, useRef } from "react";

interface BlobNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  angleX: number;
  angleY: number;
  amplitudeX: number;
  amplitudeY: number;
}

export default function StripeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 800;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Setup 5 flowing fluid nodes matching Stripe's signature vibrant color palette
    // 635BFF (Stripe Indigo), 00C853 (Vibrant Green), 0EA5E9 (Cyan Blue), FF2E93 (Bright Pink), F59E0B (Sunset Gold)
    const colors = [
      "rgba(99, 91, 255, 0.45)",  // Indigo
      "rgba(0, 200, 83, 0.35)",   // Neon Green
      "rgba(14, 165, 233, 0.40)",  // Deep Cyan
      "rgba(255, 46, 147, 0.30)",  // Magenta/Pink
      "rgba(245, 158, 11, 0.25)"   // Warm Gold
    ];

    const nodes: BlobNode[] = colors.map((color, i) => {
      // Space them out gracefully across the coordinate grid
      const ratioX = 0.2 + (i * 0.15);
      const ratioY = 0.3 + ((i % 2) * 0.2);

      return {
        x: width * ratioX,
        y: height * ratioY,
        baseX: ratioX,
        baseY: ratioY,
        radius: Math.min(width, height) * (0.45 + i * 0.05), // Huge soft radial gradients
        color,
        speedX: 0.0004 + i * 0.0002,
        speedY: 0.0003 + (4 - i) * 0.0001,
        angleX: Math.random() * Math.PI * 2,
        angleY: Math.random() * Math.PI * 2,
        amplitudeX: 120 + i * 40,
        amplitudeY: 100 + i * 30,
      };
    });

    const render = () => {
      // Fill background with elegant velvet deep charcoal base
      ctx.fillStyle = "#0B0B0F";
      ctx.fillRect(0, 0, width, height);

      // Set blend mode to enable beautiful additive color overlaps (similar to real light/projection)
      ctx.globalCompositeOperation = "screen";

      nodes.forEach((node) => {
        // Increment angles for trigonometric orbits
        node.angleX += node.speedX;
        node.angleY += node.speedY;

        // Calculate current center point with smooth responsive floating offsets
        const targetX = width * node.baseX + Math.sin(node.angleX) * node.amplitudeX;
        const targetY = height * node.baseY + Math.cos(node.angleY) * node.amplitudeY;

        // Dampened movement towards the target point
        node.x += (targetX - node.x) * 0.08;
        node.y += (targetY - node.y) * 0.08;

        // Create a massive radial gradient for ultimate ambient light falloff
        const grad = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius
        );
        grad.addColorStop(0, node.color);
        grad.addColorStop(0.3, node.color.replace(/[\d.]+\)$/, "0.15)"));
        grad.addColorStop(0.6, node.color.replace(/[\d.]+\)$/, "0.04)"));
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Restore composite operation for normal UI content above
      ctx.globalCompositeOperation = "source-over";

      // Draw horizontal dynamic scanlines overlay to augment the 3D retro/tech texture
      ctx.fillStyle = "rgba(11, 11, 15, 0.08)";
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        mixBlendMode: "normal",
        opacity: 0.85,
      }}
    />
  );
}

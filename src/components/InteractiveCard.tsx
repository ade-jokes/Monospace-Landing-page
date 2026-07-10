import React, { useState, useEffect, useRef } from "react";

interface InteractiveCardProps {
  accent: string;       // hex or color string, e.g. '#00C853'
  glowColor: string;    // e.g. 'rgba(0, 200, 83, 0.10)'
  className?: string;   // existing tailwind classes
  style?: React.CSSProperties; // existing style
  children: React.ReactNode;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function InteractiveCard({
  accent,
  glowColor,
  className = "",
  style = {},
  children,
  onMouseEnter,
  onMouseLeave,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoverSupported, setIsHoverSupported] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);

  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Check hover support on mount
  useEffect(() => {
    setIsHoverSupported(window.matchMedia("(hover: hover)").matches);
  }, []);

  // Initialize coords to center of card
  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({ x: rect.width / 2, y: rect.height / 2 });
    }
  }, []);

  // requestAnimationFrame loop for rotating border trace (Effect 2)
  const animate = (time: number) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;
      // 360 degrees in 2000ms -> 0.18 degrees per ms
      setAngle((prevAngle) => (prevAngle + 0.18 * deltaTime) % 360);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isHovered && isHoverSupported) {
      previousTimeRef.current = null;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovered, isHoverSupported]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHoverSupported) return;
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isHoverSupported) {
      setIsHovered(true);
    }
    if (onMouseEnter) {
      onMouseEnter(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isHoverSupported) {
      setIsHovered(false);
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        // On mouseleave: reset the gradient to centre over 400ms transition
        setCoords({
          x: rect.width / 2,
          y: rect.height / 2,
        });
      }
    }
    if (onMouseLeave) {
      onMouseLeave(e);
    }
  };

  // Convert hex accent to rgb to construct exact box-shadow
  const getRgba = (hex: string, alpha: number) => {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Effect 3: layered shadow styling with custom spring transition
  const shadowStyle: React.CSSProperties = isHovered && isHoverSupported
    ? {
        transform: "translateY(-6px)",
        boxShadow: `0 4px 8px rgba(0,0,0,0.3), 0 16px 32px rgba(0,0,0,0.2), 0 32px 64px ${getRgba(accent, 0.10)}`,
        transition: "transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 250ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      }
    : {
        transition: "transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 250ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ ...style, ...shadowStyle }}
    >
      {/* EFFECT 1: Magnetic cursor glow overlay */}
      {isHoverSupported && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 transition-opacity"
          style={{
            transitionDuration: isHovered ? "200ms" : "400ms",
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 200px at ${coords.x}px ${coords.y}px, ${glowColor}, transparent)`,
          }}
        />
      )}

      {/* EFFECT 2: Border light trace overlay */}
      {isHoverSupported && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] border-trace-mask z-10 transition-opacity duration-300"
          style={{
            padding: "1px",
            background: `conic-gradient(from ${angle}deg, ${accent}, transparent 120deg)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Render card children */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { audioEngine } from "../utils/audioEngine";

interface NarrativeJourneyTrackerProps {
  theme: "light" | "dark";
}

const chapters = [
  { id: "hero", label: "INTRO", sub: "WELCOME" },
  { id: "vision", label: "VISION", sub: "OUR PURPOSE" },
  { id: "services", label: "SERVICES", sub: "CAPABILITIES" },
  { id: "capabilities", label: "SIMULATIONS", sub: "INTERACTIVE" },
  { id: "work", label: "WORK", sub: "CASE STUDIES" },
  { id: "social-proof", label: "TRUST", sub: "TESTIMONIALS" },
  { id: "closing", label: "PARTNERSHIP", sub: "CONNECT" },
];

export default function NarrativeJourneyTracker({ theme }: NarrativeJourneyTrackerProps) {
  const [activeChapter, setActiveChapter] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  const accentColor = "#00FF66";
  const ruleColor = "rgba(0, 255, 102, 0.15)";

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }

      // Check which section is in center of viewport
      let currentSection = "hero";
      const threshold = window.innerHeight * 0.45;

      for (const ch of chapters) {
        const el = document.getElementById(ch.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is above the threshold and bottom is below it
          if (rect.top <= threshold && rect.bottom >= threshold) {
            currentSection = ch.id;
            break;
          }
        }
      }
      setActiveChapter(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    audioEngine.playSweep();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end space-y-6 select-none pointer-events-auto bg-zinc-950/50 border border-zinc-800/20 px-4 py-5 rounded-xl backdrop-blur-md shadow-2xl">
      {/* Scroll indicator label */}
      <div className="font-mono text-[8px] tracking-[0.3em] uppercase text-zinc-400">
        NAVIGATION
      </div>

      <div className="relative flex items-center justify-center py-2 pr-1">
        {/* Dynamic Vertical Progress Bar */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-[2px] rounded-full" 
          style={{ backgroundColor: ruleColor }}
        />
        <motion.div
          className="absolute right-0 top-0 w-[2px] origin-top rounded-full"
          style={{ 
            height: "100%", 
            backgroundColor: accentColor,
            scaleY: scrollProgress 
          }}
        />

        {/* Floating Chapters */}
        <div className="flex flex-col space-y-5 items-end justify-between py-2 relative">
          {chapters.map((ch, idx) => {
            const isCurrent = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => handleNavigate(ch.id)}
                onMouseEnter={() => audioEngine.playClick()}
                className="group flex items-center space-x-4 outline-none text-right"
              >
                {/* Descriptive hover chip */}
                <div className="transition-all duration-300 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 flex flex-col items-end justify-center pr-1">
                  <span className="font-mono text-[9px] font-bold tracking-widest text-zinc-200">
                    {ch.label}
                  </span>
                  <span className="font-mono text-[7px] text-zinc-400 uppercase tracking-widest">
                    {ch.sub}
                  </span>
                </div>

                {/* Status Dot node on progress thread */}
                <div className="relative flex items-center justify-center w-4 h-4">
                  {/* Outer active pulse */}
                  <AnimatePresence>
                    {isCurrent && (
                      <motion.span
                        layoutId="activeDotRing"
                        className="absolute w-4 h-4 rounded-full border opacity-50"
                        style={{ borderColor: accentColor }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  {/* Core dot node */}
                  <motion.div
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                      backgroundColor: isCurrent ? accentColor : "rgba(120, 120, 120, 0.3)",
                    }}
                    className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Numerical percentage indicator */}
      <div className="font-mono text-[9px] text-zinc-400 tracking-widest">
        {Math.round(scrollProgress * 100)}% READ
      </div>
    </div>
  );
}

import React from "react";
import { Volume2, VolumeX, Sun, Moon } from "lucide-react";
import { audioEngine } from "../utils/audioEngine";

interface EditorialNavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
}

export default function EditorialNavbar({
  theme,
  toggleTheme,
  audioEnabled,
  toggleAudio,
}: EditorialNavbarProps) {
  const triggerClick = () => {
    audioEngine.playClick();
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerClick();
    const hero = document.getElementById("hero-section");
    if (hero) hero.scrollIntoView({ behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    triggerClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      id="editorial-navbar"
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-500 backdrop-blur-md"
      style={{
        backgroundColor: theme === "dark" ? "rgba(10, 10, 11, 0.75)" : "rgba(253, 251, 247, 0.75)",
        borderBottom: theme === "dark" ? "1px solid rgba(16, 185, 129, 0.08)" : "1px solid rgba(5, 150, 105, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
        {/* Monospaced Wordmark */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="font-serif text-lg tracking-tight font-light flex items-center gap-2"
          style={{ color: theme === "dark" ? "#EAE7E2" : "#1A1A1C" }}
          id="nav-logo-link"
        >
          <span>Monospace</span>
          <span 
            className="italic text-xs font-normal"
            style={{ color: theme === "dark" ? "#10B981" : "#059669" }}
          >
            Digital
          </span>
        </a>

        {/* Chapter links - noticeably small supporting text (deliberate size contrast) */}
        <div className="hidden md:flex items-center space-x-10 font-mono text-[10px] tracking-widest uppercase">
          <a
            href="#vision-section"
            onClick={(e) => handleLinkClick(e, "vision-section")}
            className="transition-colors hover:opacity-80"
            style={{ color: theme === "dark" ? "#A5A29D" : "#5C5954" }}
            id="nav-link-vision"
          >
            02 — Vision
          </a>
          <a
            href="#work-section"
            onClick={(e) => handleLinkClick(e, "work-section")}
            className="transition-colors hover:opacity-80"
            style={{ color: theme === "dark" ? "#A5A29D" : "#5C5954" }}
            id="nav-link-work"
          >
            03 — Work
          </a>
          <a
            href="#credibility-section"
            onClick={(e) => handleLinkClick(e, "credibility-section")}
            className="transition-colors hover:opacity-80"
            style={{ color: theme === "dark" ? "#A5A29D" : "#5C5954" }}
            id="nav-link-dialogue"
          >
            04 — Dialogue
          </a>
        </div>

        {/* Controllers */}
        <div className="flex items-center space-x-4">
          {/* Ambient Synthesizer pill */}
          <button
            id="nav-audio-btn"
            onClick={toggleAudio}
            onMouseEnter={() => audioEngine.playClick()}
            className={`p-2 rounded-full border transition-all duration-300 flex items-center space-x-2 ${
              audioEnabled
                ? "bg-transparent text-[#10B981]"
                : "text-zinc-400 hover:text-zinc-500"
            }`}
            style={{
              borderColor: audioEnabled
                ? (theme === "dark" ? "#10B981" : "#059669")
                : "transparent"
            }}
            title={audioEnabled ? "Disable Ambient Synthesizer" : "Enable Ambient Synthesizer"}
          >
            {audioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" style={{ color: theme === "dark" ? "#10B981" : "#059669" }} />
                <span className="flex items-end space-x-[1.5px] h-2.5 px-0.5">
                  <span className="w-[1px] rounded-full animate-pulse bg-[#10B981]" style={{ height: "40%", animationDuration: "0.6s" }} />
                  <span className="w-[1px] rounded-full animate-pulse bg-[#10B981]" style={{ height: "100%", animationDuration: "0.4s" }} />
                  <span className="w-[1px] rounded-full animate-pulse bg-[#10B981]" style={{ height: "70%", animationDuration: "0.8s" }} />
                </span>
              </>
            ) : (
              <VolumeX className="w-3.5 h-3.5 opacity-60" />
            )}
          </button>

          {/* Premium Theme Switcher */}
          <button
            id="nav-theme-btn"
            onClick={toggleTheme}
            className="p-2 border rounded-full transition-all duration-300"
            style={{
              borderColor: theme === "dark" ? "rgba(16,185,129,0.15)" : "rgba(5,150,105,0.15)",
              color: theme === "dark" ? "#10B981" : "#059669",
            }}
            aria-label="Toggle theme mode"
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5" />
            ) : (
              <Moon className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

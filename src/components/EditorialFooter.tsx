import React from "react";

interface EditorialFooterProps {
  theme: "light" | "dark";
}

export default function EditorialFooter({ theme }: EditorialFooterProps) {
  const currentYear = 2026;

  const handleTopScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const hero = document.getElementById("hero-section");
    if (hero) hero.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="editorial-footer"
      className="py-16 transition-colors duration-500 border-t font-mono text-[10px]"
      style={{
        backgroundColor: theme === "dark" ? "#0A0A0A" : "#FDFBF7",
        borderColor: theme === "dark" ? "rgba(16,185,129,0.08)" : "rgba(5, 150, 105, 0.1)",
        color: theme === "dark" ? "#7D7B77" : "#8C8983",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span 
            className="font-serif text-sm font-light tracking-tight transition-colors duration-500"
            style={{ color: theme === "dark" ? "#EAE7E2" : "#1A1A1C" }}
          >
            Monospace Digital
          </span>
          <span className="hidden sm:inline opacity-30">/</span>
          <span>© {currentYear} // All rights reserved.</span>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="#"
            onClick={handleTopScroll}
            className="hover:opacity-80 transition-opacity"
            style={{ color: theme === "dark" ? "#10B981" : "#059669" }}
            id="footer-top-link"
          >
            TOP_▲
          </a>
          <span className="opacity-30">/</span>
          <a
            href="mailto:hello@monospace.digital"
            className="hover:opacity-80 transition-opacity"
            id="footer-email-link"
          >
            hello@monospace.digital
          </a>
          <span className="opacity-30">/</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            id="footer-github-link"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

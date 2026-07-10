import React from "react";

interface MasterFooterProps {
  theme: "light" | "dark";
}

export default function MasterFooter({ theme }: MasterFooterProps) {
  const accentColor = "var(--accent-custom)";
  const ruleColor = "var(--border-custom)";

  const handleTopScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="py-16 transition-colors duration-500 border-t font-mono text-sm"
      style={{
        backgroundColor: "var(--bg-custom)",
        borderColor: ruleColor,
        color: "var(--text-custom)",
        opacity: 0.8
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span>© 2026 MONOSPACE DIGITAL CORP.</span>
        </div>

        <div className="flex space-x-8">
          <a href="#" className="hover:text-zinc-500 transition-colors uppercase">PRIVACY POLICY</a>
          <a href="#services" className="hover:text-zinc-500 transition-colors uppercase">SERVICES</a>
          <a
            href="#"
            onClick={handleTopScroll}
            className="hover:opacity-80 transition-opacity uppercase font-bold"
            style={{ color: accentColor }}
            id="footer-top-link"
          >
            BACK TO TOP ▲
          </a>
        </div>
      </div>
    </footer>
  );
}

import React from "react";

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 60;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
      style={{ backgroundColor: "#080808" }}
      className="border-t border-[rgba(255,255,255,0.05)] py-[48px] px-6"
    >
      <div className="max-w-[1080px] mx-auto">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-[32px]">
          {/* Left Brand */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, "hero")}
            className="text-[16px] font-bold text-[#ECECF0] tracking-[-0.02em] flex items-center hover:opacity-90 transition-opacity"
          >
            <span>Monospace</span>
            <span className="text-[#00C853]">.</span>
          </a>

          {/* Centre links */}
          <div className="flex items-center gap-[24px] text-[13px] font-medium text-[#6B7280] flex-wrap justify-center">
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "services")}
              className="hover:text-[#ECECF0] transition-colors duration-150"
            >
              Services
            </a>
            <a
              href="#work"
              onClick={(e) => handleScrollTo(e, "work")}
              className="hover:text-[#ECECF0] transition-colors duration-150"
            >
              Work
            </a>
            <a
              href="#process"
              onClick={(e) => handleScrollTo(e, "process")}
              className="hover:text-[#ECECF0] transition-colors duration-150"
            >
              Process
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "contact")}
              className="hover:text-[#ECECF0] transition-colors duration-150"
            >
              Contact
            </a>
          </div>

          {/* Right socials */}
          <div className="flex items-center gap-[20px]">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#6B7280] hover:text-[#00C853] transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#6B7280] hover:text-[#00C853] transition-colors duration-200"
              aria-label="Twitter"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#6B7280] hover:text-[#00C853] transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-[rgba(255,255,255,0.04)] pt-[24px] gap-4">
          <div className="text-[13px] text-[#4A4A54] text-center md:text-left">
            © 2026 Monospace Digital · Victoria Island, Lagos
          </div>
          <a
            href="mailto:hello@monospacedigital.com"
            className="text-[13px] text-[#4A4A54] hover:text-[#6B7280] transition-colors duration-150"
          >
            hello@monospacedigital.com
          </a>
        </div>
      </div>
    </footer>
  );
}

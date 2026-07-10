import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      style={{ height: "60px" }}
      className={`fixed top-0 left-0 w-full z-[100] flex items-center transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0B0F]/75 backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.09)]"
          : "bg-[#0B0B0F]/70 backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.05)]"
      }`}
    >
      <div className="w-full max-w-[1080px] mx-auto px-6 flex items-center justify-between">
        {/* Left Side: Brand */}
        <a
          href="#hero"
          onClick={(e) => handleScrollTo(e, "hero")}
          className="flex items-center text-[16px] font-bold text-[#ECECF0] tracking-[-0.02em] hover:opacity-90 transition-opacity duration-200"
        >
          <span>Monospace</span>
          <span className="w-[6px] h-[6px] rounded-full bg-[#00C853] ml-[5px] inline-block" />
        </a>

        {/* Centre: Navigation Links */}
        <nav className="hidden md:flex items-center gap-[32px]">
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, "services")}
            className="nav-underline-grow text-[14px] font-medium text-[#6B7280] hover:text-[#ECECF0] transition-colors duration-150 ease-out"
          >
            Services
          </a>
          <a
            href="#work"
            onClick={(e) => handleScrollTo(e, "work")}
            className="nav-underline-grow text-[14px] font-medium text-[#6B7280] hover:text-[#ECECF0] transition-colors duration-150 ease-out"
          >
            Work
          </a>
          <a
            href="#process"
            onClick={(e) => handleScrollTo(e, "process")}
            className="nav-underline-grow text-[14px] font-medium text-[#6B7280] hover:text-[#ECECF0] transition-colors duration-150 ease-out"
          >
             Process
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="nav-underline-grow text-[14px] font-medium text-[#6B7280] hover:text-[#ECECF0] transition-colors duration-150 ease-out"
          >
            Contact
          </a>
        </nav>

        {/* Right Side: CTA Button */}
        <div>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="shimmer-btn inline-block text-[13px] font-semibold text-[#ECECF0] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.09)] rounded-[8px] px-[18px] py-[8px] transition-colors duration-150 ease-out hover:bg-[rgba(255,255,255,0.10)]"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

interface MasterNavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function MasterNavbar({
  theme,
  toggleTheme,
}: MasterNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const accentColor = "#00C853";

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-black/90 backdrop-blur-md border-emerald-950/20 py-4 shadow-lg" 
          : "bg-transparent border-transparent py-6"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center space-x-3 font-display text-base font-extrabold tracking-widest text-white hover:opacity-90 transition-opacity"
        >
          <span>MONOSPACE</span>
          <span 
            className="italic text-sm font-normal"
            style={{ color: accentColor }}
          >
            Digital
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-10 font-mono text-[14px] tracking-widest uppercase">
          <button 
            onClick={() => handleNavClick("vision")} 
            className="text-[#CCCCCC] hover:text-[#00C853] transition-colors relative group py-2"
          >
            VISION
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00C853] transition-all duration-300 group-hover:w-full" />
          </button>
          <button 
            onClick={() => handleNavClick("services")} 
            className="text-[#CCCCCC] hover:text-[#00C853] transition-colors relative group py-2"
          >
            SERVICES
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00C853] transition-all duration-300 group-hover:w-full" />
          </button>
          <button 
            onClick={() => handleNavClick("work")} 
            className="text-[#CCCCCC] hover:text-[#00C853] transition-colors relative group py-2"
          >
            WORK
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00C853] transition-all duration-300 group-hover:w-full" />
          </button>
          <button 
            onClick={() => handleNavClick("process")} 
            className="text-[#CCCCCC] hover:text-[#00C853] transition-colors relative group py-2"
          >
            PROCESS
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00C853] transition-all duration-300 group-hover:w-full" />
          </button>
        </div>

        {/* Controls Panel */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 border rounded-full border-emerald-950/40 bg-white/5 hover:border-[#00C853] hover:bg-[#00C853]/10 text-[#CCCCCC] hover:text-[#00C853] transition-all"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Direct CTA */}
          <button
            onClick={() => handleNavClick("closing")}
            className="px-5 py-2 font-mono text-sm tracking-widest uppercase border rounded-md transition-all duration-300 hover:scale-[1.03] font-bold"
            style={{
              borderColor: accentColor,
              color: accentColor,
              backgroundColor: "rgba(0, 200, 83, 0.05)"
            }}
          >
            PARTNER
          </button>
        </div>

        {/* Mobile controls & toggle */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 border rounded-full border-emerald-950/40 bg-white/5 hover:border-[#00C853] text-[#CCCCCC]"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border rounded-full border-emerald-950/40 bg-white/5 text-white"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
         <div 
           className="md:hidden border-t py-6 px-6 font-mono text-sm tracking-widest uppercase space-y-4 bg-black/95 border-emerald-950/30 text-white"
         >
           <button 
             onClick={() => handleNavClick("vision")} 
             className="block w-full text-left py-2 border-b border-white/5 text-[#CCCCCC] hover:text-[#00C853]"
           >
             VISION
           </button>
           <button 
             onClick={() => handleNavClick("services")} 
             className="block w-full text-left py-2 border-b border-white/5 text-[#CCCCCC] hover:text-[#00C853]"
           >
             SERVICES
           </button>
           <button 
             onClick={() => handleNavClick("work")} 
             className="block w-full text-left py-2 border-b border-white/5 text-[#CCCCCC] hover:text-[#00C853]"
           >
             WORK
           </button>
           <button 
             onClick={() => handleNavClick("process")} 
             className="block w-full text-left py-2 border-b border-white/5 text-[#CCCCCC] hover:text-[#00C853]"
           >
             PROCESS
           </button>

           <button
             onClick={() => handleNavClick("closing")}
             className="block w-full py-3 text-center border font-mono text-sm tracking-widest uppercase rounded-md mt-4 font-bold"
             style={{
               borderColor: accentColor,
               color: accentColor,
               backgroundColor: "rgba(0, 200, 83, 0.05)"
             }}
           >
             INITIATE INQUIRY
           </button>
         </div>
      )}
    </nav>
  );
}

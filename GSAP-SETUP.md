# Monospace Digital — Next.js (App Router) & GSAP Integration Setup

This guide documents how to move the ultra-premium editorial design of **Monospace Digital** from this React/Vite development container into a production **Next.js (App Router)** setup.

---

## 1. Tailwind CSS Configuration (`tailwind.config.ts`)

In Next.js, paste the following into your `tailwind.config.ts` (or the equivalent Tailwind v4 config) to preserve the premium serif typography, spacing presets, and custom gold/copper theme variables.

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      colors: {
        accent: {
          gold: {
            dark: "#D4AF37",  // Deep premium gold for dark mode details
            light: "#8D6A30", // Slightly richer, high-contrast gold for cream paper
          }
        },
        paper: {
          cream: "#FDFBF7",
          charcoal: "#0A0A0A",
        }
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 2. Next.js App Router Root Page (`src/app/page.tsx`)

In Next.js, the homepage should be a client-enabled controller if you want high-performance animations and sound engines. Here is the complete `page.tsx` implementation matching the system structure:

```tsx
"use client";

import { useState, useEffect } from "react";
import EditorialNavbar from "@/components/EditorialNavbar";
import EditorialHero from "@/components/EditorialHero";
import EditorialVision from "@/components/EditorialVision";
import EditorialWork from "@/components/EditorialWork";
import EditorialCredibility from "@/components/EditorialCredibility";
import EditorialClosing from "@/components/EditorialClosing";
import EditorialFooter from "@/components/EditorialFooter";
import { audioEngine } from "@/utils/audioEngine";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleAudio = () => {
    setAudioEnabled((prev) => {
      const next = !prev;
      if (next) {
        audioEngine.init();
        audioEngine.resume();
      } else {
        audioEngine.suspend();
      }
      return next;
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className="min-h-screen transition-colors duration-500 font-sans select-text selection:bg-[#D4AF37] selection:text-black"
      style={{
        backgroundColor: theme === "dark" ? "#0A0A0A" : "#FDFBF7",
        color: theme === "dark" ? "#EAE7E2" : "#1A1A1C",
      }}
    >
      {/* Navigation */}
      <EditorialNavbar
        theme={theme}
        toggleTheme={toggleTheme}
        audioEnabled={audioEnabled}
        toggleAudio={toggleAudio}
      />

      {/* Narrative Chapters */}
      <main className="relative">
        {/* 01 — Hero */}
        <EditorialHero theme={theme} />

        {/* 02 — Vision (Pinning ScrollTrigger) */}
        <EditorialVision theme={theme} />

        {/* 03 — Work Case-studies */}
        <EditorialWork theme={theme} />

        {/* 04 — Dialogue & Credibility */}
        <EditorialCredibility theme={theme} />

        {/* 05 — Inception (Cinematic Closing) */}
        <EditorialClosing />
      </main>

      {/* Footer */}
      <EditorialFooter theme={theme} />
    </div>
  );
}
```

---

## 3. GSAP & ScrollTrigger Optimization for Next.js

When integrating **GSAP** into Next.js App Router, adhere to these guidelines to avoid Hydration Mismatches and Memory Leaks:

1. **Register the Plugin inside standard React Effects:**
   Always register `ScrollTrigger` safely inside `useEffect` or `useLayoutEffect` so that registration happens strictly on the client:
   ```typescript
   import { useEffect } from "react";
   import { gsap } from "gsap";
   import { ScrollTrigger } from "gsap/ScrollTrigger";

   useEffect(() => {
     gsap.registerPlugin(ScrollTrigger);
   }, []);
   ```

2. **Always perform cleanup:**
   To prevent ScrollTrigger instances from piling up during hot reloads or route changes, ensure your `useEffect` returns a clean-up method that kills timelines and triggers:
   ```typescript
   useEffect(() => {
     const trigger = ScrollTrigger.create({
       trigger: elementRef.current,
       pin: true,
       scrub: 1.2,
     });

     return () => {
       trigger.kill(); // Prevents memory leaks
     };
   }, []);
   ```

3. **Use standard CSS clip-paths for premium editorial reveals:**
   For slow-moving page reveals, animate standard `clip-path` parameters using GSAP. It is smoother and hardware-accelerated:
   ```typescript
   gsap.fromTo(
     imageRef.current,
     { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
     { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 1.4 }
   );
   ```

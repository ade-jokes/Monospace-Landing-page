# GSAP Setup for Next.js (App Router)

To integrate the high-fidelity scroll animations from the Monospace Digital landing page into your custom Next.js project, follow this short integration guide.

## 1. Install Dependencies
Install GSAP and its TypeScript types:

```bash
npm install gsap
```

## 2. Server-Side Rendering (SSR) Protection
Because Next.js runs code on both the server and the client, we must ensure GSAP's `ScrollTrigger` plugin (which relies on `window` and `document` DOM elements) only registers on the client-side.

In your page or component, guard plugin registration as follows:

```typescript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safe execution guard for SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

## 3. Recommended Animation Pattern with `useLayoutEffect` / `useEffect`
When building client-side animated components with React 18/19 and Next.js, always use `gsap.context()` inside `useEffect` or `useLayoutEffect`. This ensures that animations clean up properly on component unmount and prevents double-trigger bugs caused by React's StrictMode:

```typescript
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Create a scoped GSAP context tied to our component container
    const ctx = gsap.context(() => {
      
      // Define your timelines and ScrollTrigger selectors
      gsap.from(".anim-target", {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: ".trigger-el",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

    }, containerRef); // Scope selector lookups to containerRef

    // 2. Return clean-up revert logic
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="trigger-el">
        <div className="anim-target">Engineered Motion</div>
      </div>
    </div>
  );
}
```

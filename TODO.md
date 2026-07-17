# Monospace Digital — Landing Page TODO

## Step 1 — Styling system compliance (lime-only + typography)
- [ ] Update `nextjs-export/app/globals.css` to match exact brand colors:
  - Background `#080808`
  - Card bg `#0F0F0F`
  - Elevated card `#141414`
  - Text primary `#F0F0F0`
  - Text secondary `#888888`
  - Border idle `rgba(0,255,0,0.08)` hover `rgba(0,255,0,0.30)`
- [ ] Remove any non-lime accents (no blue/purple/amber gradients; remove conic/gradients that introduce other colors)
- [ ] Fonts: ensure only Google Fonts `Space Grotesk` + `Space Mono` are imported; remove Inter references.
- [ ] Ensure headline letter-spacing is extremely tight (-0.04em to -0.05em) and use correct weights.

## Step 2 — Page structure verification
- [ ] Verify `nextjs-export/app/page.tsx` uses sections in required order and swaps in correct components:
  Navbar → Hero → Client Logos → Quote → Services (6) → Demo → Work (3) → Timeline (CEO) → Process (4) → Testimonial → Closing CTA → Footer

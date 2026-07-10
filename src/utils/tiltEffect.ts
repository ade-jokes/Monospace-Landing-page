import gsap from "gsap";

interface TiltOptions {
  maxRotation?: number;   // Maximum rotation in degrees
  perspective?: number;   // 3D perspective value
  scale?: number;         // Scale factor on hover
  lerpSpeed?: number;     // Lerp smoothing factor
  translateRange?: number; // Range of translation (px) for parallax depth
}

/**
 * Registers a mouse-responsive 3D tilt effect on a DOM element using GSAP quickSetters.
 * Returns a cleanup function.
 */
export function register3DTilt(el: HTMLElement, options: TiltOptions = {}): () => void {
  const {
    maxRotation = 8,
    perspective = 1000,
    scale = 1.02,
    lerpSpeed = 0.08,
    translateRange = 6
  } = options;

  // Initialize perspective & preserve-3d
  gsap.set(el, { 
    transformPerspective: perspective, 
    transformStyle: "preserve-3d" 
  });

  // Target values to approach
  const targets = { rotateX: 0, rotateY: 0, currentScale: 1, x: 0, y: 0 };
  
  // Smoothed actual values applied
  const current = { rotateX: 0, rotateY: 0, currentScale: 1, x: 0, y: 0 };

  // Create GSAP quickSetters for high performance style updates (skips standard React rendering)
  const setRotateX = gsap.quickSetter(el, "rotateX", "deg");
  const setRotateY = gsap.quickSetter(el, "rotateY", "deg");
  const setScale = gsap.quickSetter(el, "scale");
  const setX = gsap.quickSetter(el, "x", "px");
  const setY = gsap.quickSetter(el, "y", "px");

  let isHovered = false;
  let frameId: number;

  const lerp = (start: number, end: number, ease: number) => {
    return start + (end - start) * ease;
  };

  const tick = () => {
    current.rotateX = lerp(current.rotateX, targets.rotateX, lerpSpeed);
    current.rotateY = lerp(current.rotateY, targets.rotateY, lerpSpeed);
    current.currentScale = lerp(current.currentScale, targets.currentScale, lerpSpeed);
    current.x = lerp(current.x, targets.x, lerpSpeed);
    current.y = lerp(current.y, targets.y, lerpSpeed);

    setRotateX(current.rotateX);
    setRotateY(current.rotateY);
    setScale(current.currentScale);
    setX(current.x);
    setY(current.y);

    frameId = requestAnimationFrame(tick);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isHovered) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;

    // Calculate tilt (Y-angle responds to X-movement, X-angle responds to Y-movement)
    targets.rotateY = ((x - xc) / xc) * maxRotation;
    targets.rotateX = -((y - yc) / yc) * maxRotation;
    targets.currentScale = scale;

    // Subtle 2D translation offset for additional parallax depth
    targets.x = ((x - xc) / xc) * translateRange;
    targets.y = ((y - yc) / yc) * translateRange;
  };

  const handleMouseEnter = () => {
    isHovered = true;
    targets.currentScale = scale;
  };

  const handleMouseLeave = () => {
    isHovered = false;
    targets.rotateX = 0;
    targets.rotateY = 0;
    targets.currentScale = 1;
    targets.x = 0;
    targets.y = 0;
  };

  el.addEventListener("mousemove", handleMouseMove);
  el.addEventListener("mouseenter", handleMouseEnter);
  el.addEventListener("mouseleave", handleMouseLeave);
  
  // Start the render loop
  tick();

  // Return complete cleanup function
  return () => {
    el.removeEventListener("mousemove", handleMouseMove);
    el.removeEventListener("mouseenter", handleMouseEnter);
    el.removeEventListener("mouseleave", handleMouseLeave);
    cancelAnimationFrame(frameId);
    
    // Reset transforms cleanly
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.3,
      overwrite: "auto"
    });
  };
}

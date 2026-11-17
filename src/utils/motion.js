export function prefersReducedMotion() {
  return typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Sections start with inline `opacity: 0` and rely on a GSAP fade-in to show.
// When the visitor asked for reduced motion we skip the animation, so we must
// make that content visible ourselves or the section stays blank.
export function revealWithoutMotion(root) {
  if (!root) return;
  for (const el of [root, ...root.querySelectorAll("*")]) {
    if (el.style?.opacity === "0") el.style.opacity = "1";
    if (el.style?.visibility === "hidden") el.style.visibility = "visible";
  }
}

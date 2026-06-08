import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Animated double-wave section divider (GSAP infinite scroll).
 *
 * Two wave layers move at different speeds (parallax):
 *  - back wave:  slower, semi-transparent
 *  - front wave: faster, solid colour
 *
 * Props:
 *  from  — background of the section ABOVE  (default: cream)
 *  to    — background of the section BELOW  (default: blue)
 *  flip  — mirror vertically (default: false)
 */
export default function WaveDivider({
  from = "rgb(246, 245, 240)",
  to   = "rgb(217, 234, 245)",
  flip = false,
}) {
  const backRef  = useRef(null);
  const frontRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Back wave — slow drift (one full tile = 375px)
    gsap.to(backRef.current, {
      x: -375,
      duration: 9,
      ease: "none",
      repeat: -1,
    });

    // Front wave — slightly faster for depth
    gsap.to(frontRef.current, {
      x: -375,
      duration: 6,
      ease: "none",
      repeat: -1,
    });
  });

  return (
    <div
      aria-hidden="true"
      style={{
        background: from,
        lineHeight: 0,
        overflow: "hidden",
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 375 80"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "clamp(48px, 13vw, 88px)" }}
      >
        {/* ── Back wave (2 tiles wide → seamless loop) ── */}
        <g ref={backRef} style={{ willChange: "transform" }}>
          {/* tile 1 */}
          <path
            d="M0,42 C55,65 115,18 187,44 C259,68 315,20 375,46 L375,80 L0,80 Z"
            fill={to}
            opacity="0.38"
          />
          {/* tile 2 (offset +375) */}
          <path
            d="M375,42 C430,65 490,18 562,44 C634,68 690,20 750,46 L750,80 L375,80 Z"
            fill={to}
            opacity="0.38"
          />
        </g>

        {/* ── Front wave (2 tiles wide → seamless loop) ── */}
        <g ref={frontRef} style={{ willChange: "transform" }}>
          {/* tile 1 */}
          <path
            d="M0,56 C50,34 112,72 187,54 C262,36 318,70 375,52 L375,80 L0,80 Z"
            fill={to}
          />
          {/* tile 2 (offset +375) */}
          <path
            d="M375,56 C425,34 487,72 562,54 C637,36 693,70 750,52 L750,80 L375,80 Z"
            fill={to}
          />
          {/* Central ornament */}
          <circle cx="187" cy="52" r="3"   fill="rgb(123,174,199)" opacity="0.7" />
          <circle cx="174" cy="55" r="1.8" fill="rgb(123,174,199)" opacity="0.5" />
          <circle cx="200" cy="55" r="1.8" fill="rgb(123,174,199)" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

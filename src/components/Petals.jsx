import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Soft white / ivory petals.
const COLORS = ["#ffffff", "#fdf7ee", "#f6ecdd", "#fffaf2", "#f1e6d6"];

const PETALS = Array.from({ length: 16 }, (_, i) => {
  const rnd = (min, max) => min + Math.random() * (max - min);
  return {
    id: i,
    left: rnd(-5, 100), // % start
    size: rnd(12, 26), // px
    color: COLORS[i % COLORS.length],
    duration: rnd(7, 13), // fall time (s)
    delay: rnd(0, 9), // stagger start (s)
    sway: rnd(20, 70), // horizontal drift amplitude (px)
    swayDur: rnd(2.5, 4.5), // sway period (s)
    spin: rnd(180, 540) * (Math.random() < 0.5 ? -1 : 1), // total rotation (deg)
    startRot: rnd(0, 360),
  };
});

/**
 * White rose petals drifting down across the scene for a soft, celebratory
 * touch. Pure transform/opacity animation (GPU-friendly) on a non-interactive
 * layer. Honors prefers-reduced-motion by rendering nothing.
 */
export default function Petals() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const nodes = gsap.utils.toArray(".petal", rootRef.current);
      nodes.forEach((el, i) => {
        const p = PETALS[i];

        gsap.set(el, { rotation: p.startRot, xPercent: -50, yPercent: -50 });

        gsap.fromTo(
          el,
          { yPercent: -120 },
          {
            yPercent: 1200,
            duration: p.duration,
            delay: p.delay,
            ease: "none",
            repeat: -1,
          }
        );

        gsap.to(el, {
          x: p.sway,
          duration: p.swayDur,
          delay: p.delay,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(el, {
          rotation: `+=${p.spin}`,
          duration: p.duration,
          delay: p.delay,
          ease: "none",
          repeat: -1,
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {PETALS.map((p) => (
        <span
          key={p.id}
          className="petal absolute top-0 will-change-transform"
          style={{ left: `${p.left}%` }}
        >
          <svg
            width={p.size}
            height={p.size * 1.2}
            viewBox="0 0 20 24"
            style={{ display: "block", filter: "drop-shadow(0 1px 2px rgba(120,110,90,0.28))" }}
          >
            <path
              d="M10 0 C 2 6, 0 16, 10 24 C 20 16, 18 6, 10 0 Z"
              fill={p.color}
              opacity="0.9"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

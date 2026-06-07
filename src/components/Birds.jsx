import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// One or two white birds gliding across the sky in the upper part of the scene.
const BIRDS = [
  { id: 0, top: 18, size: 34, dir: 1, duration: 16, delay: 1.5, drift: 26, bob: 3.2 },
  { id: 1, top: 27, size: 24, dir: 1, duration: 21, delay: 8, drift: 34, bob: 4 },
];

export default function Birds() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const nodes = gsap.utils.toArray(".bird", rootRef.current);
      nodes.forEach((el, i) => {
        const b = BIRDS[i];
        const wing = el.querySelector(".bird-wing");

        // Glide all the way across the sky and loop.
        gsap.fromTo(
          el,
          { xPercent: b.dir > 0 ? -130 : 130 },
          {
            xPercent: b.dir > 0 ? 130 : -130,
            duration: b.duration,
            delay: b.delay,
            ease: "none",
            repeat: -1,
          }
        );

        // Gentle vertical bob along the way.
        gsap.to(el, {
          y: b.drift,
          duration: b.duration / b.bob,
          delay: b.delay,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Soft wing flap.
        gsap.to(wing, {
          scaleY: 0.55,
          transformOrigin: "50% 50%",
          duration: 0.42,
          ease: "sine.inOut",
          yoyo: true,
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
      {BIRDS.map((b) => (
        <span
          key={b.id}
          className="bird absolute left-0 will-change-transform"
          style={{ top: `${b.top}%` }}
        >
          <svg
            className="bird-wing"
            width={b.size}
            height={b.size * 0.5}
            viewBox="0 0 40 20"
            fill="none"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="2.4"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 1px 1px rgba(90,100,120,0.35))" }}
          >
            <path d="M2 14 Q 11 3 20 13 Q 29 3 38 14" />
          </svg>
        </span>
      ))}
    </div>
  );
}

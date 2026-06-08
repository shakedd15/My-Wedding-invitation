import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Section 2 — "The Date".
 *
 * A full-screen, cream-to-soft-blue gradient section that reveals the
 * wedding date (03 / 11 / 2026) inside individual light-blue bordered cards.
 *
 * Animation: the header and each card stagger-fade in as the section
 * enters the viewport (ScrollTrigger, once, no scrub — feels like a
 * reveal rather than a position-locked scroll effect).
 */
export default function DateSection({ copy }) {
  const sectionRef = useRef(null);
  const { title, decorLine, units, dayName } = copy.dateSection;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const sharedTrigger = {
        trigger: sectionRef.current,
        start: "top 78%",
        once: true,
      };

      // Decorative divider lines fade in first
      gsap.fromTo(
        ".ds-decor",
        { scaleX: 0, autoAlpha: 0 },
        {
          scaleX: 1,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power2.out",
          transformOrigin: "center",
          scrollTrigger: sharedTrigger,
        }
      );

      // Title fades up
      gsap.fromTo(
        ".ds-title",
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.15,
          scrollTrigger: sharedTrigger,
        }
      );

      // Sub-label fades up
      gsap.fromTo(
        ".ds-decor-label",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: sharedTrigger,
        }
      );

      // Date cards pop in with stagger
      gsap.fromTo(
        ".ds-card",
        { autoAlpha: 0, y: 50, scale: 0.88 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.14,
          ease: "back.out(1.4)",
          delay: 0.4,
          scrollTrigger: sharedTrigger,
        }
      );

      // Day name fades in last
      gsap.fromTo(
        ".ds-dayname",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power1.out",
          delay: 0.8,
          scrollTrigger: sharedTrigger,
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir={copy.meta.dir}
      className="date-section flex flex-col items-center justify-center gap-8 px-6 py-12"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3">
        {/* Decorative horizontal rule */}
        <div className="ds-decor flex items-center gap-3" style={{ opacity: 0 }}>
          <div className="h-px w-14" style={{ background: "var(--color-blue)", opacity: 0.5 }} />
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="3" fill="var(--color-blue)" opacity="0.7" />
            <circle cx="7" cy="7" r="6" stroke="var(--color-blue)" strokeWidth="1" opacity="0.35" />
          </svg>
          <div className="h-px w-14" style={{ background: "var(--color-blue)", opacity: 0.5 }} />
        </div>

        <h2
          className="ds-title font-display text-4xl font-light tracking-widest"
          style={{ color: "var(--color-blue)", opacity: 0 }}
        >
          {title}
        </h2>

        <p
          className="ds-decor-label font-body text-sm font-medium uppercase tracking-[0.22em]"
          style={{ color: "var(--color-blue)", opacity: 0 }}
        >
          Save the Date
        </p>
      </div>

      {/* ── Date cards row ──────────────────────────────────── */}
      {/* Displayed right→left (RTL): יום 03 | חודש 11 | שנה 2026 */}
      {/* dir="ltr" forces left→right: 03 (יום) | 11 (חודש) | 2026 (שנה) */}
      <div className="flex items-center gap-4" dir="ltr">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="date-card ds-card"
            style={{
              opacity: 0,
              width: "90px",
              height: "110px",
            }}
          >
            <span
              className="font-display leading-none"
              style={{
                color: "var(--color-blue)",
                fontSize: "2.6rem",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              {unit.value}
            </span>
            <span
              className="font-body text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-blue)", marginTop: "8px" }}
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Day name ────────────────────────────────────────── */}
      <p
        className="ds-dayname font-display text-xl font-light tracking-widest"
        style={{ color: "var(--color-blue)", opacity: 0 }}
      >
        {dayName}
      </p>
    </section>
  );
}

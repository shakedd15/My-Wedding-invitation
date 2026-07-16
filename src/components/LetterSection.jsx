import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Section 3 — "The Letter".
 *
 * A light-blue CSS envelope sits center-screen. As the user scrolls
 * through the section, two things happen in sync (scrub):
 *
 *  1. The triangular top flap rotates open (rotateX: 0 → -175°) — the
 *     fold is pivot-anchored at its top edge for a realistic physical feel.
 *  2. A cream letter-paper card slides upward out of the open envelope.
 *
 * The section is taller than the viewport (200dvh) so the scrub animation
 * plays over a comfortable scroll distance on mobile. The envelope itself
 * is sticky so it stays visible while the user scrolls.
 */
export default function LetterSection({ copy }) {
  const sectionRef = useRef(null);
  const flapRef = useRef(null);
  const letterRef = useRef(null);
  const headerRef = useRef(null);

  const { title, placeholder } = copy.letterSection;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Header fades in when section enters viewport
      gsap.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Envelope animation — scrubbed to scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "center 10%",
          scrub: 1.2,
        },
      });

      // Step 1: flap swings open (rotateX around its top edge)
      tl.fromTo(
        flapRef.current,
        { rotateX: 0 },
        { rotateX: -175, duration: 1, ease: "power2.inOut" }
      );

      // Step 2 (slightly delayed): letter slides up out of the open envelope
      tl.fromTo(
        letterRef.current,
        { yPercent: 0 },
        { yPercent: -52, duration: 1, ease: "power2.out" },
        0.35 // start 35% into the timeline (after flap starts moving)
      );
    },
    { scope: sectionRef }
  );

  return (
    /*
     * The section is 200dvh tall so there's enough scroll distance for the
     * scrubbed animation to feel deliberate (not rushed) on mobile.
     * The inner sticky container keeps the envelope visually centred while
     * the page scrolls underneath.
     */
    <section
      ref={sectionRef}
      dir={copy.meta.dir}
      className="letter-section relative"
      style={{ minHeight: "200dvh" }}
    >
      {/* Sticky viewport frame — everything inside here stays on screen */}
      <div
        className="sticky top-0 flex h-dvh flex-col items-center justify-center gap-10 px-6"
        style={{ minHeight: "100dvh" }}
      >
        {/* ── Section Header ─────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col items-center gap-3"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-12" style={{ background: "var(--color-blue)", opacity: 0.45 }} />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="2.5" fill="var(--color-blue)" opacity="0.65" />
              <circle cx="6" cy="6" r="5.2" stroke="var(--color-blue)" strokeWidth="1" opacity="0.3" />
            </svg>
            <div className="h-px w-12" style={{ background: "var(--color-blue)", opacity: 0.45 }} />
          </div>
          <h2
            className="font-body text-4xl font-light tracking-widest"
            style={{ color: "var(--color-blue)" }}
          >
            {title}
          </h2>
        </div>

        {/* ── Envelope + Letter ──────────────────────────────── */}
        {/*
         * perspective applied here so rotateX has depth.
         * The envelope is sized relative to vmin so it looks good on all
         * mobile screen sizes without media queries.
         */}
        <div
          className="envelope-stage relative"
          style={{
            width: "min(320px, 86vw)",
            height: "min(220px, 59vw)",
          }}
        >
          {/* ─ Envelope body ─ */}
          <div
            className="envelope-body absolute inset-0"
            aria-hidden="true"
          >
            {/* Interior back-wall shading — suggests depth */}
            <div
              className="absolute inset-x-[6%] bottom-[8%] top-[30%] rounded-md"
              style={{ background: "rgba(123,174,199,0.12)" }}
            />
          </div>

          {/* ─ Letter paper (slides up on scroll) ─ */}
          <div
            ref={letterRef}
            className="letter-paper"
            style={{ top: "15%", height: "82%" }}
            aria-label={placeholder}
          >
            {/* Letter header bar */}
            <div
              className="flex items-center justify-center py-3"
              style={{ borderBottom: "1px solid rgba(123,174,199,0.3)" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="4" fill="var(--color-blue)" opacity="0.4" />
                <circle cx="10" cy="10" r="8.5" stroke="var(--color-blue)" strokeWidth="1" opacity="0.25" />
              </svg>
            </div>

            {/* Placeholder text lines */}
            <div className="flex flex-col gap-2 px-4 py-4">
              {[85, 72, 90, 65, 78, 55].map((w, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    height: "7px",
                    width: `${w}%`,
                    margin: "0 auto",
                    background: "rgba(123,174,199,0.25)",
                  }}
                />
              ))}
              {/* A slightly wider gap to suggest paragraph break */}
              <div style={{ height: "6px" }} />
              {[60, 80, 68].map((w, i) => (
                <div
                  key={`b${i}`}
                  className="rounded-full"
                  style={{
                    height: "7px",
                    width: `${w}%`,
                    margin: "0 auto",
                    background: "rgba(123,174,199,0.2)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ─ Top flap (opens on scroll) ─ */}
          {/*
           * clip-path creates the classic triangular envelope flap.
           * transform-origin is at the very top so it "hinges" open correctly.
           * backface-visibility: hidden hides the rear face once fully open.
           */}
          <div
            ref={flapRef}
            className="envelope-top-flap"
            style={{
              height: "52%",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background:
                "linear-gradient(175deg, rgba(123,174,199,0.55) 0%, rgba(100,155,183,0.65) 100%)",
              border: "2px solid var(--color-blue)",
              borderBottom: "none",
              backfaceVisibility: "hidden",
            }}
            aria-hidden="true"
          />

          {/* Flap border outline (visible around the body when flap is open) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              border: "2px solid var(--color-blue)",
              borderRadius: "12px",
              zIndex: -1,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Scroll hint label under the envelope */}
        <p
          className="font-body text-xs uppercase tracking-[0.2em]"
          style={{ color: "var(--color-blue-soft)", opacity: 0.7 }}
        >
          {copy.meta.dir === "rtl" ? "גללו למטה לפתיחה" : "Scroll to open"}
        </p>
      </div>
    </section>
  );
}

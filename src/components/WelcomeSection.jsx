import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Section 2 — Welcome message.
 *
 * The blue & ivory peony arrangement floats at the top (overlapping the
 * gradient fade of the invitation image above), then beneath it a warm
 * off-white panel carries the Hebrew welcome text.
 */
export default function WelcomeSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const trigger = { trigger: sectionRef.current, start: "top 80%", once: true };

      gsap.fromTo(
        ".wc-flowers",
        { autoAlpha: 0, y: 30, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out", scrollTrigger: trigger }
      );

      gsap.fromTo(
        ".wc-line1",
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.35, scrollTrigger: trigger }
      );

      gsap.fromTo(
        ".wc-line2",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.6, scrollTrigger: trigger }
      );

      gsap.fromTo(
        ".wc-divider",
        { scaleX: 0, autoAlpha: 0 },
        { scaleX: 1, autoAlpha: 1, duration: 0.7, ease: "power2.out", delay: 0.85, scrollTrigger: trigger }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative flex flex-col items-center"
      style={{
        /* Top is fully transparent so flowers sit directly on the invitation image.
           The white/blue background only begins below the flower area. */
        background: "linear-gradient(180deg, transparent 0%, transparent 42%, #f5f9fc 60%, #edf5fa 100%)",
        marginTop: "-38vw",   /* pull up so ~half the flowers overlap the photo */
        zIndex: 5,
      }}
    >
      {/* ── Flower image — top half overlaps the invitation photo, bottom half
           opens section 2. Full viewport width, no height cap. ── */}
      <div
        className="wc-flowers w-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/flowers.png"
          alt=""
          draggable="false"
          className="w-full select-none"
          style={{ display: "block", objectFit: "contain" }}
        />
      </div>

      {/* ── Text panel ── */}
      <div
        className="flex w-full flex-col items-center gap-6 px-8 pb-16 pt-4 text-center"
      >
        {/* Decorative dot-rule */}
        <div
          className="wc-divider flex items-center gap-3"
          style={{ opacity: 0, transformOrigin: "center" }}
        >
          <div className="h-px w-16" style={{ background: "var(--color-blue)", opacity: 0.4 }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
            <circle cx="4" cy="4" r="3" fill="var(--color-blue)" opacity="0.6" />
          </svg>
          <div className="h-px w-16" style={{ background: "var(--color-blue)", opacity: 0.4 }} />
        </div>

        {/* Line 1 — large, display serif */}
        <h2
          className="wc-line1 font-display font-light leading-snug"
          style={{
            opacity: 0,
            color: "var(--color-blue-deep)",
            fontSize: "clamp(1.8rem, 7vw, 2.8rem)",
            letterSpacing: "0.04em",
          }}
        >
          משפחה וחברים יקרים,
        </h2>

        {/* Line 2 — slightly smaller, same family */}
        <p
          className="wc-line2 font-display font-light leading-relaxed"
          style={{
            opacity: 0,
            color: "var(--color-ink)",
            fontSize: "clamp(1.1rem, 4.5vw, 1.5rem)",
            maxWidth: "34ch",
            letterSpacing: "0.02em",
          }}
        >
          אנחנו נכבדים ומתרגשים להזמינכם לחתונתנו
        </p>
      </div>
    </section>
  );
}

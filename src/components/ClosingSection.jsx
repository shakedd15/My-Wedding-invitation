import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* bg color of the RSVP section above — fade must match exactly */
const CREAM_ABOVE = "rgb(246, 245, 240)";

export default function ClosingSection() {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        textRef.current,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1, y: 0, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "85vh",
        overflow: "hidden",
        direction: "rtl",
      }}
    >
      {/* ── Photo ── */}
      <img
        src="/images/FullSizeRender.jpg"
        alt="שקד ואיל"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
          position: "absolute",
          inset: 0,
        }}
      />

      {/* ── Fade from CREAM (top) → transparent (bottom) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, ${CREAM_ABOVE} 0%, transparent 38%)`,
          pointerEvents: "none",
        }}
      />

      {/* ── Closing text ── */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          bottom: "clamp(2rem, 6vw, 4rem)",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: 0,
        }}
      >
        <p
          className="font-display"
          style={{
            fontSize: "clamp(1.6rem, 6vw, 2.8rem)",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.55,
            color: "#fff",
            textShadow: "0 2px 18px rgba(0,0,0,0.35)",
            whiteSpace: "pre-line",
            margin: 0,
          }}
        >
          {"מקווים לראותכם\nשקד ואיל"}
        </p>
      </div>
    </section>
  );
}

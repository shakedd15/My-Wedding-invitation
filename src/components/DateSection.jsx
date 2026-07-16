import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Design tokens ─────────────── */
const C_INK  = "#1a1a1a";
const C_GOLD = "rgb(197, 160, 105)";
const BG     = "transparent";

const BIG_SIZE = "60px";

/* ── Line · leaf · monogram · leaf · line divider ───────── */
function LineDivider({ heartSize = 16, lineWidth = 50 }) {
  const leafH = heartSize * 4.4;
  const leafW = heartSize * 3.2;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Left line */}
      <div style={{ width: lineWidth, height: "1px", background: C_GOLD, opacity: 0.5, flexShrink: 0 }} />
      {/* Left leaf (mirrored — tip points toward heart) */}
      <img
        src="/images/branch-gold.png"
        alt=""
        aria-hidden="true"
        style={{
          width: leafW,
          height: leafH,
          objectFit: "contain",
          transform: "scaleX(-1)",
          flexShrink: 0,
        }}
      />
      {/* E&S monogram */}
      <img
        src="/images/Gemini_Generated_Image_b6l9wkb6l9wkb6l9-Photoroom.png"
        alt=""
        aria-hidden="true"
        style={{
          width: Math.round(heartSize * 2.8 * 4),
          height: Math.round(heartSize * 2.8 * 4),
          objectFit: "contain",
          flexShrink: 0,
          display: "block",
        }}
      />
      {/* Right leaf */}
      <img
        src="/images/branch-gold.png"
        alt=""
        aria-hidden="true"
        style={{
          width: leafW,
          height: leafH,
          objectFit: "contain",
          flexShrink: 0,
        }}
      />
      {/* Right line */}
      <div style={{ width: lineWidth, height: "1px", background: C_GOLD, opacity: 0.5, flexShrink: 0 }} />
    </div>
  );
}

/* ── Component ───────────────────────────────────────── */
export default function DateSection({ copy }) {
  const sectionRef = useRef(null);
  const { greeting, greetingSubtitle, units, dayName } = copy.dateSection;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const st = (el) => ({ trigger: el, start: "top 88%", once: true });

      gsap.fromTo(".ds-ornament",
        { autoAlpha: 0, scaleX: 0 },
        { autoAlpha: 1, scaleX: 1, duration: 1, ease: "power2.out", transformOrigin: "center",
          scrollTrigger: st(".ds-ornament") }
      );
      gsap.fromTo(".ds-greeting",
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: st(".ds-greeting") }
      );
      gsap.fromTo(".ds-greeting-sub",
        { autoAlpha: 0, y: 35 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: st(".ds-greeting-sub") }
      );
      gsap.fromTo(".ds-card",
        { autoAlpha: 0, y: 60, scale: 0.85 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.6)",
          scrollTrigger: st(".ds-card") }
      );
      gsap.fromTo(".ds-dayname",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: st(".ds-dayname") }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir={copy.meta.dir}
      style={{
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "0",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "640px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* ── Top decoration ── */}
        <div className="ds-ornament" style={{ opacity: 0, marginTop: "20px" }}>
          <LineDivider heartSize={14} lineWidth={40} />
        </div>

        {/* ── Greeting ── */}
        <p
          className="ds-greeting font-body"
          style={{
            opacity: 0,
            marginTop: "32px",
            fontSize: BIG_SIZE,
            fontWeight: 300,
            color: C_INK,
            letterSpacing: "0.5px",
            lineHeight: 1.15,
          }}
        >
          {greeting}
        </p>

        {/* ── Second text ── */}
        <p
          className="ds-greeting-sub font-body"
          style={{
            opacity: 0,
            marginTop: "28px",
            fontSize: "23px",
            fontWeight: 300,
            color: C_INK,
            lineHeight: 1.6,
            letterSpacing: "0.2px",
          }}
        >
          {greetingSubtitle}
        </p>

        {/* ── Hebrew day / date ── */}
        <p
          className="ds-dayname font-body"
          style={{
            opacity: 0,
            marginTop: "36px",
            marginBottom: "20px",
            fontSize: "29px",
            fontWeight: 300,
            color: C_INK,
            letterSpacing: "0.5px",
          }}
        >
          {dayName}
        </p>

        {/* ── Date cards ── */}
        <div
          className="flex items-center"
          dir="ltr"
          style={{ gap: "8px", marginTop: "0", marginBottom: "50px", alignItems: "center" }}
        >
          {units.map((unit, idx) => (
            <>
              {idx > 0 && (
                <span
                  key={`dot-${idx}`}
                  className="ds-card font-body"
                  style={{
                    opacity: 0,
                    fontSize: BIG_SIZE,
                    color: C_GOLD,
                    lineHeight: 1,
                    paddingBottom: "0",
                    flexShrink: 0,
                  }}
                >
                  ·
                </span>
              )}
              <div
                key={unit.value}
                className="ds-card"
                style={{
                  opacity: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  className="font-body"
                  style={{
                    fontSize: BIG_SIZE,
                    fontWeight: 300,
                    color: C_GOLD,
                    lineHeight: 1,
                    letterSpacing: "-1px",
                  }}
                >
                  {unit.value}
                </span>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

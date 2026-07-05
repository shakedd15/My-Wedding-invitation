import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Design tokens (exact spec values) ─────────────── */
const C_BLUE      = "#8FB7D3";   // greeting, title, "יום שלישי", card border
const C_BLUE_DARK = "#79A9CC";   // card number + label
const C_BODY      = "#2F2F2F";   // second text
const BG          = "transparent";   // inherit page-wrapper background

/* ── Line · leaf · heart · leaf · line divider ───────── */
function LineDivider({ heartSize = 16, lineWidth = 50 }) {
  const leafH = heartSize * 4.4;
  const leafW = heartSize * 3.2;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Left line */}
      <div style={{ width: lineWidth, height: "1px", background: C_BLUE, opacity: 0.5, flexShrink: 0 }} />
      {/* Left leaf (mirrored — tip points toward heart) */}
      <img
        src="/images/branch.png"
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
      {/* Heart */}
      <svg
        width={heartSize}
        height={heartSize}
        viewBox="0 0 24 24"
        fill={C_BLUE}
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      {/* Right leaf */}
      <img
        src="/images/branch.png"
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
      <div style={{ width: lineWidth, height: "1px", background: C_BLUE, opacity: 0.5, flexShrink: 0 }} />
    </div>
  );
}

/* ── Component ───────────────────────────────────────── */
export default function DateSection({ copy }) {
  const sectionRef = useRef(null);
  const { greeting, greetingSubtitle, title, decorLine, units, dayName } = copy.dateSection;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const trigger = { trigger: sectionRef.current, start: "top 78%", once: true };

      gsap.fromTo(".ds-ornament",
        { autoAlpha: 0, scaleX: 0 },
        { autoAlpha: 1, scaleX: 1, duration: 1, ease: "power2.out", transformOrigin: "center", scrollTrigger: trigger }
      );
      gsap.fromTo(".ds-greeting",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.12, scrollTrigger: trigger }
      );
      gsap.fromTo(".ds-greeting-sub",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.24, scrollTrigger: trigger }
      );
      gsap.fromTo(".ds-divider",
        { autoAlpha: 0, scaleX: 0 },
        { autoAlpha: 1, scaleX: 1, duration: 0.8, ease: "power2.out", transformOrigin: "center", delay: 0.32, scrollTrigger: trigger }
      );
      gsap.fromTo(".ds-title",
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 0.85, ease: "power2.out", delay: 0.4, scrollTrigger: trigger }
      );
      gsap.fromTo(".ds-card",
        { autoAlpha: 0, y: 44, scale: 0.88 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.13, ease: "back.out(1.4)", delay: 0.64, scrollTrigger: trigger }
      );
      gsap.fromTo(".ds-dayname",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power1.out", delay: 1.02, scrollTrigger: trigger }
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
            fontSize: "18px",
            fontWeight: 300,
            color: C_BLUE,
            letterSpacing: "0.5px",
            lineHeight: 1.5,
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
            fontSize: "24px",
            fontWeight: 400,
            color: C_BODY,
            lineHeight: 1.6,
            letterSpacing: "0.2px",
          }}
        >
          {greetingSubtitle}
        </p>

        {/* ── Small divider ── */}
        <div className="ds-divider" style={{ opacity: 0, margin: "32px 0" }}>
          <LineDivider heartSize={16} lineWidth={50} />
        </div>

        {/* ── Main title ── */}
        <h2
          className="ds-title font-display"
          style={{
            opacity: 0,
            marginTop: "0",
            fontSize: "54px",
            fontWeight: 300,
            color: C_BLUE,
            letterSpacing: "1px",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h2>

        {/* ── Date cards ── */}
        <div
          className="flex items-center"
          dir="ltr"
          style={{ gap: "20px", marginTop: "32px" }}
        >
          {units.map((unit) => (
            <div
              key={unit.label}
              className="ds-card"
              style={{
                opacity: 0,
                width: "120px",
                height: "150px",
                borderRadius: "28px",
                border: `2px solid ${C_BLUE}`,
                background: "rgba(255,255,255,0.45)",
                boxShadow: "0 10px 30px rgba(80,120,170,0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                flexShrink: 0,
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: "56px",
                  fontWeight: 300,
                  color: C_BLUE_DARK,
                  lineHeight: 1,
                  letterSpacing: "-1px",
                }}
              >
                {unit.value}
              </span>
              <span
                className="font-body"
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: C_BLUE_DARK,
                  letterSpacing: "0.5px",
                }}
              >
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Bottom text ── */}
        <p
          className="ds-dayname font-display"
          style={{
            opacity: 0,
            marginTop: "36px",
            marginBottom: "50px",
            fontSize: "22px",
            fontWeight: 300,
            color: C_BLUE,
            letterSpacing: "0.5px",
          }}
        >
          {dayName}
        </p>
      </div>
    </section>
  );
}

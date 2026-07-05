import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Design tokens (exact spec values) ─────────────── */
const C_BLUE      = "#8FB7D3";   // greeting, title, "יום שלישי", card border
const C_BLUE_DARK = "#79A9CC";   // card number + label
const C_SAVE      = "#7EAED2";   // SAVE THE DATE
const C_BODY      = "#2F2F2F";   // second text
const BG          = "#FAF8F5";   // section background

/* ── Thin line · circle · thin line divider ─────────── */
function LineDivider({ lineWidth = 120 }) {
  const halfLine = (lineWidth - 20) / 2; // subtract circle + gaps
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.4 }}>
      <div style={{ width: halfLine, height: "1px", background: C_BLUE }} />
      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: C_BLUE, flexShrink: 0 }} />
      <div style={{ width: halfLine, height: "1px", background: C_BLUE }} />
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
      gsap.fromTo(".ds-save-date",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out", delay: 0.54, scrollTrigger: trigger }
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
          <LineDivider lineWidth={120} />
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
          <LineDivider lineWidth={180} />
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

        {/* ── Save the Date ── */}
        <p
          className="ds-save-date font-body"
          style={{
            opacity: 0,
            marginTop: "18px",
            fontSize: "18px",
            fontWeight: 500,
            letterSpacing: "6px",
            color: C_SAVE,
            textTransform: "uppercase",
          }}
        >
          {decorLine}
        </p>

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

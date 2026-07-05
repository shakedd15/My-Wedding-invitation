import { useRef } from "react";
import { Heart, Leaf, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BLUE = "var(--color-blue)";
const BLUE_HEX = "#7BAEC7";
const GOLD_HEX = "#c5a069";

/* ── Reusable icon shorthands ───────────────────────── */
const iconProps = (size = 12, color = BLUE_HEX, sw = 1.3) => ({
  size,
  color,
  strokeWidth: sw,
  style: { flexShrink: 0 },
});

/* Thin horizontal rule with a centered decorative cluster */
function OrnamentDivider({ showGold = false }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "min(260px, 72vw)",
        opacity: 0.75,
      }}
    >
      {/* left line */}
      <div style={{ flex: 1, height: "0.7px", background: BLUE_HEX, opacity: 0.45 }} />

      {/* left decoration */}
      <Leaf {...iconProps(11, BLUE_HEX, 1.3)} style={{ transform: "rotate(130deg)", flexShrink: 0 }} />

      {/* center heart */}
      <Heart
        {...iconProps(13, showGold ? GOLD_HEX : BLUE_HEX, 1.4)}
        fill={showGold ? GOLD_HEX : BLUE_HEX}
        style={{ opacity: 0.7, flexShrink: 0 }}
      />

      {/* right decoration */}
      <Leaf {...iconProps(11, BLUE_HEX, 1.3)} style={{ transform: "rotate(-50deg)", flexShrink: 0 }} />

      {/* right line */}
      <div style={{ flex: 1, height: "0.7px", background: BLUE_HEX, opacity: 0.45 }} />
    </div>
  );
}

/* Simple dot divider */
function DotDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "min(200px, 60vw)", opacity: 0.65 }}>
      <div style={{ flex: 1, height: "0.7px", background: BLUE_HEX, opacity: 0.45 }} />
      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: BLUE_HEX, opacity: 0.55 }} />
      <div style={{ flex: 1, height: "0.7px", background: BLUE_HEX, opacity: 0.45 }} />
    </div>
  );
}

/* ── Main component ──────────────────────────────────── */
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
      className="date-section flex flex-col items-center gap-5 px-6 py-14 mt-10"
    >
      {/* ── Top ornament ── */}
      <div className="ds-ornament" style={{ opacity: 0 }}>
        <OrnamentDivider />
      </div>

      {/* ── Greeting ── */}
      <p
        className="ds-greeting font-display text-center"
        style={{ opacity: 0, color: BLUE, fontSize: "clamp(1.05rem, 4.2vw, 1.25rem)", fontWeight: 500 }}
      >
        {greeting}
      </p>

      <p
        className="ds-greeting-sub font-body text-center"
        style={{ opacity: 0, color: BLUE, fontSize: "clamp(0.82rem, 3.2vw, 0.95rem)", fontWeight: 300, marginTop: "-8px" }}
      >
        {greetingSubtitle}
      </p>

      {/* ── Center divider (branches + heart) ── */}
      <div className="ds-divider" style={{ opacity: 0, marginTop: "2px" }}>
        <OrnamentDivider showGold />
      </div>

      {/* ── Main title ── */}
      <h2
        className="ds-title font-display text-center"
        style={{
          opacity: 0,
          color: BLUE,
          fontSize: "clamp(2.6rem, 10vw, 3.8rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "0.01em",
          marginTop: "4px",
        }}
      >
        {title}
      </h2>

      {/* ── Save the Date row ── */}
      <div
        className="ds-save-date flex items-center gap-3"
        style={{ opacity: 0, marginTop: "-4px" }}
      >
        <Sparkles {...iconProps(13, GOLD_HEX, 1.3)} />
        <p
          className="font-body"
          style={{ color: BLUE, fontSize: "clamp(0.72rem, 2.8vw, 0.85rem)", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase" }}
        >
          {decorLine}
        </p>
        <Sparkles {...iconProps(13, GOLD_HEX, 1.3)} />
      </div>

      {/* Heart below Save the Date */}
      <div className="ds-save-date" style={{ opacity: 0, marginTop: "-8px" }}>
        <Heart {...iconProps(13, BLUE_HEX, 1.4)} fill={BLUE_HEX} style={{ opacity: 0.5 }} />
      </div>

      {/* ── Date cards row ── */}
      <div className="flex items-center gap-4 mt-1" dir="ltr">
        {units.map((unit) => (
          <div key={unit.label} className="date-card ds-card" style={{ opacity: 0 }}>
            <span
              className="font-display leading-none"
              style={{ color: BLUE, fontSize: "clamp(2.2rem, 8.5vw, 2.8rem)", fontWeight: 400, letterSpacing: "-0.02em" }}
            >
              {unit.value}
            </span>
            {/* Gold accent line */}
            <div style={{ width: "22px", height: "1.5px", background: GOLD_HEX, opacity: 0.8, margin: "8px 0 7px", borderRadius: "1px" }} />
            <span
              className="font-body"
              style={{ color: BLUE, fontSize: "clamp(0.72rem, 2.6vw, 0.82rem)", fontWeight: 500, letterSpacing: "0.12em" }}
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Day name ── */}
      <div className="ds-dayname flex flex-col items-center gap-2" style={{ opacity: 0, marginTop: "4px" }}>
        <p
          className="font-display text-center"
          style={{ color: BLUE, fontSize: "clamp(1rem, 3.8vw, 1.2rem)", fontWeight: 300, letterSpacing: "0.28em" }}
        >
          {dayName}
        </p>
        <Heart {...iconProps(12, BLUE_HEX, 1.4)} fill={BLUE_HEX} style={{ opacity: 0.5 }} />
      </div>
    </section>
  );
}

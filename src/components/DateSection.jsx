import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Decorative SVG atoms ─────────────────────────────── */

function TopOrnament() {
  const c = "var(--color-blue)";
  return (
    <svg width="260" height="24" viewBox="0 0 260 24" fill="none" aria-hidden="true">
      {/* left line */}
      <line x1="0" y1="12" x2="96" y2="12" stroke={c} strokeOpacity="0.4" strokeWidth="0.8"/>
      {/* left branch */}
      <line x1="104" y1="14" x2="104" y2="6"  stroke={c} strokeOpacity="0.5" strokeWidth="0.8"/>
      <line x1="104" y1="10" x2="100" y2="6"  stroke={c} strokeOpacity="0.45" strokeWidth="0.8"/>
      <line x1="104" y1="8"  x2="108" y2="4"  stroke={c} strokeOpacity="0.4" strokeWidth="0.8"/>
      <circle cx="100" cy="6"  r="1.5" fill={c} opacity="0.5"/>
      <circle cx="108" cy="4"  r="1.5" fill={c} opacity="0.45"/>
      <circle cx="104" cy="6"  r="1.5" fill={c} opacity="0.55"/>
      {/* heart */}
      <path
        d="M130 18C130 18 120 11.5 120 7C120 4.5 121.8 3 124 3C126 3 128.2 4.2 130 7C131.8 4.2 134 3 136 3C138.2 3 140 4.5 140 7C140 11.5 130 18 130 18Z"
        fill={c} opacity="0.6"
      />
      {/* right branch (mirror) */}
      <line x1="156" y1="14" x2="156" y2="6"  stroke={c} strokeOpacity="0.5" strokeWidth="0.8"/>
      <line x1="156" y1="10" x2="160" y2="6"  stroke={c} strokeOpacity="0.45" strokeWidth="0.8"/>
      <line x1="156" y1="8"  x2="152" y2="4"  stroke={c} strokeOpacity="0.4" strokeWidth="0.8"/>
      <circle cx="160" cy="6"  r="1.5" fill={c} opacity="0.5"/>
      <circle cx="152" cy="4"  r="1.5" fill={c} opacity="0.45"/>
      <circle cx="156" cy="6"  r="1.5" fill={c} opacity="0.55"/>
      {/* right line */}
      <line x1="164" y1="12" x2="260" y2="12" stroke={c} strokeOpacity="0.4" strokeWidth="0.8"/>
    </svg>
  );
}

function CenterDivider() {
  const c = "var(--color-blue)";
  return (
    <svg width="220" height="28" viewBox="0 0 220 28" fill="none" aria-hidden="true">
      {/* left line */}
      <line x1="0" y1="14" x2="72" y2="14" stroke={c} strokeOpacity="0.38" strokeWidth="0.8"/>
      {/* left sprig */}
      <line x1="78" y1="18" x2="78" y2="8"   stroke={c} strokeOpacity="0.5" strokeWidth="0.9"/>
      <line x1="78" y1="14" x2="72" y2="8"   stroke={c} strokeOpacity="0.45" strokeWidth="0.8"/>
      <line x1="78" y1="11" x2="84" y2="5"   stroke={c} strokeOpacity="0.4" strokeWidth="0.8"/>
      <line x1="78" y1="9"  x2="74" y2="4"   stroke={c} strokeOpacity="0.38" strokeWidth="0.8"/>
      <circle cx="72" cy="8"  r="2" fill={c} opacity="0.48"/>
      <circle cx="84" cy="5"  r="1.8" fill={c} opacity="0.42"/>
      <circle cx="74" cy="4"  r="1.6" fill={c} opacity="0.38"/>
      <circle cx="78" cy="8"  r="1.8" fill={c} opacity="0.5"/>
      {/* heart */}
      <path
        d="M110 20C110 20 99 13 99 8C99 5.2 101 3.5 103.5 3.5C105.8 3.5 108.2 5 110 8C111.8 5 114.2 3.5 116.5 3.5C119 3.5 121 5.2 121 8C121 13 110 20 110 20Z"
        fill={c} opacity="0.55"
      />
      {/* right sprig (mirror) */}
      <line x1="142" y1="18" x2="142" y2="8"  stroke={c} strokeOpacity="0.5" strokeWidth="0.9"/>
      <line x1="142" y1="14" x2="148" y2="8"  stroke={c} strokeOpacity="0.45" strokeWidth="0.8"/>
      <line x1="142" y1="11" x2="136" y2="5"  stroke={c} strokeOpacity="0.4" strokeWidth="0.8"/>
      <line x1="142" y1="9"  x2="146" y2="4"  stroke={c} strokeOpacity="0.38" strokeWidth="0.8"/>
      <circle cx="148" cy="8"  r="2" fill={c} opacity="0.48"/>
      <circle cx="136" cy="5"  r="1.8" fill={c} opacity="0.42"/>
      <circle cx="146" cy="4"  r="1.6" fill={c} opacity="0.38"/>
      <circle cx="142" cy="8"  r="1.8" fill={c} opacity="0.5"/>
      {/* right line */}
      <line x1="148" y1="14" x2="220" y2="14" stroke={c} strokeOpacity="0.38" strokeWidth="0.8"/>
    </svg>
  );
}

function SaveDateBranch({ flip = false }) {
  const c = "var(--color-blue)";
  return (
    <svg
      width="44" height="14" viewBox="0 0 44 14" fill="none" aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : {}}
    >
      <line x1="0" y1="9" x2="28" y2="9" stroke={c} strokeOpacity="0.38" strokeWidth="0.8"/>
      <line x1="28" y1="9" x2="28" y2="3"  stroke={c} strokeOpacity="0.4" strokeWidth="0.8"/>
      <line x1="28" y1="6" x2="24" y2="2"  stroke={c} strokeOpacity="0.38" strokeWidth="0.8"/>
      <line x1="28" y1="5" x2="32" y2="1"  stroke={c} strokeOpacity="0.35" strokeWidth="0.8"/>
      <circle cx="24" cy="2" r="1.4" fill={c} opacity="0.45"/>
      <circle cx="32" cy="1" r="1.4" fill={c} opacity="0.4"/>
      <circle cx="28" cy="3" r="1.4" fill={c} opacity="0.5"/>
    </svg>
  );
}

function SmallHeart({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 22" fill="none" aria-hidden="true">
      <path
        d="M12 20C12 20 2 12.5 2 6.5C2 3.5 4 1.5 7 1.5C9.2 1.5 11.1 2.9 12 5C12.9 2.9 14.8 1.5 17 1.5C20 1.5 22 3.5 22 6.5C22 12.5 12 20 12 20Z"
        fill="var(--color-blue)" opacity="0.55"
      />
    </svg>
  );
}

/* ── Main component ───────────────────────────────────── */

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
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1, scrollTrigger: trigger }
      );

      gsap.fromTo(".ds-greeting-sub",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.22, scrollTrigger: trigger }
      );

      gsap.fromTo(".ds-divider",
        { autoAlpha: 0, scaleX: 0 },
        { autoAlpha: 1, scaleX: 1, duration: 0.8, ease: "power2.out", transformOrigin: "center", delay: 0.3, scrollTrigger: trigger }
      );

      gsap.fromTo(".ds-title",
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 0.85, ease: "power2.out", delay: 0.38, scrollTrigger: trigger }
      );

      gsap.fromTo(".ds-save-date",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out", delay: 0.52, scrollTrigger: trigger }
      );

      gsap.fromTo(".ds-card",
        { autoAlpha: 0, y: 44, scale: 0.88 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.13, ease: "back.out(1.4)", delay: 0.62, scrollTrigger: trigger }
      );

      gsap.fromTo(".ds-dayname",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power1.out", delay: 1, scrollTrigger: trigger }
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
      {/* ── Top floral ornament ── */}
      <div className="ds-ornament" style={{ opacity: 0 }}>
        <TopOrnament />
      </div>

      {/* ── Greeting ── */}
      <p
        className="ds-greeting font-display text-center"
        style={{
          opacity: 0,
          color: "var(--color-blue)",
          fontSize: "clamp(1.05rem, 4.2vw, 1.25rem)",
          fontWeight: 500,
          letterSpacing: "0.01em",
        }}
      >
        {greeting}
      </p>

      <p
        className="ds-greeting-sub font-body text-center"
        style={{
          opacity: 0,
          color: "var(--color-blue)",
          fontSize: "clamp(0.82rem, 3.2vw, 0.95rem)",
          fontWeight: 300,
          letterSpacing: "0.01em",
          marginTop: "-8px",
        }}
      >
        {greetingSubtitle}
      </p>

      {/* ── Thin center divider ── */}
      <div className="ds-divider" style={{ opacity: 0, marginTop: "2px" }}>
        <CenterDivider />
      </div>

      {/* ── Main title ── */}
      <h2
        className="ds-title font-display text-center"
        style={{
          opacity: 0,
          color: "var(--color-blue)",
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
        <SaveDateBranch />
        <p
          className="font-body"
          style={{
            color: "var(--color-blue)",
            fontSize: "clamp(0.72rem, 2.8vw, 0.85rem)",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {decorLine}
        </p>
        <SaveDateBranch flip />
      </div>

      {/* Heart below Save the Date */}
      <div className="ds-save-date" style={{ opacity: 0, marginTop: "-8px" }}>
        <SmallHeart size={13} />
      </div>

      {/* ── Date cards row ── */}
      <div className="flex items-center gap-4 mt-1" dir="ltr">
        {units.map((unit) => (
          <div key={unit.label} className="date-card ds-card" style={{ opacity: 0 }}>
            <span
              className="font-display leading-none"
              style={{
                color: "var(--color-blue)",
                fontSize: "clamp(2.2rem, 8.5vw, 2.8rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              {unit.value}
            </span>
            {/* Gold accent line */}
            <div style={{
              width: "22px",
              height: "1.5px",
              background: "var(--color-gold)",
              opacity: 0.8,
              margin: "8px 0 7px",
              borderRadius: "1px",
            }} />
            <span
              className="font-body"
              style={{
                color: "var(--color-blue)",
                fontSize: "clamp(0.72rem, 2.6vw, 0.82rem)",
                fontWeight: 500,
                letterSpacing: "0.12em",
              }}
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
          style={{
            color: "var(--color-blue)",
            fontSize: "clamp(1rem, 3.8vw, 1.2rem)",
            fontWeight: 300,
            letterSpacing: "0.28em",
          }}
        >
          {dayName}
        </p>
        <SmallHeart size={12} />
      </div>
    </section>
  );
}

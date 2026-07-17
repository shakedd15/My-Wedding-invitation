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

/* ── Signature divider with names ───────── */
function LineDivider({ heartSize = 16 }) {
  const nameStyle = {
    fontFamily: "var(--font-body)",
    fontSize: "23px",
    fontWeight: 300,
    color: C_GOLD,
    letterSpacing: "0.45em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  };

  return (
    <div
      dir="ltr"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        width: "100%",
        columnGap: "10px",
        transform: "translateX(-2px)",
      }}
    >
      <span
        style={{
          ...nameStyle,
          justifySelf: "end",
          textAlign: "right",
          marginInlineEnd: "-0.45em",
        }}
      >
        SHAKED
      </span>
      <img
        src="/gold%20signature.png"
        alt=""
        aria-hidden="true"
        style={{
          width: Math.round(heartSize * 15),
          height: "auto",
          objectFit: "contain",
          display: "block",
          justifySelf: "center",
        }}
      />
      <span
        style={{
          ...nameStyle,
          justifySelf: "start",
          textAlign: "left",
          marginInlineEnd: "-0.45em",
        }}
      >
        EYAL
      </span>
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
        <div className="ds-ornament" style={{ opacity: 0, marginTop: "20px", width: "100%" }}>
          <LineDivider heartSize={14} />
        </div>

        {/* ── Greeting ── */}
        <p
          className="ds-greeting font-body"
          style={{
            opacity: 0,
            marginTop: "28px",
            fontSize: "23px",
            fontWeight: 300,
            color: "rgb(26, 26, 26)",
            lineHeight: 1.6,
            letterSpacing: "0.2px",
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

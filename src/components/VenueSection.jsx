import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CREAM = "rgb(246, 245, 240)";
const PIN_COLOR = "#1c2460";

function MapPin({ size = 30 }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.3)}
      viewBox="0 0 40 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0, marginTop: "2px" }}
    >
      <path
        d="M20 0C9 0 0 9.4 0 21C0 35.5 20 52 20 52C20 52 40 35.5 40 21C40 9.4 31 0 20 0Z"
        fill={PIN_COLOR}
      />
      <circle cx="20" cy="20" r="8.5" fill="white" />
    </svg>
  );
}

export default function VenueSection() {
  const sectionRef = useRef(null);
  const cloudLRef  = useRef(null);
  const cloudRRef  = useRef(null);
  const titleRef   = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Convert vw → px once so GSAP never has to parse unit strings.
      const vw = window.innerWidth / 100;

      /* ── Title fades in once the clouds are mostly open ── */
      gsap.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top+=300",  // well into the pin phase
            once: true,
          },
        }
      );

      /*
        ── Cloud curtain ──
        Clouds START at x:0 (their CSS position, which covers the viewport).
        GSAP moves them OUTWARD — left cloud flies left, right cloud flies right —
        opening like a curtain and revealing the venue card underneath.

        Travel: 320vw is enough to push the visible edge of each cloud
        (which starts at ±100vw from centre) past the viewport boundary.
      */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500",   // 1500 px of scroll travel = slow, cinematic
          pin: true,
          pinSpacing: true,
          scrub: 2,        // lazy follow for a dreamy feel
        },
      });

      tl.to(cloudLRef.current, { x: -320 * vw, ease: "power1.inOut" }, 0)
        .to(cloudRRef.current, { x:  320 * vw, ease: "power1.inOut" }, 0);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        background: CREAM,
        direction: "rtl",
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem 4.5rem",
        overflow: "hidden",
      }}
    >
      {/* ── Section title — hidden until clouds open ── */}
      <h2
        ref={titleRef}
        className="font-display text-center"
        style={{
          opacity: 0,
          color: "var(--color-ink)",
          fontSize: "clamp(1.8rem, 7vw, 2.6rem)",
          fontStyle: "italic",
          fontWeight: 300,
          letterSpacing: "0.02em",
          marginBottom: "1.75rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        המיקום
      </h2>

      {/* ── Venue card ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "400px",
          width: "100%",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: "0 12px 48px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <img
          src="/images/tel-aviv.jpeg"
          alt="East TLV — מיטב 13 תל אביב"
          style={{
            width: "100%",
            display: "block",
            aspectRatio: "3 / 4",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Top cream-to-transparent fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              to bottom,
              ${CREAM} 0%,
              rgba(246,245,240,0.82) 18%,
              rgba(246,245,240,0.35) 42%,
              transparent 62%
            )`,
            pointerEvents: "none",
          }}
        />

        {/* Location info */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "1.4rem 1.4rem 0",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.65rem",
            direction: "rtl",
          }}
        >
          <MapPin size={30} />
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "clamp(1rem,4vw,1.15rem)", color: PIN_COLOR, lineHeight: 1.25 }}>
              איסט תל אביב&nbsp;&nbsp;EAST TLV
            </p>
            <p style={{ margin: "0.28rem 0 0", fontSize: "clamp(0.82rem,3.2vw,0.92rem)", color: "#3a3a3a", lineHeight: 1.4 }}>
              כתובת: מיטב 13, תל אביב-יפו
            </p>
          </div>
        </div>
      </div>

      {/*
        ── Cloud curtain ──
        STARTING position (x = 0):
          Left cloud:  left: -100vw, width: 300vw  → spans -100vw … 200vw
                       Visible strip: 0 … 100vw  ✓ (covers full viewport)
          Right cloud: right: -100vw, width: 300vw → mirrors exactly
                       Visible strip: 0 … 100vw  ✓

        Both clouds fully cover the viewport on load. GSAP moves them
        outward by 320vw, pushing their inner edges past the viewport
        boundary so they disappear cleanly behind overflow:hidden.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <img
          ref={cloudLRef}
          src="/images/claude1-Photoroom.png"
          alt=""
          style={{
            position: "absolute",
            top: "50%",
            left: "-100vw",
            transform: "translateY(-50%)",
            width: "300vw",
            userSelect: "none",
          }}
        />

        <img
          ref={cloudRRef}
          src="/images/claude2-Photoroom.png"
          alt=""
          style={{
            position: "absolute",
            top: "50%",
            right: "-100vw",
            transform: "translateY(-50%)",
            width: "300vw",
            userSelect: "none",
          }}
        />
      </div>
    </section>
  );
}

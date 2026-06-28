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

      /* ── Title fades in after clouds are gone ──
         Delay = 0.5 so it only starts once clouds are mostly open */
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
            start: "top 40%",   // fires late — well into the pin phase
            once: true,
          },
        }
      );

      /* ── Cloud curtain: pin the section; clouds drift apart on scroll ──
         end: "+=1200"  →  user must scroll 1 200 px before clouds fully open,
         giving plenty of time to appreciate them. */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",      // section reaches the very top of viewport
          end: "+=1200",         // 1 200 px of scroll travel
          pin: true,             // freeze the section in place during animation
          pinSpacing: true,      // reserve the extra scroll space below
          scrub: 2,              // higher = lazier / more cinematic follow
        },
      });

      // Left cloud slides off to the left, right cloud to the right.
      // Travel distance must exceed the overlap at centre (~300vw each side).
      tl.to(cloudLRef.current,  { x: "-400vw", ease: "power1.inOut" }, 0)
        .to(cloudRRef.current,  { x:  "400vw", ease: "power1.inOut" }, 0);
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
        /* Fill the viewport so the pinned section looks full-screen */
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem 4.5rem",
        /* Clips clouds cleanly as they fly off the edges */
        overflow: "hidden",
      }}
    >
      {/* ── Section title (starts hidden; fades in mid-pin) ── */}
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
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: "clamp(1rem, 4vw, 1.15rem)",
                color: PIN_COLOR,
                lineHeight: 1.25,
                letterSpacing: "0.01em",
              }}
            >
              איסט תל אביב&nbsp;&nbsp;EAST TLV
            </p>
            <p
              style={{
                margin: "0.28rem 0 0",
                fontSize: "clamp(0.82rem, 3.2vw, 0.92rem)",
                color: "#3a3a3a",
                lineHeight: 1.4,
              }}
            >
              כתובת: מיטב 13, תל אביב-יפו
            </p>
          </div>
        </div>
      </div>

      {/*
        ── Cloud curtain ──
        mix-blend-mode: screen  →  pure black background vanishes against the
        cream section colour; only the luminous cloud shapes remain visible.

        Each cloud is 140vw wide so it covers the full viewport even on wide
        phones held in landscape.  They start overlapping in the centre and are
        animated apart by the GSAP pin timeline above.
      */}
      {/*
        Cloud curtain — Photoroom PNGs have transparent backgrounds so no
        blend-mode tricks are needed. Each cloud is 200vw wide so it fully
        covers the viewport with plenty of overlap at the centre seam.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 20,
          overflow: "hidden",
        }}
      >
        {/* Left cloud — anchored to the left, exits left on scroll */}
        <img
          ref={cloudLRef}
          src="/images/claude1-Photoroom.png"
          alt=""
          style={{
            position: "absolute",
            top: "50%",
            left: "-250vw",
            transform: "translateY(-50%)",
            width: "800vw",
            userSelect: "none",
            draggable: "false",
          }}
        />

        {/* Right cloud — anchored to the right, exits right on scroll */}
        <img
          ref={cloudRRef}
          src="/images/claude2-Photoroom.png"
          alt=""
          style={{
            position: "absolute",
            top: "50%",
            right: "-250vw",
            transform: "translateY(-50%)",
            width: "800vw",
            userSelect: "none",
            draggable: "false",
          }}
        />
      </div>
    </section>
  );
}

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

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      /* ── Title + card fade-in ── */
      gsap.fromTo(
        ".venue-title",
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        ".venue-card",
        { autoAlpha: 0, y: 48, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        }
      );

      /* ── Cloud curtain: splits open as the section scrolls into view ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // Start when the section top hits 90% down the viewport,
          // finish when it's at 15% — plenty of scroll travel for a smooth scrub.
          start: "top 90%",
          end: "top 10%",
          scrub: 1.4,
        },
      });

      // Left cloud flies out to the left, right cloud to the right — simultaneously.
      tl.to(".cloud-l", { x: "-130%", ease: "power1.inOut" }, 0)
        .to(".cloud-r", { x: "130%", ease: "power1.inOut" }, 0);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        background: CREAM,
        padding: "3rem 1.5rem 4.5rem",
        direction: "rtl",
        position: "relative",
        /* overflow hidden clips the clouds cleanly as they fly out */
        overflow: "hidden",
      }}
    >
      {/* ── Section title ── */}
      <h2
        className="venue-title font-display text-center"
        style={{
          opacity: 0,
          color: "var(--color-ink)",
          fontSize: "clamp(1.8rem, 7vw, 2.6rem)",
          fontStyle: "italic",
          fontWeight: 300,
          letterSpacing: "0.02em",
          marginBottom: "1.75rem",
        }}
      >
        המיקום
      </h2>

      {/* ── Venue card ── */}
      <div
        className="venue-card"
        style={{
          opacity: 0,
          position: "relative",
          maxWidth: "400px",
          margin: "0 auto",
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

        {/* Top fade — cream bleeds into the photo */}
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
        mix-blend-mode: screen makes the pure-black background invisible against
        the cream section, leaving only the cloud shapes visible.
        Both clouds start stacked at centre and are animated apart by GSAP.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        {/* Left cloud (realistic blue-white) — flies to the left */}
        <img
          className="cloud-l"
          src="/images/cloud1.png"
          alt=""
          style={{
            position: "absolute",
            top: "50%",
            left: "-20%",
            transform: "translateY(-50%)",
            width: "75%",
            mixBlendMode: "screen",
            userSelect: "none",
            draggable: "false",
          }}
        />

        {/* Right cloud (pastel pink-purple) — flies to the right */}
        <img
          className="cloud-r"
          src="/images/cloud2.png"
          alt=""
          style={{
            position: "absolute",
            top: "50%",
            right: "-20%",
            transform: "translateY(-50%)",
            width: "75%",
            mixBlendMode: "screen",
            userSelect: "none",
            draggable: "false",
          }}
        />
      </div>
    </section>
  );
}

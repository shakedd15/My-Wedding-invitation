import { useRef, useEffect } from "react";
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
  const titleRef   = useRef(null);
  const cardRef    = useRef(null);
  const videoRef   = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 48, scale: 0.97 },
        {
          autoAlpha: 1, y: 0, scale: 1, duration: 1.15, ease: "power2.out",
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
        background: CREAM,
        direction: "rtl",
        position: "relative",
        padding: "3rem 1.5rem 4.5rem",
      }}
    >
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
        }}
      >
        המיקום
      </h2>

      <div
        ref={cardRef}
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
        <video
          ref={videoRef}
          src="/video/east-video.mp4"
          muted
          loop
          playsInline
          preload="metadata"
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
              rgba(246,245,240,0.75) 0%,
              rgba(246,245,240,0.45) 18%,
              rgba(246,245,240,0.12) 42%,
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
    </section>
  );
}

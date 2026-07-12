import { useRef, useEffect, useState, useCallback } from "react";
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
  const videoRef        = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React sets `muted` as a JSX *attribute*, but some mobile browsers
    // (notably iOS Safari) check the live DOM *property* before allowing
    // autoplay — without this, the video silently refuses to play until a
    // manual tap (a real user gesture) unlocks it.
    video.muted = true;
    video.defaultMuted = true;

    // Try to play immediately in case the section is already in view on load.
    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(() => {});
          setPaused(false);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleVideoClick = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
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
          marginBottom: "0.75rem",
        }}
      >
        המיקום
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", marginBottom: "1.25rem" }}>
        <div style={{ width: "60px", height: "1px", background: "rgb(197, 160, 105)" }} />
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#c5a069" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <div style={{ width: "60px", height: "1px", background: "rgb(197, 160, 105)" }} />
      </div>

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
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onClick={handleVideoClick}
          style={{
            width: "100%",
            display: "block",
            aspectRatio: "3 / 4",
            objectFit: "cover",
            objectPosition: "center",
            cursor: "pointer",
          }}
        />

        {/* Pause / play indicator */}
        {paused && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Top cream-to-transparent fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              to bottom,
              ${CREAM} 0%,
              rgba(246,245,240,0.85) 12%,
              rgba(246,245,240,0.2) 28%,
              transparent 40%
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

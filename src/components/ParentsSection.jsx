import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GOLD = "#c5a069";
const INK = "#2f2f2f";
const CREAM = "rgb(246, 245, 240)";

function GoldHeart({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={GOLD} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function HeartLine({ lineWidth = 48, heartSize = 11 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        justifyContent: "center",
      }}
    >
      <div style={{ width: lineWidth, height: "1px", background: GOLD }} />
      <GoldHeart size={heartSize} />
      <div style={{ width: lineWidth, height: "1px", background: GOLD }} />
    </div>
  );
}

function ParentsBlock({ title, lines }) {
  return (
    <div
      className="ps-side"
      style={{
        opacity: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "0.55rem",
        minWidth: 0,
        flex: "1 1 0",
      }}
    >
      <HeartLine lineWidth={36} heartSize={10} />
      <p
        className="font-body"
        style={{
          margin: "0.15rem 0 0",
          fontSize: "clamp(1.05rem, 3.6vw, 1.25rem)",
          fontWeight: 700,
          color: INK,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </p>
      {lines.map((line) => (
        <p
          key={line}
          className="font-body"
          style={{
            margin: 0,
            fontSize: "clamp(0.98rem, 3.4vw, 1.15rem)",
            fontWeight: 400,
            color: INK,
            lineHeight: 1.45,
          }}
        >
          {line}
        </p>
      ))}
      <HeartLine lineWidth={36} heartSize={10} />
    </div>
  );
}

export default function ParentsSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".ps-header",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        ".ps-photo",
        { autoAlpha: 0, scale: 0.92 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.95,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        }
      );

      gsap.fromTo(
        ".ps-side",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      style={{
        background: CREAM,
        padding: "2.5rem 1rem 3.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header: leaf + heart + title + divider */}
      <div
        className="ps-header"
        style={{
          opacity: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "1.75rem",
        }}
      >
        <img
          src="/images/parents-leaf.png"
          alt=""
          aria-hidden="true"
          style={{
            width: "88px",
            height: "auto",
            objectFit: "contain",
            marginBottom: "0.35rem",
          }}
        />
        <GoldHeart size={14} />
        <h2
          className="font-body"
          style={{
            margin: "0.55rem 0 0.7rem",
            fontSize: "clamp(1.55rem, 6vw, 2rem)",
            fontWeight: 700,
            color: INK,
            letterSpacing: "0.01em",
            textAlign: "center",
          }}
        >
          נשמח לראותכם
        </h2>
        <HeartLine lineWidth={56} heartSize={12} />
      </div>

      {/* Three columns: bride parents | photo | groom parents (RTL → visual right / center / left) */}
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(0.45rem, 2.5vw, 1rem)",
        }}
      >
        <ParentsBlock
          title="הורי הכלה"
          lines={["חני ומשה לוי ליבמן", "פיני ועדית דונל"]}
        />

        <div
          className="ps-photo"
          style={{
            opacity: 0,
            flex: "0 0 auto",
            width: "clamp(108px, 28vw, 148px)",
          }}
        >
          <img
            src="/images/parents-framed.png"
            alt="שקד ואיל"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 6px 18px rgba(80, 60, 30, 0.22))",
            }}
          />
        </div>

        <ParentsBlock
          title="הורי החתן"
          lines={["שלומית ושמואל", "בק"]}
        />
      </div>

      <div style={{ marginTop: "1.75rem" }}>
        <GoldHeart size={12} />
      </div>
    </section>
  );
}

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INK = "#2f2f2f";
const CREAM = "rgb(246, 245, 240)";

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
        gap: "0.35rem",
        minWidth: 0,
        flex: "1 1 0",
      }}
    >
      <p
        className="font-body"
        style={{
          margin: 0,
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
        <h2
          className="font-body"
          style={{
            margin: "0.35rem 0 0",
            fontSize: "clamp(1.55rem, 6vw, 2rem)",
            fontWeight: 700,
            color: INK,
            letterSpacing: "0.01em",
            textAlign: "center",
          }}
        >
          נשמח לראותכם
        </h2>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "clamp(0.45rem, 2.5vw, 1rem)",
        }}
      >
        <ParentsBlock
          title="משפחת הכלה"
          lines={["חני ומשה לוי ליבמן", "פיני ועדית דונל"]}
        />

        <div
          className="ps-photo"
          style={{
            opacity: 0,
            flex: "0 0 auto",
            width: "clamp(132px, 34vw, 180px)",
            position: "relative",
            aspectRatio: "1 / 1",
            alignSelf: "center",
            filter: "drop-shadow(0 6px 18px rgba(80, 60, 30, 0.22))",
          }}
        >
          <img
            src="/images/FullSizeRender_3.jpg"
            alt="שקד ואיל"
            style={{
              position: "absolute",
              left: "24.5%",
              top: "24%",
              width: "50.5%",
              height: "51.5%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
          <img
            src="/images/parents-frame.png"
            alt=""
            aria-hidden="true"
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "auto",
              display: "block",
              pointerEvents: "none",
            }}
          />
        </div>

        <ParentsBlock
          title="משפחת החתן"
          lines={["שלומית ושמואל", "בק"]}
        />
      </div>
    </section>
  );
}

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
          fontSize: "clamp(1.26rem, 4.32vw, 1.5rem)",
          fontWeight: 400,
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
            fontSize: "clamp(1.176rem, 4.08vw, 1.38rem)",
            fontWeight: 300,
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

function swingPhoto(photo) {
  gsap.killTweensOf(photo, "rotation");
  gsap.set(photo, { transformOrigin: "50% 0%", rotation: 0 });

  return gsap
    .timeline()
    .to(photo, { rotation: -6, duration: 0.35, ease: "power1.out" })
    .to(photo, { rotation: 6, duration: 0.55, ease: "sine.inOut" })
    .to(photo, { rotation: -4, duration: 0.5, ease: "sine.inOut" })
    .to(photo, { rotation: 2.5, duration: 0.45, ease: "sine.inOut" })
    .to(photo, { rotation: -1, duration: 0.4, ease: "sine.inOut" })
    .to(photo, { rotation: 0, duration: 0.55, ease: "power2.out" });
}

export default function ParentsSection() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      const photo = photoRef.current;
      if (!photo) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set([".ps-header", ".ps-side", photo], { autoAlpha: 1 });
        return;
      }

      gsap.set(photo, { transformOrigin: "50% 0%" });

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

      const photoTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      photoTl
        .fromTo(
          photo,
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration: 0.95, ease: "power2.out" }
        )
        .add(() => swingPhoto(photo));

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

      const onSwing = contextSafe(() => {
        swingPhoto(photo);
      });

      const onKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSwing();
        }
      };

      photo.addEventListener("click", onSwing);
      photo.addEventListener("keydown", onKeyDown);

      return () => {
        photo.removeEventListener("click", onSwing);
        photo.removeEventListener("keydown", onKeyDown);
      };
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
            fontSize: "clamp(1.86rem, 7.2vw, 2.4rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: INK,
            letterSpacing: "0.02em",
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
          ref={photoRef}
          className="ps-photo"
          role="button"
          tabIndex={0}
          aria-label="הנדנד את התמונה"
          style={{
            opacity: 0,
            flex: "0 0 auto",
            width: "clamp(132px, 34vw, 180px)",
            position: "relative",
            aspectRatio: "1 / 1",
            alignSelf: "center",
            filter: "drop-shadow(0 6px 18px rgba(80, 60, 30, 0.22))",
            transformOrigin: "50% 0%",
            willChange: "transform",
            cursor: "pointer",
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

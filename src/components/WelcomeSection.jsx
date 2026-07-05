import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Section 2 — Welcome message.
 *
 * The blue & ivory peony arrangement floats at the top (overlapping the
 * gradient fade of the invitation image above), then beneath it a warm
 * off-white panel carries the Hebrew welcome text.
 */
export default function WelcomeSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const trigger = { trigger: sectionRef.current, start: "top 80%", once: true };

      gsap.fromTo(
        ".wc-flowers",
        { autoAlpha: 0, y: 30, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out", scrollTrigger: trigger }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative flex flex-col items-center"
      style={{
        /* Top is fully transparent so flowers sit directly on the invitation image.
           The white/blue background only begins below the flower area. */
        background: "linear-gradient(180deg, transparent 0%, transparent 42%, rgb(246,245,240) 65%, rgb(246,245,240) 100%)",
        marginTop: "-30vw",   /* pull up so ~half the flowers overlap the photo */
        zIndex: 5,
      }}
    >
      {/* ── Flower image — top half overlaps the invitation photo, bottom half
           opens section 2. Full viewport width, no height cap. ── */}
      <div
        className="wc-flowers w-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/flowers.png"
          alt=""
          draggable="false"
          className="w-full select-none"
          style={{ display: "block", objectFit: "contain" }}
        />
      </div>

    </section>
  );
}

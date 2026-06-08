import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EVENTS = [
  { time: "16:30", label: "פתיחת\nהשערים",    side: "right" },
  { time: "17:00", label: "טקס",               side: "left"  },
  { time: "18:00", label: "קוקטייל\nוריקודים", side: "right" },
  { time: "20:00", label: "ארוחת ערב",         side: "left"  },
  { time: "21:00", label: "מסיבה\nובר פתוח",   side: "right" },
  { time: "23:00", label: "סיום החגיגות",      side: "left"  },
];

const BLUE = "var(--color-blue)";

export default function ScheduleSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".sch-title",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        ".sch-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        }
      );

      gsap.utils.toArray(".sch-event").forEach((el) => {
        const side = el.dataset.side;
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: side === "left" ? -36 : 36 },
          {
            autoAlpha: 1, x: 0, duration: 0.65, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
      });

      gsap.utils.toArray(".sch-diamond").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-4 py-16"
      style={{ background: "rgb(246, 245, 240)" }}
    >
      {/* Title */}
      <h2
        className="sch-title mb-14 text-center font-display font-light"
        style={{
          opacity: 0,
          color: "var(--color-ink)",
          fontSize: "clamp(1.8rem, 7vw, 2.6rem)",
          fontStyle: "italic",
          letterSpacing: "0.02em",
        }}
      >
        תוכניית הערב
      </h2>

      {/* dir="ltr" forces left→right flex order regardless of page RTL */}
      <div className="relative mx-auto" dir="ltr" style={{ width: "min(300px, 78vw)" }}>

        {/* Vertical line */}
        <div
          className="sch-line pointer-events-none absolute"
          style={{
            left: "50%",
            top: 0,
            bottom: 0,
            width: "1.5px",
            transform: "translateX(-50%)",
            background: BLUE,
            opacity: 0.5,
          }}
        />

        {EVENTS.map((ev, i) => (
          <div
            key={i}
            className="relative flex items-center py-7"
            style={{ minHeight: "80px" }}
          >
            {/* Left slot — content only when side="left" */}
            <div className="flex-1 pr-5 text-right">
              {ev.side === "left" && (
                <div
                  className="sch-event"
                  data-side="left"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="font-display block"
                    style={{ color: BLUE, fontSize: "clamp(1.7rem,6.5vw,2.4rem)", fontWeight: 300, lineHeight: 1 }}
                  >
                    {ev.time}
                  </span>
                  <span
                    className="font-body block mt-1 whitespace-pre-line text-sm leading-snug"
                    style={{ color: "var(--color-ink)", opacity: 0.7 }}
                  >
                    {ev.label}
                  </span>
                </div>
              )}
            </div>

            {/* Centre diamond */}
            <div className="relative z-10 flex shrink-0 items-center justify-center" style={{ width: "24px" }}>
              <svg
                className="sch-diamond"
                width="12" height="12" viewBox="0 0 12 12"
                style={{ opacity: 0, overflow: "visible" }}
                aria-hidden="true"
              >
                <rect x="1" y="1" width="10" height="10" rx="1"
                  transform="rotate(45 6 6)" fill={BLUE} opacity="0.9" />
              </svg>
            </div>

            {/* Right slot — content only when side="right" */}
            <div className="flex-1 pl-5 text-left">
              {ev.side === "right" && (
                <div
                  className="sch-event"
                  data-side="right"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="font-display block"
                    style={{ color: BLUE, fontSize: "clamp(1.7rem,6.5vw,2.4rem)", fontWeight: 300, lineHeight: 1 }}
                  >
                    {ev.time}
                  </span>
                  <span
                    className="font-body block mt-1 whitespace-pre-line text-sm leading-snug"
                    style={{ color: "var(--color-ink)", opacity: 0.7 }}
                  >
                    {ev.label}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

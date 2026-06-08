import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EVENTS = [
  { time: "16:30", label: "פתיחת\nהשערים",   side: "right" },
  { time: "17:00", label: "טקס",              side: "left"  },
  { time: "18:00", label: "קוקטייל\nוריקודים", side: "right" },
  { time: "20:00", label: "ארוחת ערב",        side: "left"  },
  { time: "21:00", label: "מסיבה\nובר פתוח",  side: "right" },
  { time: "23:00", label: "סיום החגיגות",     side: "left"  },
];

const BLUE = "var(--color-blue)";

export default function ScheduleSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Title
      gsap.fromTo(
        ".sch-title",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      // Vertical line grows from top
      gsap.fromTo(
        ".sch-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1, duration: 1.4, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        }
      );

      // Each event row staggers in
      gsap.utils.toArray(".sch-event").forEach((el, i) => {
        const side = el.dataset.side;
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: side === "left" ? -40 : 40 },
          {
            autoAlpha: 1, x: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      // Diamond markers pop in
      gsap.utils.toArray(".sch-diamond").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative w-full px-4 py-16"
      style={{ background: "rgb(246, 245, 240)" }}
    >
      {/* ── Title ── */}
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

      {/* ── Timeline grid ── */}
      <div className="relative mx-auto" style={{ maxWidth: "420px" }}>

        {/* Vertical centre line */}
        <div
          className="sch-line pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "1.5px",
            height: "100%",
            background: BLUE,
            opacity: 0.55,
          }}
        />

        {/* Event rows */}
        <div className="flex flex-col gap-0">
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              className="relative grid items-center py-6"
              style={{ gridTemplateColumns: "1fr 28px 1fr" }}
            >
              {/* Left cell */}
              <div
                className="sch-event pr-5 text-right"
                data-side="left"
                style={{
                  opacity: 0,
                  visibility: ev.side === "left" ? "visible" : "hidden",
                }}
              >
                <span
                  className="font-display block"
                  style={{
                    color: BLUE,
                    fontSize: "clamp(1.8rem, 7vw, 2.6rem)",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  {ev.side === "left" ? ev.time : ""}
                </span>
                <span
                  className="font-body block mt-1 whitespace-pre-line text-sm leading-snug"
                  style={{ color: "var(--color-ink)", opacity: 0.7 }}
                >
                  {ev.side === "left" ? ev.label : ""}
                </span>
              </div>

              {/* Centre diamond */}
              <div className="flex items-center justify-center">
                <svg
                  className="sch-diamond"
                  width="12" height="12" viewBox="0 0 12 12"
                  style={{ opacity: 0, overflow: "visible" }}
                  aria-hidden="true"
                >
                  <rect
                    x="1" y="1" width="10" height="10"
                    rx="1"
                    transform="rotate(45 6 6)"
                    fill={BLUE}
                    opacity="0.9"
                  />
                </svg>
              </div>

              {/* Right cell */}
              <div
                className="sch-event pl-5 text-left"
                data-side="right"
                style={{
                  opacity: 0,
                  visibility: ev.side === "right" ? "visible" : "hidden",
                }}
              >
                <span
                  className="font-display block"
                  style={{
                    color: BLUE,
                    fontSize: "clamp(1.8rem, 7vw, 2.6rem)",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  {ev.side === "right" ? ev.time : ""}
                </span>
                <span
                  className="font-body block mt-1 whitespace-pre-line text-sm leading-snug"
                  style={{ color: "var(--color-ink)", opacity: 0.7 }}
                >
                  {ev.side === "right" ? ev.label : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

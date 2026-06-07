import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Wedding date: 03/11/2026 at 18:00 (adjust hour to taste)
const WEDDING = new Date("2026-11-03T18:00:00");

function calcTimeLeft() {
  const now = new Date();
  const diff = WEDDING - now;

  if (diff <= 0) return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

  // Calendar-accurate months
  let months =
    (WEDDING.getFullYear() - now.getFullYear()) * 12 +
    (WEDDING.getMonth() - now.getMonth());

  // If the day-of-month hasn't arrived yet this month, subtract 1
  const pivot = new Date(
    now.getFullYear(),
    now.getMonth() + months,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );
  if (pivot > WEDDING) months -= 1;

  // Remaining ms after stripping full months
  const afterMonths = new Date(
    now.getFullYear(),
    now.getMonth() + months,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );
  const rem = Math.floor((WEDDING - afterMonths) / 1000); // total remaining seconds

  const days    = Math.floor(rem / 86400);
  const hours   = Math.floor((rem % 86400) / 3600);
  const minutes = Math.floor((rem % 3600) / 60);
  const seconds = rem % 60;

  return { months, days, hours, minutes, seconds };
}

const UNITS = [
  { key: "months",  label: "חודשים" },
  { key: "days",    label: "ימים"   },
  { key: "hours",   label: "שעות"   },
  { key: "minutes", label: "דקות"   },
  { key: "seconds", label: "שניות"  },
];

export default function CountdownSection() {
  const [time, setTime] = useState(calcTimeLeft);
  const sectionRef = useRef(null);

  // Tick every second
  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Fade-in on scroll
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".cd-title",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        ".cd-card",
        { autoAlpha: 0, y: 40, scale: 0.88 },
        {
          autoAlpha: 1, y: 0, scale: 1,
          duration: 0.6, stagger: 0.1, ease: "back.out(1.4)",
          delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="flex flex-col items-center justify-center gap-8 px-6 py-12"
      style={{ background: "linear-gradient(165deg, #edf5fa 0%, #f0f7f0 100%)" }}
    >
      {/* Title */}
      <div className="cd-title flex flex-col items-center gap-2" style={{ opacity: 0 }}>
        <div className="flex items-center gap-3">
          <div className="h-px w-12" style={{ background: "var(--color-blue)", opacity: 0.45 }} />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="2.5" fill="var(--color-blue)" opacity="0.65" />
            <circle cx="6" cy="6" r="5.2" stroke="var(--color-blue)" strokeWidth="1" opacity="0.3" />
          </svg>
          <div className="h-px w-12" style={{ background: "var(--color-blue)", opacity: 0.45 }} />
        </div>
        <h2
          className="font-display text-3xl font-light tracking-widest"
          style={{ color: "var(--color-blue)" }}
        >
          נשאר עוד…
        </h2>
      </div>

      {/* Countdown cards */}
      <div className="flex items-center gap-3" dir="ltr">
        {UNITS.map(({ key, label }) => (
          <div
            key={key}
            className="cd-card flex flex-col items-center justify-center rounded-xl"
            style={{
              opacity: 0,
              width: "60px",
              height: "72px",
              border: "2px solid var(--color-blue)",
              color: "var(--color-blue)",
            }}
          >
            <span
              className="font-display leading-none tabular-nums"
              style={{ fontSize: "1.9rem", fontWeight: 300 }}
            >
              {String(time[key]).padStart(2, "0")}
            </span>
            <span
              className="font-body text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-blue-soft)", marginTop: "5px" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

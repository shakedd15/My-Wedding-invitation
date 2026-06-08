import { useState, useEffect } from "react";

// Wedding date: 03/11/2026 at 18:00
const WEDDING = new Date("2026-11-03T18:00:00");

function calcTimeLeft() {
  const now = new Date();
  const diff = WEDDING - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(diff / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

/* The torn shapes are filled with the surrounding page color so they
   appear to "bite" jagged edges into the blue countdown area. */
const PAGE_COLOR = "rgb(246, 245, 240)";

const BLUE = "rgb(217, 234, 245)";

/* Top: blue peaks protrude UPWARD into the cream section above */
const TopTear = () => (
  <svg
    viewBox="0 0 375 64"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", width: "100%", height: "clamp(22px,6vw,40px)", transform: "scaleY(-1)" }}
    aria-hidden="true"
  >
    <path
      d="M0,0 L0,64 L375,64 L375,0
         Q365,12 355,4 Q345,0 335,10 Q325,20 315,8
         Q305,0 295,12 Q285,22 275,8 Q265,0 255,14
         Q245,26 235,10 Q225,0 215,14 Q205,26 195,10
         Q185,0 175,12 Q165,22 155,8 Q145,0 135,14
         Q125,28 115,12 Q105,0 95,16 Q85,28 75,12
         Q65,0 55,14 Q45,26 35,10 Q25,0 15,12 L0,0 Z"
      fill={BLUE}
    />
  </svg>
);

/* Bottom: blue peaks protrude DOWNWARD into the cream section below */
const BottomTear = () => (
  <svg
    viewBox="0 0 375 64"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", width: "100%", height: "clamp(22px,6vw,40px)", transform: "scaleY(-1)" }}
    aria-hidden="true"
  >
    <path
      d="M0,64 L0,0 L375,0 L375,64
         Q360,50 348,58 Q336,64 322,52 Q310,42 298,56
         Q286,64 272,52 Q260,42 248,56 Q236,64 222,50
         Q210,38 198,54 Q186,64 172,50 Q160,38 148,54
         Q136,64 122,52 Q110,42 98,56 Q86,64 72,50
         Q60,38 48,54 Q36,64 22,52 Q10,42 0,64 Z"
      fill={BLUE}
    />
  </svg>
);

const UNITS = [
  { key: "days",    he: "ימים",  en: "Days"    },
  { key: "hours",   he: "שעות",  en: "Hours"   },
  { key: "minutes", he: "דקות",  en: "Minutes" },
  { key: "seconds", he: "שניות", en: "Seconds" },
];

export default function CountdownSection() {
  const [time, setTime] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ background: "rgb(217,234,245)", position: "relative" }}>
      {/* ── Top torn border ── */}
      <TopTear />

      {/* ── Cream content area ── */}
      <div
        style={{
          background: "rgb(217, 234, 245)",
          padding: "16px 24px 20px",
          textAlign: "center",
        }}
      >
        {/* Script title */}
        <p
          className="font-display"
          style={{
            color: "#2a2a2a",
            fontSize: "clamp(1.5rem, 6vw, 2.2rem)",
            fontWeight: 300,
            fontStyle: "italic",
            marginBottom: "28px",
            letterSpacing: "0.01em",
          }}
        >
          החגיגות יתחילו בעוד...
        </p>

        {/* Number row */}
        <div
          className="flex items-end justify-center gap-2"
          style={{ direction: "ltr" }}
        >
          {UNITS.map(({ key, he }, i) => (
            <div key={key} className="flex items-end">
              <div className="flex flex-col items-center">
                <span
                  className="font-display tabular-nums"
                  style={{
                    fontSize: "clamp(2.6rem, 10vw, 4rem)",
                    fontWeight: 300,
                    color: "#2a2a2a",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {String(time[key]).padStart(2, "0")}
                </span>
                <span
                  className="font-body"
                  style={{
                    fontSize: "clamp(0.62rem, 2.4vw, 0.85rem)",
                    color: "#5a5a5a",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginTop: "6px",
                  }}
                >
                  {he}
                </span>
              </div>
              {/* Colon separator (not after last item) */}
              {i < UNITS.length - 1 && (
                <span
                  className="font-display"
                  style={{
                    fontSize: "clamp(2rem, 8vw, 3.2rem)",
                    color: "#1a4a6e",
                    lineHeight: 1,
                    paddingBottom: "22px",
                    margin: "0 4px",
                    opacity: 0.7,
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom transition handled by WaveDivider in App.jsx */}
    </section>
  );
}

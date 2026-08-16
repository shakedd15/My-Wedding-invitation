import { useEffect } from "react";
import { DETAILS, MENU } from "../constants/config.js";

const GOLD = "#c5a069";
const INK = "#2f2f2f";
const MUTED = "#5a5a5a";

function HeartDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        width: "100%",
        maxWidth: "280px",
        margin: "0 auto",
        opacity: 0.55,
      }}
    >
      <div style={{ flex: 1, height: "1px", background: GOLD }} />
      <svg width="10" height="10" viewBox="0 0 24 24" fill={GOLD} aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <div style={{ flex: 1, height: "1px", background: GOLD }} />
    </div>
  );
}

export default function MenuPage() {
  useEffect(() => {
    document.title = "שקד & איל — תפריט החתונה";
  }, []);

  const { couple } = DETAILS;

  return (
    <main
      dir="rtl"
      className="font-body"
      style={{
        minHeight: "100dvh",
        backgroundColor: "#f3f0ea",
        backgroundImage: "url(/images/menu/paper.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: INK,
        padding: "1.25rem 1.25rem 1.5rem",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src="/images/menu/flower.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: "min(70dvh, 560px)",
          width: "auto",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.85rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <header style={{ textAlign: "center", width: "100%" }}>
          <h1
            className="font-body"
            style={{
              margin: "0 0 0.65rem",
              fontSize: "clamp(2.4rem, 10vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: INK,
            }}
          >
            {couple.groom}{" "}
            <span className="font-body" style={{ color: GOLD, fontStyle: "italic", fontWeight: 300 }}>
              &
            </span>{" "}
            {couple.bride}
          </h1>

          <HeartDivider />

          <p
            className="font-body"
            style={{
              margin: "0.65rem 0 0",
              fontSize: "clamp(1.35rem, 5.5vw, 1.55rem)",
              fontWeight: 400,
              color: INK,
              letterSpacing: "0.04em",
            }}
          >
            תפריט החתונה
          </p>
        </header>

        {MENU.map(({ course, items }) => (
          <section key={course} style={{ textAlign: "center", width: "100%" }}>
            <HeartDivider />
            <h2
              className="font-body"
              style={{
                margin: "0.85rem 0 0.75rem",
                fontSize: "clamp(1.05rem, 4.5vw, 1.15rem)",
                fontWeight: 600,
                color: INK,
                letterSpacing: "0.01em",
              }}
            >
              {course}
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              {items.map((item) => (
                <li
                  key={item}
                  className="font-body"
                  style={{
                    fontSize: "clamp(0.92rem, 3.8vw, 1rem)",
                    color: MUTED,
                    fontWeight: 300,
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}

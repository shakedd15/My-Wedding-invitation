import { useEffect } from "react";
import { DETAILS } from "../constants/config.js";

const GOLD = "#c5a069";
const INK = "#2f2f2f";
const MUTED = "#5a5a5a";
const WAZE_BG = "#e8ddd0";
const PAYBOX_BG = "#2ba9eb";
const BIT_BG = "#00353b";
const BORDER = "#d8d8d8";

const ICONS = {
  leaves: "/images/details/leaves.png",
  rings: "/images/details/rings.png",
  clock: "/images/details/clock.png",
  location: "/images/details/location.png",
  heart: "/images/details/heart.png",
  waze: "/images/details/waze.png",
  gift: "/images/details/gift.png",
};

function DetailIcon({ name, size = 52, inline = false }) {
  return (
    <img
      src={ICONS[name]}
      alt=""
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
        margin: inline ? 0 : "0 auto",
        flexShrink: 0,
        alignSelf: "center",
      }}
    />
  );
}

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

function SectionBlock({ icon, title, subtitle, children }) {
  return (
    <section style={{ textAlign: "center", width: "100%" }}>
      {icon && <div style={{ marginBottom: "0.45rem" }}>{icon}</div>}
      <h2
        className="font-body"
        style={{
          margin: subtitle ? "0 0 0.35rem" : "0 0 0.75rem",
          fontSize: "clamp(1.05rem, 4.5vw, 1.15rem)",
          fontWeight: 600,
          color: INK,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="font-body"
          style={{
            margin: "0 0 0.75rem",
            fontSize: "clamp(0.88rem, 3.8vw, 0.95rem)",
            color: MUTED,
            lineHeight: 1.5,
            fontWeight: 300,
          }}
        >
          {subtitle}
        </p>
      )}
      {children}
    </section>
  );
}

function PillButton({ href, onClick, variant = "outline", children }) {
  const isWaze = variant === "waze";
  const isPaybox = variant === "paybox";
  const isBit = variant === "bit";
  const isSolid = isWaze || isPaybox || isBit;

  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.65rem",
    width: "100%",
    maxWidth: "320px",
    margin: "0 auto",
    padding: "0.75rem 1.25rem",
    borderRadius: "999px",
    border: isSolid ? "none" : `1.5px solid ${BORDER}`,
    background: isWaze ? WAZE_BG : isPaybox ? PAYBOX_BG : isBit ? BIT_BG : "#ffffff",
    color: isPaybox || isBit ? "#ffffff" : INK,
    fontSize: "clamp(0.9rem, 3.8vw, 0.98rem)",
    fontFamily: "inherit",
    fontWeight: 500,
    lineHeight: 1,
    textDecoration: "none",
    cursor: "pointer",
    boxSizing: "border-box",
    textAlign: "center",
  };

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export default function DetailsPage() {
  useEffect(() => {
    document.title = "שקד & איל — פרטי החתונה";
  }, []);

  const { couple, date, schedule, venue } = DETAILS;

  return (
    <main
      dir="rtl"
      className="font-body"
      style={{
        minHeight: "100dvh",
        background: "#ffffff",
        color: INK,
        padding: "1.25rem 1.25rem 1.5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.85rem",
        }}
      >
        <header style={{ textAlign: "center", width: "100%" }}>
          <DetailIcon name="leaves" size={72} />

          <h1
            className="font-display"
            style={{
              margin: "0.5rem 0 0.65rem",
              fontSize: "clamp(2.4rem, 10vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: INK,
            }}
          >
            {couple.groom}{" "}
            <span className="font-serif" style={{ color: GOLD, fontStyle: "italic", fontWeight: 300 }}>
              &
            </span>{" "}
            {couple.bride}
          </h1>

          <HeartDivider />

          <p
            className="font-serif"
            style={{
              margin: "0.65rem 0 0.2rem",
              fontSize: "clamp(1.35rem, 5.5vw, 1.55rem)",
              fontWeight: 400,
              color: INK,
              letterSpacing: "0.04em",
            }}
          >
            {date.gregorian}
          </p>
          <p
            className="font-body"
            style={{
              margin: 0,
              fontSize: "clamp(0.88rem, 3.8vw, 0.95rem)",
              color: MUTED,
              fontWeight: 300,
            }}
          >
            {date.hebrew}
          </p>
        </header>

        <HeartDivider />

        <SectionBlock icon={<DetailIcon name="rings" size={56} />} title="מתי ואיפה?">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
              marginBottom: "0.75rem",
              alignItems: "center",
            }}
          >
            {schedule.map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  fontSize: "clamp(0.92rem, 3.8vw, 1rem)",
                  color: INK,
                  fontWeight: 400,
                }}
              >
                <DetailIcon name={item.icon} size={22} inline />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.35rem",
              marginBottom: "0.85rem",
              textAlign: "center",
            }}
          >
            <DetailIcon name="location" size={24} />
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "clamp(0.95rem, 4vw, 1.02rem)" }}>
                {venue.name}
              </p>
              <p style={{ margin: "0.15rem 0 0", color: MUTED, fontSize: "clamp(0.88rem, 3.8vw, 0.95rem)" }}>
                {venue.address}
              </p>
              <p style={{ margin: "0.15rem 0 0", color: MUTED, fontSize: "clamp(0.88rem, 3.8vw, 0.95rem)" }}>
                {venue.parking}
              </p>
            </div>
          </div>

          <PillButton href={venue.wazeUrl} variant="waze">
            <DetailIcon name="waze" size={24} inline />
            <span style={{ lineHeight: 1 }}>נווטו איתנו ב-Waze</span>
          </PillButton>
        </SectionBlock>

        <HeartDivider />

        <SectionBlock title="ניתן להעניק מתנה גם בפייסבוקס וביט 👇">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.65rem",
              width: "100%",
              alignItems: "center",
            }}
          >
            <PillButton href={DETAILS.payboxUrl} variant="paybox">
              <DetailIcon name="gift" size={22} inline />
              <span style={{ lineHeight: 1 }}>למתנה ב-PayBox</span>
            </PillButton>
            <PillButton href={DETAILS.bitUrl} variant="bit">
              <DetailIcon name="gift" size={22} inline />
              <span style={{ lineHeight: 1 }}>למתנה ב-bit</span>
            </PillButton>
          </div>
        </SectionBlock>
      </div>
    </main>
  );
}

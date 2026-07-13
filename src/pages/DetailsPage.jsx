import { useEffect } from "react";
import { DETAILS } from "../constants/config.js";

const GOLD = "#c5a069";
const INK = "#2f2f2f";
const MUTED = "#5a5a5a";
const WAZE_BG = "#e8ddd0";
const PAYBOX_BG = "#5f7a62";
const BORDER = "#d8d8d8";

function iconStyle(size) {
  return { display: "block", margin: "0 auto", flexShrink: 0, width: size, height: size };
}

function LeavesIcon({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" style={iconStyle(size)}>
      <path d="M18 52c8-14 18-24 34-34" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M28 42c-2-8 2-14 10-18M36 34c-1-7 3-12 10-15M42 28c0-6 3-10 8-12" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="24" cy="30" rx="7" ry="11" transform="rotate(-35 24 30)" stroke={GOLD} strokeWidth="1.6" />
      <path d="M24 22v16" stroke={GOLD} strokeWidth="1.2" transform="rotate(-35 24 30)" />
      <ellipse cx="34" cy="22" rx="6" ry="10" transform="rotate(-20 34 22)" stroke={GOLD} strokeWidth="1.6" />
      <path d="M34 15v14" stroke={GOLD} strokeWidth="1.2" transform="rotate(-20 34 22)" />
      <ellipse cx="44" cy="16" rx="5" ry="8" transform="rotate(-10 44 16)" stroke={GOLD} strokeWidth="1.6" />
      <ellipse cx="20" cy="40" rx="5.5" ry="9" transform="rotate(-50 20 40)" stroke={GOLD} strokeWidth="1.6" />
      <ellipse cx="40" cy="36" rx="5" ry="8" transform="rotate(25 40 36)" stroke={GOLD} strokeWidth="1.6" />
      <ellipse cx="48" cy="26" rx="4.5" ry="7" transform="rotate(35 48 26)" stroke={GOLD} strokeWidth="1.6" />
    </svg>
  );
}

function HeartIcon({ size = 18, filled = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={iconStyle(size)}>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={filled ? GOLD : "none"}
        stroke={GOLD}
        strokeWidth={filled ? 0 : 1.8}
      />
    </svg>
  );
}

function RingsIcon({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" style={iconStyle(size)}>
      <circle cx="26" cy="36" r="14" stroke={GOLD} strokeWidth="2" />
      <circle cx="38" cy="36" r="14" stroke={GOLD} strokeWidth="2" />
      <path d="M26 18l-3 5h6l-3-5z" stroke={GOLD} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M23 23h6M24.5 20.5h3" stroke={GOLD} strokeWidth="1.4" />
    </svg>
  );
}

function ClockIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={iconStyle(size)}>
      <circle cx="12" cy="12" r="9" stroke={GOLD} strokeWidth="1.8" />
      <path d="M12 7v5l3.5 2" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LocationIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={iconStyle(size)}>
      <path
        d="M12 22s7-7.2 7-13a7 7 0 10-14 0c0 5.8 7 13 7 13z"
        stroke={GOLD}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.5" stroke={GOLD} strokeWidth="1.8" />
    </svg>
  );
}

function GiftIcon({ size = 52 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" style={iconStyle(size)}>
      <rect x="10" y="28" width="44" height="30" rx="2" stroke={GOLD} strokeWidth="2" />
      <path d="M10 36h44" stroke={GOLD} strokeWidth="2" />
      <path d="M32 28v30" stroke={GOLD} strokeWidth="2" />
      <path d="M32 28c-8-10-18-8-18-2s10 4 18 2" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
      <path d="M32 28c8-10 18-8 18-2s-10 4-18 2" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WazeIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={iconStyle(size)}>
      <path
        d="M12 3c4.8 0 8.5 3.4 8.5 8.2 0 2.4-1 4.5-2.6 6l1.1 2.8-3.2-1.2c-1.1.4-2.4.6-3.8.6-4.8 0-8.5-3.4-8.5-8.2S7.2 3 12 3z"
        fill="#33ccff"
        stroke="#1a8fb8"
        strokeWidth="0.8"
      />
      <circle cx="9.2" cy="10.5" r="1.3" fill="#1c2460" />
      <circle cx="14.8" cy="10.5" r="1.3" fill="#1c2460" />
      <path d="M9 14c.8 1.2 2 1.8 3 1.8s2.2-.6 3-1.8" stroke="#1c2460" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
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
      <HeartIcon size={10} />
      <div style={{ flex: 1, height: "1px", background: GOLD }} />
    </div>
  );
}

function SectionBlock({ icon, title, subtitle, children }) {
  return (
    <section style={{ textAlign: "center", width: "100%" }}>
      <div style={{ marginBottom: "1rem" }}>{icon}</div>
      <h2
        className="font-body"
        style={{
          margin: "0 0 0.65rem",
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
            margin: "0 0 1.35rem",
            fontSize: "clamp(0.88rem, 3.8vw, 0.95rem)",
            color: MUTED,
            lineHeight: 1.65,
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

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.65rem",
    width: "100%",
    maxWidth: "320px",
    margin: "0 auto",
    padding: "0.9rem 1.25rem",
    borderRadius: "999px",
    border: isWaze || isPaybox ? "none" : `1.5px solid ${BORDER}`,
    background: isWaze ? WAZE_BG : isPaybox ? PAYBOX_BG : "#ffffff",
    color: isPaybox ? "#ffffff" : INK,
    fontSize: "clamp(0.9rem, 3.8vw, 0.98rem)",
    fontFamily: "inherit",
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    boxSizing: "border-box",
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

function PayboxLogo() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.2)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "1rem",
        flexShrink: 0,
      }}
    >
      P
    </span>
  );
}

const SCHEDULE_ICONS = {
  clock: ClockIcon,
  heart: () => <HeartIcon size={22} filled />,
};

export default function DetailsPage() {
  useEffect(() => {
    document.title = "שקד & איל — פרטי החתונה";
  }, []);

  const { couple, subtitle, date, schedule, venue } = DETAILS;

  return (
    <main
      dir="rtl"
      className="font-body"
      style={{
        minHeight: "100dvh",
        background: "#ffffff",
        color: INK,
        padding: "2.5rem 1.5rem 3.5rem",
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
          gap: "2.25rem",
        }}
      >
        <header style={{ textAlign: "center", width: "100%" }}>
          <LeavesIcon size={72} />
          <div style={{ margin: "0.75rem 0 1.1rem" }}>
            <HeartIcon size={18} />
          </div>

          <h1
            className="font-display"
            style={{
              margin: "0 0 0.35rem",
              fontSize: "clamp(2.4rem, 10vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: INK,
            }}
          >
            {couple.bride}{" "}
            <span className="font-serif" style={{ color: GOLD, fontStyle: "italic", fontWeight: 300 }}>
              &
            </span>{" "}
            {couple.groom}
          </h1>

          <p
            className="font-display"
            style={{
              margin: "0 0 1.5rem",
              fontSize: "clamp(1rem, 4vw, 1.1rem)",
              letterSpacing: "0.55em",
              fontWeight: 300,
              color: MUTED,
              paddingRight: "0.55em",
            }}
          >
            {subtitle.split("").join(" ")}
          </p>

          <HeartDivider />

          <p
            className="font-serif"
            style={{
              margin: "1.35rem 0 0.45rem",
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

        <SectionBlock icon={<RingsIcon size={56} />} title="מתי ואיפה?">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              marginBottom: "1.35rem",
              alignItems: "center",
            }}
          >
            {schedule.map((item) => {
              const Icon = SCHEDULE_ICONS[item.icon] ?? ClockIcon;
              return (
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
                  <Icon />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.55rem",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            <LocationIcon size={24} />
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "clamp(0.95rem, 4vw, 1.02rem)" }}>
                {venue.name}
              </p>
              <p style={{ margin: "0.2rem 0 0", color: MUTED, fontSize: "clamp(0.88rem, 3.8vw, 0.95rem)" }}>
                {venue.address}
              </p>
              <p style={{ margin: "0.2rem 0 0", color: MUTED, fontSize: "clamp(0.88rem, 3.8vw, 0.95rem)" }}>
                {venue.parking}
              </p>
            </div>
          </div>

          <PillButton href={venue.wazeUrl} variant="waze">
            <WazeIcon size={24} />
            נווטו איתנו ב-Waze
          </PillButton>
        </SectionBlock>

        <HeartDivider />

        <SectionBlock
          icon={<GiftIcon />}
          title="רוצים לשמח אותנו?"
          subtitle="תרומתכם תלווה אותנו בדרכנו המשותפת"
        >
          <PillButton href={DETAILS.payboxUrl} variant="paybox">
            <PayboxLogo />
            למתנה ב-PayBox
          </PillButton>
        </SectionBlock>
      </div>
    </main>
  );
}

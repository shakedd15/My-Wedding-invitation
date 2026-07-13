import { useEffect } from "react";
import { DETAILS } from "../constants/config.js";

const GOLD = "#c5a069";
const INK = "#2f2f2f";
const MUTED = "#5a5a5a";
const WAZE_BG = "#e8ddd0";
const PAYBOX_BG = "#5f7a62";
const BORDER = "#d8d8d8";

function DetailIcon({ src, size = 52, alt = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={!alt}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
        margin: "0 auto",
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
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} style={style}>
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

function GiftIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" fill="none" aria-hidden="true" style={{ display: "block", margin: "0 auto" }}>
      <rect x="10" y="28" width="44" height="30" rx="2" stroke={GOLD} strokeWidth="2" />
      <path d="M10 36h44" stroke={GOLD} strokeWidth="2" />
      <path d="M32 28v30" stroke={GOLD} strokeWidth="2" />
      <path d="M32 28c-8-10-18-8-18-2s10 4 18 2" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
      <path d="M32 28c8-10 18-8 18-2s-10 4-18 2" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" fill="none" aria-hidden="true" style={{ display: "block", margin: "0 auto" }}>
      <rect x="8" y="18" width="48" height="32" rx="2" stroke={GOLD} strokeWidth="2" />
      <path d="M8 22l24 18 24-18" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3c-1.74 0-3.41.81-4.5 2.09" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" transform="translate(20 8)" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" fill="none" aria-hidden="true" style={{ display: "block", margin: "0 auto" }}>
      <circle cx="44" cy="14" r="6" stroke={GOLD} strokeWidth="2" />
      <circle cx="16" cy="32" r="6" stroke={GOLD} strokeWidth="2" />
      <circle cx="44" cy="50" r="6" stroke={GOLD} strokeWidth="2" />
      <path d="M22 29l16-11M22 35l16 11" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
    </svg>
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

async function handleShare() {
  const shareData = {
    title: "שקד & איל — פרטי החתונה",
    text: "כל הפרטים לחתונה של שקד ואיל",
    url: DETAILS.shareUrl,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch {
      /* user cancelled or share failed — fall through */
    }
  }

  try {
    await navigator.clipboard.writeText(DETAILS.shareUrl);
    alert("הקישור הועתק!");
  } catch {
    window.prompt("העתיקו את הקישור:", DETAILS.shareUrl);
  }
}

export default function DetailsPage() {
  useEffect(() => {
    document.title = "שקד & איל — פרטי החתונה";
  }, []);

  const { couple, subtitle, date, schedule, venue, icons } = DETAILS;

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
        {/* ── Header ── */}
        <header style={{ textAlign: "center", width: "100%" }}>
          <DetailIcon src={icons.leaves} size={72} />
          <div style={{ margin: "0.75rem 0 1.1rem" }}>
            <DetailIcon src={icons.heart} size={18} />
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
            <span
              className="font-serif"
              style={{ color: GOLD, fontStyle: "italic", fontWeight: 300 }}
            >
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

        {/* ── When & Where ── */}
        <SectionBlock
          icon={<DetailIcon src={icons.rings} size={56} />}
          title="מתי ואיפה?"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              marginBottom: "1.35rem",
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
                <DetailIcon src={icons[item.icon]} size={22} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "0.55rem",
              marginBottom: "1.5rem",
              textAlign: "right",
            }}
          >
            <DetailIcon src={icons.location} size={24} />
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
            <img src={icons.waze} alt="" aria-hidden="true" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
            נווטו איתנו ב-Waze
          </PillButton>
        </SectionBlock>

        <HeartDivider />

        {/* ── Gifts ── */}
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

        <HeartDivider />

        {/* ── RSVP update ── */}
        <SectionBlock
          icon={<EnvelopeIcon />}
          title="עדכון אישור הגעה"
          subtitle="כבר אישרתם הגעה ורוצים לעדכן פרטים?"
        >
          <PillButton href={DETAILS.rsvpUrl}>
            לעדכון אישור הגעה
          </PillButton>
        </SectionBlock>

        <HeartDivider />

        {/* ── Share ── */}
        <SectionBlock
          icon={<ShareIcon />}
          title="שתפו עם חברים ומשפחה"
          subtitle="כדי שגם הם יוכלו להגיע לחגוג איתנו"
        >
          <PillButton onClick={handleShare}>
            שיתוף העמוד
          </PillButton>
        </SectionBlock>
      </div>
    </main>
  );
}

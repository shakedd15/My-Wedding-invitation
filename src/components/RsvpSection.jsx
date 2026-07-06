import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CREAM        = "rgb(246, 245, 240)";
const DUSTY_BLUE   = "#7aaac8";
const DUSTY_BLUE_D = "#5a8aaa";
const GOLD         = "#c5a069";

/* ── tiny helpers ── */
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", margin: "0 auto 1.75rem" }}>
      <div style={{ width: "60px", height: "1px", background: GOLD }} />
      <svg width="12" height="12" viewBox="0 0 24 24" fill={GOLD} aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <div style={{ width: "60px", height: "1px", background: GOLD }} />
    </div>
  );
}

function MinusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ── Counter button ── */
function CounterBtn({ onClick, disabled, children, ariaLabel }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: `1.5px solid ${disabled ? "rgba(122,170,200,0.25)" : "rgba(122,170,200,0.6)"}`,
    background: hovered && !disabled ? "rgba(122,170,200,0.12)" : "rgba(255,255,255,0.6)",
    color: disabled ? "rgba(122,170,200,0.35)" : DUSTY_BLUE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s",
    transform: hovered && !disabled ? "scale(1.08)" : "scale(1)",
    flexShrink: 0,
    outline: "none",
    padding: 0,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={base}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

/* ── Primary / Secondary action buttons ── */
function ActionBtn({ onClick, variant = "primary", disabled, children }) {
  const [hovered, setHovered] = useState(false);

  const isPrimary = variant === "primary";
  const base = {
    flex: 1,
    minWidth: "130px",
    padding: "0.75rem 1.25rem",
    borderRadius: "999px",
    border: isPrimary ? "none" : `1.5px solid ${disabled ? "rgba(122,170,200,0.3)" : DUSTY_BLUE}`,
    background: isPrimary
      ? disabled
        ? "rgba(122,170,200,0.35)"
        : hovered
        ? DUSTY_BLUE_D
        : DUSTY_BLUE
      : hovered && !disabled
      ? "rgba(122,170,200,0.08)"
      : "transparent",
    color: isPrimary
      ? "#fff"
      : disabled
      ? "rgba(122,170,200,0.4)"
      : DUSTY_BLUE,
    fontSize: "clamp(0.88rem, 3.5vw, 0.96rem)",
    fontFamily: "inherit",
    fontWeight: 500,
    letterSpacing: "0.02em",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 0.22s, transform 0.15s, border-color 0.2s",
    transform: hovered && !disabled ? "translateY(-1px)" : "translateY(0)",
    outline: "none",
    whiteSpace: "nowrap",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={base}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

/* ────────────────────────────────────────────────────────────
   RsvpSection
   Props (all optional — hardcoded defaults below):
     guestName  : string   – display name for the greeting
     maxGuests  : number   – server-provided cap (default 3)
     defaultGuests : number – pre-selected count (default 1)
──────────────────────────────────────────────────────────── */
export default function RsvpSection({
  guestName   = "שקד",
  maxGuests   = 3,
  defaultGuests = 1,
}) {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardRef    = useRef(null);

  const [guestsCount, setGuestsCount] = useState(
    Math.min(Math.max(defaultGuests, 0), maxGuests)
  );
  const [submitted, setSubmitted] = useState(null); // null | "attending" | "declined"

  const decrement = () => setGuestsCount((n) => Math.max(0, n - 1));
  const increment = () => setGuestsCount((n) => Math.min(maxGuests, n + 1));

  const handleAttend = () => {
    console.log("RSVP attending:", { guestName, guestsCount });
    setSubmitted("attending");
  };

  const handleDecline = () => {
    console.log("RSVP declined:", { guestName });
    setSubmitted("declined");
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 48, scale: 0.97 },
        {
          autoAlpha: 1, y: 0, scale: 1, duration: 1.15, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 74%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  /* ── feminine greeting suffix – "יקרה" for שקד specifically;
     in production this would come from the guest record           ── */
  const greeting = `${guestName} יקרה,`;

  return (
    <section
      ref={sectionRef}
      style={{
        background: CREAM,
        direction: "rtl",
        position: "relative",
        padding: "3rem 1.5rem 5rem",
      }}
    >
      {/* ── Title ── */}
      <h2
        ref={titleRef}
        className="font-display text-center"
        style={{
          opacity: 0,
          color: "var(--color-ink)",
          fontSize: "clamp(1.8rem, 7vw, 2.6rem)",
          fontStyle: "italic",
          fontWeight: 300,
          letterSpacing: "0.02em",
          marginBottom: "0.75rem",
        }}
      >
        אשרו הגעתכם
      </h2>

      <Divider />

      {/* ── RSVP Card ── */}
      <div
        ref={cardRef}
        style={{
          opacity: 0,
          maxWidth: "560px",
          margin: "0 auto",
          padding: "clamp(24px, 5vw, 40px)",
          borderRadius: "32px",
          background: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(143,183,211,0.35)",
          boxShadow: "0 18px 45px rgba(80,120,170,0.10)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {submitted === null ? (
          <>
            {/* ── Greeting ── */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <p
                className="font-display"
                style={{
                  fontSize: "clamp(1.25rem, 5vw, 1.55rem)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--color-ink)",
                  margin: "0 0 0.5rem",
                }}
              >
                {greeting}
              </p>
              <p
                style={{
                  fontSize: "clamp(0.92rem, 3.8vw, 1.05rem)",
                  color: "#5a5a5a",
                  margin: 0,
                  lineHeight: 1.65,
                  fontWeight: 300,
                }}
              >
                נשמח לדעת אם תגיעי לחגוג איתנו
              </p>
            </div>

            {/* ── Separator ── */}
            <div style={{ height: "1px", background: "rgba(143,183,211,0.25)", margin: "0 0 2rem" }} />

            {/* ── Guest counter ── */}
            <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.5rem",
                  marginBottom: "0.6rem",
                }}
              >
                {/* Minus */}
                <CounterBtn
                  onClick={decrement}
                  disabled={guestsCount === 0}
                  ariaLabel="הפחת אורח"
                >
                  <MinusIcon />
                </CounterBtn>

                {/* Count display */}
                <span
                  style={{
                    fontSize: "42px",
                    fontWeight: 300,
                    color: DUSTY_BLUE,
                    lineHeight: 1,
                    minWidth: "52px",
                    textAlign: "center",
                    fontFamily: "inherit",
                    display: "block",
                    transition: "color 0.2s",
                  }}
                >
                  {guestsCount}
                </span>

                {/* Plus */}
                <CounterBtn
                  onClick={increment}
                  disabled={guestsCount === maxGuests}
                  ariaLabel="הוסף אורח"
                >
                  <PlusIcon />
                </CounterBtn>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "0.8rem",
                  color: "rgba(90,138,170,0.75)",
                  letterSpacing: "0.04em",
                  fontWeight: 400,
                }}
              >
                מספר משתתפים
              </p>
            </div>

            {/* ── Action buttons ── */}
            <div
              style={{
                display: "flex",
                gap: "0.85rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <ActionBtn
                variant="primary"
                onClick={handleAttend}
              >
                מאשרת הגעה
              </ActionBtn>

              <ActionBtn
                variant="secondary"
                onClick={handleDecline}
              >
                לא אוכל להגיע
              </ActionBtn>
            </div>
          </>
        ) : (
          /* ── Confirmation message ── */
          <ConfirmationMessage variant={submitted} guestName={guestName} />
        )}
      </div>
    </section>
  );
}

/* ── Post-submit confirmation ── */
function ConfirmationMessage({ variant, guestName }) {
  const isAttending = variant === "attending";
  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
      {/* icon */}
      <div style={{ marginBottom: "1.25rem" }}>
        {isAttending ? (
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
            <circle cx="26" cy="26" r="25" stroke={DUSTY_BLUE} strokeWidth="1.5" fill="rgba(122,170,200,0.08)" />
            <path d="M15 27l8 8 14-16" stroke={DUSTY_BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
            <circle cx="26" cy="26" r="25" stroke={GOLD} strokeWidth="1.5" fill="rgba(197,160,105,0.08)" />
            <path d="M26 16v14" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="26" cy="35" r="1.5" fill={GOLD} />
          </svg>
        )}
      </div>

      <p
        className="font-display"
        style={{
          fontSize: "clamp(1.2rem, 5vw, 1.45rem)",
          fontStyle: "italic",
          fontWeight: 400,
          color: "var(--color-ink)",
          margin: "0 0 0.6rem",
        }}
      >
        {isAttending ? `תודה רבה, ${guestName}!` : "נבין לחלוטין"}
      </p>

      <p
        style={{
          fontSize: "clamp(0.9rem, 3.5vw, 1rem)",
          color: "#5a5a5a",
          margin: 0,
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        {isAttending
          ? "נתראה בשמחה! מחכים לכם בלב פתוח ✦"
          : "נשמח לחגוג איתך בהזדמנות אחרת"}
      </p>
    </div>
  );
}

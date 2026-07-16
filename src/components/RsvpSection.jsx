import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CREAM        = "rgb(246, 245, 240)";
const DUSTY_BLUE   = "#7aaac8";
const DUSTY_BLUE_D = "#5a8aaa";
const GOLD         = "#c5a069";

/* ── tiny helpers ── */
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
   Props:
     guestName     : string|null – full_name from DB; null = no ?id= in URL
     gender        : string      – 'F' (אישה) | 'M' (גבר) | 'X' (משפחה)
     maxGuests     : number      – guests_max_amount from DB (default 3)
     defaultGuests : number      – guests_amount_arriving from DB (-1 mapped to 0 for display)
     guestLoading  : boolean     – true while guest data is being fetched
     guestError    : string      – error message if guest fetch failed
     onAttend      : (count: number) => Promise<void>
     onDecline     : () => Promise<void>
──────────────────────────────────────────────────────────── */
export default function RsvpSection({
  guestName     = null,
  gender        = "F",
  maxGuests     = 3,
  defaultGuests = 1,
  guestLoading  = false,
  guestError    = null,
  onAttend,
  onDecline,
}) {
  const sectionRef = useRef(null);
  const cardRef    = useRef(null);

  const [guestsCount,  setGuestsCount]  = useState(defaultGuests);
  const [submitted,    setSubmitted]    = useState(null); // null | "attending" | "declined"

  // סנכרן את הקאונטר כאשר נתוני האורח נטענים מה-DB
  useEffect(() => {
    setGuestsCount(Math.min(Math.max(defaultGuests, 0), maxGuests));
  }, [defaultGuests, maxGuests]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError,  setSubmitError]  = useState(null);

  const decrement = () => setGuestsCount((n) => Math.max(0, n - 1));
  const increment = () => setGuestsCount((n) => Math.min(maxGuests, n + 1));

  const handleAttend = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      if (onAttend) await onAttend(guestsCount);
      setSubmitted(guestsCount === 0 ? "declined" : "attending");
    } catch (err) {
      setSubmitError("אירעה שגיאה בשמירת הנתונים. נסו שנית.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecline = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      if (onDecline) await onDecline();
      setSubmitted("declined");
    } catch (err) {
      setSubmitError("אירעה שגיאה בשמירת הנתונים. נסו שנית.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

  const normalizedGender = String(gender ?? "F").toUpperCase();

  const suffix = normalizedGender === "M" ? "היקר" : normalizedGender === "X" ? "היקרים" : "היקרה";
  const greeting = guestName ? `${guestName} ${suffix},` : null;
  const subText  = normalizedGender === "M" ? "נשמח לדעת אם תגיע לחגוג איתנו"
                 : normalizedGender === "X" ? "נשמח לדעת אם תגיעו לחגוג איתנו"
                 :                  "נשמח לדעת אם תגיעי לחגוג איתנו";
  const attendLabel = normalizedGender === "M" ? "מאשר הגעה"
                    : normalizedGender === "X" ? "מאשרים הגעה"
                    :                  "מאשרת הגעה";

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
        {/* ── Loading skeleton ── */}
        {guestLoading ? (
          <LoadingSpinner />
        ) : guestError ? (
          /* ── Guest not found / fetch error ── */
          <ErrorMessage message={guestError} />
        ) : submitted !== null ? (
          /* ── Already submitted (or just submitted) ── */
          <ConfirmationMessage variant={submitted} guestName={guestName} gender={normalizedGender} />
        ) : (
          <>
            {/* ── Greeting ── */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              {greeting && (
                <p
                  className="font-body"
                  style={{
                    fontSize: "clamp(1.25rem, 5vw, 1.55rem)",
                    fontWeight: 700,
                    color: "var(--color-ink)",
                    margin: "0 0 0.5rem",
                  }}
                >
                  {greeting}
                </p>
              )}
              <p
                style={{
                  fontSize: "clamp(0.92rem, 3.8vw, 1.05rem)",
                  color: "#5a5a5a",
                  margin: 0,
                  lineHeight: 1.65,
                  fontWeight: 400,
                }}
              >
                {subText}
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
                <CounterBtn
                  onClick={decrement}
                  disabled={isSubmitting || guestsCount === 0}
                  ariaLabel="הפחת אורח"
                >
                  <MinusIcon />
                </CounterBtn>

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

                <CounterBtn
                  onClick={increment}
                  disabled={isSubmitting || guestsCount === maxGuests}
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

            {/* ── Submit error ── */}
            {submitError && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.88rem",
                  color: "#c05a5a",
                  marginBottom: "1rem",
                  fontWeight: 400,
                }}
              >
                {submitError}
              </p>
            )}

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
                disabled={isSubmitting}
              >
                {isSubmitting ? "שומרים…" : attendLabel}
              </ActionBtn>

              <ActionBtn
                variant="secondary"
                onClick={handleDecline}
                disabled={isSubmitting}
              >
                לא אוכל להגיע
              </ActionBtn>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ── Loading spinner ── */
function LoadingSpinner() {
  return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <div
        style={{
          display: "inline-block",
          width: "40px",
          height: "40px",
          border: `2.5px solid rgba(122,170,200,0.2)`,
          borderTopColor: DUSTY_BLUE,
          borderRadius: "50%",
          animation: "rsvp-spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes rsvp-spin { to { transform: rotate(360deg); } }`}</style>
      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "rgba(90,138,170,0.7)",
          fontWeight: 300,
        }}
      >
        טוענים את הפרטים שלכם…
      </p>
    </div>
  );
}

/* ── Error state (guest not found / network error) ── */
function ErrorMessage({ message }) {
  return (
    <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
      <svg width="44" height="44" viewBox="0 0 52 52" fill="none" aria-hidden="true" style={{ margin: "0 auto 1rem", display: "block" }}>
        <circle cx="26" cy="26" r="25" stroke={GOLD} strokeWidth="1.5" fill="rgba(197,160,105,0.08)" />
        <path d="M26 16v14" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="26" cy="35" r="1.5" fill={GOLD} />
      </svg>
      <p
        className="font-body"
        style={{
          fontSize: "clamp(1rem, 4vw, 1.2rem)",
          fontWeight: 700,
          color: "var(--color-ink)",
          margin: "0 0 0.5rem",
        }}
      >
        לא מצאנו את ההזמנה
      </p>
      <p style={{ fontSize: "0.9rem", color: "#777", margin: 0, fontWeight: 400, lineHeight: 1.6 }}>
        {message}
      </p>
    </div>
  );
}

/* ── Post-submit confirmation ── */
function ConfirmationMessage({ variant, guestName, gender }) {
  const normalizedGender = String(gender ?? "F").toUpperCase();
  const isAttending = variant === "attending";

  const thankYou = guestName ? `תודה רבה, ${guestName}!` : "תודה רבה!";
  const seeYou   = normalizedGender === "X" ? "נתראה בשמחה! מחכים לכם בלב פתוח ✦"
                 : normalizedGender === "M" ? "נתראה בשמחה! מחכים לך בלב פתוח ✦"
                 :                  "נתראה בשמחה! מחכים לך בלב פתוח ✦";
  const decline  = normalizedGender === "X" ? "נשמח לחגוג איתכם בהזדמנות אחרת"
                 :                  "נשמח לחגוג איתך בהזדמנות אחרת";

  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
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
        className="font-body"
        style={{
          fontSize: "clamp(1.2rem, 5vw, 1.45rem)",
          fontWeight: 700,
          color: "var(--color-ink)",
          margin: "0 0 0.6rem",
        }}
      >
        {isAttending ? thankYou : "נבין לחלוטין"}
      </p>

      <p
        style={{
          fontSize: "clamp(0.9rem, 3.5vw, 1rem)",
          color: "#5a5a5a",
          margin: 0,
          lineHeight: 1.7,
          fontWeight: 400,
        }}
      >
        {isAttending ? seeYou : decline}
      </p>
    </div>
  );
}

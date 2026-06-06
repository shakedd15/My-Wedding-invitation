import { forwardRef, useState } from "react";
import { ASSETS } from "../constants/config.js";

/**
 * The invitation revealed behind the opening envelope. It mirrors the premium
 * "template" look: a soft cream card with a delicate inset frame, the couple's
 * names in an elegant serif, a short subtitle, and an arched couple photo.
 *
 * All copy is driven by `copy.card` (translations.js); empty fields render
 * nothing, so the layout never shows raw keys. When no couple photo is present
 * the arch falls back to a soft placeholder so the composition stays balanced.
 *
 * Forwarded ref so the GSAP timeline can scale the whole card on reveal.
 */
const InvitationCard = forwardRef(function InvitationCard({ copy }, ref) {
  const c = copy.card;
  const [photoOk, setPhotoOk] = useState(true);

  const hasNames = c.groomName || c.brideName;
  // Graceful fallback so the revealed card always reads as "designed".
  const namesLine = hasNames ? null : copy.envelope.ariaTitle;

  return (
    <article
      ref={ref}
      dir={copy.meta.dir}
      className="card texture-bg relative flex h-full w-full flex-col items-center overflow-hidden px-6 pt-[7%] pb-[6%] text-center text-ink"
      style={{ willChange: "transform", "--tex": `url(${ASSETS.envelopeTexture})` }}
    >
      {/* delicate inset frame (thin rounded hairline, matches the reference) */}
      <span className="pointer-events-none absolute inset-3 rounded-[14px] border border-gold/40" />

      {/* ---- Names + subtitle ---- */}
      <header className="relative z-10 flex flex-col items-center gap-2">
        {c.kicker && (
          <p className="font-body text-xs tracking-[0.35em] text-gold/80 uppercase">
            {c.kicker}
          </p>
        )}

        <h1 className="font-display text-[2.6rem] leading-tight font-medium text-ink/85">
          {hasNames ? (
            <>
              {c.groomName}
              {c.groomName && c.brideName && (
                <span className="mx-3 text-gold">{c.coupleSeparator}</span>
              )}
              {c.brideName}
            </>
          ) : (
            namesLine
          )}
        </h1>

        {c.subtitle && (
          <p className="font-display text-xl font-normal text-ink/70">
            {c.subtitle}
          </p>
        )}
      </header>

      {/* ---- Arched couple photo ---- */}
      <div className="relative z-10 mt-[5%] flex w-full flex-1 items-stretch justify-center">
        <div className="relative w-[82%] overflow-hidden rounded-t-[999px] rounded-b-[10px] bg-cream-deep shadow-[0_10px_30px_rgba(120,90,50,0.18)] ring-1 ring-gold/30">
          {photoOk ? (
            <img
              src={ASSETS.couplePhoto}
              alt=""
              draggable="false"
              onError={() => setPhotoOk(false)}
              className="h-full w-full select-none object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-b from-cream to-cream-deep">
              <span className="font-body text-sm tracking-[0.25em] text-gold/60 uppercase">
                {copy.meta.dir === "rtl" ? "תמונת הזוג" : "couple photo"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ---- Optional date line under the photo ---- */}
      {(c.date.day || c.date.gregorian) && (
        <p className="relative z-10 mt-[4%] font-body text-sm tracking-[0.2em] text-ink/70">
          {[c.date.day, c.date.gregorian].filter(Boolean).join("  ·  ")}
        </p>
      )}
    </article>
  );
});

export default InvitationCard;

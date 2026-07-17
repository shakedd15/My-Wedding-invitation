import { forwardRef } from "react";
import { ASSETS } from "../constants/config.js";
import Petals from "./Petals.jsx";
import Birds from "./Birds.jsx";

/**
 * The invitation revealed behind the opening envelope: a single full-bleed
 * scene (rose arch + couple), with names overlaid in the bright sky area,
 * brought to life with white rose petals and birds across the sky.
 *
 * Forwarded ref so the GSAP timeline can scale the whole card on reveal.
 */
const InvitationCard = forwardRef(function InvitationCard({ copy }, ref) {
  const { brideName, groomName, coupleSeparator, subtitle } = copy.card;

  return (
    <article
      ref={ref}
      dir={copy.meta.dir}
      className="card relative h-full w-full overflow-hidden bg-cream"
      style={{ willChange: "transform" }}
    >
      <img
        src={ASSETS.sceneImg}
        alt={copy.envelope.ariaTitle}
        draggable="false"
        className="absolute inset-0 h-full w-full select-none object-cover"
      />

      {/* Names sit in the open sky above the couple, inside the arch. */}
      <header
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center px-6 text-center"
        style={{ marginTop: "calc(91px + 2.5cm)" }}
      >
        <h1
          className="font-display text-[clamp(2.45rem,9.1vw,4.2rem)] font-bold leading-tight tracking-wide text-gold"
          style={{
            textShadow:
              "0 1px 2px rgba(255,255,255,0.55), 0 2px 12px rgba(255,255,255,0.35)",
          }}
        >
          {brideName} {coupleSeparator} {groomName}
        </h1>
        <p
          className="mt-1 font-display text-[clamp(1.54rem,5.88vw,2.45rem)] font-bold tracking-[0.18em] text-gold"
          style={{
            textShadow:
              "0 1px 2px rgba(255,255,255,0.55), 0 2px 12px rgba(255,255,255,0.35)",
          }}
        >
          {subtitle}
        </p>
      </header>

      <Birds />
      <Petals />

      {/* Bottom gradient fade — white at bottom, transparent going up.
          Creates a seamless transition into Section 2. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: "30%",
          background:
            "linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.60) 35%, transparent 100%)",
        }}
      />
    </article>
  );
});

export default InvitationCard;

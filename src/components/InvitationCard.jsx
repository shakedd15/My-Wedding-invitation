import { forwardRef } from "react";
import { ASSETS } from "../constants/config.js";
import Petals from "./Petals.jsx";
import Birds from "./Birds.jsx";

/**
 * The invitation revealed behind the opening envelope: a single full-bleed
 * scene (the rose arch + view + the couple's names, baked into the artwork),
 * brought to life with white rose petals drifting down and a couple of white
 * birds gliding across the sky.
 *
 * Forwarded ref so the GSAP timeline can scale the whole card on reveal.
 */
const InvitationCard = forwardRef(function InvitationCard({ copy }, ref) {
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

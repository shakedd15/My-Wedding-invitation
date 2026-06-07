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
    </article>
  );
});

export default InvitationCard;

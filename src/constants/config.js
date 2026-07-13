/**
 * App-level configuration & asset paths.
 *
 * Keep all environment / asset references here so the layout code stays
 * declarative and the future Python (FastAPI/Flask) backend can override
 * these values (e.g. via an injected JSON config) without touching JSX.
 */

export const ASSETS = {
  // Drop your real track at: public/audio/wedding-song.mp3
  // (mobile-friendly .mp3 is recommended; .mp4/.m4a also work).
  audioSrc: "/audio/wedding-song.mp3",

  // Clean, light speckled paper texture for the CSS envelope flaps (matches the
  // bright off-white reference envelope).
  envelopeTexture: "/images/paper.jpg",

  // The full revealed invitation scene (rose arch + view + names baked in).
  sceneImg: "/images/scene.jpg",

  // Transparent floral wax-seal sticker (trimmed + optimized PNG).
  sealImg: "/images/wax-seal.png",
};

// Diameter of the wax seal, as a % of the smaller viewport dimension (vmin).
// Sits dead-center over the meeting point of the four CSS flaps.
export const SEAL_SIZE_VMIN = 30;

// Corner-rounding for the soft envelope flaps (fraction of each triangle edge
// that gets curved). Small value = delicate, classic envelope corners.
export const FLAP_CORNER = 0.06;

// Scale the invitation card starts at, before it grows out of the envelope.
export const CARD_START_SCALE = 0.62;

// Animation timings (seconds), in one place for easy fine-tuning.
export const ANIMATION = {
  sealFade: 1.2, // Phase 1: wax seal opacity 1 -> 0 (smooth, slow)
  flapOpen: 1.5, // Phase 2: flaps recede while the card grows out (pleasant)
};

export const DETAILS = {
  couple: { bride: "שקד", groom: "איל" },
  subtitle: "מתחתנים",
  date: {
    gregorian: "10.11.2026",
    hebrew: 'יום שלישי, ל׳ בחשוון',
  },
  schedule: [
    { icon: "clock", text: "קבלת פנים: 19:30" },
    { icon: "heart", text: "חופה וקידושין: 20:30" },
  ],
  venue: {
    name: "איסט תל אביב · EAST TLV",
    address: "מיטב 13, תל אביב-יפו",
    parking: "חניה במקום",
    wazeUrl:
      "https://waze.com/ul?q=East+TLV+Mitav+13+Tel+Aviv&navigate=yes",
  },
  payboxUrl: "https://payboxapp.page.link/",
};

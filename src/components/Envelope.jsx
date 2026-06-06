import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import InvitationCard from "./InvitationCard.jsx";
import {
  ANIMATION,
  ASSETS,
  SEAL_SIZE_VMIN,
  FLAP_CORNER,
  CARD_START_SCALE,
} from "../constants/config.js";

gsap.registerPlugin(useGSAP);

/**
 * Builds a rounded-corner triangle path in objectBoundingBox space (0..1).
 * Each sharp vertex is replaced by a short quadratic curve so the flaps read
 * as delicate, classic (soft) envelope corners rather than hard points.
 *
 * @param {number[][]} pts  three [x, y] vertices (0..1)
 * @param {number} r        corner radius as a fraction of each adjoining edge
 */
function roundedTriangle(pts, r) {
  const n = pts.length;
  const along = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);

  let d = "";
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const cur = pts[i];
    const next = pts[(i + 1) % n];
    const t1 = Math.min(0.5, r / dist(cur, prev));
    const t2 = Math.min(0.5, r / dist(cur, next));
    const p1 = along(cur, prev, t1);
    const p2 = along(cur, next, t2);
    d += `${i === 0 ? "M" : "L"} ${p1[0].toFixed(4)} ${p1[1].toFixed(4)} `;
    d += `Q ${cur[0]} ${cur[1]} ${p2[0].toFixed(4)} ${p2[1].toFixed(4)} `;
  }
  return `${d}Z`;
}

// The four flaps tile the whole rectangle and meet at the dead center (0.5,0.5).
// The four diagonals running from each corner to the center are the classic
// envelope fold lines.
const CENTER = [0.5, 0.5];
const FLAPS = [
  { key: "top", pts: [[0, 0], [1, 0], CENTER], open: { yPercent: -110 } },
  { key: "right", pts: [[1, 0], [1, 1], CENTER], open: { xPercent: 110 } },
  { key: "bottom", pts: [[1, 1], [0, 1], CENTER], open: { yPercent: 110 } },
  { key: "left", pts: [[0, 1], [0, 0], CENTER], open: { xPercent: -110 } },
];

// Top/bottom flaps overlap the side flaps, like a real folded envelope back.
const FLAP_Z = { left: 11, right: 11, bottom: 12, top: 13 };

/**
 * Mobile-first, full-bleed CSS envelope. No envelope image — the closed
 * envelope is composed from four textured CSS flaps with soft rounded corners,
 * a transparent floral wax-seal sticker pinned at their meeting point, and the
 * invitation already sitting underneath.
 *
 * Opening sequence (on seal tap):
 *   Phase 1 — the wax seal fades out smoothly (~1.5s).
 *   Phase 2 — the four flaps slide apart simultaneously (~2.5s, slow & pleasant),
 *             revealing the invitation card.
 *
 * Phases: "sealed" -> "opening" -> "open".
 */
export default function Envelope({ copy, onSealTap }) {
  const [phase, setPhase] = useState("sealed");

  const stageRef = useRef(null);
  const flapsRef = useRef({});
  const sealRef = useRef(null);
  const seamRef = useRef(null);
  const instructionRef = useRef(null);
  const cardRef = useRef(null);
  const tlRef = useRef(null);

  const setFlap = (key) => (el) => {
    if (el) flapsRef.current[key] = el;
  };

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const k = reduceMotion ? 0.001 : 1;

      const flaps = FLAPS.map((f) => flapsRef.current[f.key]);

      // The invitation waits inside the closed envelope: centered & shrunk, so
      // it appears to grow OUT of the envelope as the flaps recede.
      gsap.set(cardRef.current, {
        scale: CARD_START_SCALE,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => setPhase("open"),
      });

      // Phase 1 — wax seal fades out (and the instruction gently with it).
      tl.to(
        sealRef.current,
        { autoAlpha: 0, duration: ANIMATION.sealFade * k, ease: "power1.inOut" },
        0
      ).to(
        [instructionRef.current, seamRef.current],
        { autoAlpha: 0, duration: ANIMATION.sealFade * 0.8 * k, ease: "power1.inOut" },
        0
      );

      const openAt = ANIMATION.sealFade * k; // start the reveal after the fade

      // Phase 2a — the four flaps recede outward (top up, bottom down, sides out).
      FLAPS.forEach((f, i) => {
        tl.to(
          flaps[i],
          { ...f.open, duration: ANIMATION.flapOpen * k, ease: "power2.inOut" },
          openAt
        );
      });

      // Phase 2b — in sync, the invitation grows from the center to full screen.
      tl.to(
        cardRef.current,
        { scale: 1, duration: ANIMATION.flapOpen * k, ease: "power2.out" },
        openAt
      );

      tlRef.current = tl;
      // useGSAP reverts this context (kills the timeline + tweens) on unmount.
    },
    { scope: stageRef }
  );

  const handleOpen = () => {
    if (phase !== "sealed") return;
    setPhase("opening");
    onSealTap?.(); // start the music on this user gesture
    tlRef.current?.play();
  };

  const e = copy.envelope;
  const texVar = { "--tex": `url(${ASSETS.envelopeTexture})` };

  return (
    <div ref={stageRef} className="stage-locked texture-bg" style={texVar}>
      {/* Per-flap rounded-triangle clip paths (objectBoundingBox space). */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          {FLAPS.map((f) => (
            <clipPath
              key={f.key}
              id={`flap-${f.key}`}
              clipPathUnits="objectBoundingBox"
            >
              <path d={roundedTriangle(f.pts, FLAP_CORNER)} />
            </clipPath>
          ))}
        </defs>
      </svg>

      {/* ===== Invitation card — grows out of the envelope as flaps recede ===== */}
      <div ref={cardRef} className="absolute inset-0 z-0" style={{ willChange: "transform" }}>
        <InvitationCard copy={copy} />
      </div>

      {/* ===== Four CSS envelope flaps (closed cover) ===== */}
      {FLAPS.map((f) => (
        <div
          key={f.key}
          ref={setFlap(f.key)}
          className="flap texture-bg"
          aria-hidden="true"
          style={{
            ...texVar,
            zIndex: FLAP_Z[f.key],
            clipPath: `url(#flap-${f.key})`,
            WebkitClipPath: `url(#flap-${f.key})`,
          }}
        />
      ))}

      {/* ===== Delicate fold seams (4 diagonals -> center) + soft vignette ===== */}
      <div ref={seamRef} className="seam-overlay z-[15]" aria-hidden="true">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <g
            fill="none"
            stroke="rgba(150, 120, 80, 0.16)"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          >
            <line x1="0" y1="0" x2="50" y2="50" />
            <line x1="100" y1="0" x2="50" y2="50" />
            <line x1="100" y1="100" x2="50" y2="50" />
            <line x1="0" y1="100" x2="50" y2="50" />
          </g>
          {/* hairline highlight just beside each seam for a crisp folded edge */}
          <g
            fill="none"
            stroke="rgba(255, 255, 255, 0.55)"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          >
            <line x1="0.6" y1="0" x2="50" y2="49.4" />
            <line x1="99.4" y1="0" x2="50" y2="49.4" />
            <line x1="100" y1="99.4" x2="50.6" y2="50" />
            <line x1="0" y1="99.4" x2="49.4" y2="50" />
          </g>
        </svg>
      </div>

      {/* ===== Wax-seal sticker + instruction (centered, like the reference) ===== */}
      <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center">
        <div className="flex flex-col items-center">
          <button
            ref={sealRef}
            type="button"
            onClick={handleOpen}
            disabled={phase !== "sealed"}
            aria-label={e.ariaSeal}
            className="pointer-events-auto relative grid place-items-center rounded-full outline-none transition-transform duration-200 active:scale-95 focus-visible:ring-4 focus-visible:ring-gold/40 disabled:pointer-events-none"
            style={{
              width: `${SEAL_SIZE_VMIN}vmin`,
              height: `${SEAL_SIZE_VMIN}vmin`,
              willChange: "transform, opacity",
            }}
          >
            <img
              src={ASSETS.sealImg}
              alt=""
              draggable="false"
              className="h-full w-full select-none object-contain drop-shadow-[0_5px_12px_rgba(120,90,50,0.3)]"
            />
            <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-gold/25 motion-safe:animate-ping" />
          </button>

          {e.instruction && (
            <p
              ref={instructionRef}
              dir={copy.meta.dir}
              className="mt-5 font-display text-2xl font-normal tracking-wide text-ink/70"
            >
              {e.instruction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

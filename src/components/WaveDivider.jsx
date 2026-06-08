/**
 * Elegant section divider — a soft double-wave SVG that transitions
 * from the cream DateSection above into the blue CountdownSection below.
 * No deps, no animation needed — pure decorative SVG.
 */
export default function WaveDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        background: "rgb(246, 245, 240)", /* matches DateSection above */
        lineHeight: 0,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 375 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "clamp(48px, 13vw, 88px)" }}
      >
        {/* Back wave — slightly lighter blue, gives depth */}
        <path
          d="M0,40 C60,65 120,18 187,42 C254,66 310,20 375,44 L375,80 L0,80 Z"
          fill="rgba(217,234,245,0.45)"
        />
        {/* Front wave — solid blue, the actual section color */}
        <path
          d="M0,54 C50,32 110,70 187,52 C264,34 320,68 375,50 L375,80 L0,80 Z"
          fill="rgb(217,234,245)"
        />

        {/* Central ornament — three dots on the wave crest */}
        <g fill="rgb(123,174,199)" opacity="0.7">
          <circle cx="187" cy="50" r="3.2" />
          <circle cx="174" cy="53" r="2" />
          <circle cx="200" cy="53" r="2" />
        </g>
      </svg>
    </div>
  );
}

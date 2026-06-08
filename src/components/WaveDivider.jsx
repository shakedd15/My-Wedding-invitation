/**
 * Elegant double-wave section divider.
 *
 * Props:
 *  from  — background colour of the section ABOVE  (default: cream)
 *  to    — background colour of the section BELOW  (default: blue)
 *  flip  — mirror vertically so waves face the other direction (default: false)
 */
export default function WaveDivider({
  from = "rgb(246, 245, 240)",
  to   = "rgb(217, 234, 245)",
  flip = false,
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        background: from,
        lineHeight: 0,
        overflow: "hidden",
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 375 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "clamp(24px, 6vw, 42px)" }}
      >
        {/* Back wave — semi-transparent "to" colour for depth */}
        <path
          d="M0,40 C60,65 120,18 187,42 C254,66 310,20 375,44 L375,80 L0,80 Z"
          fill={to}
          opacity="0.4"
        />
        {/* Front wave — solid "to" colour */}
        <path
          d="M0,54 C50,32 110,70 187,52 C264,34 320,68 375,50 L375,80 L0,80 Z"
          fill={to}
        />

        {/* Central ornament — three dots on the wave crest */}
        <g fill="rgb(123,174,199)" opacity="0.65">
          <circle cx="187" cy="50" r="3.2" />
          <circle cx="174" cy="53" r="2" />
          <circle cx="200" cy="53" r="2" />
        </g>
      </svg>
    </div>
  );
}

import "./BrandMark.css";

/**
 * The signature visual for the site — traced from the actual MoveEase
 * logo geometry (two-face open box + two flap strokes + a speed-line
 * fan trailing off the right edge, echoing the logo's "E" motif).
 * The logo itself is a single flat color (no internal color split),
 * so this mark uses one stroke color too — accuracy over embellishment.
 */
export default function BrandMark({ variant = "light", animate = true, size = 360 }) {
  const stroke = variant === "light" ? "#FBF3E7" : "#1C1410";

  // Speed-line fan: traced from the logo — lines start at the box's
  // right edge (x=266) and fan out to the right, pinching near the
  // vertical midpoint (y~187) the way the real mark does.


const lineCount = 9;

const widths = [9, 3, 3, 3, 9, 3, 3, 3, 9];

const speedLines = Array.from({ length: lineCount }).map((_, i) => {
  const center = (lineCount - 1) / 2;

  // 0 = center, 1 = outer edges
  const distanceFromCenter = Math.abs(i - center) / center;

  // Length changes but angle stays identical
  const length = 70 + distanceFromCenter * 70;

  const startX = 270;
  const startY = 98 + i * 22;

  // Fixed angle for all lines
  const angleX = 1;
  const angleY = -0.5;

  const endX = startX + length * angleX;
  const endY = startY + length * angleY;

  return (
    <line
      key={i}
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      strokeWidth={widths[i]}
      className="brandmark-speedline"
      style={{
        animationDelay: `${0.85 + i * 0.04}s`,
      }}
    />
  );
});

  return (
    <svg
      className={`brandmark ${animate ? "brandmark-animate" : ""}`}
      width={size}
      height={size * (360 / 420)}
      viewBox="0 0 420 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MoveEase box mark"
    >
      {/* left face */}
      <path
        className="brandmark-stroke brandmark-left"
        d="M21 98 L19 265 "
        stroke={stroke}
        strokeWidth="9"
        strokeLinejoin="round"
      />
      {/* top line of the box — left face's missing top edge */}
      <path
        className="brandmark-stroke brandmark-flap"
        d="M142 150 L28 95"
        stroke={stroke}
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* right face */}
      <path
        className="brandmark-stroke brandmark-right"
        d="M266 95 L266 278 L145 323 L142 150 Z"
        stroke={stroke}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Left bottom edge */}
      <path
        className="brandmark-stroke brandmark-bottom-left"
        d="M19 265 L145 323"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="brandmark-stroke brandmark-divider"
        d="M266 99 L266 276"
        stroke={stroke}
        strokeWidth="9"   // Try 12–15 depending on the look you want
        strokeLinecap="round"
      />
      <path
        className="brandmark-stroke brandmark-top"
        d="M142 150 L266 97"
        stroke={stroke}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* open-flap strokes above the left face */}
      <path
        className="brandmark-stroke brandmark-flap"
        d="M28 95 L128 40"
        stroke={stroke}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        className="brandmark-stroke brandmark-flap"
        d="M95 122 L135 98"
        stroke={stroke}
        strokeWidth="9"
        strokeLinecap="round"
      />

      <g className="brandmark-speedlines" stroke={stroke}>
        {speedLines}
      </g>
    </svg>
  );
}
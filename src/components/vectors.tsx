/**
 * Inline SVG decoration. Vectors rather than images so they stay crisp at any
 * size, theme with currentColor, and cost no network request.
 * All are decorative and hidden from assistive technology.
 */

export function OrbitRings({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="orbit-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#60a5fa" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <circle cx="300" cy="300" r="120" fill="url(#orbit-core)" />

      {[
        { rx: 250, ry: 96, rot: -18 },
        { rx: 210, ry: 150, rot: 24 },
        { rx: 275, ry: 200, rot: 68 },
      ].map((o, i) => (
        <ellipse
          key={i}
          cx="300"
          cy="300"
          rx={o.rx}
          ry={o.ry}
          transform={`rotate(${o.rot} 300 300)`}
          stroke="url(#orbit-stroke)"
          strokeWidth={i === 0 ? 1.6 : 1}
          fill="none"
        />
      ))}

      {/* Bodies riding the orbits */}
      <circle cx="300" cy="300" r="34" fill="#0b1220" stroke="#3b82f6" strokeWidth="1.2" />
      <circle cx="300" cy="300" r="34" fill="url(#orbit-core)" />
      <circle cx="537" cy="222" r="5" fill="#60a5fa" />
      <circle cx="126" cy="392" r="3.5" fill="#a855f7" />
      <circle cx="392" cy="118" r="2.8" fill="#e2e8f0" />
    </svg>
  );
}

/** Constellation joining the career waypoints — used behind the timeline. */
export function Constellation({ className = "" }: { className?: string }) {
  const points = [
    [30, 150],
    [120, 96],
    [210, 132],
    [300, 68],
    [390, 110],
    [470, 54],
  ];
  const path = points.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");

  return (
    <svg
      viewBox="0 0 500 200"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.45" />
      {points.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill="#3b82f6" opacity="0.08" />
          <circle cx={x} cy={y} r="2.6" fill="#93c5fd" />
        </g>
      ))}
    </svg>
  );
}

/** Thin grid horizon that anchors the hero, like a nav display. */
export function GridHorizon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 300"
      className={className}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {Array.from({ length: 21 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={600 + (i - 10) * 30}
          y1="300"
          x2={600 + (i - 10) * 220}
          y2="0"
          stroke="url(#grid-fade)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 8 }, (_, i) => {
        const y = 300 - Math.pow(i / 7, 2) * 300;
        return (
          <line
            key={`h${i}`}
            x1="0"
            y1={y}
            x2="1200"
            y2={y}
            stroke="url(#grid-fade)"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

/** Satellite glyph used as a section marker. */
export function SatelliteMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="20" y="18" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="19" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="31" y="19" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 19v10M12.5 19v10M35 19v10M39.5 19v10" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
      <path d="M24 18v-6M24 30v6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="24" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Signal arc, marking the contact section. */
export function SignalArc({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="24" cy="34" r="3" fill="currentColor" />
      <path d="M16 28a11 11 0 0 1 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10.5 22a19 19 0 0 1 27 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d="M5 16a27 27 0 0 1 38 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

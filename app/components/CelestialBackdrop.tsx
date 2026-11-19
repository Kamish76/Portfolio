import CelestialScrollSync from "./CelestialScrollSync";

interface FarDot {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  opacity: number;
}

interface DiagStreak {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  opacity: number;
  headDot?: boolean;
}

interface GraphicStar {
  x: number;
  y: number;
  size: number;
  fill: string;
  kind: "4pt" | "5pt";
  delay: string;
  duration: string;
}

interface MiniOrb {
  cx: number;
  cy: number;
  r: number;
  base: string;
  lit: string;
  shadow: string;
}

const DOT_COLORS = [
  "#ffffff",
  "#ffffff",
  "#cfeaff",
  "#7ec4ff",
  "#ffe5a8",
  "#f69a74",
  "#f27482",
] as const;

function createPrng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function r1(n: number): number {
  return Math.round(n * 10) / 10;
}

function buildFarDots(): FarDot[] {
  const rand = createPrng(774129);
  const dots: FarDot[] = [];
  for (let i = 0; i < 185; i++) {
    const u = rand();
    dots.push({
      cx: r1(rand() * 1440),
      cy: r1(rand() * 1350),
      r: r1(0.8 + u * u * 2.1),
      fill: DOT_COLORS[Math.floor(rand() * DOT_COLORS.length)],
      opacity: r1(0.32 + rand() * 0.65),
    });
  }
  return dots;
}

function buildFarStreaks(): DiagStreak[] {
  const rand = createPrng(991042);
  const colors = ["#264b82", "#3a6bb0", "#66aaff", "#f09464", "#ffe4a8", "#ffffff"];
  const streaks: DiagStreak[] = [];
  for (let i = 0; i < 34; i++) {
    streaks.push({
      x: r1(rand() * 1440),
      y: r1(rand() * 1350),
      w: r1(48 + rand() * 175),
      h: r1(1.4 + rand() * 2.4),
      fill: colors[Math.floor(rand() * colors.length)],
      opacity: r1(0.2 + rand() * 0.42),
      headDot: rand() > 0.55,
    });
  }
  return streaks;
}

function buildMidStreaks(): DiagStreak[] {
  const rand = createPrng(314159);
  const colors = ["#ffffff", "#a8dcff", "#ffd685", "#f28564", "#e85d75", "#4c80c4"];
  const streaks: DiagStreak[] = [];
  for (let i = 0; i < 42; i++) {
    streaks.push({
      x: r1(rand() * 1440),
      y: r1(rand() * 2025),
      w: r1(42 + rand() * 210),
      h: r1(1.8 + rand() * 3.4),
      fill: colors[Math.floor(rand() * colors.length)],
      opacity: r1(0.34 + rand() * 0.52),
      headDot: rand() > 0.4,
    });
  }
  return streaks;
}

const FAR_DOTS = buildFarDots();
const FAR_STREAKS = buildFarStreaks();
const MID_STREAKS = buildMidStreaks();

const MID_MINI_ORBS: MiniOrb[] = [
  { cx: 520, cy: 195, r: 15, base: "#e86472", lit: "#ffd5a8", shadow: "#6c2142" },
  { cx: 880, cy: 260, r: 11, base: "#5ab8f5", lit: "#e6f7ff", shadow: "#1b4582" },
  { cx: 1355, cy: 485, r: 19, base: "#f08a58", lit: "#fff0c4", shadow: "#7c2c38" },
  { cx: 290, cy: 645, r: 13, base: "#66aaff", lit: "#dff3ff", shadow: "#1d3d78" },
  { cx: 1095, cy: 760, r: 16, base: "#f26f7a", lit: "#ffe2bc", shadow: "#662040" },
  { cx: 430, cy: 1090, r: 18, base: "#f5b064", lit: "#fff6dc", shadow: "#7e3326" },
  { cx: 945, cy: 1295, r: 12, base: "#54b8f2", lit: "#e0f5ff", shadow: "#173c73" },
  { cx: 215, cy: 1460, r: 21, base: "#e66270", lit: "#ffd4a8", shadow: "#581b3d" },
  { cx: 1185, cy: 1640, r: 15, base: "#f2a458", lit: "#fff2c6", shadow: "#6e2a28" },
  { cx: 685, cy: 1850, r: 14, base: "#66aaff", lit: "#e6f6ff", shadow: "#1d3d78" },
];

const GRAPHIC_STARS: GraphicStar[] = [
  // Hero zone (y: 0..850)
  { x: 640, y: 120, size: 15, fill: "#fff5d6", kind: "4pt", delay: "0.2s", duration: "4.8s" },
  { x: 1030, y: 95, size: 11, fill: "#ffd685", kind: "5pt", delay: "1.4s", duration: "5.6s" },
  { x: 76, y: 118, size: 12, fill: "#ffd685", kind: "5pt", delay: "0.7s", duration: "5.2s" },
  { x: 912, y: 318, size: 18, fill: "#ffffff", kind: "4pt", delay: "2.1s", duration: "4.6s" },
  { x: 1368, y: 365, size: 12, fill: "#7cc4ff", kind: "5pt", delay: "1.1s", duration: "6.0s" },
  { x: 385, y: 690, size: 14, fill: "#f48868", kind: "5pt", delay: "2.8s", duration: "5.4s" },
  // Projects zone (y: 850..1650)
  { x: 1140, y: 890, size: 16, fill: "#fff6dc", kind: "4pt", delay: "0.5s", duration: "4.9s" },
  { x: 265, y: 1165, size: 13, fill: "#ffd685", kind: "5pt", delay: "1.9s", duration: "5.8s" },
  { x: 1045, y: 1350, size: 14, fill: "#7cc4ff", kind: "5pt", delay: "3.1s", duration: "5.1s" },
  { x: 735, y: 1430, size: 20, fill: "#fff5d6", kind: "4pt", delay: "0.9s", duration: "4.7s" },
  { x: 135, y: 1520, size: 11, fill: "#f26f7a", kind: "5pt", delay: "2.4s", duration: "6.2s" },
  // Journey & Stack zone (y: 1650..2550)
  { x: 1165, y: 1790, size: 17, fill: "#ffffff", kind: "4pt", delay: "1.2s", duration: "5.0s" },
  { x: 325, y: 2035, size: 14, fill: "#ffd685", kind: "5pt", delay: "2.6s", duration: "5.5s" },
  { x: 965, y: 2150, size: 15, fill: "#7cc4ff", kind: "4pt", delay: "0.4s", duration: "4.8s" },
  { x: 145, y: 2320, size: 13, fill: "#f28564", kind: "5pt", delay: "1.8s", duration: "5.9s" },
  { x: 1085, y: 2445, size: 16, fill: "#fff4d2", kind: "4pt", delay: "0.8s", duration: "5.2s" },
];

/** Crisp stylized 4-tier cel-shaded cumulus cloud ribbon drawn in local horizontal coords, rotated diagonally */
function DiagonalCloudBand({
  x,
  y,
  scale = 1,
  angle = -38,
  warmId,
}: {
  x: number;
  y: number;
  scale?: number;
  angle?: number;
  warmId: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      {/* Tier 1: Deep cobalt cloud shadow + sheared horizontal speed bars */}
      <g fill="#162e58">
        <rect x="-720" y="14" width="1440" height="46" rx="23" />
        <rect x="-860" y="34" width="380" height="16" rx="8" />
        <rect x="440" y="28" width="440" height="14" rx="7" />
        <rect x="-640" y="68" width="520" height="10" rx="5" opacity="0.85" />
        <rect x="60" y="64" width="620" height="12" rx="6" opacity="0.85" />
        <circle cx="-480" cy="18" r="42" />
        <circle cx="-360" cy="10" r="56" />
        <circle cx="-225" cy="16" r="46" />
        <circle cx="-95" cy="6" r="64" />
        <circle cx="52" cy="12" r="54" />
        <circle cx="198" cy="4" r="62" />
        <circle cx="348" cy="14" r="48" />
        <circle cx="485" cy="18" r="40" />
      </g>

      {/* Tier 2: Steel-indigo mid-cloud billows + razor-sharp trailing streaks */}
      <g fill="#2e568e">
        <rect x="-620" y="-2" width="1240" height="36" rx="18" />
        <rect x="-790" y="10" width="310" height="10" rx="5" />
        <rect x="460" y="8" width="360" height="10" rx="5" />
        <rect x="-510" y="42" width="410" height="7" rx="3.5" />
        <rect x="120" y="40" width="480" height="8" rx="4" />
        <circle cx="-420" cy="2" r="34" />
        <circle cx="-305" cy="-10" r="46" />
        <circle cx="-185" cy="-4" r="38" />
        <circle cx="-60" cy="-14" r="54" />
        <circle cx="76" cy="-8" r="46" />
        <circle cx="215" cy="-14" r="50" />
        <circle cx="352" cy="-4" r="38" />
        <circle cx="465" cy="4" r="30" />
      </g>

      {/* Tier 3: Warm coral-amber sunset cloud rim + sheared vapor trails */}
      <g fill={`url(#${warmId})`}>
        <rect x="-460" y="-14" width="960" height="24" rx="12" />
        <rect x="-680" y="-6" width="290" height="7" rx="3.5" />
        <rect x="380" y="-8" width="340" height="8" rx="4" />
        <rect x="-540" y="14" width="240" height="5" rx="2.5" opacity="0.88" />
        <rect x="260" y="16" width="310" height="5.5" rx="2.75" opacity="0.88" />
        <circle cx="-310" cy="-16" r="28" />
        <circle cx="-215" cy="-24" r="36" />
        <circle cx="-118" cy="-18" r="30" />
        <circle cx="-18" cy="-28" r="46" />
        <circle cx="96" cy="-22" r="38" />
        <circle cx="204" cy="-26" r="40" />
        <circle cx="315" cy="-16" r="28" />
        <circle cx="404" cy="-10" r="22" />
      </g>

      {/* Tier 4: Luminous cream-gold sunlit cumulus crests + bright kinetic slivers */}
      <g fill="#ffefc7">
        <rect x="-260" y="-22" width="540" height="14" rx="7" />
        <rect x="-480" y="-17" width="185" height="4.5" rx="2.25" opacity="0.92" />
        <rect x="310" y="-18" width="210" height="5" rx="2.5" opacity="0.92" />
        <circle cx="-185" cy="-28" r="22" />
        <circle cx="-108" cy="-24" r="18" />
        <circle cx="-12" cy="-36" r="32" />
        <circle cx="72" cy="-30" r="26" />
        <circle cx="164" cy="-32" r="26" />
        <circle cx="246" cy="-22" r="18" />
        {/* Crisp incandescent white-cream highlight caps */}
        <circle cx="-18" cy="-42" r="18" fill="#fff9ea" />
        <circle cx="158" cy="-37" r="14" fill="#fff9ea" />
        <circle cx="-188" cy="-33" r="11" fill="#fff9ea" />
      </g>

      {/* Detached crisp wind-sheared vapor slivers & star beads */}
      <g>
        <rect x="-760" y="-32" width="110" height="3.2" rx="1.6" fill="#7cc4ff" opacity="0.72" />
        <rect x="-560" y="-44" width="145" height="3.5" rx="1.75" fill="#ffd685" opacity="0.78" />
        <rect x="285" y="-46" width="175" height="3.8" rx="1.9" fill="#fff2cc" opacity="0.82" />
        <rect x="520" y="-28" width="130" height="3" rx="1.5" fill="#f28564" opacity="0.76" />
        <circle cx="-630" cy="-30.4" r="3" fill="#a8dcff" />
        <circle cx="480" cy="-44" r="3.4" fill="#fff6dc" />
        <circle cx="672" cy="-26.5" r="2.8" fill="#ffd685" />
      </g>
    </g>
  );
}

function FivePointStar({ size, fill }: { size: number; fill: string }) {
  const outer = size;
  const inner = size * 0.44;
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = ((i * 36 - 90) * Math.PI) / 180;
    const dist = i % 2 === 0 ? outer : inner;
    pts.push(`${r1(Math.cos(rad) * dist)},${r1(Math.sin(rad) * dist)}`);
  }
  return <polygon points={pts.join(" ")} fill={fill} />;
}

export default function CelestialBackdrop() {
  return (
    <div className="celestial-bg" aria-hidden="true">
      <CelestialScrollSync />

      {/* PLANE 1 (FAR — 150vh, slow 0 -> -50vh scroll parallax): Deep stars, distant diagonal streaks */}
      <div className="celestial-plane celestial-plane-far">
        <svg
          className="celestial-plane-svg"
          viewBox="0 0 1440 1350"
          preserveAspectRatio="xMidYMin slice"
          focusable="false"
        >
          <defs>
            <linearGradient id="cp-far-band" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0e244a" stopOpacity="0" />
              <stop offset="50%" stopColor="#1b3f75" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#0e244a" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Subtle diagonal deep-cobalt atmospheric bands */}
          <g transform="translate(720 420) rotate(-38)">
            <rect x="-1100" y="-140" width="2200" height="280" rx="140" fill="url(#cp-far-band)" />
          </g>
          <g transform="translate(780 1020) rotate(-38)">
            <rect x="-1100" y="-120" width="2200" height="240" rx="120" fill="url(#cp-far-band)" opacity="0.85" />
          </g>

          {/* Distant diagonal kinetic speed-lines */}
          {FAR_STREAKS.map((st, idx) => (
            <g
              key={`fs-${idx}`}
              transform={`translate(${st.x} ${st.y}) rotate(-38)`}
              opacity={st.opacity}
            >
              <rect x={0} y={-st.h / 2} width={st.w} height={st.h} rx={st.h / 2} fill={st.fill} />
              {st.headDot && (
                <circle cx={st.w + 8} cy={0} r={r1(st.h * 0.85)} fill={st.fill} />
              )}
            </g>
          ))}

          {/* Deep-field crisp stylized star dots */}
          {FAR_DOTS.map((d, idx) => (
            <circle
              key={`fd-${idx}`}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill={d.fill}
              fillOpacity={d.opacity}
            />
          ))}
        </svg>
      </div>

      {/* PLANE 2 (MID — 225vh, medium 0 -> -125vh scroll parallax): Stylized diagonal cel-shaded cloud highways, streaks & mini-orbs */}
      <div className="celestial-plane celestial-plane-mid">
        <svg
          className="celestial-plane-svg"
          viewBox="0 0 1440 2025"
          preserveAspectRatio="xMidYMin slice"
          focusable="false"
        >
          <defs>
            <linearGradient id="cp-cloud-warm" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d95d62" />
              <stop offset="48%" stopColor="#f08956" />
              <stop offset="100%" stopColor="#ffc96e" />
            </linearGradient>
            <linearGradient id="cp-cloud-cool" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3578c8" />
              <stop offset="52%" stopColor="#66aaff" />
              <stop offset="100%" stopColor="#ffd685" />
            </linearGradient>
          </defs>

          {/* Diagonal mid-ground kinetic streaks */}
          {MID_STREAKS.map((st, idx) => (
            <g
              key={`ms-${idx}`}
              transform={`translate(${st.x} ${st.y}) rotate(-38)`}
              opacity={st.opacity}
            >
              <rect x={0} y={-st.h / 2} width={st.w} height={st.h} rx={st.h / 2} fill={st.fill} />
              {st.headDot && (
                <circle cx={st.w + 10} cy={0} r={r1(st.h * 0.9)} fill={st.fill} />
              )}
            </g>
          ))}

          {/* Cloud Highway 1: Sweeping upper-right cel-shaded nebula band (Hero & Top Projects) */}
          <DiagonalCloudBand x={1150} y={365} scale={0.96} warmId="cp-cloud-warm" />

          {/* Cloud Highway 2: Grand diagonal sunset-gold & cobalt cumulus band (Projects & Journey) */}
          <DiagonalCloudBand x={740} y={1145} scale={1.18} warmId="cp-cloud-warm" />

          {/* Cloud Highway 3: Lower celestial sapphire-to-gold cloud bank (Stack & Contact) */}
          <DiagonalCloudBand x={620} y={1790} scale={1.06} warmId="cp-cloud-cool" />

          {/* Stylized cel-shaded mini-planets & moons */}
          {MID_MINI_ORBS.map((orb, idx) => (
            <g key={`mo-${idx}`} transform={`translate(${orb.cx} ${orb.cy})`}>
              <circle r={orb.r} fill={orb.base} />
              {/* Flat cel-shaded shadow crescent */}
              <path
                d={`M${r1(-orb.r * 0.55)} ${r1(orb.r * 0.83)} A${orb.r} ${orb.r} 0 0 0 ${r1(orb.r * 0.83)} ${r1(-orb.r * 0.55)} A${r1(orb.r * 0.85)} ${r1(orb.r * 0.85)} 0 0 1 ${r1(-orb.r * 0.55)} ${r1(orb.r * 0.83)} Z`}
                fill={orb.shadow}
                fillOpacity="0.62"
              />
              {/* Crisp specular circle highlight */}
              <circle
                cx={r1(-orb.r * 0.32)}
                cy={r1(-orb.r * 0.32)}
                r={r1(orb.r * 0.28)}
                fill={orb.lit}
                fillOpacity="0.88"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* PLANE 3 (NEAR — 300vh, bold 0 -> -200vh foreground scroll parallax): Hero stylized planets, ringed worlds, warp-comet, spiral galaxy & comic stars */}
      <div className="celestial-plane celestial-plane-near">
        <svg
          className="celestial-plane-svg"
          viewBox="0 0 1440 2700"
          preserveAspectRatio="xMidYMin slice"
          focusable="false"
        >
          <defs>
            <linearGradient id="cp-coral-planet" x1="20%" y1="15%" x2="85%" y2="85%">
              <stop offset="0%" stopColor="#ffb370" />
              <stop offset="48%" stopColor="#ee5e73" />
              <stop offset="100%" stopColor="#6b2149" />
            </linearGradient>

            <linearGradient id="cp-ice-moon" x1="15%" y1="15%" x2="85%" y2="85%">
              <stop offset="0%" stopColor="#e6f5fc" />
              <stop offset="65%" stopColor="#94bdd9" />
              <stop offset="100%" stopColor="#3e628c" />
            </linearGradient>

            <linearGradient id="cp-terra-ocean" x1="20%" y1="15%" x2="85%" y2="85%">
              <stop offset="0%" stopColor="#5cc8ff" />
              <stop offset="55%" stopColor="#267ad1" />
              <stop offset="100%" stopColor="#123066" />
            </linearGradient>

            <linearGradient id="cp-amber-world" x1="15%" y1="15%" x2="85%" y2="85%">
              <stop offset="0%" stopColor="#ffe194" />
              <stop offset="50%" stopColor="#ee8446" />
              <stop offset="100%" stopColor="#7a2a36" />
            </linearGradient>

            <linearGradient id="cp-horizon-moon" x1="18%" y1="15%" x2="85%" y2="88%">
              <stop offset="0%" stopColor="#fff9e8" />
              <stop offset="58%" stopColor="#e8f0f8" />
              <stop offset="100%" stopColor="#7094bf" />
            </linearGradient>

            <linearGradient id="cp-warp-beam" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="45%" stopColor="#66d4ff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            <clipPath id="cp-clip-coral">
              <circle cx="0" cy="0" r="66" />
            </clipPath>
            <clipPath id="cp-clip-ice">
              <circle cx="0" cy="0" r="44" />
            </clipPath>
            <clipPath id="cp-clip-terra">
              <circle cx="0" cy="0" r="94" />
            </clipPath>
            <clipPath id="cp-clip-amber">
              <circle cx="0" cy="0" r="56" />
            </clipPath>
            <clipPath id="cp-clip-nebworld">
              <circle cx="0" cy="0" r="62" />
            </clipPath>
            <clipPath id="cp-clip-horizon">
              <circle cx="0" cy="0" r="116" />
            </clipPath>
          </defs>

          {/* 1. HERO UPPER-RIGHT: Ringed Coral-Amber Gas Giant */}
          <g transform="translate(1205 182)">
            {/* Back ring arcs */}
            <g transform="rotate(-28)" fill="none">
              <path d="M-112 0 A112 28 0 0 1 112 0" stroke="#ffd685" strokeWidth="4" strokeOpacity="0.72" />
              <path d="M-128 0 A128 36 0 0 1 128 0" stroke="#66aaff" strokeWidth="1.8" strokeOpacity="0.58" />
            </g>
            {/* Planet body */}
            <circle r="66" fill="url(#cp-coral-planet)" />
            <g clipPath="url(#cp-clip-coral)">
              <path d="M-75 -16 Q0 -4 75 -26 L75 -8 Q0 14 -75 2 Z" fill="#ffcf96" fillOpacity="0.28" />
              <path d="M-75 22 Q10 38 75 10 L75 34 Q10 56 -75 40 Z" fill="#5e1b44" fillOpacity="0.45" />
              <circle cx="24" cy="22" r="62" fill="#2b1236" fillOpacity="0.34" />
              <circle cx="-22" cy="-24" r="17" fill="#fff7e2" />
              <circle cx="14" cy="-34" r="6" fill="#ffdfba" fillOpacity="0.75" />
            </g>
            {/* Front ring arcs wrapping cleanly in front of planet */}
            <g transform="rotate(-28)" fill="none">
              <path d="M-112 0 A112 28 0 0 0 112 0" stroke="#ffe5a3" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M-128 0 A128 36 0 0 0 128 0" stroke="#7cc4ff" strokeWidth="2" strokeDasharray="48 16 80 12" strokeLinecap="round" />
            </g>
          </g>

          {/* 2. HERO UPPER-LEFT: Pale Ice-Blue & Peach Crescent Moon */}
          <g transform="translate(126 196)">
            <ellipse
              cx="0"
              cy="0"
              rx="68"
              ry="20"
              transform="rotate(-24)"
              fill="none"
              stroke="#7cc4ff"
              strokeWidth="1.4"
              strokeOpacity="0.5"
              strokeDasharray="110 22 45 18"
            />
            <circle r="44" fill="url(#cp-ice-moon)" />
            <g clipPath="url(#cp-clip-ice)">
              <path
                d="M-36 -8 C-16 -26 24 -14 20 12 C16 32 -14 38 -32 24 C-44 14 -46 2 -36 -8 Z"
                fill="#f28860"
              />
              <circle cx="-6" cy="-4" r="16" fill="#d8effa" />
              <circle cx="18" cy="18" r="38" fill="#183159" fillOpacity="0.32" />
            </g>
            <circle cx="58" cy="-24" r="4.5" fill="#ffd685" />
          </g>

          {/* 3. HERO MID-RIGHT: Sleek Cyan Warp-Comet Swoosh (inspired by top-left concept motif) */}
          <g transform="translate(955 470) rotate(-38)">
            <ellipse cx="0" cy="0" rx="145" ry="30" fill="none" stroke="#1e5394" strokeWidth="4" strokeOpacity="0.65" />
            <ellipse cx="14" cy="0" rx="112" ry="20" fill="none" stroke="#4cc4ff" strokeWidth="2.4" strokeOpacity="0.78" strokeDasharray="140 24 90 18" />
            <polygon points="-130,0 -10,-9 112,0 -10,9" fill="url(#cp-warp-beam)" />
            <polygon points="-38,0 24,-4 96,0 24,4" fill="#ffffff" />
            {/* Sleek triangular cyan tail fin & starburst flash */}
            <polygon points="88,-16 126,-2 94,14 102,0" fill="#a8ebff" />
            <polygon points="-68,-20 -64,-3 -46,0 -64,3 -68,20 -72,3 -90,0 -72,-3" fill="#fff6d8" />
          </g>

          {/* 4. PROJECTS-LEFT: Tilted Coral-Gold Spiral Disc Galaxy */}
          <g transform="translate(148 935) rotate(36)">
            {/* Relativistic polar jet */}
            <rect x="-2" y="-128" width="4" height="256" rx="2" fill="#f2746b" opacity="0.72" />
            <rect x="-1" y="-85" width="2" height="170" rx="1" fill="#fff2cc" opacity="0.88" />
            {/* Concentric tilted flat galaxy rings */}
            <ellipse cx="0" cy="0" rx="96" ry="26" fill="#dc5a68" fillOpacity="0.86" />
            <ellipse cx="0" cy="0" rx="74" ry="19" fill="#f59862" />
            <ellipse cx="0" cy="0" rx="50" ry="12" fill="#ffe19e" />
            <ellipse cx="0" cy="0" rx="26" ry="6.5" fill="#fffaf0" />
            <ellipse cx="0" cy="0" rx="84" ry="22" fill="none" stroke="#5c1e44" strokeWidth="3" strokeDasharray="48 22 65 24" />
          </g>

          {/* 5. PROJECTS-RIGHT: Signature Turquoise Ocean & Coral-Cloud Terra World */}
          <g transform="translate(1258 1130)">
            <circle r="94" fill="url(#cp-terra-ocean)" />
            <g clipPath="url(#cp-clip-terra)">
              {/* Stylized swirling coral-peach & cream-gold cloud continents */}
              <path
                d="M-100 -42 C-55 -56 -12 -32 24 -44 C56 -54 78 -36 104 -18 L104 12 C68 2 44 18 10 8 C-26 -2 -62 18 -100 0 Z"
                fill="#f5956c"
              />
              <path
                d="M-86 38 C-40 16 14 48 56 26 C80 14 96 28 108 42 L108 78 C62 72 16 86 -36 74 C-68 66 -88 54 -86 38 Z"
                fill="#ffd085"
                fillOpacity="0.92"
              />
              <path
                d="M-52 -66 C-12 -82 36 -74 66 -54 C32 -52 -4 -44 -34 -48 Z"
                fill="#ffe9b8"
              />
              {/* Crisp curved cerulean cloud swirls */}
              <path
                d="M-64 12 C-24 22 18 6 58 20"
                fill="none"
                stroke="#8ae0ff"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Clean cel-shaded shadow crescent */}
              <path
                d="M-60 76 A94 94 0 0 0 76 -60 A82 82 0 0 1 -60 76 Z"
                fill="#0b1d45"
                fillOpacity="0.56"
              />
              {/* Specular highlight */}
              <circle cx="-36" cy="-38" r="18" fill="#fff9e8" fillOpacity="0.92" />
            </g>
            {/* Outer crisp orbital arc & tiny moon */}
            <path
              d="M-126 32 A132 42 -22 0 0 122 -36"
              fill="none"
              stroke="#ffd685"
              strokeWidth="2.2"
              strokeOpacity="0.72"
              strokeDasharray="64 18 96 18"
            />
            <circle cx="-116" cy="24" r="7" fill="#fff2cc" />
          </g>

          {/* 6. MID-PAGE LEFT: Supersonic White-Gold Stylized Comet Silhouette */}
          <g transform="translate(275 1475) rotate(-38)">
            <polygon points="-165,0 45,-7 148,0 45,7" fill="#fff7e2" />
            <polygon points="-75,-2 38,-14 76,0 38,14" fill="#ffffff" />
            <circle cx="-185" cy="0" r="4" fill="#ffd685" />
            <circle cx="-208" cy="4" r="2.5" fill="#7cc4ff" />
            <rect x="-125" y="-18" width="95" height="3" rx="1.5" fill="#7cc4ff" opacity="0.75" />
            <rect x="-95" y="16" width="120" height="3" rx="1.5" fill="#f28564" opacity="0.75" />
          </g>

          {/* 7. JOURNEY-LEFT: Sunset-Amber Ringed Planet & Cyan Satellite */}
          <g transform="translate(162 1835)">
            <g transform="rotate(-24)" fill="none">
              <path d="M-96 0 A96 24 0 0 1 96 0" stroke="#7cc4ff" strokeWidth="3" strokeOpacity="0.62" />
            </g>
            <circle r="56" fill="url(#cp-amber-world)" />
            <g clipPath="url(#cp-clip-amber)">
              <rect x="-66" y="-22" width="132" height="12" transform="rotate(-14)" fill="#fff0c4" fillOpacity="0.34" />
              <rect x="-66" y="10" width="132" height="15" transform="rotate(-14)" fill="#7a2434" fillOpacity="0.42" />
              <path d="M-34 46 A56 56 0 0 0 46 -34 A48 48 0 0 1 -34 46 Z" fill="#2b1024" fillOpacity="0.48" />
              <circle cx="-19" cy="-20" r="13" fill="#fff8e2" />
            </g>
            <g transform="rotate(-24)" fill="none">
              <path d="M-96 0 A96 24 0 0 0 96 0" stroke="#a8dcff" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            <circle cx="88" cy="-32" r="11" fill="#5cc8ff" />
            <circle cx="85" cy="-35" r="3.5" fill="#ffffff" />
          </g>

          {/* 8. STACK-RIGHT: Crimson-Cobalt Nebular Planet */}
          <g transform="translate(1272 2065)">
            <circle r="62" fill="#18346b" />
            <g clipPath="url(#cp-clip-nebworld)">
              <path
                d="M-72 -18 C-30 -44 20 -12 72 -32 L72 6 C22 24 -26 -8 -72 18 Z"
                fill="#e85d75"
              />
              <path
                d="M-72 28 C-24 12 24 44 72 18 L72 52 C24 68 -28 52 -72 48 Z"
                fill="#f5a45c"
              />
              <path
                d="M-40 50 A62 62 0 0 0 50 -40 A54 54 0 0 1 -40 50 Z"
                fill="#071129"
                fillOpacity="0.54"
              />
              <circle cx="-22" cy="-24" r="11" fill="#a8e2ff" fillOpacity="0.88" />
            </g>
          </g>

          {/* 9. CONTACT-HORIZON: Luminous Giant Cream-Gold Moon & Gliding White Comet */}
          <g transform="translate(1288 2385)">
            <circle r="116" fill="url(#cp-horizon-moon)" />
            <g clipPath="url(#cp-clip-horizon)">
              <path
                d="M-74 96 A116 116 0 0 0 96 -74 A104 104 0 0 1 -74 96 Z"
                fill="#203b6b"
                fillOpacity="0.34"
              />
              <circle cx="-38" cy="-42" r="24" fill="#ffffff" fillOpacity="0.72" />
              <circle cx="28" cy="-22" r="12" fill="#d4e2f0" fillOpacity="0.55" />
            </g>
          </g>
          <g transform="translate(1035 2275) rotate(-38)">
            <polygon points="-78,0 18,-6 74,0 18,6" fill="#ffffff" />
            <polygon points="-6,-18 16,0 -6,18 4,0" fill="#e6f4ff" />
          </g>

          {/* Foreground stylized 4-point & 5-point graphic stars */}
          {GRAPHIC_STARS.map((star, idx) => (
            <g key={`gs-${idx}`} transform={`translate(${star.x} ${star.y})`}>
              <g
                className="celestial-jewel"
                style={{
                  animationDelay: star.delay,
                  animationDuration: star.duration,
                }}
              >
                {star.kind === "5pt" ? (
                  <FivePointStar size={star.size} fill={star.fill} />
                ) : (
                  <path
                    d={`M0 ${-star.size} Q${r1(star.size * 0.14)} ${r1(-star.size * 0.14)} ${star.size} 0 Q${r1(star.size * 0.14)} ${r1(star.size * 0.14)} 0 ${star.size} Q${r1(-star.size * 0.14)} ${r1(star.size * 0.14)} ${-star.size} 0 Q${r1(-star.size * 0.14)} ${r1(-star.size * 0.14)} 0 ${-star.size} Z`}
                    fill={star.fill}
                  />
                )}
              </g>
            </g>
          ))}
        </svg>
      </div>

      {/* Live Subtle Shooting Stars aligned to the exact -38 deg kinetic axis */}
      <div className="celestial-comets">
        <span className="celestial-comet celestial-comet-1" />
        <span className="celestial-comet celestial-comet-2" />
      </div>

      {/* Light-touch contrast veil protecting hero copy while keeping vector art crisp & vivid */}
      <div className="celestial-veil" />
    </div>
  );
}

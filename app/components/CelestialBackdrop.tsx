interface FieldStar {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  opacity: number;
  group: 0 | 1 | 2;
}

interface JewelStar {
  id: string;
  x: number;
  y: number;
  size: number;
  tint: "gold" | "blue" | "magenta";
  delay: string;
  duration: string;
}

const STAR_PALETTE = [
  "#ffffff",
  "#ffffff",
  "#e6f4ff",
  "#bfe4ff",
  "#ffe8bd",
  "#ffd996",
  "#ffd8f0",
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

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function buildStarfield(): FieldStar[] {
  const rand = createPrng(20261119);
  const stars: FieldStar[] = [];

  // 145 deep-field stars scattered organically across the entire 1440x900 sky
  for (let i = 0; i < 145; i++) {
    const u = rand();
    const r = round1(0.45 + u * u * 1.15);
    stars.push({
      cx: round1(rand() * 1440),
      cy: round1(rand() * 900),
      r,
      fill: STAR_PALETTE[Math.floor(rand() * STAR_PALETTE.length)],
      opacity: round1(0.24 + rand() * 0.68),
      group: (i % 3) as 0 | 1 | 2,
    });
  }

  // 65 star-forming cluster pinpoints biased along the glowing nebula corridor
  const clusters: Array<[number, number, number, number]> = [
    [220, 140, 220, 140],
    [740, 480, 290, 210],
    [1040, 380, 260, 190],
    [1160, 140, 210, 120],
    [660, 740, 240, 150],
  ];
  for (let i = 0; i < 65; i++) {
    const [mx, my, sx, sy] = clusters[i % clusters.length];
    // Triangular distribution around cluster center (organic falloff, zero grid)
    const ox = (rand() - rand()) * sx;
    const oy = (rand() - rand()) * sy;
    const cx = round1(Math.min(1436, Math.max(4, mx + ox)));
    const cy = round1(Math.min(896, Math.max(4, my + oy)));
    const u = rand();
    stars.push({
      cx,
      cy,
      r: round1(0.5 + u * u * 1.25),
      fill: STAR_PALETTE[Math.floor(rand() * STAR_PALETTE.length)],
      opacity: round1(0.32 + rand() * 0.64),
      group: ((i + 1) % 3) as 0 | 1 | 2,
    });
  }

  return stars;
}

const FIELD_STARS = buildStarfield();
const STARS_STATIC = FIELD_STARS.filter((s) => s.group === 0);
const STARS_SHIMMER_A = FIELD_STARS.filter((s) => s.group === 1);
const STARS_SHIMMER_B = FIELD_STARS.filter((s) => s.group === 2);

const TINT_STYLE: Record<
  JewelStar["tint"],
  { spike: string; glowId: string }
> = {
  gold: { spike: "#fff3cf", glowId: "cb-glow-gold" },
  blue: { spike: "#d8f2ff", glowId: "cb-glow-blue" },
  magenta: { spike: "#ffd1ef", glowId: "cb-glow-mag" },
};

const JEWEL_STARS: JewelStar[] = [
  // Signature JWST rose-magenta jewels (mirroring space-bg.jpg)
  { id: "mag-1", x: 562, y: 628, size: 30, tint: "magenta", delay: "0.4s", duration: "6.4s" },
  { id: "mag-2", x: 1018, y: 418, size: 24, tint: "magenta", delay: "2.7s", duration: "7.2s" },
  { id: "mag-3", x: 1368, y: 734, size: 18, tint: "magenta", delay: "4.1s", duration: "5.8s" },
  // Warm amber-gold hero stars
  { id: "gold-1", x: 766, y: 124, size: 24, tint: "gold", delay: "1.1s", duration: "5.6s" },
  { id: "gold-2", x: 432, y: 238, size: 20, tint: "gold", delay: "3.2s", duration: "6.8s" },
  { id: "gold-3", x: 902, y: 312, size: 19, tint: "gold", delay: "0.8s", duration: "7.6s" },
  { id: "gold-4", x: 678, y: 472, size: 18, tint: "gold", delay: "2.1s", duration: "5.2s" },
  { id: "gold-5", x: 1148, y: 224, size: 22, tint: "gold", delay: "4.8s", duration: "6.6s" },
  { id: "gold-6", x: 356, y: 592, size: 18, tint: "gold", delay: "1.9s", duration: "7.9s" },
  { id: "gold-7", x: 746, y: 518, size: 15, tint: "gold", delay: "0.6s", duration: "4.9s" },
  // Electric sapphire-cyan hero stars
  { id: "blue-1", x: 244, y: 148, size: 26, tint: "blue", delay: "0.2s", duration: "6.2s" },
  { id: "blue-2", x: 856, y: 184, size: 17, tint: "blue", delay: "3.6s", duration: "5.4s" },
  { id: "blue-3", x: 1214, y: 458, size: 23, tint: "blue", delay: "1.5s", duration: "6.9s" },
  { id: "blue-4", x: 1086, y: 692, size: 18, tint: "blue", delay: "4.4s", duration: "7.4s" },
  { id: "blue-5", x: 158, y: 746, size: 16, tint: "blue", delay: "2.9s", duration: "8.1s" },
  { id: "blue-6", x: 642, y: 214, size: 15, tint: "blue", delay: "0.9s", duration: "6.1s" },
  { id: "blue-7", x: 382, y: 112, size: 14, tint: "blue", delay: "2.3s", duration: "5.9s" },
  { id: "blue-8", x: 968, y: 558, size: 14, tint: "gold", delay: "3.8s", duration: "6.5s" },
];

export default function CelestialBackdrop() {
  return (
    <div className="celestial-bg" aria-hidden="true">
      {/* Layer 1: Deep-space ambient sapphire & ember canvas */}
      <div className="celestial-nebula-base" />

      {/* Layer 2: Multi-scale volumetric nebula clouds, soft dark dust lanes & gossamer filaments */}
      <svg
        className="celestial-nebula-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <filter id="cb-blur-xl" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="56" />
          </filter>
          <filter id="cb-blur-lg" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="cb-blur-md" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="13" />
          </filter>
          <filter id="cb-blur-sm" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="5.5" />
          </filter>

          <radialGradient id="cb-sapphire" cx="50%" cy="50%" r="54%">
            <stop offset="0%" stopColor="#4cc4ff" stopOpacity="0.58" />
            <stop offset="46%" stopColor="#166fd4" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#06193d" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="cb-cobalt" cx="50%" cy="50%" r="54%">
            <stop offset="0%" stopColor="#2692eb" stopOpacity="0.52" />
            <stop offset="52%" stopColor="#0e4596" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#051129" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="cb-amber-heart" cx="48%" cy="48%" r="54%">
            <stop offset="0%" stopColor="#fff5d4" stopOpacity="0.82" />
            <stop offset="30%" stopColor="#ffc352" stopOpacity="0.58" />
            <stop offset="64%" stopColor="#d9580c" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#3d1103" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="cb-amber-plume" x1="12%" y1="15%" x2="88%" y2="85%">
            <stop offset="0%" stopColor="#ffdc88" stopOpacity="0.68" />
            <stop offset="38%" stopColor="#e67312" stopOpacity="0.48" />
            <stop offset="76%" stopColor="#7a2706" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#1b0803" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="cb-bronze-cloud" cx="50%" cy="45%" r="54%">
            <stop offset="0%" stopColor="#eab770" stopOpacity="0.44" />
            <stop offset="52%" stopColor="#8f541e" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#261005" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="cb-rose-aura" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#7c3aed" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="cb-amber-knot" cx="50%" cy="50%" r="52%">
            <stop offset="0%" stopColor="#fff9e3" stopOpacity="0.88" />
            <stop offset="38%" stopColor="#ffcc66" stopOpacity="0.56" />
            <stop offset="78%" stopColor="#e86a12" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#4f1603" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="cb-cyan-knot" cx="50%" cy="50%" r="52%">
            <stop offset="0%" stopColor="#d8f4ff" stopOpacity="0.78" />
            <stop offset="44%" stopColor="#52beff" stopOpacity="0.46" />
            <stop offset="100%" stopColor="#0a3278" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="cb-filament-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#66ccff" stopOpacity="0" />
            <stop offset="35%" stopColor="#66ccff" stopOpacity="0.52" />
            <stop offset="68%" stopColor="#cceeff" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#2288ee" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cb-filament-amber" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d95b0c" stopOpacity="0" />
            <stop offset="38%" stopColor="#ffbb4d" stopOpacity="0.55" />
            <stop offset="66%" stopColor="#fff2cc" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#e67312" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Pass 2A: Macro atmospheric ionized gas clouds */}
        <g filter="url(#cb-blur-xl)">
          <ellipse cx="210" cy="120" rx="310" ry="190" transform="rotate(-22 210 120)" fill="url(#cb-sapphire)" />
          <ellipse cx="390" cy="260" rx="260" ry="210" transform="rotate(16 390 260)" fill="url(#cb-cobalt)" />
          <ellipse cx="660" cy="145" rx="240" ry="200" transform="rotate(-8 660 145)" fill="url(#cb-cobalt)" />
          <ellipse cx="830" cy="330" rx="370" ry="265" transform="rotate(-16 830 330)" fill="url(#cb-sapphire)" />
          <ellipse cx="1150" cy="410" rx="320" ry="235" transform="rotate(24 1150 410)" fill="url(#cb-cobalt)" />
          <ellipse cx="1165" cy="115" rx="290" ry="165" transform="rotate(14 1165 115)" fill="url(#cb-bronze-cloud)" />
          <ellipse cx="740" cy="510" rx="305" ry="205" transform="rotate(20 740 510)" fill="url(#cb-amber-heart)" />
          <ellipse cx="665" cy="795" rx="280" ry="185" transform="rotate(-10 665 795)" fill="url(#cb-amber-heart)" opacity="0.58" />
          <ellipse cx="585" cy="625" rx="215" ry="145" transform="rotate(-20 585 625)" fill="url(#cb-rose-aura)" />
          <ellipse cx="1015" cy="415" rx="190" ry="140" transform="rotate(15 1015 415)" fill="url(#cb-rose-aura)" />
        </g>

        {/* Pass 2B: Sculpted volumetric billowing plumes & Pillars-of-Creation wings */}
        <g filter="url(#cb-blur-lg)">
          {/* Upper-left cyan crest meeting warm fiery gold curl */}
          <ellipse cx="290" cy="110" rx="155" ry="96" transform="rotate(-24 290 110)" fill="url(#cb-sapphire)" />
          <ellipse cx="425" cy="82" rx="118" ry="74" transform="rotate(18 425 82)" fill="url(#cb-amber-heart)" opacity="0.78" />
          <ellipse cx="385" cy="295" rx="76" ry="165" transform="rotate(12 385 295)" fill="url(#cb-amber-heart)" opacity="0.52" />
          <ellipse cx="348" cy="530" rx="72" ry="155" transform="rotate(-8 348 530)" fill="url(#cb-amber-heart)" opacity="0.46" />

          {/* Sweeping central molten-gold butterfly wing & twin rising spires */}
          <path
            d="M645 485 C755 462 905 520 1015 628 C1065 682 1010 765 905 768 C795 772 715 692 662 608 C625 552 612 496 645 485 Z"
            fill="url(#cb-amber-plume)"
          />
          <ellipse cx="672" cy="278" rx="68" ry="138" transform="rotate(-18 672 278)" fill="url(#cb-amber-plume)" opacity="0.62" />
          <ellipse cx="818" cy="360" rx="78" ry="152" transform="rotate(22 818 360)" fill="url(#cb-sapphire)" opacity="0.72" />
          <ellipse cx="738" cy="492" rx="148" ry="102" transform="rotate(16 738 492)" fill="url(#cb-amber-heart)" />

          {/* Right-side glowing cerulean cloud billows */}
          <ellipse cx="1235" cy="340" rx="165" ry="110" transform="rotate(-26 1235 340)" fill="url(#cb-sapphire)" opacity="0.72" />
          <ellipse cx="1135" cy="540" rx="175" ry="118" transform="rotate(18 1135 540)" fill="url(#cb-cobalt)" opacity="0.76" />
        </g>

        {/* Pass 2C: Heavily feathered dark interstellar dust lanes (soft depth, zero hard outlines) */}
        <g filter="url(#cb-blur-lg)">
          {/* Left dark cosmic dust pocket framing hero typography */}
          <path
            d="M-80 115 C110 148 242 224 270 368 C294 494 248 652 195 960 L-80 960 Z"
            fill="#03060c"
            fillOpacity="0.82"
          />
          {/* Central dark dust rift tucking beneath the glowing golden heart */}
          <path
            d="M540 950 C578 795 612 670 664 576 C714 606 752 652 732 748 C716 824 710 890 704 950 Z"
            fill="#05070e"
            fillOpacity="0.72"
          />
          {/* Right-side dark indigo dust pocket framing the Star Orbit Rail */}
          <path
            d="M1520 415 C1355 440 1245 516 1182 632 C1126 738 1078 836 1036 960 L1520 960 Z"
            fill="#030711"
            fillOpacity="0.80"
          />
        </g>

        {/* Pass 2D: Incandescent sunlit ionization knots & gossamer cosmic filaments */}
        <g style={{ mixBlendMode: "screen" }}>
          <g filter="url(#cb-blur-md)">
            <ellipse cx="732" cy="488" rx="86" ry="52" transform="rotate(18 732 488)" fill="url(#cb-amber-knot)" />
            <ellipse cx="835" cy="568" rx="74" ry="42" transform="rotate(26 835 568)" fill="url(#cb-amber-knot)" opacity="0.58" />
            <ellipse cx="418" cy="76" rx="74" ry="42" transform="rotate(-24 418 76)" fill="url(#cb-amber-knot)" opacity="0.68" />
            <ellipse cx="336" cy="316" rx="30" ry="88" transform="rotate(12 336 316)" fill="url(#cb-amber-knot)" opacity="0.48" />
            <ellipse cx="322" cy="534" rx="26" ry="84" transform="rotate(-10 322 534)" fill="url(#cb-amber-knot)" opacity="0.42" />
            <ellipse cx="268" cy="118" rx="92" ry="48" transform="rotate(-28 268 118)" fill="url(#cb-cyan-knot)" opacity="0.64" />
            <ellipse cx="798" cy="348" rx="68" ry="46" transform="rotate(-20 798 348)" fill="url(#cb-cyan-knot)" opacity="0.58" />
            <ellipse cx="1218" cy="396" rx="88" ry="38" transform="rotate(-28 1218 396)" fill="url(#cb-cyan-knot)" opacity="0.62" />
            <ellipse cx="1142" cy="542" rx="74" ry="32" transform="rotate(-38 1142 542)" fill="url(#cb-cyan-knot)" opacity="0.50" />
          </g>

          {/* Sweeping wispy gossamer ionized filaments */}
          <g filter="url(#cb-blur-sm)" fill="none" strokeLinecap="round">
            <path d="M165 65 C310 155 475 185 655 295 C810 390 965 445 1175 565" stroke="url(#cb-filament-cyan)" strokeWidth="4.5" opacity="0.58" />
            <path d="M510 120 C615 230 685 330 825 410 C965 490 1125 475 1295 375" stroke="url(#cb-filament-cyan)" strokeWidth="3.5" opacity="0.52" />
            <path d="M445 645 C585 555 685 480 825 512 C945 538 1035 628 1125 705" stroke="url(#cb-filament-amber)" strokeWidth="5.5" opacity="0.62" />
            <path d="M585 745 C670 635 715 530 785 435 C845 352 935 305 1035 280" stroke="url(#cb-filament-amber)" strokeWidth="3.2" opacity="0.48" />
            <path d="M355 180 C388 290 342 395 362 515 C378 615 335 720 278 815" stroke="url(#cb-filament-amber)" strokeWidth="3.8" opacity="0.46" />
            <path d="M1015 695 C1095 605 1155 515 1235 430 C1295 365 1365 342 1435 335" stroke="url(#cb-filament-cyan)" strokeWidth="3.8" opacity="0.54" />
            <path d="M895 165 C995 198 1095 182 1215 125 C1285 92 1355 78 1425 88" stroke="url(#cb-filament-amber)" strokeWidth="3" opacity="0.4" />
          </g>
        </g>
      </svg>

      {/* Layer 3: Slow GPU-composited living atmospheric light drift veils */}
      <div className="celestial-nebula-drift celestial-nebula-drift-a" />
      <div className="celestial-nebula-drift celestial-nebula-drift-b" />

      {/* Layer 4: Zero-grid organic deterministic deep-field & cluster starfield (210 stars) */}
      <svg
        className="celestial-stars-field"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <g>
          {STARS_STATIC.map((star, idx) => (
            <circle
              key={`s0-${idx}`}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill={star.fill}
              fillOpacity={star.opacity}
            />
          ))}
        </g>
        <g className="celestial-star-layer-a">
          {STARS_SHIMMER_A.map((star, idx) => (
            <circle
              key={`s1-${idx}`}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill={star.fill}
              fillOpacity={star.opacity}
            />
          ))}
        </g>
        <g className="celestial-star-layer-b">
          {STARS_SHIMMER_B.map((star, idx) => (
            <circle
              key={`s2-${idx}`}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill={star.fill}
              fillOpacity={star.opacity}
            />
          ))}
        </g>
      </svg>

      {/* Layer 5: Razor-thin JWST optical 4-point diffraction-spike jewel stars */}
      <svg
        className="celestial-stars-hero"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <radialGradient id="cb-glow-gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="22%" stopColor="#ffdf8a" stopOpacity="0.68" />
            <stop offset="55%" stopColor="#ffaa33" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#ffaa33" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cb-glow-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="22%" stopColor="#9ad8ff" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cb-glow-mag" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="22%" stopColor="#ff99dc" stopOpacity="0.72" />
            <stop offset="55%" stopColor="#ec4899" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </radialGradient>
        </defs>

        {JEWEL_STARS.map((star) => {
          const { spike, glowId } = TINT_STYLE[star.tint];
          const s = star.size;
          const diag = s * 0.44;
          return (
            <g key={star.id} transform={`translate(${star.x} ${star.y})`}>
              <g
                className="celestial-jewel"
                style={{
                  animationDelay: star.delay,
                  animationDuration: star.duration,
                }}
              >
                <circle r={s * 0.72} fill={`url(#${glowId})`} />
                <polygon
                  points={`${-s},0 0,-0.65 ${s},0 0,0.65`}
                  fill={spike}
                  fillOpacity="0.88"
                />
                <polygon
                  points={`0,${-s} 0.65,0 0,${s} -0.65,0`}
                  fill={spike}
                  fillOpacity="0.88"
                />
                <polygon
                  points={`${-s * 0.55},0 0,-0.38 ${s * 0.55},0 0,0.38`}
                  fill="#ffffff"
                  fillOpacity="0.96"
                />
                <polygon
                  points={`0,${-s * 0.55} 0.38,0 0,${s * 0.55} -0.38,0`}
                  fill="#ffffff"
                  fillOpacity="0.96"
                />
                <polygon
                  points={`${-diag},${-diag} 0.32,-0.32 ${diag},${diag} -0.32,0.32`}
                  fill={spike}
                  fillOpacity="0.42"
                />
                <polygon
                  points={`${diag},${-diag} 0.32,0.32 ${-diag},${diag} -0.32,-0.32`}
                  fill={spike}
                  fillOpacity="0.42"
                />
                <circle r={Math.max(1.4, s * 0.085)} fill="#ffffff" />
              </g>
            </g>
          );
        })}
      </svg>

      {/* Layer 6: Subtle occasional distant shooting stars */}
      <div className="celestial-comets">
        <span className="celestial-comet celestial-comet-1" />
        <span className="celestial-comet celestial-comet-2" />
      </div>

      {/* Layer 7: Atmospheric depth & legibility vignette */}
      <div className="celestial-vignette" />
    </div>
  );
}

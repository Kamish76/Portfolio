export type ProjectDomain = "fullstack" | "mobile" | "hardware" | "games";

export interface ProjectItem {
  id: string;
  index: string;
  domain: ProjectDomain;
  domainLabel: string;
  category: string;
  title: string;
  badge?: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  flow: string[];
  metrics: { label: string; value: string }[];
  repoUrl?: string;
  secondaryRepoUrl?: string;
  secondaryRepoLabel?: string;
  featuredOnHome: boolean;
  hardwareOnHome: boolean;
}

export const DOMAIN_FILTERS: { id: "all" | ProjectDomain; label: string }[] = [
  { id: "all", label: "ALL SYSTEMS" },
  { id: "fullstack", label: "FULL-STACK & CLOUD" },
  { id: "mobile", label: "MOBILE & WIDGETS" },
  { id: "hardware", label: "HARDWARE & IOT" },
  { id: "games", label: "GAMES & SIMULATIONS" },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "orgfinance",
    index: "01",
    domain: "fullstack",
    domainLabel: "Full-Stack & Cloud",
    category: "MULTI-TENANT FINANCIAL PLATFORM",
    title: "OrgFinance",
    badge: "WEB PLATFORM",
    role: "Sole Developer",
    summary:
      "A production multi-tenant financial tracking platform for student organizations, small teams, and individuals — combining collaborative treasury accounting with a dedicated Personal Wallet Mode.",
    problem:
      "Student organizations and small businesses routinely mix operational treasury funds with personal out-of-pocket reimbursements in fragile spreadsheets, causing reconciliation errors and zero auditability.",
    solution:
      "Engineered a Next.js 16 + Supabase PostgreSQL ledger with strict Row-Level Security (RLS), atomic PostgreSQL stored procedures with FOR UPDATE row locks for ownership/refunds, non-skipping composite cursor pagination, and a 30-day account deletion grace buffer.",
    highlights: [
      "Multi-tenant RBAC (Owner, Admin, Member) with dual ownership/membership verification guards",
      "Atomic PostgreSQL RPCs (process_member_refund, transfer_organization_ownership) with FOR UPDATE locking",
      "Schema-free Personal Wallet Mode (is_wallet = true) synced with the OrgWallet mobile app",
      "Composite cursor pagination (occurred_at___id) & automated Vercel Cron database keep-alive heartbeat",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Supabase PostgreSQL",
      "Vercel Cron",
    ],
    flow: ["Next.js 16 RSC", "RBAC + RLS Guard", "Atomic PG RPCs", "Supabase Cloud"],
    metrics: [
      { label: "Architecture", value: "Multi-Tenant RLS" },
      { label: "Pagination", value: "Composite Cursor" },
    ],
    repoUrl: "https://github.com/Kamish76/Financial-tracker-ProjectDec1025",
    featuredOnHome: true,
    hardwareOnHome: false,
  },
  {
    id: "orgwallet",
    index: "02",
    domain: "mobile",
    domainLabel: "Mobile & Widgets",
    category: "OFFLINE-FIRST MOBILE & NATIVE WIDGETS",
    title: "OrgWallet",
    badge: "ANDROID & iOS WIDGETKIT",
    role: "Sole Developer",
    summary:
      "The official cross-platform mobile companion to OrgFinance, featuring instant offline-first SQLite persistence, a FIFO-locked background sync engine, and native Android & iOS WidgetKit home-screen widgets.",
    problem:
      "Logging daily expenses fails when mobile connectivity drops, and opening a full cloud web app for a 3-second cash transaction creates too much friction.",
    solution:
      "Built a local-first React Native (Expo Router) client backed by a dedicated SQLite connection serialized with a FIFO mutex queue (withLock), paired with native Android widgets and a SwiftUI iOS WidgetKit extension synced via App Group storage.",
    highlights: [
      "Offline-first SQLite engine with FIFO mutex serialization (withLock) preventing Android JNI concurrency crashes",
      "Native iOS WidgetKit extension (SwiftUI 2x2 & 2x4) + Android home-screen widgets with 1-tap Expense/Income/Transfer",
      "10k-row transaction sync truncation guard with temporal window cutoff protection",
      "Tri-state Dark/Light/Auto theming across both the mobile app and native home-screen widgets",
    ],
    stack: [
      "React Native",
      "Expo Router",
      "TypeScript",
      "expo-sqlite",
      "SwiftUI / WidgetKit",
      "Supabase Auth",
    ],
    flow: ["Native Widgets / UI", "FIFO SQLite Engine", "Sync Queue", "Supabase"],
    metrics: [
      { label: "Storage", value: "FIFO Local SQLite" },
      { label: "Native Widgets", value: "iOS SwiftUI + Android" },
    ],
    repoUrl: "https://github.com/Kamish76/Wallet-tracker-ProjectJuly29-.git",
    featuredOnHome: true,
    hardwareOnHome: false,
  },
  {
    id: "viability-node",
    index: "03",
    domain: "hardware",
    domainLabel: "Hardware & IoT",
    category: "BIOPHYSICAL IOT & PREDICTIVE AGRITECH ENGINE",
    title: "ViabilityNode",
    badge: "NEXT.JS 16 + BIOPHYSICS",
    role: "Sole Developer",
    summary:
      "The edge-and-cloud intelligence layer for the Plant Surrogate Monitoring System — ingesting ESP32-C6 telemetry into Supabase Realtime to run 3-phase soil hydrology, photobiological DLI/ALAN, and Tetens VPD diagnostic models.",
    problem:
      "Raw soil moisture percentages and lux readings fail to diagnose root hypoxia, macropore drainage failure, or nighttime circadian disruption in CAM/succulent species.",
    solution:
      "Engineered a biophysical analytics engine in Next.js 16 that segments soil drying into 3 physical phases (Gravitational V_grav, Field Capacity, Capillary V_dry), integrates BH1750 lux into Daily Light Integral (DLI), and triggers real-time 'Sitter Mode' threat alerts.",
    highlights: [
      "3-Phase Piecewise Soil Drainage model isolating Gravitational (>70%), Field Capacity, and Capillary (<30%) velocities",
      "Photobiological PPFD & 24-hour Daily Light Integral (DLI) integration with CAM Artificial Light at Night (ALAN) alerts",
      "Tetens saturation vapor pressure VPD modeling diagnosing atmospheric drought (>1.6 kPa) vs fungal risk (<0.4 kPa)",
      "30-day ecological fingerprinting that autonomously matches microclimates against 12 botanical species profiles",
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Supabase Realtime",
      "PostgreSQL Views",
      "Biophysical Modeling",
      "Pure CSS",
    ],
    flow: ["ESP32-C6 JSON", "Next.js Ingestion API", "Supabase Realtime", "Biophysical Engine"],
    metrics: [
      { label: "Soil Physics", value: "3-Phase Piecewise" },
      { label: "Diagnostics", value: "VPD + DLI + ALAN" },
    ],
    repoUrl: "https://github.com/Kamish76/ViabilityNode",
    secondaryRepoUrl:
      "https://github.com/Kamish76/Plant-Surrugate-ViabilityNode",
    secondaryRepoLabel: "ESP32-C6 Firmware Repo",
    featuredOnHome: true,
    hardwareOnHome: false,
  },
  {
    id: "nfcentry",
    index: "04",
    domain: "fullstack",
    domainLabel: "Full-Stack & Cloud",
    category: "HARDENED WEB NFC & REAL-TIME ATTENDANCE",
    title: "NFCentry v2 (Redo)",
    badge: "WEB NFC + NEON POSTGRES",
    role: "Sole Developer",
    summary:
      "A hardened, mobile-first event attendance and credential platform powered by the Web NFC API, QR fallback, Server-Sent Events (SSE) with PostgreSQL LISTEN/NOTIFY, and Neon Lakebase Postgres.",
    problem:
      "High-volume campus events suffer from long check-in queues, rapid double-tap NFC race conditions, and duplicate WebSocket connections across serverless instances.",
    solution:
      "Architected a two-phase commit NFC tag provisioning protocol with AbortController hardware lifecycle locks, zero-asset Web Audio synthesized feedback, and a multiplexed SSE + pg_notify live attendance stream.",
    highlights: [
      "Two-phase commit NFC tag write protocol with 14-day cooldown and synchronous isProcessingTagRef race locks",
      "Multiplexed Server-Sent Events (SSE) real-time stream bridged across serverless instances via PostgreSQL LISTEN/NOTIFY",
      "Zero-asset in-browser Web Audio API synthesizer generating instant tactile confirmation tones",
      "Automated Neon copy-on-write branch CI/CD migration verification on pull requests",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "Neon PostgreSQL",
      "Web NFC API",
      "SSE + pg_notify",
      "Leaflet Maps",
    ],
    flow: ["Web NFC / QR", "2-Phase Tag Guard", "Neon Postgres", "SSE Live Stream"],
    metrics: [
      { label: "Hardware Lock", value: "Abort-Safe Web NFC" },
      { label: "Live Sync", value: "SSE + PG Notify" },
    ],
    repoUrl: "https://github.com/Kamish76/NFCentry",
    featuredOnHome: true,
    hardwareOnHome: false,
  },
  {
    id: "plant-surrogate-firmware",
    index: "05",
    domain: "hardware",
    domainLabel: "Hardware & IoT",
    category: "ULTRA-LOW-POWER ESP32-C6 NODE & ENCLOSURE",
    title: "Plant Surrogate Hardware & Firmware",
    badge: "ESP32-C6 + 3D PRINTED",
    role: "Sole Developer",
    summary:
      "An autonomous, solar-harvesting ESP32-C6 microclimate profiler featuring sub-20µA RTC deep sleep, a 5-sensor I2C/ADC array, and a custom 3D-printed white Stevenson screen radiation shield.",
    problem:
      "Outdoor plant telemetry nodes suffer from rapid battery depletion and daytime solar thermal absorption that skews air temperature and VPD calculations.",
    solution:
      "Wrote custom C++ firmware on the ESP32-C6 leveraging RTC deep sleep (<20µA idle) with 3-point median ADC spike filtering, and fabricated a white 3D-printed Stevenson screen enclosure to eliminate radiative heating spikes.",
    highlights: [
      "Sub-20µA RTC deep-sleep power architecture achieving 30+ days of autonomous operation",
      "Multi-sensor array: SHT4x (Temp/RH), BH1750 (Lux/PPFD), DPS310 (Barometric), INA219 (Solar/BMS Power), & Capacitive Soil ADC",
      "Custom 3D-printed white Stevenson screen enclosure preventing solar thermal VPD distortion",
      "Fixed hardware ADC calibration bounds (Dry=1920, Wet=880) for deterministic Volumetric Water Content (VWC %)",
    ],
    stack: [
      "C++",
      "ESP32-C6 (RISC-V)",
      "SHT4x & BH1750",
      "INA219 & DPS310",
      "RTC Deep Sleep",
      "3D-Printed Enclosure",
    ],
    flow: ["5-Sensor I2C/ADC", "RTC Sleep (<20µA)", "Wi-Fi Burst POST", "Stevenson Shield"],
    metrics: [
      { label: "Idle Current", value: "< 20 µA Deep Sleep" },
      { label: "Sensor Array", value: "SHT4x · BH1750 · INA219" },
    ],
    repoUrl: "https://github.com/Kamish76/Plant-Surrugate-ViabilityNode",
    secondaryRepoUrl: "https://github.com/Kamish76/ViabilityNode",
    secondaryRepoLabel: "Cloud Dashboard Repo",
    featuredOnHome: false,
    hardwareOnHome: true,
  },
  {
    id: "powerbank-monitor",
    index: "06",
    domain: "hardware",
    domainLabel: "Hardware & IoT",
    category: "EMBEDDED BI-DIRECTIONAL POWER METER",
    title: "ESP32-C3 & INA226 Power Telemetry",
    badge: "ESP32-C3 / C++",
    role: "Sole Developer",
    summary:
      "A precision low-power embedded telemetry unit pairing the RISC-V ESP32-C3 with an INA226 16-bit current/power sensor to monitor battery voltage sag, amperage, and wattage in real time.",
    problem:
      "Off-the-shelf power banks hide true cell voltage sag, current draw, and DC-DC conversion efficiency under dynamic loads.",
    solution:
      "Engineered custom I2C shunt-voltage calibration and sampling firmware in C++ on the ESP32-C3 to compute real-time wattage and state-of-charge with minimal parasitic draw.",
    highlights: [
      "Custom shunt-resistor calibration routine for millivolt and milliamp precision",
      "Real-time bus voltage, shunt drop, amperage, and wattage telemetry",
      "Optimized ESP32-C3 sampling loop minimizing parasitic power overhead",
    ],
    stack: ["C++", "Arduino", "ESP32-C3 (RISC-V)", "INA226 16-Bit ADC", "I2C"],
    flow: ["INA226 Shunt", "I2C Calibration", "ESP32-C3 Telemetry"],
    metrics: [
      { label: "MCU", value: "ESP32-C3 RISC-V" },
      { label: "ADC Resolution", value: "INA226 16-Bit" },
    ],
    featuredOnHome: false,
    hardwareOnHome: true,
  },
  {
    id: "bambu-gcode",
    index: "07",
    domain: "hardware",
    domainLabel: "Hardware & IoT",
    category: "ADDITIVE MANUFACTURING AUTOMATION",
    title: "Non-AMS Multi-Material G-Code Engine",
    badge: "BAMBU LAB A1 / G-CODE",
    role: "Sole Developer",
    summary:
      "Custom machine G-code macros for Bambu Lab A1 3D printers that automate mid-layer filament swaps, purge sequences, and nozzle temperature transitions without requiring an AMS unit.",
    problem:
      "Multi-color and multi-material 3D printing on the Bambu Lab A1 typically requires purchasing an external Automatic Material System (AMS Lite) hardware unit.",
    solution:
      "Engineered custom tool-change G-code routines in Bambu Studio that safely park the toolhead, retract filament, pause for operator swap, purge cleanly, and resume printing with zero layer shift.",
    highlights: [
      "Automated toolhead parking, Z-hop clearance, and filament unload/load sequences",
      "Zero layer-shift resume routine for mid-layer multi-color and multi-material swaps",
      "Enables multi-material functional prints on single-extruder setups without AMS hardware",
    ],
    stack: ["G-code", "Bambu Studio", "CNC Motion Control", "3D Printing"],
    flow: ["Slicer Hook", "Park & Retract Macro", "Purge & Resume"],
    metrics: [
      { label: "Target Machine", value: "Bambu Lab A1" },
      { label: "Capability", value: "Zero-AMS Multi-Color" },
    ],
    featuredOnHome: false,
    hardwareOnHome: true,
  },
  {
    id: "salingkusog",
    index: "08",
    domain: "fullstack",
    domainLabel: "Full-Stack & Cloud",
    category: "REALTIME CAMPUS EVENT & RAFFLE PLATFORM",
    title: "Salingkusog-Project",
    badge: "NEON REALTIME + S3",
    role: "Lead / Core Developer",
    summary:
      "A collaborative campus event portal built on Next.js 16 and Neon Serverless Postgres featuring a Live SQL Polaroid Memory Board, client-side HEIC-to-WebP 1080p image optimization, and a cryptographic 3x3 Bingo & Raffle engine.",
    problem:
      "Campus-wide photo challenges quickly exhaust cloud storage quotas with raw 15MB mobile HEIC photos and suffer from duplicate raffle ticket claims under concurrent traffic.",
    solution:
      "Built an in-browser HEIC/AVIF-to-WebP 1080p downscaler (cutting uploads by 95% to ~200KB) with server-side magic-byte verification, paired with a pure TypeScript 3x3 Bingo & multi-rule Raffle engine and Neon Realtime Live SQL updates.",
    highlights: [
      "Client-side 1080p Canvas WebP compressor & hybrid iOS/Android HEIC decoder reducing storage footprint by 90–97%",
      "SSR-safe Neon Realtime (@neon/realtime) Live SQL feed with keyset pagination and anti-jump scroll buffering",
      "Configurable 7-rule Raffle & 3x3 Bingo engine with cryptographic ticket IDs (SK-RFL-XXXXXX) and live simulator sandbox",
      "Three-tier RBAC (SuperAdmin, Admin, User) with instant Better Auth session revocation and audit logging",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "Neon Serverless Postgres",
      "Neon Realtime",
      "Better Auth",
      "S3 Object Storage",
    ],
    flow: ["HEIC->WebP 1080p", "Magic-Byte Gate", "Neon S3 + DB", "Live SQL Board"],
    metrics: [
      { label: "Image Compression", value: "95% Smaller (WebP)" },
      { label: "Live Sync", value: "Neon Realtime SQL" },
    ],
    featuredOnHome: false,
    hardwareOnHome: false,
  },
  {
    id: "bonkhold",
    index: "09",
    domain: "games",
    domainLabel: "Games & Simulations",
    category: "2D PIXEL-ART ROGUELIKE TOWER DEFENSE",
    title: "BONKHOLD",
    badge: "FLUTTER + FLAME ENGINE",
    role: "Sole Developer",
    summary:
      "A high-density 2D roguelike tower defense game built with Flutter 3.47+ and the Flame Engine, defending a stationary Bastion against 400+ simultaneous 360° swarm enemies at a locked 60 FPS.",
    problem:
      "Standard game engine collision detection and garbage-collected vector allocations drop frame rates severely when hundreds of swarm enemies and projectiles collide simultaneously on mobile.",
    solution:
      "Bypassed built-in collision detection in favor of a custom zero-allocation 2D SpatialHash grid (O(1) neighborhood queries), object pooling, RepaintBoundary HUD isolation, and a custom non-Material tactile UI system.",
    highlights: [
      "Custom O(1) 2D SpatialHash grid and zero-allocation hot loops sustaining 60 FPS with 400+ active swarm entities",
      "Multiplicative StatEngine & DraftSystem with 4 weapon slots, 4 tome slots, and Luck-skewed rarity rolls",
      "Non-Material tactile game UI with 70ms mechanical button depression and quadratic TraumaShake (shake = trauma²)",
      "Logical pause architecture that preserves Flame touch delivery without deadlocking the engine ticker",
    ],
    stack: [
      "Flutter 3.47+",
      "Dart",
      "Flame Engine",
      "2D SpatialHash",
      "Custom Game UI",
    ],
    flow: ["360° Swarm Director", "O(1) SpatialHash", "StatEngine Math", "60 FPS Flame Canvas"],
    metrics: [
      { label: "Swarm Density", value: "400+ Entities @ 60FPS" },
      { label: "Collision", value: "O(1) SpatialHash" },
    ],
    featuredOnHome: false,
    hardwareOnHome: false,
  },
  {
    id: "production-inc",
    index: "10",
    domain: "games",
    domainLabel: "Games & Simulations",
    category: "INDUSTRIAL TYCOON & SUPPLY CHAIN SIMULATOR",
    title: "Production.INC",
    badge: "FLUTTER + SQLITE v13",
    role: "Sole Developer",
    summary:
      "An offline single-player industrial tycoon and supply-chain simulation game in Flutter featuring 4 factory tiers, 3 industry branches, tiered logistics fleets, an R&D tech tree, and Wall Street IPO prestige.",
    problem:
      "Complex idle/tycoon simulations often suffer from state corruption across app updates and UI frame drops when rendering large item and machine catalogs.",
    solution:
      "Architected a layered Provider service engine backed by non-destructive SQLite schema migrations (v1 through v13 with automated pre-migration backups), debounced dirty-table auto-saving, and lazy-loaded UI tabs verified by 314 automated tests.",
    highlights: [
      "Full-spectrum automation (Auto-Buy, Auto-Build, and 0-fleet-slot Auto-Sell storefront) with 1.20^N machine scaling",
      "Non-destructive SQLite persistence engine spanning v1–v13 migrations with automated database integrity probes",
      "Tiered logistics fleet (Bikes -> Vans -> Trucks -> Planes) with square-root consolidated manifest transit math",
      "Backed by 314 automated unit, widget, and integration tests with zero network dependencies",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Provider Architecture",
      "SQLite (v1–v13)",
      "314 Automated Tests",
    ],
    flow: ["Raw Intake", "Auto-Build Machines", "Fleet & Storefront", "SQLite v13 Engine"],
    metrics: [
      { label: "Test Suite", value: "314 Passing Tests" },
      { label: "Persistence", value: "SQLite v1–v13 Safe" },
    ],
    featuredOnHome: false,
    hardwareOnHome: false,
  },
  {
    id: "earth-simulator",
    index: "11",
    domain: "games",
    domainLabel: "Games & Simulations",
    category: "CLOSED-LOOP PLANETARY CIVILIZATION SIMULATOR",
    title: "Earth Simulator Game",
    badge: "NEXT.JS + DRIZZLE + NEON",
    role: "Sole Developer",
    summary:
      "A macro-level, numbers-driven planetary resource and civilization simulator guiding humanity from a prehistoric tribe of 10,000 to an 8-billion+ modern civilization on a strictly finite 1-Trillion RU closed-loop Earth.",
    problem:
      "Civilization simulators typically rely on infinite resource spawns and unbounded exponential population growth that break conservation of mass and blow up on multi-year tick scales.",
    solution:
      "Designed a deterministic 5-step daily tick math engine enforcing strict conservation of mass across Ground, Active Infrastructure, and Landfill Tailings (950B RU non-fossil pool), paired with a 5-pillar Economic Health demographic equilibrium model.",
    highlights: [
      "Strict closed-loop Conservation of Mass across 10 mineral tiers (1 Trillion RU total planetary reserve)",
      "Two-tier labor graduation pipeline (Children -> Uneducated -> Teachers/Apprentices -> Specialists) with R0 equilibrium",
      "Dynamic atmospheric smog washout (1.5%/day), forest pioneer sapling regrowth floor, and 10,000 pop Dark Age safeguard",
      "Lazy delta evaluation with periodic JSONB checkpoints allowing Neon serverless compute to sleep to zero",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Neon Serverless Postgres",
      "Drizzle ORM",
      "Deterministic Math Engine",
    ],
    flow: ["1T RU Mass Pool", "5-Step Daily Tick", "Ecology & Demographics", "Neon JSONB Sync"],
    metrics: [
      { label: "Mass Conservation", value: "1 Trillion RU Loop" },
      { label: "Time Scales", value: "1D · 30D · 365D Ticks" },
    ],
    featuredOnHome: false,
    hardwareOnHome: false,
  },
  {
    id: "spacealpha-clone",
    index: "12",
    domain: "games",
    domainLabel: "Games & Simulations",
    category: "PERSISTENT 4X SCI-FI MMO BROWSER GAME",
    title: "SpaceAlpha Clone",
    badge: "NEXT.JS 15 + 60S TICK MMO",
    role: "Sole Developer",
    summary:
      "A full-featured persistent 4X sci-fi MMO browser game featuring discrete 60-second universe ticks, planetary power grids, commodity order-book trading, 3D Euclidean astrometric radar, and fleet combat.",
    problem:
      "Browser strategy MMOs require transactional resolution of resource accretion, construction queues, market limit orders, and multi-planet fleet arrivals without race conditions.",
    solution:
      "Built a transactional 60-second tick processor (executeGameTick) in Next.js 15 with Drizzle ORM and Neon Postgres, paired with a crossed-spread commodity exchange (2.5% taker fee), 3D vector GalaxyRadar, and SSE live HUD telemetry.",
    highlights: [
      "Transactional 60-second universe tick resolving resource accretion, queues, and fleet missions (MINE, ATTACK, COLONIZE, SPY)",
      "Interactive vector GalaxyRadar with 3D Euclidean transit time formulas and propulsion tech multipliers",
      "Central Galactic Bank (wire transfers & vaults) and live crossed-spread Commodity Market matching engine",
      "18/18 static and dynamic App Router routes verified with stateless jose JWT authentication",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "Neon PostgreSQL",
      "Drizzle ORM",
      "Server-Sent Events",
      "Tailwind CSS",
    ],
    flow: ["60s Universe Tick", "3D Fleet & Market Engine", "Drizzle + Neon DB", "SSE Live HUD"],
    metrics: [
      { label: "Engine Loop", value: "60s Transactional Tick" },
      { label: "Navigation", value: "3D Euclidean Radar" },
    ],
    repoUrl: "https://github.com/Kamish76/Space-alpha-clone-",
    featuredOnHome: false,
    hardwareOnHome: false,
  },
];

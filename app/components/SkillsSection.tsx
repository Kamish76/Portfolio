const STACK_DOMAINS = [
  {
    index: "01",
    title: "Languages & Core",
    subtitle: "Systems, application, and hardware languages",
    items: [
      "TypeScript (Strict)",
      "JavaScript (ES2024+)",
      "C / C++ (Embedded ESP32)",
      "Dart (Flutter 3.47+)",
      "SQL (PostgreSQL & SQLite)",
      "Swift (iOS WidgetKit)",
      "HTML5 & Modern Pure CSS",
      "Python & Java",
      "G-code (CNC / Additive Mfg)",
    ],
  },
  {
    index: "02",
    title: "Web, Cloud & Databases",
    subtitle: "Full-stack frameworks, realtime engines & storage",
    items: [
      "Next.js 15/16 (App Router, RSC)",
      "React 19 (Server Actions, Hooks)",
      "Neon Serverless PostgreSQL",
      "Neon Realtime (Live SQL)",
      "Supabase (Postgres, Auth, RLS)",
      "Drizzle ORM & PostgREST",
      "Better Auth & Google OAuth 2.0",
      "S3 / R2 / Neon Object Storage",
      "Server-Sent Events (SSE) + pg_notify",
      "Tailwind CSS v4 & shadcn/ui",
    ],
  },
  {
    index: "03",
    title: "Mobile, Games & Native UI",
    subtitle: "Offline-first mobile, native widgets & 60 FPS game loops",
    items: [
      "React Native & Expo Router",
      "Offline-First SQLite (FIFO Mutex)",
      "iOS WidgetKit (SwiftUI) & Android Widgets",
      "Flutter & Flame 2D Game Engine",
      "Custom O(1) 2D SpatialHash Grids",
      "Client-Side 1080p WebP & HEIC Decoder",
      "Web NFC API (Two-Phase Tag Guard)",
      "Web Audio API Micro-Tone Synth",
      "Leaflet & React-Leaflet Geofencing",
    ],
  },
  {
    index: "04",
    title: "Hardware, IoT & Architecture",
    subtitle: "Microcontrollers, sensors, biophysics & CAD",
    items: [
      "ESP32-C6 / ESP32-C3 (RISC-V) & Arduino",
      "I2C Sensors (SHT4x, BH1750, DPS310)",
      "Power Telemetry (INA219 & INA226 ADC)",
      "Sub-20µA RTC Deep Sleep & Solar BMS",
      "Biophysical Modeling (VPD, DLI, Drainage)",
      "Multi-Tenant RBAC & Row-Level Security",
      "Composite Cursor & Keyset Pagination",
      "Fusion 360 CAD & 3D-Printed Enclosures",
      "Bambu Studio Custom G-Code Macros",
    ],
  },
];

export default function SkillsSection() {
  return (
    <div className="section-inner">
      <div className="section-header-split">
        <div>
          <p className="eyebrow">TOOLS / 03</p>
          <h2 className="section-title">Across the stack.</h2>
        </div>
        <p className="section-subtitle">
          The languages, databases, native mobile bridges, game engines, and
          embedded hardware tools powering my systems across 4 engineering
          domains.
        </p>
      </div>

      <div className="stack-domains-grid">
        {STACK_DOMAINS.map((domain) => (
          <div key={domain.index} className="stack-domain-card">
            <div className="stack-domain-header">
              <div>
                <p
                  className="eyebrow eyebrow-blue"
                  style={{ marginBottom: "0.25rem" }}
                >
                  DOMAIN // {domain.index}
                </p>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                  }}
                >
                  {domain.title}
                </h3>
                <p
                  style={{
                    margin: "0.2rem 0 0",
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                  }}
                >
                  {domain.subtitle}
                </p>
              </div>
            </div>

            <ul className="stack-items-grid">
              {domain.items.map((item) => (
                <li key={item} className="stack-item">
                  <span className="stack-marker" aria-hidden="true">
                    &gt;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

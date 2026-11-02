const JOURNEY_LOGS = [
  {
    id: "LOG_ID_01",
    period: "2023 – June 2028 (Expected)",
    title: "Bachelor of Science in Computer Science",
    institution: "Visayas State University — Main Campus, Baybay",
    description:
      "3rd Year BSCS undergraduate focusing on full-stack web architecture, offline-first mobile applications, relational database design, and embedded microcontroller systems.",
    tags: [
      "> Algorithms & Data Structures",
      "> Web Systems & Technologies",
      "> Database Management",
      "> Embedded Prototyping",
    ],
  },
  {
    id: "LOG_ID_02",
    period: "2025 – Present",
    title: "Independent Full-Stack & Embedded Systems Builder",
    institution: "Self-Directed Product Engineering & Hardware R&D",
    description:
      "Architecting and shipping multi-tenant production web platforms (OrgFinance, NFCentry), offline-first mobile apps (OrgWallet), and ultra-low-power ESP32-C6/C3 sensor telemetry nodes (ViabilityNode).",
    tags: [
      "> Next.js 16 & React 19",
      "> Expo / React Native",
      "> Supabase & PostgreSQL",
      "> ESP32 C++ Firmware",
    ],
  },
];

export default function EducationSection() {
  return (
    <div className="section-inner">
      <div className="section-header-split">
        <div>
          <p className="eyebrow">DATA STREAM / 02</p>
          <h2 className="section-title">Academic &amp; engineering log.</h2>
        </div>
        <p className="section-subtitle">
          Computer Science foundation paired with hands-on product development
          across web, mobile, and hardware.
        </p>
      </div>

      <div className="timeline-container">
        <div className="timeline-spine" aria-hidden="true" />

        <div className="timeline-items">
          {JOURNEY_LOGS.map((log) => (
            <div key={log.id} className="timeline-item">
              <div className="timeline-node" aria-hidden="true" />

              <article className="timeline-card">
                <div className="preview-window-bar">
                  <div className="window-dots" aria-hidden="true">
                    <span className="window-dot" />
                    <span className="window-dot" />
                    <span className="window-dot" />
                  </div>
                  <span>{log.id}</span>
                </div>

                <span className="date-pill">{log.period}</span>

                <h3
                  style={{
                    margin: "0 0 0.25rem",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                  }}
                >
                  {log.title}
                </h3>

                <p
                  style={{
                    margin: "0 0 0.85rem",
                    fontSize: "0.9rem",
                    color: "var(--accent-blue)",
                    fontWeight: 500,
                  }}
                >
                  {log.institution}
                </p>

                <p
                  style={{
                    margin: 0,
                    color: "var(--text-secondary)",
                    fontSize: "0.94rem",
                    lineHeight: 1.65,
                  }}
                >
                  {log.description}
                </p>

                <ul className="project-stack-inline" style={{ marginTop: "1.1rem" }}>
                  {log.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

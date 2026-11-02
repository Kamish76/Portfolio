"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PROJECTS, type ProjectItem } from "../data/projects";

export default function ProjectSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const featuredProjects = PROJECTS.filter((p) => p.featuredOnHome);
  const hardwareProjects = PROJECTS.filter((p) => p.hardwareOnHome);

  return (
    <div className="section-inner">
      {/* Section Header */}
      <div className="section-header-split">
        <div>
          <p className="eyebrow">SELECTED WORK / 01</p>
          <h2 className="section-title">Systems, built and shipped.</h2>
        </div>
        <div>
          <p className="section-subtitle">
            Independent full-stack platforms, offline-first mobile apps, and
            biophysical embedded hardware built around real operational problems.
          </p>
          <div style={{ marginTop: "0.85rem" }}>
            <Link href="/projects" className="action-link-story">
              Explore full engineering archive ({PROJECTS.length} systems) →
            </Link>
          </div>
        </div>
      </div>

      {/* Tier 1: Featured Horizontal Split Cards */}
      <div className="featured-projects-stack">
        {featuredProjects.map((project) => (
          <article key={project.id} className="project-card-featured">
            {/* Left Column: Interactive Telemetry / Architecture Preview Well */}
            <button
              type="button"
              className="project-preview-well"
              onClick={() => setSelectedProject(project)}
              aria-label={`Inspect ${project.title} architecture and case study`}
            >
              <div className="preview-Diagram-frame">
                <div className="preview-window-bar">
                  <div className="window-dots" aria-hidden="true">
                    <span className="window-dot" />
                    <span className="window-dot" />
                    <span className="window-dot" />
                  </div>
                  <span>SYS_SPEC // {project.id.toUpperCase()}</span>
                </div>

                <div className="preview-architecture-flow">
                  {project.flow.map((node, idx) => (
                    <span
                      key={node}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <span className="flow-node">{node}</span>
                      {idx < project.flow.length - 1 && (
                        <span className="flow-arrow" aria-hidden="true">
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                <div className="preview-metrics-grid">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="preview-metric-box">
                      <span className="preview-metric-label">{m.label}</span>
                      <span className="preview-metric-value">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <span
                style={{
                  marginTop: "1rem",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "0.7rem",
                  color: "var(--text-dim)",
                  letterSpacing: "0.08em",
                }}
              >
                [ CLICK TO OPEN SYSTEM CASE STUDY ]
              </span>
            </button>

            {/* Right Column: Editorial Project Story & Actions */}
            <div className="project-body">
              <p className="eyebrow eyebrow-blue">
                {project.index} / {project.category}
              </p>

              <div className="project-title-row">
                <h3 className="project-title">{project.title}</h3>
                {project.badge && (
                  <span className="status-badge">{project.badge}</span>
                )}
              </div>

              <p className="project-role">{project.role}</p>

              <p className="project-description">{project.summary}</p>

              <ul
                className="project-stack-inline"
                aria-label="Technologies used"
              >
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              <div className="project-actions-footer">
                <button
                  type="button"
                  className="action-link-story"
                  onClick={() => setSelectedProject(project)}
                >
                  Read project story →
                </button>

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link-external"
                  >
                    View repository ↗
                  </a>
                )}

                {project.secondaryRepoUrl && (
                  <a
                    href={project.secondaryRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link-external"
                  >
                    {project.secondaryRepoLabel ?? "Secondary repo"} ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Tier 2: Hardware & Experimental R&D (3-Column Responsive Grid) */}
      <div className="subsection-divider">
        <div className="section-header-split" style={{ marginBottom: "1.75rem" }}>
          <div>
            <p className="eyebrow">HARDWARE &amp; EXPERIMENTAL R&amp;D</p>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
              }}
            >
              Embedded ESP32 nodes, sensors &amp; fabrication.
            </h3>
          </div>
          <p className="section-subtitle">
            Low-level C++ firmware, sub-20µA deep-sleep power chains, I2C sensor
            arrays, and custom 3D-printed radiation shields &amp; G-code.
          </p>
        </div>

        <div className="projects-grid-hardware">
          {hardwareProjects.map((project) => (
            <article key={project.id} className="project-card-compact">
              <button
                type="button"
                className="project-preview-well"
                onClick={() => setSelectedProject(project)}
                aria-label={`Inspect ${project.title} details`}
              >
                <div className="preview-Diagram-frame">
                  <div className="preview-window-bar">
                    <div className="window-dots" aria-hidden="true">
                      <span className="window-dot" />
                      <span className="window-dot" />
                      <span className="window-dot" />
                    </div>
                    <span>HW_LOG // {project.index}</span>
                  </div>

                  <div className="preview-metrics-grid" style={{ marginTop: 0 }}>
                    {project.metrics.map((m) => (
                      <div key={m.label} className="preview-metric-box">
                        <span className="preview-metric-label">{m.label}</span>
                        <span className="preview-metric-value">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </button>

              <div className="project-body">
                <p className="eyebrow eyebrow-blue">
                  {project.index} / {project.category}
                </p>

                <div className="project-title-row">
                  <h4 className="project-title" style={{ fontSize: "1.35rem" }}>
                    {project.title}
                  </h4>
                  {project.badge && (
                    <span className="status-badge">{project.badge}</span>
                  )}
                </div>

                <p className="project-role">{project.role}</p>
                <p className="project-description">{project.summary}</p>

                <ul className="project-stack-inline">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <div className="project-actions-footer">
                  <button
                    type="button"
                    className="action-link-story"
                    onClick={() => setSelectedProject(project)}
                  >
                    Read technical breakdown →
                  </button>

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-link-external"
                    >
                      Firmware repo ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Project Archive Callout Banner */}
      <div className="archive-callout-banner">
        <div>
          <p className="eyebrow" style={{ marginBottom: "0.35rem" }}>
            DEVBRAIN ARCHIVE // {PROJECTS.length} SYSTEMS INDEXED
          </p>
          <h4
            style={{
              margin: 0,
              fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
            }}
          >
            Want to see the rest of my engineering work?
          </h4>
          <p
            style={{
              margin: "0.4rem 0 0",
              color: "var(--text-secondary)",
              fontSize: "0.94rem",
              maxWidth: "38rem",
            }}
          >
            Explore all {PROJECTS.length} systems — including Flutter &amp; Flame
            2D game engines (BONKHOLD, Production.INC), Neon Realtime campus
            platforms (Salingkusog), and closed-loop planetary simulations.
          </p>
        </div>

        <Link href="/projects" className="btn-primary">
          Open Project Archive ({PROJECTS.length}) →
        </Link>
      </div>

      {/* Interactive Case Study Modal */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <div>
                <p className="eyebrow eyebrow-blue">
                  {selectedProject.index} / {selectedProject.category}
                </p>
                <h3
                  id="modal-project-title"
                  className="project-title"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
                >
                  {selectedProject.title}
                </h3>
                <p className="project-role">{selectedProject.role}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="btn-secondary"
                style={{ minHeight: "36px", padding: "0.35rem 0.85rem" }}
              >
                Close [ESC]
              </button>
            </div>

            <div className="modal-grid">
              <div style={{ display: "grid", gap: "1.25rem" }}>
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.4rem",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--accent-amber)",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    The Problem
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {selectedProject.problem}
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      margin: "0 0 0.4rem",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--accent-amber)",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    The Engineering Solution
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              <div style={{ display: "grid", gap: "1.25rem" }}>
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.6rem",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--accent-blue)",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Key Outcomes &amp; Architecture
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "1.1rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                      display: "grid",
                      gap: "0.45rem",
                    }}
                  >
                    {selectedProject.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4
                    style={{
                      margin: "0 0 0.5rem",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--accent-blue)",
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Tech Stack
                  </h4>
                  <ul className="project-stack-inline" style={{ marginTop: 0 }}>
                    {selectedProject.stack.map((tech) => (
                      <li key={tech}>&gt; {tech}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {(selectedProject.repoUrl || selectedProject.secondaryRepoUrl) && (
              <div
                style={{
                  marginTop: "1.5rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid var(--border-subtle)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    View GitHub Repository ↗
                  </a>
                )}
                {selectedProject.secondaryRepoUrl && (
                  <a
                    href={selectedProject.secondaryRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    {selectedProject.secondaryRepoLabel ?? "Secondary Repo"} ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

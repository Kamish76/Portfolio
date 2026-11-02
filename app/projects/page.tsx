"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PROJECTS,
  DOMAIN_FILTERS,
  type ProjectDomain,
  type ProjectItem,
} from "../data/projects";

export default function ProjectsArchivePage() {
  const [activeDomain, setActiveDomain] = useState<"all" | ProjectDomain>("all");
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

  const filteredProjects =
    activeDomain === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.domain === activeDomain);

  return (
    <div className="portfolio-shell">
      <main className="section-block" style={{ borderTop: "none", paddingTop: "3.5rem" }}>
        <div className="section-inner">
          {/* Top Breadcrumb & Back Bar */}
          <div className="archive-top-bar">
            <Link href="/" className="btn-secondary">
              ← Back to Portfolio Home
            </Link>

            <span className="eyebrow" style={{ margin: 0 }}>
              DEVBRAIN ENGINEERING ARCHIVE // {PROJECTS.length} SYSTEMS
            </span>
          </div>

          {/* Page Heading */}
          <div className="section-header-split" style={{ marginTop: "2.5rem", marginBottom: "2rem" }}>
            <div>
              <p className="eyebrow">COMPLETE CATALOG / 01–{PROJECTS.length}</p>
              <h1 className="section-title">All systems &amp; R&amp;D builds.</h1>
            </div>
            <p className="section-subtitle">
              Every full-stack cloud application, offline-first mobile client,
              embedded ESP32 hardware node, and 60 FPS game engine indexed in my
              DevBrain.
            </p>
          </div>

          {/* Domain Filter Tabs */}
          <div className="archive-filter-bar" role="tablist" aria-label="Filter projects by domain">
            {DOMAIN_FILTERS.map((filter) => {
              const count =
                filter.id === "all"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.domain === filter.id).length;

              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={activeDomain === filter.id}
                  data-active={activeDomain === filter.id}
                  className="archive-filter-pill"
                  onClick={() => setActiveDomain(filter.id)}
                >
                  <span>{filter.label}</span>
                  <span className="archive-filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Archive Grid */}
          <div className="projects-grid-secondary" style={{ marginTop: "2rem" }}>
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card-compact">
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
                      <span>
                        {`${project.domainLabel.toUpperCase()} // ${project.index}`}
                      </span>
                    </div>

                    <div className="preview-architecture-flow">
                      {project.flow.map((node, idx) => (
                        <span
                          key={node}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
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
                </button>

                <div className="project-body">
                  <p className="eyebrow eyebrow-blue">
                    {project.index} / {project.category}
                  </p>

                  <div className="project-title-row">
                    <h2 className="project-title" style={{ fontSize: "1.5rem" }}>
                      {project.title}
                    </h2>
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
                      Read case study →
                    </button>

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-link-external"
                      >
                        View repo ↗
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

          {/* Bottom Back Footer */}
          <div className="footer-bottom-bar" style={{ marginTop: "4.5rem" }}>
            <Link href="/" className="action-link-story">
              ← Return to Main Portfolio
            </Link>
            <span>
              &copy; {new Date().getFullYear()} Jabez Rafael Abella ·{" "}
              {PROJECTS.length} Systems Indexed
            </span>
          </div>
        </div>
      </main>

      {/* Interactive Case Study Modal */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="archive-modal-title"
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
                  id="archive-modal-title"
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

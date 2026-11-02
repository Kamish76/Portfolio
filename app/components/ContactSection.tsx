"use client";

import { useState } from "react";

const EMAIL = "jabezrafael1@gmail.com";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className="section-inner">
      <div className="section-header-split" style={{ marginBottom: "2rem" }}>
        <div>
          <p className="eyebrow">CHANNEL OPEN / CONTACT</p>
          <h2 className="section-title">Have something in mind?</h2>
          <p
            style={{
              margin: "1rem 0 0",
              maxWidth: "34rem",
              fontSize: "1.08rem",
              color: "var(--text-secondary)",
            }}
          >
            A development project, an internship or engineering role, or a
            hardware-software problem worth building. Tell me about it.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <a href={`mailto:${EMAIL}`} className="btn-primary">
            Email me ↗
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="btn-secondary"
          >
            {copied ? "Copied email!" : "Copy email address"}
          </button>
        </div>
      </div>

      {/* Direct Contact Readout */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.75rem 2rem",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "0.86rem",
          color: "var(--text-secondary)",
        }}
      >
        <a
          href={`mailto:${EMAIL}`}
          style={{
            color: "var(--text-primary)",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            textDecorationColor: "rgba(255, 204, 102, 0.45)",
          }}
        >
          {EMAIL}
        </a>
        <span style={{ color: "var(--text-muted)" }}>
          Phone: +63 999 980 6222
        </span>
        <span style={{ color: "var(--text-muted)" }}>
          Baybay City, Leyte, PH
        </span>
      </div>

      {/* Bottom Copyright & Navigation Bar */}
      <div className="footer-bottom-bar">
        <span>
          &copy; {new Date().getFullYear()} Jabez Rafael Abella. Built in Baybay,
          Philippines.
        </span>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <a
            href="https://github.com/Kamish76"
            target="_blank"
            rel="noopener noreferrer"
            className="action-link-external"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/jabez-abella"
            target="_blank"
            rel="noopener noreferrer"
            className="action-link-external"
          >
            LinkedIn ↗
          </a>
          <a href="#home" className="action-link-external">
            Back to top ↑
          </a>
        </div>
      </div>
    </div>
  );
}

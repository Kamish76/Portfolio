"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "home", index: "01", label: "HOME" },
  { id: "projects", index: "02", label: "WORK" },
  { id: "education", index: "03", label: "JOURNEY" },
  { id: "skills", index: "04", label: "STACK" },
  { id: "contact", index: "05", label: "CONTACT" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="orbit-nav-wrapper" aria-label="Section navigation">
      <nav className="orbit-nav">
        <span className="orbit-nav-spine" aria-hidden="true" />
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="orbit-nav-link"
            data-active={activeId === item.id}
          >
            <span className="orbit-nav-label">
              <span className="orbit-nav-index">{item.index}</span>
              {item.label}
            </span>
            <span className="orbit-nav-star" aria-hidden="true" />
          </a>
        ))}
      </nav>
    </aside>
  );
}

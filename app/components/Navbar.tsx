"use client";

import Image from "next/image";
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
    const updateActive = () => {
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 24) {
        setActiveId(NAV_ITEMS[NAV_ITEMS.length - 1].id);
        return;
      }

      const triggerY = window.innerHeight * 0.4;
      let current = NAV_ITEMS[0].id;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= triggerY) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    let rafId = 0;
    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          updateActive();
        });
      }
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <a href="#home" className="brand-mark" aria-label="K76 — Back to top">
        <Image
          src="/k76-logo.png"
          alt="K76 logo"
          width={48}
          height={48}
          priority
        />
      </a>
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
    </>
  );
}

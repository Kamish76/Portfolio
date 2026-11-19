"use client";

import { useEffect } from "react";

export default function CelestialScrollSync() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "scroll()")) {
      return;
    }

    const root = document.documentElement;
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      root.style.setProperty("--celestial-scroll", progress.toFixed(4));
    };

    const schedule = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(document.body);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      root.style.removeProperty("--celestial-scroll");
    };
  }, []);

  return null;
}

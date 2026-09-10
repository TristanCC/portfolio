"use client";

import { useEffect } from "react";

export default function SectionScale() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("#top > .section-space"),
    );
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      // Measure before writing. A top origin keeps these positions stable.
      const scales = sections.map((section) => {
        const progress = Math.min(
          1,
          Math.max(0, (height - section.getBoundingClientRect().top) / (height * 0.45)),
        );
        const eased = progress * progress * (3 - 2 * progress);
        return 0.98 + 0.02 * eased;
      });
      sections.forEach((section, index) => {
        section.style.setProperty("--section-scale", String(scales[index]));
      });
    };

    const schedule = () => {
      if (!motion.matches && !frame) frame = requestAnimationFrame(update);
    };
    const syncMotion = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (motion.matches) {
        sections.forEach((section) => section.style.removeProperty("--section-scale"));
      } else {
        schedule();
      }
    };

    const resizeObserver = new ResizeObserver(schedule);
    sections.forEach((section) => resizeObserver.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", syncMotion);
    syncMotion();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", syncMotion);
      sections.forEach((section) => section.style.removeProperty("--section-scale"));
    };
  }, []);

  return null;
}

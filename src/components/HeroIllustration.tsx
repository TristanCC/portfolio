"use client";

import { useEffect, useRef } from "react";
import { textmode } from "textmode.js";
import { SynthPlugin, noise } from "textmode.synth.js";

const HeroIllustration = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    // The illustration is decorative; leave the hero usable without WebGL2.
    if (!canvas.getContext("webgl2")) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const t = textmode.create({
      canvas,
      width: Math.max(1, wrapper.clientWidth),
      height: Math.max(1, wrapper.clientHeight),
      fontSize: 24,
      frameRate: 60,
      plugins: [SynthPlugin],
    });

    let ready = false;
    let visible = false;

    const syncPlayback = () => {
      if (!ready) return;
      if (visible && !document.hidden && !motion.matches) {
        t.loop();
      } else {
        t.noLoop();
        if (visible && !document.hidden) t.redraw();
      }
    };

    void t.setup(() => {
      // Build the shader graph once; the plugin owns drawing and animation.
      t.synth(
        noise(3, 0.025)
          .seed(2024)
          .charMap("  .:-=+*")
          .charColor(0.12, 0.22, 0.65)
          .cellColor(0, 0, 0, 0),
      );
      t.resizeCanvas(
        Math.max(1, wrapper.clientWidth),
        Math.max(1, wrapper.clientHeight),
      );
      ready = true;
      syncPlayback();
    });

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry || !ready) return;
      const width = Math.max(1, Math.round(entry.contentRect.width));
      const height = Math.max(1, Math.round(entry.contentRect.height));
      if (width === t.width && height === t.height) return;
      t.resizeCanvas(width, height);
      if (!t.isLooping()) t.redraw();
    });
    resizeObserver.observe(wrapper);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    intersectionObserver.observe(wrapper);
    motion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      ready = false;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      t.destroy();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-30"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default HeroIllustration;

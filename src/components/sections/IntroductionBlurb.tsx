"use client";

import { useEffect, useRef } from "react";
import { textmode, TextmodeVideo } from "textmode.js";
import { syne, inter } from "../../app/fonts";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const IntroductionBlurb = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // textmode.js talks to a real <canvas> + WebGL2 context, so this can
    // only run once that element actually exists in the DOM (client-side,
    // after mount) -- not at module scope, and not during SSR.
    if (!canvasRef.current) return;

    const t = textmode.create({
      canvas: canvasRef.current,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });

    let video: TextmodeVideo | undefined;
    let cancelled = false;

    t.setup(async () => {
      const loaded = await t.loadVideo("/parcel.mp4");
      if (cancelled) return;
      video = loaded;
      video.characters(" .:-=+*#%@");
      video.loop(true);
      await video.play();
    });

    t.draw(() => {
      t.background(0);
      if (video) {
        t.image(video, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
    });

    return () => {
      cancelled = true;
      t.destroy();
    };
  }, []);

  return (
    <div className="leading-relaxed space-y-4">
      {/* Resume notice */}
      <div className="flex flex-col gap-4 border-b-2 border-accent-foreground pb-2">
        <p
          className={`text-base md:text-lg font-black px-4 mb-4  border-l-2 border-orange-500 border-solid
          bg-[hsl(38,33%,5%,0%)]  ${syne.variable}`}
          style={{ fontFamily: "var(--font-syne)" }}
        >
          This site is designed to display some of my work. You can download my
          resume
          <a
            href="/TristanCJohnstonResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-orange-500 hover:text-orange-300 border-b border-orange-500"
          >
            here.
          </a>
        </p>
        {/* Section header */}
        <div
          className={`flex justify-between ${syne.variable}`}
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <div className="flex flex-col items-start justify-end px-2 font-bold grow ">
            <span className="text-lg md:text-xl tracking-wider">
              ARTICLE I — ABOUT
            </span>
            <h1 className="text-3xl md:text-5xl tracking-wide">
              HEY, I&apos;M TRISTAN.
            </h1>
          </div>
        </div>
      </div>

      {/* Body: textmode-rendered video replacing the introduction paragraph */}
      <div>
        <p
          className={`text-base md:text-lg border-accent-foreground ${inter.variable}`}
          style={{ fontFamily: "var(--font-inter)" }}
        ></p>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="mt-2 w-full h-90 max-w-full"
        />
      </div>
    </div>
  );
};

export default IntroductionBlurb;

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "./Nav";
import IntroductionBlurb from "./sections/IntroductionBlurb";
import Experience from "./sections/Experience";
import Work from "./sections/Work";
import BioItem from "./ui/BioItem";

import {
  ScrollSmoother,
  ScrollTrigger,
  ScrambleTextPlugin,
  SplitText,
} from "gsap/all";
import { textmode, TextmodeImage } from "textmode.js";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  ScrambleTextPlugin,
  SplitText,
);

/* ---------------------------
   Clip-path constants
--------------------------- */

const CLEAN_CLIP =
  "polygon(0% 0%, 4% 0%, 8% 0%, 12% 0%, 16% 0%, 20% 0%, 24% 0%, 28% 0%, 32% 0%, 36% 0%, 40% 0%, 44% 0%, 48% 0%, 52% 0%, 56% 0%, 60% 0%, 64% 0%, 68% 0%, 72% 0%, 76% 0%, 80% 0%, 84% 0%, 88% 0%, 92% 0%, 96% 0%, 100% 0%, 100% 100%, 0% 100%)";

const TORN_CLIP =
  "polygon(0% 0%, 4% 1.8%, 8% 0.3%, 12% 2.6%, 16% 0.7%, 20% 2.1%, 24% 0.4%, 28% 1.9%, 32% 0.6%, 36% 2.3%, 40% 0.8%, 44% 2%, 48% 0.5%, 52% 2.4%, 56% 0.9%, 60% 2.2%, 64% 0.4%, 68% 1.7%, 72% 0.3%, 76% 2.1%, 80% 0.8%, 84% 1.6%, 88% 0.2%, 92% 2.5%, 96% 0.7%, 100% 1.2%, 100% 100%, 0% 100%)";

const TEAR_THRESHOLD = 80;

const Main = () => {
  const container = useRef(null);
  const navRef = useRef(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const pageFeedRef = useRef<HTMLDivElement>(null);
  const pageInnerRef = useRef<HTMLDivElement>(null);
  const printingTL = useRef<gsap.core.Timeline | null>(null);
  const hasPrinted = useRef(false);
  const tearState = useRef({ active: false, startY: 0, dragY: 0 });

  useGSAP(
    () => {
      /* ---------------------------
         Smooth Scrolling
      --------------------------- */

      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        smoothTouch: 0.2,
        effects: true,
      });

      /* ---------------------------
         Hero Animation
         — characters snap in one at
           a time, typewriter-style,
           name first then subtitle
      --------------------------- */

      const heroSplit = SplitText.create(".hero-line", { type: "chars" });
      const subSplit = SplitText.create(".hero-sub", { type: "chars" });

      gsap.set(heroSplit.chars, { opacity: 0 });
      gsap.set(subSplit.chars, { opacity: 0 });
      gsap.set(cursorRef.current, { opacity: 0 });

      gsap
        .timeline()
        .to(heroSplit.chars, {
          opacity: 1,
          duration: 0,
          stagger: 0.045,
        })
        .to(
          subSplit.chars,
          {
            opacity: 1,
            duration: 0,
            stagger: 0.02,
          },
          "+=0.15",
        )
        .call(() => {
          // Cursor only appears once typing settles, at the subtitle
          // (the last place text was actually typed) — then blinks
          // indefinitely, like a resting terminal cursor.
          cursorRef.current?.classList.add("is-blinking");

          // The page unfold is gated on typing finishing, not a fixed
          // delay from page load, so it never starts mid-sentence.
          gsap.delayedCall(0.3, () => printingTL.current?.play());
        });

      /* ---------------------------
         Reveal Sections
         — skip anything inside
           page-feed; the print
           animation is its reveal
      --------------------------- */

      gsap.utils.toArray<Element>(".reveal").forEach((el) => {
        if (pageFeedRef.current?.contains(el)) return;

        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });

      /* ---------------------------
         Nav Active Highlight
         — exactly one nav-link is
           active at a time: whichever
           section's top is the last
           one crossed while scrolling
      --------------------------- */

      const navSections = gsap.utils.toArray<HTMLElement>("section[id]");

      const setActiveNav = () => {
        const scrollPos = window.scrollY + window.innerHeight * 0.3;
        let current: HTMLElement | null = null;

        navSections.forEach((section) => {
          if (section.offsetTop <= scrollPos) current = section;
        });

        document
          .querySelectorAll(".nav-link.active")
          .forEach((link) => link.classList.remove("active"));

        if (current) {
          const id = (current as HTMLElement).getAttribute("id");
          document
            .querySelector(`.nav-link[href="#${id}"]`)
            ?.classList.add("active");
        }
      };

      ScrollTrigger.create({
        trigger: "#smooth-content",
        start: "top top",
        end: "bottom bottom",
        onUpdate: setActiveNav,
        onRefresh: setActiveNav,
      });

      setActiveNav();

      /* ---------------------------
         Pin Navigation
      --------------------------- */

      ScrollTrigger.create({
        trigger: navRef.current,
        start: "top top",
        endTrigger: "#smooth-content",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });

      /* ---------------------------
         Printer Animation Timeline

         The illusion: content starts
         translated UP by its full
         height — tucked inside the
         machine above the printer bar
         — and descends into view.

         The page-feed container is
         sized to its FINAL height up
         front (not animated) so the
         document's total scroll height,
         and the native scrollbar, stay
         static throughout — only the
         inner content's position moves.
      --------------------------- */

      const contentHeight =
        pageInnerRef.current?.getBoundingClientRect().height ?? 600;

      gsap.set(pageFeedRef.current, { height: contentHeight });
      gsap.set(pageInnerRef.current, { y: -contentHeight });

      printingTL.current = gsap.timeline({ paused: true });

      printingTL.current
        // 1. Bar sweeps
        .fromTo(
          ".printer-line",
          { width: "0%" },
          { width: "100%", duration: 0.6, ease: "power2.inOut" },
        )

        // 2. Content descends — paper feeding out of the slot
        .to(
          pageInnerRef.current,
          {
            y: 0,
            duration: 2.6,
            ease: "power1.inOut",
            onComplete: () => {
              // Let the container adapt to future reflows (e.g. resize)
              gsap.set(pageFeedRef.current, { height: "auto" });
              hasPrinted.current = true;

              // The nav pin + active-highlight triggers were measured
              // before content settled — recompute their boundaries now.
              ScrollTrigger.refresh();
            },
          },
          "-=0.05",
        );

      // Played once the hero typing timeline finishes (see its .call()
      // above) instead of on a fixed delay from page load.

      /* ---------------------------
         Smooth Scroll Nav
      --------------------------- */

      const links = document.querySelectorAll(".nav-link");

      const handler = (e: Event) => {
        e.preventDefault();
        const target = (e.currentTarget as HTMLAnchorElement).getAttribute(
          "href",
        );
        ScrollSmoother.get()?.scrollTo(target as string, true, "top 140px");
      };

      links.forEach((link) => link.addEventListener("click", handler));

      return () => {
        links.forEach((link) => link.removeEventListener("click", handler));
      };
    },
    { scope: container },
  );

  /* ---------------------------
     Tear Gesture
  --------------------------- */

  const onBarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hasPrinted.current || !pageFeedRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    tearState.current = { active: true, startY: e.clientY, dragY: 0 };
    gsap.set(pageFeedRef.current, { clipPath: CLEAN_CLIP });
  };

  const onBarPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tearState.current.active || !pageFeedRef.current) return;
    const delta = Math.max(0, e.clientY - tearState.current.startY);
    tearState.current.dragY = delta;
    gsap.set(pageFeedRef.current, { y: delta * 0.7 });
    gsap.set(pageFeedRef.current, {
      clipPath: delta >= TEAR_THRESHOLD ? TORN_CLIP : CLEAN_CLIP,
    });
  };

  const onBarPointerUp = () => {
    if (!tearState.current.active || !pageFeedRef.current) return;
    tearState.current.active = false;
    const el = pageFeedRef.current;

    if (tearState.current.dragY >= TEAR_THRESHOLD) {
      gsap.set(el, { clipPath: TORN_CLIP });
      gsap.to(el, {
        delay: 0.08,
        y: window.innerHeight + el.offsetHeight,
        x: 30 + Math.random() * 20,
        rotation: 8 + Math.random() * 8,
        duration: 0.95,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(el, {
            y: 0,
            x: 0,
            rotation: 0,
            clipPath: "none",
            height: 0,
          });
          gsap.set(pageInnerRef.current, { y: 0 });
          hasPrinted.current = false;
          printingTL.current?.pause(0);
        },
      });
    } else {
      gsap.to(el, { y: 0, duration: 0.5, ease: "back.out(1.7)" });
      gsap.set(el, { clipPath: CLEAN_CLIP });
    }
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Matches parcel-thumbnail.jpg's actual 1280x720 (16:9) size -- a
  // mismatched aspect ratio here is what causes letterboxing, since
  // image() fits the source into the canvas preserving its own ratio.
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 450;

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

    let video: TextmodeImage | undefined;
    let cancelled = false;

    t.setup(async () => {
      const loaded = await t.loadImage("/parcel-thumbnail.jpg");
      if (cancelled) return;
      video = loaded;
      video.characters(" .:-=+*#%@");
      video.cellColorMode("sampled");
    });

    t.draw(() => {
      t.background(0);

      if (video) {
        // No explicit width/height: those are measured in grid cells,
        // not pixels, so passing the canvas's pixel dimensions here
        // was asking for an image hundreds of cells too large. Omitting
        // them uses image()'s own aspect-ratio-preserving fit instead.
        t.image(video);
      }
    });

    return () => {
      cancelled = true;
      t.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center relative z-0" ref={container}>
      <div
        className="flex flex-col items-center h-full border-accent-foreground"
        id="smooth-wrapper"
      >
        <div
          id="smooth-content"
          className="w-full max-w-[1100px] min-w-0 flex flex-col md:my-8"
        >
          {/* -------------------------
              HERO + NAV FRAME
              — border only wraps this
                part immediately; the
                page-feed's own frame
                (below) stays invisible
                until the paper actually
                prints out, even though
                its space is reserved
                the whole time.
          ------------------------- */}

          <div className="border-dashed md:border-t md:border-x border-black/70 dark:border-white/70 flex flex-col">
            {/* -------------------------
                HERO HEADER
            ------------------------- */}

            <div
              className="flex flex-col tracking-wide md:text-9xl text-5xl text-center p-6
            md:p-10 pb-0 bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]"
            >
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="absolute top-0 left-0 w-full overflow-hidden"
              ></canvas>
              <div className="flex flex-wrap gap-2 items-center justify-center leading-[85%] font-heading">
                <h1 className="hero-line">TRISTAN</h1>
                <h1 className="hero-line">JOHNSTON</h1>
              </div>
              <h3 className="hero-sub md:text-3xl text-lg mb-4 tracking-tight md:tracking-wide">
                Software Engineer · Full-Stack Developer
                <span
                  ref={cursorRef}
                  className="typewriter-cursor"
                  aria-hidden="true"
                />
              </h3>
            </div>

            {/* -------------------------
                PRINTER BAR + DRAG HANDLE
            ------------------------- */}

            <div
              ref={navRef}
              style={{ pointerEvents: "auto" }}
              className="relative z-10 bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]"
            >
              <Nav />

              <div
                className="printer-line h-[2px] w-0 mx-auto border-b-2 border-dashed border-accent-foreground"
                style={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  marginTop: "-10px",
                  touchAction: "none",
                  cursor: hasPrinted.current ? "grab" : "default",
                }}
                onPointerDown={onBarPointerDown}
                onPointerMove={onBarPointerMove}
                onPointerUp={onBarPointerUp}
              />
            </div>
          </div>

          {/* -------------------------
              PAGE FEED WRAPPER
              — a plain clipping mask,
                no fill or border of its
                own. Its height is
                reserved up front (see
                useGSAP) so the scrollbar
                never grows, but it's
                otherwise invisible —
                you're looking straight
                through to the page's
                own dotted background
                until the paper (below)
                slides down into it.
          ------------------------- */}

          <div
            ref={pageFeedRef}
            className="page-feed overflow-hidden"
            style={{ height: 0 }}
          >
            {/* The paper itself — background, border, and all — starts
                translated up out of the clipping window and descends
                to y:0. The border only becomes visible because the
                paper physically slides into view, not via any fade. */}
            <div
              ref={pageInnerRef}
              className="border-dashed md:border-x md:border-b border-black/70 dark:border-white/70 bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]"
            >
              <div className="page p-6 md:p-10">
                <section className="grid grid-cols-1 md:grid-cols-12 w-full md:mt-6">
                  {/* About */}
                  <section
                    id="about"
                    className="flex flex-col col-span-8 md:border-r p-4 md:pr-8 pt-8 md:pt-4
                    border-accent-foreground/10 border-dashed"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    <IntroductionBlurb />
                  </section>

                  {/* Sidebar */}
                  <section
                    className="flex flex-col col-span-4 justify-center items-center p-6 md:pl-8 pt-8"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    <div className="w-full h-full flex flex-col [&_h3]:text-lg [&_a]:text-lg">
                      <BioItem label={"location"}>
                        <h3>Birmingham, AL</h3>
                      </BioItem>

                      <BioItem label={"Focus"}>
                        <h3>Full-Stack Systems</h3>
                        <h3>Data Visualization</h3>
                      </BioItem>

                      <BioItem label={"Stack"}>
                        <h3>TypeScript / JavaScript</h3>
                        <h3>Python</h3>
                        <h3>React / Next.js</h3>
                        <h3>Node.js / Express / FastAPI</h3>
                        <h3>PostgreSQL / MySQL / PostGIS</h3>
                        <h3>Docker / AWS</h3>
                      </BioItem>

                      <BioItem label={"Links"}>
                        <div
                          id="contact"
                          className="flex flex-col w-fit scroll-mt-24"
                        >
                          <a
                            href="https://github.com/TristanCC"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-b border-orange-500 w-fit
                            px-1 py-0.5 transition-colors duration-300
                            hover:text-orange-500"
                          >
                            GitHub ↗
                          </a>
                          <a
                            href="https://linkedin.com/in/tristan-johnston-37817a282"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-b border-orange-500 w-fit
                            px-1 py-0.5 transition-colors duration-300
                            hover:text-orange-500"
                          >
                            LinkedIn ↗
                          </a>
                          <a
                            href="mailto:tristan.c.johnston@gmail.com"
                            className="border-b border-orange-500 w-fit
                            px-1 py-0.5 transition-colors duration-300
                            hover:text-orange-500"
                          >
                            tristan.c.johnston@gmail.com ↗
                          </a>
                        </div>
                      </BioItem>
                    </div>
                  </section>
                </section>

                {/* Experience */}
                <section
                  id="experience"
                  className="p-4 md:p-8 pt-8 border-t border-accent-foreground/10 border-dashed"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  <Experience />
                </section>

                {/* Work */}
                <section
                  id="work"
                  className="p-4 md:p-8 pt-8 border-t border-accent-foreground/10 border-dashed"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  <Work />
                </section>
              </div>
            </div>
          </div>
          {/* end .page-feed */}
        </div>
      </div>
    </div>
  );
};

export default Main;

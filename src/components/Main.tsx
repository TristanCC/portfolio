"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "./Nav";
import IntroductionBlurb from "./sections/IntroductionBlurb";
import BioItem from "./ui/BioItem";

import {
  ScrollSmoother,
  ScrollTrigger,
  ScrambleTextPlugin,
  SplitText,
} from "gsap/all";

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
      --------------------------- */

      gsap.from(".hero-line", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      });

      gsap.from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.25,
      });

      /* ---------------------------
         Reveal Sections
         — skip anything inside
           page-feed; the print
           animation is its reveal
      --------------------------- */

      gsap.utils.toArray(".reveal").forEach((el: any) => {
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
      --------------------------- */

      gsap.utils.toArray("section[id]").forEach((section: any) => {
        const id = section.getAttribute("id");

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          toggleClass: {
            targets: `.nav-link[href="#${id}"]`,
            className: "active",
          },
        });
      });

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
         machine above the printer bar.
         Container height grows AND
         content descends in sync, both
         power1.inOut, so text appears
         to physically move WITH the
         paper through the slot.
      --------------------------- */

      printingTL.current = gsap.timeline({ paused: true });

      // Measure content height at play-time via a functional tween
      const getContentHeight = () =>
        pageInnerRef.current?.scrollHeight ?? 600;

      printingTL.current
        // 1. Bar sweeps
        .fromTo(
          ".printer-line",
          { width: "0%" },
          { width: "100%", duration: 0.6, ease: "power2.inOut" },
        )

        // 2. Container grows + content descends simultaneously.
        //    Both share the same ease + duration so they stay locked —
        //    the content top always sits exactly at the printer bar.
        .add(() => {
          const h = getContentHeight();

          // Set content to start fully above the printer bar
          gsap.set(pageInnerRef.current, { y: -h });

          const DURATION = 2.6;
          const EASE = "power1.inOut";

          // Container opens to reveal the space
          gsap.fromTo(
            pageFeedRef.current,
            { height: 0 },
            { height: h, duration: DURATION, ease: EASE },
          );

          // Content descends in lockstep — paper feeding out of the slot
          gsap.to(pageInnerRef.current, {
            y: 0,
            duration: DURATION,
            ease: EASE,
            onComplete: () => {
              // Swap height to auto so the layout is normal after printing
              gsap.set(pageFeedRef.current, { height: "auto" });
              hasPrinted.current = true;
            },
          });
        }, "-=0.05");

      /* ---------------------------
         Smooth Scroll Nav
      --------------------------- */

      const links = document.querySelectorAll(".nav-link");

      const handler = (e: any) => {
        e.preventDefault();
        const target = e.currentTarget.getAttribute("href");
        ScrollSmoother.get()?.scrollTo(target, true, "top center");
      };

      links.forEach((link) => link.addEventListener("click", handler));

      return () => {
        links.forEach((link) => link.removeEventListener("click", handler));
      };
    },
    { scope: container },
  );

  const handlePrint = () => {
    printingTL.current?.play();
  };

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

  const onBarPointerUp = (_e: React.PointerEvent<HTMLDivElement>) => {
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

  return (
    <div className="flex flex-col items-center relative z-0" ref={container}>
      <div
        className="flex flex-col items-center h-full border-accent-foreground"
        id="smooth-wrapper"
      >
        <div
          id="smooth-content"
          className="w-full max-w-[1100px] min-w-0 border-dashed md:border flex flex-col
          border-black/70 dark:border-white/70 md:my-8
          "
        >
          {/* -------------------------
              HERO HEADER
          ------------------------- */}

          <div className="flex flex-col tracking-wide md:text-9xl text-5xl text-center p-6 
          md:p-10 pb-0 bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]">
            <div className="flex flex-wrap gap-2 items-center justify-center leading-[85%] font-heading">
              <h1 className="hero-line">TRISTAN</h1>
              <h1 className="hero-line">JOHNSTON</h1>
            </div>
            <h3 className="hero-sub md:text-3xl text-lg mb-4 tracking-tight md:tracking-wide">
              Software Engineer · Full-Stack Developer
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

          {/* Dev trigger */}
          <button
            type="button"
            onClick={handlePrint}
            className="bg-orange-500 px-4 py-2 text-white rounded z-20 cursor-pointer fixed top-0 right-0"
          >
            Print Page
          </button>

          {/* -------------------------
              PAGE FEED WRAPPER
              — overflow hidden clips
                content at the printer bar.
                Inner div starts y:-H and
                descends to y:0 in lockstep
                with container height.
          ------------------------- */}

          <div
            ref={pageFeedRef}
            className="page-feed overflow-hidden border-1 border-dashed border-accent-foreground/10 bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]"
            style={{ height: 0 }}
          >
            {/* All page content lives here — no independent reveal anims */}
            <div ref={pageInnerRef}>
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
                        <h3>TypeScript</h3>
                        <h3>React / Next.js</h3>
                        <h3>Python</h3>
                        <h3>PostgreSQL / PostGIS</h3>
                      </BioItem>

                      <BioItem label={"Links"}>
                        <div className="flex flex-col w-fit">
                          <a
                            href="https://github.com/TristanCC"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-b border-dashed border-orange-500 w-fit
                            px-1 py-0.5 transition-colors duration-300
                            hover:text-orange-500"
                          >
                            GitHub ↗
                          </a>
                          <a
                            href="https://linkedin.com/in/tristan-johnston-37817a282"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-b border-dashed border-orange-500 w-fit
                            px-1 py-0.5 transition-colors duration-300
                            hover:text-orange-500"
                          >
                            LinkedIn ↗
                          </a>
                          <a
                            href="mailto:tristan.c.johnston@gmail.com"
                            className="border-b border-dashed border-orange-500 w-fit
                            px-1 py-0.5 transition-colors duration-300
                            hover:text-orange-500"
                          >
                            Email ↗
                          </a>
                        </div>
                      </BioItem>
                    </div>
                  </section>
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
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Nav from "./Nav";
import IntroductionBlurb from "./sections/IntroductionBlurb";
import Experience from "./sections/Experience";
import Work from "./sections/Work";
import MetaStamp from "./ui/MetaStamp";
import HeroIllustration from "./HeroIllustration";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Main = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      /* ---------------------------
         Hero — a single restrained
         fade/rise on load, no
         character-by-character typing
      --------------------------- */

      gsap.from(".hero-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
      });

      /* ---------------------------
         Section reveals on scroll
      --------------------------- */

      gsap.utils.toArray<Element>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    },
    { scope: container },
  );

  /* ---------------------------
     Active nav link — whichever
     section is most in view
  --------------------------- */

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`,
          );
          if (entry.isIntersecting) {
            document
              .querySelectorAll(".nav-link.active")
              .forEach((el) => el.classList.remove("active"));
            link?.classList.add("active");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} className="min-h-screen relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        {/* Column guides -- pinned to this same max-width container
            (not the viewport), so they stay locked to the actual
            12-col grid the sections below use instead of drifting
            independently as the window resizes. */}
        <div
          aria-hidden
          className="hidden md:grid absolute inset-0 grid-cols-12 pointer-events-none -z-10"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r hairline" />
          ))}
        </div>

        {/* -------------------------
            HEADER
        ------------------------- */}
        <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b hairline">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 md:py-5">
            <a
              href="#top"
              className="font-heading font-medium tracking-tight text-sm md:text-base"
            >
              TRISTAN JOHNSTON
            </a>
            <Nav />
          </div>
        </header>

        <main id="top">
          {/* -------------------------
              HERO — a catalog entry
              for the person, not a
              poster. Same D/R/L/T
              stamp used everywhere
              else on the page.
          ------------------------- */}
          <section className="relative overflow-hidden py-16 md:py-24 border-b hairline">
            <HeroIllustration />

            <div className="relative z-10">
              <div className="hero-reveal font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
                Personal archive — est. 2024
              </div>
              <h1 className="hero-reveal font-heading font-bold tracking-tighter leading-[0.95] text-[clamp(3.25rem,10vw,7rem)] mb-8">
                TRISTAN JOHNSTON
              </h1>
              <MetaStamp
                className="hero-reveal max-w-md"
                lines={[
                  { label: "R", value: "Software Engineer, Full-Stack" },
                  { label: "L", value: "Birmingham, AL" },
                  {
                    label: "S",
                    value: (
                      <span className="inline-flex items-center gap-2">
                        <span className="live-dot" />
                        Available for work
                      </span>
                    ),
                  },
                ]}
              />
            </div>
          </section>

          {/* -------------------------
              ABOUT
          ------------------------- */}
          <section
            id="about"
            className="reveal grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-10 py-20 md:py-28 border-b hairline scroll-mt-20"
          >
            <div className="md:col-span-8">
              <IntroductionBlurb />
            </div>

            <div className="md:col-span-4 space-y-8">
              <MetaStamp
                lines={[
                  { label: "L", value: "Birmingham, AL" },
                  {
                    label: "F",
                    value: "Full-stack systems, data visualization",
                  },
                  {
                    label: "T",
                    value:
                      "TypeScript, Python, React/Next.js, Node/Express/FastAPI, Postgres/MySQL/PostGIS, Docker/AWS",
                  },
                ]}
              />

              <div className="font-mono text-xs space-y-1.5">
                <div className="text-muted-foreground uppercase tracking-[0.1em] mb-2">
                  Links
                </div>
                <a
                  href="https://github.com/TristanCC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-fit hover:text-[var(--accent-red)] transition-colors duration-200"
                >
                  → GITHUB
                </a>
                <a
                  href="https://linkedin.com/in/tristan-johnston-37817a282"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-fit hover:text-[var(--accent-red)] transition-colors duration-200"
                >
                  → LINKEDIN
                </a>
                <a
                  href="mailto:tristan.c.johnston@gmail.com"
                  className="block w-fit hover:text-[var(--accent-red)] transition-colors duration-200"
                >
                  → EMAIL
                </a>
              </div>
            </div>
          </section>

          {/* -------------------------
              EXPERIENCE
          ------------------------- */}
          <section
            id="experience"
            className="reveal py-20 md:py-28 border-b hairline scroll-mt-20"
          >
            <Experience />
          </section>

          {/* -------------------------
              WORK
          ------------------------- */}
          <section
            id="work"
            className="reveal py-20 md:py-28 border-b hairline scroll-mt-20"
          >
            <Work />
          </section>

          {/* -------------------------
              CONTACT
          ------------------------- */}
          <section id="contact" className="reveal py-20 md:py-28 scroll-mt-20">
            <div className="font-mono text-xs tracking-[0.15em] text-muted-foreground mb-3">
              [04] CONTACT
            </div>
            <h2 className="font-heading font-bold tracking-tight text-4xl md:text-6xl mb-10">
              Get in touch.
            </h2>

            <MetaStamp
              lines={[
                {
                  label: "C",
                  value: (
                    <a
                      href="mailto:tristan.c.johnston@gmail.com"
                      className="hover:text-[var(--accent-red)] transition-colors duration-200"
                    >
                      tristan.c.johnston@gmail.com
                    </a>
                  ),
                },
                {
                  label: "→",
                  value: (
                    <a
                      href="https://github.com/TristanCC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent-red)] transition-colors duration-200"
                    >
                      GITHUB
                    </a>
                  ),
                },
                {
                  label: "→",
                  value: (
                    <a
                      href="https://linkedin.com/in/tristan-johnston-37817a282"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent-red)] transition-colors duration-200"
                    >
                      LINKEDIN
                    </a>
                  ),
                },
              ]}
              className="text-sm md:text-base"
            />
          </section>
        </main>

        <footer className="py-8 flex flex-wrap justify-between gap-2 font-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} TRISTAN JOHNSTON</span>
          <span>BIRMINGHAM, AL</span>
        </footer>
      </div>
    </div>
  );
};

export default Main;

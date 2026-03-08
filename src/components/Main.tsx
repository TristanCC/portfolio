"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Nav from "./Nav";
import Skills from "./sections/Skills";
import Hero from "./sections/Hero";
import IntroductionBlurb from "./sections/IntroductionBlurb";
import {
  ScrambleTextPlugin,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
} from "gsap/all";

gsap.registerPlugin(
  useGSAP,
  ScrambleTextPlugin,
  SplitText,
  ScrollTrigger,
  ScrollSmoother,
);

const Main = () => {
  const container = useRef(null);
  const navRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          effects: true,
          smoothTouch: 0.2,
        });

        gsap.utils.toArray(".reveal").forEach((el) => {
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

        gsap.utils.toArray("section[id]").forEach((section) => {
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


        ScrollTrigger.create({
          trigger: navRef.current,
          start: "top top",
          endTrigger: "#smooth-content",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });

        document.querySelectorAll(".nav-link").forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault();

            const target = link.getAttribute("href");
            ScrollSmoother.get().scrollTo(target, true, "top center");
          });
        });
      }, container);

      return () => ctx.revert();
    },
    { scope: container },
  );

  return (
    <div className="flex flex-col items-center relative z-0" ref={container}>
      <div
        className="flex flex-col items-center h-full border-accent-foreground"
        id="smooth-wrapper"
      >
        <div
          className="w-full max-w-[1000px] min-w-0 p-2 md:p-4 border-dashed md:border-2
          border-black/70 dark:border-white/70 md:my-8
          bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]"
          id="smooth-content"
        >
          {/* Header */}
          <div className="flex flex-col justify-center items-center tracking-wide md:text-9xl text-5xl p-4 pb-0 md:mb-4 text-center">
            <div className="flex flex-wrap gap-2 items-center justify-center leading-[85%] font-heading">
              <h1>TRISTAN</h1>
              <h1>JOHNSTON</h1>
            </div>

            <h3 className=" subheading md:text-4xl text-xl py-2">
              Software Engineer · Full-Stack Developer
            </h3>
          </div>

          {/* Sticky Nav */}
          <div
            ref={navRef}
            className="z-10 bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]"
          >
            <Nav />
          </div>

          <div className="md:w-2/3 border-r px-4  border-accent-foreground ">
            <Hero/>
          </div>

          {/* Content Grid */}
          <section className="grid grid-cols-1 md:grid-cols-12 w-full [&>*:nth-child(even)]:border-0">
            <section
              id="about"
              className="flex flex-col col-span-8 border-accent-foreground md:border-r md:p-4 md:pr-6 pt-6 reveal"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <IntroductionBlurb />
            </section>

            <section
              id="work"
              className="flex flex-col border-accent-foreground md:border-r md:p-4 md:pr-6 pt-6 reveal"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <Skills />
            </section>

          </section>
        </div>
      </div>
    </div>
  );
};

export default Main;

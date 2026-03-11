"use client";

import { useRef, useState } from "react";
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

import Image from "next/image";

gsap.registerPlugin(
  useGSAP,
  ScrambleTextPlugin,
  SplitText,
  ScrollTrigger,
  ScrollSmoother,
);

const Main = () => {
  const [current, setCurrent] = useState(0);
  const images = ["./dogAsset2.svg"];

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
        {/* Main Container */}
        <div
          className="w-full max-w-[1100px] min-w-0 p-6 md:p-10 border-dashed md:border-2
          border-black/70 dark:border-white/70 md:my-8
          bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]"
          id="smooth-content"
        >
          {/* Header */}
          <div className="flex flex-col tracking-wide md:text-9xl text-5xl pt-6 pb-2 text-center">
            <div className="flex flex-wrap gap-2 items-center justify-center leading-[85%] font-heading">
              <h1 className="hero-line">TRISTAN</h1>
              <h1 className="hero-line">JOHNSTON</h1>
            </div>

            <h3 className="subheading hero-sub md:text-4xl text-xl mt-2 mb-4 tracking-tighter md:tracking-wide" >
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

          {/* Content Grid */}
          <section className="grid grid-cols-1 md:grid-cols-12 w-full mt-6">
            {/* About Section */}
            <section
              id="about"
              className="flex flex-col col-span-8 md:border-r-2 p-6 md:pr-8 pt-8 border-accent-foreground/10 border-dashed reveal"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <IntroductionBlurb />
            </section>

            {/* Phone Section */}
            <section
              id="about"
              className="flex flex-col col-span-4 justify-center items-center p-6 md:pl-8 pt-8 reveal"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <div style={{ position: "relative" }}>
                {/* Phone Frame */}
                <Image
                  src="./phoneAsset1.svg"
                  alt="phone"
                  width={333}
                  height={333}
                  style={{ position: "relative", zIndex: 2 }}
                />

                {/* Swipeable Content */}
                <div
                  style={{
                    position: "absolute",
                    top: "12%",
                    left: "10%",
                    width: "80%",
                    height: "76%",
                    overflow: "hidden",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: `${images.length * 100}%`,
                      height: "100%",
                      transform: `translateX(-${(current * 100) / images.length}%)`,
                      transition: "transform 0.3s ease",
                    }}
                  >
                    {images.map((src, i) => (
                      <div
                        key={i}
                        style={{
                          width: `${100 / images.length}%`,
                          height: "100%",
                          flexShrink: 0,
                          position: "relative",
                          filter: "invert(24%) sepia(31%) saturate(10000%) hue-rotate(45deg) brightness(125%) contrast(121%)"
                        }}
                      >
                        <Image
                          src={src}
                          alt={`slide ${i}`}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Main;

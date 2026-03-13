"use client";

import { useRef, useState, useEffect } from "react";
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

import Phone from "./Phone.tsx";
import BioItem from "./ui/BioItem";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

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
          className="w-full max-w-[1100px] min-w-0 p-6 md:p-10 border-dashed md:border-1
          border-black/70 dark:border-white/70 md:my-8
          bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]"
          id="smooth-content"
        >
          {/* Header */}
          <div className="flex flex-col tracking-wide md:text-9xl text-5xl pt-4 pb-0 text-center">
            <div className="flex flex-wrap gap-2 items-center justify-center leading-[85%] font-heading">
              <h1 className="hero-line">TRISTAN</h1>
              <h1 className="hero-line">JOHNSTON</h1>
            </div>

            <h3 className="subheading hero-sub md:text-3xl text-lg  mb-4 tracking-tighter md:tracking-wide">
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

          <div className="w-full"><p>hello</p></div>

          {/* Content Grid */}

          <section className="grid grid-cols-1 md:grid-cols-12 w-full md:mt-6">
            {/* About Section */}
            <section
              id="about"
              className="flex flex-col col-span-8 md:border-r-1 p-4 md:pr-8 pt-8 md:pt-4 
              border-accent-foreground/10 border-dashed reveal"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <IntroductionBlurb />
            </section>

            {/* Phone Section */}
            <section
              id="about"
              className="flex flex-col col-span-4 justify-center items-center p-6 md:pl-8 pt-8 reveal "
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <div className="w-full h-full flex flex-col [&_h3]:text-lg  [&_a]:text-lg">
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
            <section
              id="work"
              className="flex flex-col col-span-8 md:border-r-1 p-4 md:pr-8 pt-8 md:pt-4  justify-center
              border-accent-foreground/10 border-dashed reveal"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Main;

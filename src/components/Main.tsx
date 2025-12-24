import { useState, useRef } from "react";

import { syne } from "../app/fonts";

import Nav from "./Nav";
import Skills from "./sections/Skills";
import IntroductionBlurb from "./sections/IntroductionBlurb";
import Image from "next/image";

const Main = () => {
  const wrapperRef = useRef(null);
  const navRef = useRef(null);

  return (
    <>
      <div
        className="flex flex-col z-10 justify-center items-center overflow-y"
        ref={wrapperRef}
      >
        <div className="portfolio-wrapper flex flex-col items-center z-50  h-full border-accent-foreground">
          <div
            className="w-[100lvw] max-w-[1000px] z-10 p-2 md:p-4 md:border-2 md:rounded-2xl 
            border-black/70 dark:border-white/70 md:my-8
             backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] bg-white/95 dark:bg-[#121212]/95"
          >
            <div>
              <div
                className="flex flex-col justify-center items-start tracking-wide md:text-9xl
                 text-6xl mix-blend-hard-light p-4 pb-0 pl-0 md:mb-4 "
              >
                <div className="flex border-accent-foreground gap-2 md:gap-6 flex-wrap leading-[75%] ">
                  <h1>TRISTAN</h1>
                  <h1>JOHNSTON</h1>
                </div>
                <h3 className="md:text-4xl text-2xl md:pl-4  pt-2">
                  Software Engineer/Full-Stack Developer
                </h3>
              </div>

              <div ref={navRef}>
                <Nav />
              </div>
            </div>

            <section
              className="flex flex-wrap w-full [&>*:nth-child(odd)]:w-[450px]
              [&>*:nth-child(odd)]:md:border-r-2 [&>*:nth-child(odd)]:md:border-accent-foreground [&>*]:grow self-center"
            >
              <section
                className={`flex flex-col justify-start md:w-1/2 p-4 pr-6 pt-6 `}
                style={{ fontFamily: "var(--font-syne)" }}
              >
                <IntroductionBlurb />
              </section>
              <section
                className={`flex flex-wrap justify-start md:w-1/2 p-4 pr-6 pt-6 `}
                style={{ fontFamily: "var(--font-syne)" }}
              >
                <Skills />
              </section>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

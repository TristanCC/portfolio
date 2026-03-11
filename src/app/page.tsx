"use client";

import { useState } from "react";

import Intro from "@/components/Intro";
import ThreeScene from "@/components/Three";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TextPlugin } from "gsap/all";
import Main from "@/components/Main";
import SettingsGear from "@/components/SettingsGear";

export default function Home() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const navRef = useRef(null);

  const topTitle: string[] = ["SOFTWARE", "WEB", "FULL"];
  const bottomTitle: string[] = ["ENGINEER", "DEVELOPER", "STACK"];

  gsap.registerPlugin(TextPlugin);

  /*   useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".shader",
        { clipPath: "inset(50% 0% 49.9% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.5,
          delay: 2,
          ease: "power2.inOut",
        }
      );

            tl.fromTo(
        ".main",
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 0.33,
          ease: "power2.inOut",
        }
      );
    },
    { scope: containerRef }
  ); */

  const [shaderOn, setShaderOn] = useState(true);

  return (
    <>
      <div className="w-full h-full bg-accent overflow-visible fixed opacity-0"></div>
      <div className="overflow-visible" ref={containerRef}>
        <div
          className={`inset-0 left-0 right-0 w-full h-[100lvh] shader will-change-auto fixed ${
            shaderOn ? "hidden" : "hidden"
          }`}
        >
          <ThreeScene />
        </div>
        <div
          className="fixed inset-0 w-full h-full pointer-events-none bg-[radial-gradient(hsl(38,33%,70%)_1px,transparent_1px)] 
        dark:bg-[radial-gradient(hsl(38,33%,10%)_1px,transparent_1px)] bg-[size:16px_16px] bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]  "
        >
          {/* <Intro /> */}
        </div>
        <SettingsGear shaderOn={shaderOn} setShaderOn={setShaderOn} />
        <div className=" relative z-0  main">
          <Main />
        </div>
      </div>
    </>
  );
}

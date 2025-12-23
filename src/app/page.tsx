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

  useGSAP(
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
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".portfolio-wrapper",
        { opacity: 0 },
        { opacity: 1, delay: 3.25 }
      );
    },
    { scope: wrapperRef }
  );

  useGSAP(
    () => {
      gsap.to(".navLink", {});
    },
    { scope: navRef }
  );

  const [shaderOn, setShaderOn] = useState(true);

  return (
    <>
      <div className="w-full h-full bg-accent fixed opacity-0"></div>
      <div className="" ref={containerRef}>
        <div
          className={`inset-0 -z-10 w-screen h-[100lvh] overflow-hidden shader will-change-auto fixed ${
            shaderOn ? "visible" : "hidden"
          }`}
        >
          <ThreeScene />
        </div>
        <SettingsGear shaderOn={shaderOn} setShaderOn={setShaderOn} />
        <Intro />
        <Main />
      </div>
    </>
  );
}

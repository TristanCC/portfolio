"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle";
import Hero from "@/components/Intro";
import ThreeScene from "@/components/Three";

import {gsap} from "gsap"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TextPlugin } from "gsap/all";
import CardTemplate from "@/components/cards/CardTemplate";
import Bio from "@/components/cards/Bio";
import { Repeat } from "lucide-react";

export default function Home() {

  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  const topTitle: string[] = ["SOFTWARE", "WEB", "FULL"]
  const bottomTitle: string[] = ["ENGINEER", "DEVELOPER", "STACK"]

  gsap.registerPlugin(TextPlugin);

useGSAP(() => {

  const tl = gsap.timeline()

  tl.fromTo(
    ".shader",
    { clipPath: "inset(50% 0% 49.9% 0%)", opacity: 0 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration: 1.5,
      delay: 2,
      ease: "power2.inOut"
    }
  );
}, { scope: containerRef });

useGSAP(() => {
  const tl = gsap.timeline();

  tl.fromTo(".portfolio-wrapper",
    { opacity: 0 },
    { opacity: 1, delay: 3.25 }
  );

}, { scope: wrapperRef });

useGSAP(() => {
  const topTitle = ["SOFTWARE", "WEB", "FULL"];
  const bottomTitle = ["ENGINEER", "DEVELOPER", "STACK"];

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

  topTitle.forEach((text, i) => {
    tl.to(".top-title", {
      duration: 0.6,
      text: text,
      ease: "power2.inOut",
      delay: 1, // avoid delay at first step
    });

    tl.to(".bottom-title", {
      duration: 0.6,
      text: bottomTitle[i],
      ease: "power2.inOut",
    }, "<"); // "<" means sync with previous tween
  });

  tl.to('.top-title', {
    duration: 0.6,
    text: topTitle[0],
    ease: "power2.inOut",
    delay:1
  })
    tl.to('.bottom-title', {
    duration: 0.6,
    text: bottomTitle[0],
    ease: "power2.inOut",
  }, "<")


}, { scope: wrapperRef });


  return (

    <div className="overflow-hidden" ref={containerRef}>
      <div className="inset-0 -z-10 w-screen h-[100lvh] overflow-hidden shader will-change-auto fixed">
        <ThreeScene />
      </div>

      <div className="w-full h-full bg-background fixed opacity-35 pointer-events-none">

      </div>

      <Hero/>
        
      <div className="" ref={wrapperRef}>  
        <div className="portfolio-wrapper flex flex-col overflow-hidden justify-center items-center -z-50 my-8">
          <div>
            <div className="flex flex-col justify-center items-start font-black tracking-wide md:text-9xl text-6xl mix-blend-hard-light">
              <h1>TRISTAN</h1>
              <h1>JOHNSTON</h1>
            </div>
            
            <div>
              <ul className="flex flex-row gap-8 justify-start items-start md:text-4xl text-2xl my-4 font-bold w-full">
                <li className="hover:bg-accent mix-blend-hard-light hover:outline-4 outline-sidebar-accent-foreground md:p-4 text-shadow-lg rounded-xs"><a href="">ABOUT</a></li>
                <li className="hover:bg-accent mix-blend-hard-light hover:outline-4 outline-sidebar-accent-foreground md:p-4 text-shadow-lg rounded-xs"><a href="">WORK</a></li>
                <li className="hover:bg-accent mix-blend-hard-light hover:outline-4 outline-sidebar-accent-foreground md:p-4 text-shadow-lg rounded-xs"><a href="">CONTACT</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col justify-center font-mono items-center frame border-4 border-[rgba(12,12,12,0.3)]
           w-[clamp(320px,50%,800px)] rounded-lg bg-background opacity-90">
            <div className="flex flex-col justify-center items-center font-bold tracking-wider md:text-8xl text-5xl w-full p-4 border-15 rounded-sm">
              <h1 className="top-title">SOFTWARE</h1>
              <h1 className="bottom-title">ENGINEER</h1>
        
              <div className="md:text-3xl text-xl tracking-wide w-full pt-4  mt-4 flex justify-center items-center border-foreground">
                <h1>view my projects -></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed right-0  z-10 bottom-0 m-4">
        <ThemeToggle />
      </div>
    </div>

  );
}

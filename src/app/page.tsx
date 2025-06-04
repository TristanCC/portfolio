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
import { ScrollTrigger } from "gsap/all";

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
  const topTitle = ["SOFTWARE", "WEB"];
  const bottomTitle = ["ENGINEER", "DEVELOPER"];

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

  topTitle.forEach((text, i) => {
    tl.to(".top-title", {
      duration: 1.5,
      text: text,
      ease: "power2.inOut",
      delay: 1, // avoid delay at first step
    });

    tl.to(".bottom-title", {
      duration: 1.5,
      text: bottomTitle[i],
      ease: "power2.inOut",
    }, "<"); // "<" means sync with previous tween
  });

  tl.to('.top-title', {
    duration: 1.5,
    text: topTitle[0],
    ease: "power2.inOut",
    delay:1,
  })
    tl.to('.bottom-title', {
    duration: 1.5,
    text: bottomTitle[0],
    ease: "power2.inOut",
  }, "<")


}, { scope: wrapperRef });

useGSAP(() => {
  const track = gsap.utils.toArray(".scroller-track")[0] as HTMLElement;
  const distance = track.scrollWidth / 4; // assuming 3 copies of the same content

  gsap.to(track, {
    x: `-=${distance}`, // move left continuously
    duration: 10,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % distance) // seamless loop
    }
  });
}, { scope: wrapperRef });





  return (


    <div className="overflow-hidden" ref={containerRef}>
      <div className="inset-0 -z-10 w-screen h-[100lvh] overflow-hidden shader will-change-auto fixed">
        <ThreeScene />
      </div>
      <div className="w-full h-full bg-background fixed opacity-35 pointer-events-none">
      </div>
      <Hero/>
    
      <div className="flex flex-col z-50 justify-center items-center h-[100lvh]" ref={wrapperRef}>
        <div className="portfolio-wrapper flex flex-col overflow-hidden justify-center items-center z-50 md:my-4  h-full">
          <div className="w-[100lvw] max-w-[1000px] z-10 md:border-4 rounded-2xl border-accent-foreground p-4">
            <div>
              <div className="flex flex-col w-screen max-w-[1000px] justify-center items-start font-black tracking-wide md:text-9xl text-6xl mix-blend-hard-light">
                <h1>TRISTAN</h1>
                <h1>JOHNSTON</h1>
              </div>
              <div>
                <ul className="flex flex-row md:gap-8 justify-start items-start md:text-4xl text-xl my-4 font-bold w-full  mix-blend-hard-light border-accent-foreground ">
                  <li className="mix-blend-hard-light outline-sidebar-accent-foreground md:p-4
                  text-shadow-lg rounded-xs border-accent-foreground w-[9rem] pl-4 border-0"><a href="">ABOUT</a></li>
                  <li className="mix-blend-hard-light outline-sidebar-accent-foreground md:p-4
                  text-shadow-lg rounded-xs border-l-4 border-accent-foreground w-[9rem] pl-4"><a href="">WORK</a></li>
                  <li className="mix-blend-hard-light outline-sidebar-accent-foreground md:p-4
                  text-shadow-lg rounded-xs border-l-4 border-accent-foreground w-[9rem] pl-4"><a href="">CONTACT</a></li>
                </ul>
              </div>
            </div>
            <div className="border-y-4 mix-blend-hard-light border-accent-foreground overflow-hidden">
              <div className="scroller-track flex whitespace-nowrap">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col font-bold md:text-7xl text-4xl p-4 min-w-max">
                    <h1 className="top-title w-[200px] md:w-[400px]">SOFTWARE</h1>
                    <h1 className="bottom-title">ENGINEER</h1>
                  </div>
                ))}
              </div>
            </div>
            <section className="flex flex-wrap w-full">
              <section className="flex flex-col justify-center md:w-1/2 md:border-r-4 border-accent-foreground font-[timesnewroman] p-4">
                <h1 className="text-4xl font-bold mb-4">BREAKING NEWS</h1>
                <p className="md:text-2xl text-lg font-medium">Hi! my name's Tristan,
                I'm a software engineer and web developer. In 2023, I graduated with a degree in computer science from
                the University of Alabama at Birmingham. Since graduating I have been putting what I learned into practice,
                creating a custom full stack customer and pet management system for a small business.</p>
              </section>
            </section>
          </div>
        </div>
      </div>
      <div className="fixed right-0  z-10 bottom-0 m-4">
        <ThemeToggle />
      </div>
    </div>

  );
}

"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import ThreeScene from "@/components/Three";

import {gsap} from "gsap"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import CardTemplate from "@/components/cards/CardTemplate";
import Bio from "@/components/cards/Bio";

export default function Home() {

  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

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

  const tl = gsap.timeline()

  tl.fromTo(".portfolio-wrapper",
    { opacity: 0},
    {opacity: 1, delay: 3.25}
  )
}, { scope: wrapperRef });


  return (

    <div className="overflow-x-hidden" ref={containerRef}>
      <div className="absolute inset-0 -z-10 w-screen h-[100lvh] shader will-change-auto">
        <ThreeScene />
      </div>

      <Hero/>
        
      <div className="" ref={wrapperRef}>  
        <div className="portfolio-wrapper flex justify-center items-center h-lvh -z-30 ">
          <CardTemplate>
            <Bio/>
          </CardTemplate>
          <CardTemplate>
            <Bio/>
          </CardTemplate>
          <CardTemplate>
            <Bio/>
          </CardTemplate>
          
        </div>
      </div>
      <div className="fixed right-0  z-10 bottom-0 m-4">
        <ThemeToggle />
      </div>
    </div>

  );
}

"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import ThreeScene from "@/components/Three";

import {gsap} from "gsap"
import { useGSAP } from "@gsap/react";
import { useRef } from "react";


export default function Home() {

  const containerRef = useRef(null)

useGSAP(() => {

  const tl = gsap.timeline()

  tl.fromTo(
    ".shader",
    { clipPath: "inset(50% 0% 49.9% 0%)", opacity: 0 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration: 2,
      delay: 2,
      ease: "power2.out"
    }
  );
}, { scope: containerRef });


  return (

    <div className="overflow-x-hidden" ref={containerRef}>
      <div className="absolute inset-0 -z-10 w-screen h-[100lvh] shader will-change-auto">
        <ThreeScene />
      </div>

      <div className="">
        <Hero/>
        <div className="w-full bg-blue-500 self-center center text-center ">
          portfolio
        </div>

      </div>
      <div className="fixed right-0  z-10 bottom-0 m-4">
        <ThemeToggle />
      </div>
    </div>

  );
}

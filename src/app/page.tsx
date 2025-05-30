"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import ThreeScene from "@/components/Three";


export default function Home() {
  return (

    <div className="wrapper">
      <div className="shader -z-50 fixed w-screen h-screen">
        <ThreeScene />
      </div>

      <div className="content flex flex-col justify-center items-center">
        <Hero/>
      </div>
      <ThemeToggle />
    </div>

  );
}

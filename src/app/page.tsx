"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Hero from "@/components/Intro";
import ThreeScene from "@/components/Three";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TextPlugin } from "gsap/all";
import CardTemplate from "@/components/cards/CardTemplate";
import Bio from "@/components/cards/Bio";
import { Repeat } from "lucide-react";
import { ScrollTrigger } from "gsap/all";

import { IoSettingsOutline } from "react-icons/io5";
import { RiJavascriptFill } from "react-icons/ri";
import { AiOutlinePython } from "react-icons/ai";
import { FaNodeJs } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { FaJava } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaReact } from "react-icons/fa";

import Settings from "@/components/Settings";

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
      <div className="w-full h-full bg-accent fixed opacity-35"></div>
      <div className="" ref={containerRef}>
        <div
          className={`inset-0 -z-10 w-screen h-[100lvh] overflow-hidden shader will-change-auto fixed ${
            shaderOn ? "visible" : "hidden"
          }`}
        >
          <ThreeScene />
        </div>
        <Hero />

        <div className="fixed m-4 bottom-0 right-0 z-1000">
          <DropdownMenu>
            <DropdownMenuTrigger className="z-50 p-4">
              <IoSettingsOutline className="scale-200" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="z-[1000] bg-background"
              sideOffset={5}
              align="end"
            >
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex w-full justify-between items-center">
                  <h1>Dark</h1>
                  <Settings setting={"theme-toggle"} setSetting={null} />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex w-full justify-between items-center">
                  <h1>Shader</h1>
                  <Settings setting={shaderOn} setSetting={setShaderOn} />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div
          className="flex flex-col z-10 justify-center items-center h-[100lvh]"
          ref={wrapperRef}
        >
          <div className="portfolio-wrapper flex flex-col items-center z-50  h-full">
            <div className="w-[100lvw] max-w-[1000px] z-10 md:border-4 rounded-2xl border-accent-foreground md:my-8">
              <div>
                <div className="flex flex-col justify-center items-start font-black tracking-wide md:text-9xl text-6xl mix-blend-hard-light p-4 pb-0 md:mb-4">
                  <h1>TRISTAN</h1>
                  <h1>JOHNSTON</h1>
                </div>
                <p className="md:text-3xl text-lg md:font-light pl-4 md:pb-4 tracking-wide">
                  Software Engineer • Full-Stack Developer • Creative Developer{" "}
                </p>
                <div ref={navRef}>
                  <ul
                    className="flex flex-row md:gap- md:justify-start justify-center items-start text-xl mt-2 p-2
                   font-bold w-full  mix-blend-hard-light border-accent-foreground border-t-2  border-b-2"
                  >
                    <li
                      className="mix-blend-hard-light outline-sidebar-accent-foreground md:p-4 p-2 px-0 navLink
                  rounded-xs border-accent-foreground md:w-[9rem] w-full md:pl-4 border-0 font-medium text-center hover:outline-2 "
                    >
                      <a href="">ABOUT</a>
                    </li>
                    <li
                      className="mix-blend-hard-light outline-sidebar-accent-foreground md:p-4 p-2 px-0 navLink
                  rounded-xs border-accent-foreground md:w-[9rem] w-full font-medium  text-center hover:outline-2"
                    >
                      <a href="">WORK</a>
                    </li>
                    <li
                      className="mix-blend-hard-light outline-sidebar-accent-foreground md:p-4 p-2 px-0 navLink
                  rounded-xs border-accent-foreground md:w-[9rem] w-full md:pl-4 font-medium text-center hover:outline-2"
                    >
                      <a href="">CONTACT</a>
                    </li>
                  </ul>
                </div>
              </div>
              <section className="flex flex-wrap w-full">
                <section className="flex flex-col justify-center md:w-1/2 md:border-r-2 border-accent-foreground p-4">
                  <h1 className="text-4xl font-bold mb-4 tracking-widest">
                    WELCOME
                  </h1>
                  <p className="md:text-xl text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Magnam molestiae repellendus quis vitae, porro deleniti
                    rerum tempora excepturi eius iste sunt amet doloremque?
                    Inventore assumenda explicabo officiis autem ipsa pariatur.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque ab nobis culpa sequi eveniet cupiditate totam repellat
                    iure itaque, molestias rem earum in quae repellendus
                    maiores! Iure fugiat cum incidunt?
                  </p>
                </section>
                <section className="flex flex-col justify-center items-center md:w-1/2 md:border-r-2 border-accent-foreground p-4">
                  <div className="flex h-full w-full flex-wrap gap-4 items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
                        <RiJavascriptFill size={100} />
                        <h1 className="text-2xl">Javascript</h1>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
                        <AiOutlinePython size={100} />
                        <h1 className="text-2xl">Python</h1>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
                        <FaJava size={100} />
                        <h1 className="text-2xl">Java</h1>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
                        <FaReact size={100} />
                        <h1 className="text-2xl">React</h1>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
                        <FaNodeJs size={100} />
                        <h1 className="text-2xl">Node.js</h1>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
                        <SiExpress size={100} />
                        <h1 className="text-2xl">Express.js</h1>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

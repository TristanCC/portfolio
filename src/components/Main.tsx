
import { useState, useRef } from "react";


import { IoSettingsOutline } from "react-icons/io5";
import { RiJavascriptFill } from "react-icons/ri";
import { AiOutlinePython } from "react-icons/ai";
import { FaNodeJs } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { FaJava } from "react-icons/fa";

import { syne } from "../app/fonts";

import Nav from "@/components/ui/Nav";

import { FaReact } from "react-icons/fa";

const Main = () => {

    const wrapperRef = useRef(null);
    const navRef = useRef(null);

    return (
    <>

        <div
          className="flex flex-col z-10 justify-center items-center h-[100lvh]"
          ref={wrapperRef}
          >
          <div className="portfolio-wrapper flex flex-col items-center z-50  h-full">
            <div className="w-[100lvw] max-w-[1000px] z-10 md:border-4 rounded-2xl border-accent-foreground md:my-8">
              <div> 
                <div className="flex flex-col justify-center items-start font-black tracking-wide md:text-9xl text-6xl mix-blend-hard-light p-4 pb-0 md:mb-4">
                  <div className="flex gap-0.25 md:gap-6 flex-wrap ">
                    <h1>TRISTAN</h1>
                    <h1>JOHNSTON</h1>
                  </div>
                </div>
                <p className="md:text-3xl text-lg md:font-light pl-4 md:pb-4 tracking-wide  ">
                  Software Engineer • Full-Stack Developer • Systems Builder{" "}
                </p>
                <div ref={navRef}>
                  <Nav/>
                </div>
              </div>
              <section className="flex flex-wrap w-full [&>*:nth-child(odd)]:w-[450px] [&>*:nth-child(odd)]:md:border-r-2 [&>*]:grow self-center justify-center">

                <section className={`flex flex-col justify-start md:w-1/2 md:mt-4 p-4 `} style={{fontFamily: 'var(--font-syne)'}}>
                  <h1 className="text-2xl md:text-4xl font-bold mb-4 tracking-widest">
                    Welcome to my portfolio site!
                  </h1>
                  <p className={`md:text-xl text-lg ${syne.variable}`} style={{fontFamily: "var(--font-syne)"}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, soluta quod! Sapiente quo recusandae minus, facere nulla ea inventore officia laudantium, earum nostrum magni sit quae ab enim veritatis asperiores.
                  </p>
                  
                </section>
                <section className="flex flex-col justify-center items-center md:w-1/2 md:border-r-2 border-accent-foreground p-4  ">
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
    </>
    )
}

export default Main
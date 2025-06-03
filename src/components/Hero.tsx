import React, { useRef } from "react"
import { Syne } from "next/font/google"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

const syne = Syne({
  subsets: ["latin", "greek", "latin-ext"]
})

const hello: Array<string> = "Hello World.".split("")
const myName: Array<string> = "My name is Tristan!".split("")

const Hero = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    const helloSpans = containerRef.current.querySelectorAll(".hello .gsapSpan");
    const nameSpans = containerRef.current.querySelectorAll(".name .gsapSpan");
    
    const tl = gsap.timeline();

    // Initial animation for both texts
    tl.fromTo(
      [helloSpans],
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05, 
        duration: 0.3 
      }
    );

    // Move both texts up
    tl.to([helloSpans, nameSpans], {
      y: "-80lvh",
      duration: 2,
      delay: 0.6,
      ease: "power2.inOut",
      display: "none"
    });

    // Fade out "Hello World"
    tl.to(".hello", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });


  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`${syne.className} flex flex-col gap-4 w-fit h-screen justify-center items-center justify-self-center absolute left-0 right-0 m-0`}
    >
      <h1 className="text-5xl md:text-8xl hello">
        {hello.map((elem, index) => (
          <span
            key={index}
            className={`gsapSpan font-bold ${elem.trim() ? "inline-block" : ""}`}
          >
            {elem}
          </span>
        ))}
      </h1>
      <p className="text-2xl md:text-3xl font-bold tracking-wider justify-self-start self-start name">
        {myName.map((elem, index) => (
          <span
            key={index}
            className={`gsapSpan opacity-0 ${elem.trim() ? "inline-block" : ""}`}
          >
            {elem}
          </span>
        ))}
      </p>
    </div>
  )
}

export default Hero
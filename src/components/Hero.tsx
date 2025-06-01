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
  const spans = containerRef.current.querySelectorAll(".gsapSpan");

  const tl = gsap.timeline();

  tl.fromTo(
    spans,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, stagger: 0.05, duration: 0.3 }
  );

  // Add your .to() animation after the first one
  tl.to(spans, {
    y: "-35lvh",
    duration: 2,
    delay: 0.4, // optional delay after previous animation
    ease: "power2.inOut",
  });

  tl.to(".hello", {
    delay: 2,
    display: "none"
  })

}, { scope: containerRef });




  return (
    <div
      ref={containerRef}
      className={`${syne.className} flex flex-col gap-4 w-fit h-screen justify-center items-center justify-self-center`}
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
      <p className="text-2xl md:text-3xl font-bold tracking-wider justify-self-start self-start" >
      {myName.map((elem, index) => (
        <span
          key={index}
          className={`gsapSpan   ${elem.trim() ? "inline-block" : ""}`}
        >
          {elem}
        </span>
      ))}

      </p>
    </div>
  )
}

export default Hero

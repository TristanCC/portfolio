import React from "react"
import { Syne } from "next/font/google"

const syne = Syne({
  subsets: ["latin", "greek", "latin-ext"]
})

const Hero = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center  ">
      <h1 className={`${syne.className} text-9xl`}>Hello World.</h1>
    </div>
  )
}

export default Hero

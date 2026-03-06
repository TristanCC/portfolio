import { syne } from "../../app/fonts";
import Image from "next/image";
import {inter} from "../../app/fonts"

const IntroductionBlurb = () => {
  return (
    <div className="leading-relaxed tracking-wider space-y-4">
      {/* Resume notice */}
      <div className="flex flex-col gap-4">
        <p
          className={`text-md md:text-xl font-black px-4 py-3  border-l-2 border-accent-foreground border-dashed text-j
          bg-[hsl(38,33%,5%,0%)]  ${syne.variable}`}
          style={{ fontFamily: "var(--font-syne)" }}
        >
          This site is designed to display some of my work. You can download my
          resume
          <a href="" className="ml-1 text-orange-500 hover:text-orange-300">
            here.
          </a>
        </p>
        {/* Section header */}
        <div className={`flex justify-between ${syne.variable}`}
        style={{ fontFamily: "var(--font-syne)" }}>
          
          <div className="flex flex-col items-start justify-end px-2 font-bold ">
            <span className="text-lg md:text-xl tracking-wider">
              ARTICLE I — ABOUT
            </span>
            <h1 className="text-2xl md:text-3xl tracking-widest">
              HEY, I'M TRISTAN.
            </h1>
          </div>

        </div>
      </div>

      {/* Body text */}
      <p
        className={`text-md md:text-xl border-t-2 border-accent-foreground pt-4 ${inter.variable}`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        I'm a software engineer who designs and builds full-stack systems with
        rigorous attention to detail and care for user experience. I enjoy
        developing intuitive, user-friendly software that helps people navigate
        the world while opening the door to new perspectives. I’m especially
        interested in human-centric design, i.e. systems foundationally rooted
        in user empathy, wellbeing, and growth.
      </p>
    </div>
  );
};

export default IntroductionBlurb;

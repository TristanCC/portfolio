import { useRef } from "react";

import Nav from "./Nav";
import Skills from "./sections/Skills";
import IntroductionBlurb from "./sections/IntroductionBlurb";
import Image from "next/image";

const Main = () => {
  const wrapperRef = useRef(null);
  const navRef = useRef(null);

  return (
    <div
      className="flex flex-col justify-center items-center overflow-y relative z-0"
      ref={wrapperRef}
    >
      <div className="flex flex-col items-center h-full border-accent-foreground">
        <div
          className="w-[100lvw] max-w-[1000px] p-2 md:p-4 md:border-2
          border-black/70 dark:border-white/70 md:my-8
          overflow-hidden bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]"
        >
          {/* <Image
            src={"/paperTexture.jpg"}
            width={1000}
            height={1000}
            alt="paper texture background"
            className="w-full h-full absolute inset-0 mix-blend-difference object-cover opacity-33"
          /> */}

          <div>
            <div
              className="flex flex-col justify-center items-center tracking-wide 
              md:text-9xl text-5xl p-4 pb-0 pl-0 md:mb-4 text-center"
            >
              <div className="flex border-accent-foreground gap-2 md:gap-2 flex-wrap leading-[75%]">
                <h1>TRISTAN</h1>
                <h1>JOHNSTON</h1>
              </div>

              <h3 className="md:text-4xl text-2xl md:pl-4 pt-2">
                Software Engineer / Full-Stack Developer
              </h3>
            </div>

            <div ref={navRef}>
              <Nav />
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 w-full self-center">
            <section
              className="flex flex-col justify-start md:p-4 md:pr-6 pt-6 border-accent-foreground md:border-r-2"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <IntroductionBlurb />
            </section>

            <section
              className="flex flex-col justify-start md:p-4 md:pl-6 pt-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <Skills />
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Main;
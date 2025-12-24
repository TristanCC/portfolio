import { syne } from "../../app/fonts";
import Image from "next/image";
const IntroductionBlurb = () => {
  return (
    <>
      <h1 className="text-2xl md:text-3xl tracking-wide flex  items-center gap-4">
        Hey, I'm Tristan.
      </h1>
      <p
        className={`md:text-xl text-lg text-justify ${syne.variable} border-t-1 p-2 border-accent-foreground`}
        style={{ fontFamily: "var(--font-syne)" }}
      >
        I'm a software engineer who designs and builds full-stack systems with
      <Image src={"/image1.jpg"} width={150} height={400} alt="none" className="md:w-1/2 float-left rounded-full p-2"/>
        {" "}care for structure and clarity. This site is designed to showcase some of my work. You can read my resume {" "}
        <a href="" className="text-blue-500 hover:text-blue-800">
         here
        </a>
        .
      </p>
    </>
  );
};

export default IntroductionBlurb;

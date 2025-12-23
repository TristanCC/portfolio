import { syne } from "../../app/fonts";

const IntroductionBlurb = () => {
  return (
    <section
      className={`flex flex-col justify-start md:w-1/2 p-4 pr-8 pt-8 `}
      style={{ fontFamily: "var(--font-syne)" }}
    >
      <h1 className="text-2xl md:text-4xl  font-bold tracking-widest">
        Hey, I'm Tristan.
      </h1>
      <p
        className={`md:text-xl text-lg text-justify ${syne.variable} border-t-2 border-l-2 p-2 border-accent-foreground`}
        style={{ fontFamily: "var(--font-syne)" }}
      >
        I’m a software engineer who designs and builds full-stack systems with
        care for structure and clarity. This site is designed to display some of my work. You can download my resume <a href="" className="text-blue-500 hover:text-blue-800">here</a>.
      </p>
    </section>
  );
};

export default IntroductionBlurb
import SectionHeading from "../ui/SectionHeading";

const IntroductionBlurb = () => {
  return (
    <div>
      <SectionHeading title="A little about me." />

      <div className="space-y-4 text-base md:text-lg font-body leading-relaxed max-w-2xl">
        <p>
          I&apos;m a full-stack software engineer based in Birmingham, AL,
          currently building volunteer-coordination tools for a 12,000+ member
          civic tech platform. I like projects that sit at the intersection of
          data and interface — turning large, messy datasets into something
          people can actually navigate.
        </p>
        <p>
          Outside of work, I spend a lot of time exploring the intersections
          between tech, policy, and economy. Sometimes its more illuminating to
          interact with data through interactivity and historical context rather
          than hard numbers, hence my Birmingham map project! I also try to keep
          up with the newest developments in AI!
        </p>
        <p>
          You can find the full rundown on my{" "}
          <a
            href="/TristanCJohnstonResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b hairline pb-0.5 hover:text-[var(--accent-red)] transition-colors duration-200"
          >
            resume
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default IntroductionBlurb;

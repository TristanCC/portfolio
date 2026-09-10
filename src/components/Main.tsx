import Nav from "./Nav";
import ThemeToggle from "./ThemeToggle";
import IntroductionBlurb from "./sections/IntroductionBlurb";
import Experience from "./sections/Experience";
import Work from "./sections/Work";
import HeroIllustration from "./HeroIllustration";

export default function Main() {
  return (
    <div className="site-shell max-w-[1160px] mx-auto px-6 md:px-10">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:inline-block focus:py-3"
      >
        Skip to content
      </a>
      <header className="site-header flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6 md:py-8">
        <a
          href="#top"
          className="font-heading text-xl font-bold tracking-tight"
        >
          Tristan<span className="text-[var(--accent-red)]">.</span>
        </a>
        <ThemeToggle />
        <Nav />
      </header>

      <main id="top">
        <section className="hero-section grid md:grid-cols-[1.4fr_1fr] items-center gap-10 py-14 md:py-24">
          <div>
            <p className="text-muted-foreground mb-5">
              Software, systems, and the people in them.
            </p>
            <h1 className="hero-title mb-6">
              <span className="hero-greeting">Hi, I&apos;m</span>
              <span className="hero-name">Tristan<span className="text-[var(--accent-red)]">.</span></span>
            </h1>
            <p className="max-w-lg text-lg md:text-xl leading-relaxed text-foreground/80">
              I turn messy data and interesting problems into things people can
              actually use.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#work" className="primary-link">
                Explore my work <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="mailto:tristan.c.johnston@gmail.com"
                className="secondary-link"
              >
                Say hello
              </a>
            </div>
            <p className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
              <span className="live-dot" />
              Available for work &middot; Birmingham, AL
            </p>
          </div>
          <div className="hero-playground relative mx-auto w-full max-w-[360px] aspect-square">
            <div aria-hidden="true" className="building-fragment">
              {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
            </div>
            <div className="portrait-paper"><HeroIllustration /></div>
            <svg
              aria-hidden="true"
              viewBox="0 0 240 240"
              className="portrait-lines absolute inset-0 h-full w-full"
            >
              <path
                d="M79 103 Q89 89 99 103 M143 100 Q153 89 161 102 M121 107 L115 130 L127 133 M89 147 Q117 167 148 140"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M188 30 L192 42 L204 46 L192 50 L188 62 L184 50 L172 46 L184 42 Z"
                fill="var(--accent-red)"
              />
            </svg>
            <span className="portrait-caption absolute -bottom-2 right-0 px-3 py-2 text-sm">
              Still figuring things out.
            </span>
          </div>
        </section>

        <section id="work" className="section-space">
          <Work />
        </section>
        <section
          id="about"
          className="section-space grid md:grid-cols-[1.6fr_1fr] gap-10 md:gap-16"
        >
          <IntroductionBlurb />
          <aside className="margin-note self-start p-6 md:mt-16">
            <h3 className="font-heading text-xl mb-4">Things I reach for</h3>
            <p className="leading-relaxed text-foreground/80">
              TypeScript, React, Next.js, Python, PostgreSQL, and a map whenever
              the data calls for one.
            </p>
            <div className="flex flex-wrap gap-5 mt-6 text-sm">
              <a
                className="text-link"
                href="https://github.com/TristanCC"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                className="text-link"
                href="https://linkedin.com/in/tristan-johnston-37817a282"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </aside>
        </section>
        <section id="experience" className="section-space">
          <Experience />
        </section>
        <section id="contact" className="section-space">
          <div className="contact-note p-6 md:p-12">
            <h2 className="font-heading text-4xl md:text-5xl tracking-tight mb-5">
              Let&apos;s make something useful.
            </h2>
            <p className="text-lg text-foreground/80 max-w-lg mb-7">
              I&apos;m open to new roles, interesting projects, and a good
              conversation.
            </p>
            <a
              className="text-link text-base md:text-xl break-all"
              href="mailto:tristan.c.johnston@gmail.com"
            >
              tristan.c.johnston@gmail.com ↗
            </a>
          </div>
        </section>
      </main>
      <footer className="flex flex-wrap justify-between gap-3 py-8 text-sm text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} Tristan Johnston</span>
        <span>Made with care in Birmingham.</span>
      </footer>
    </div>
  );
}

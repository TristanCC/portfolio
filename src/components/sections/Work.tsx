"use client";

import { useEffect, useRef } from "react";

type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  video?: string;
  caption?: string;
};

const projects: Project[] = [
  {
    title: "Birmingham Parcel Data Visualization",
    description:
      "An interactive 3D geospatial visualization of value-per-acre parcel data using Deck.gl and MapLibre, highlighting municipal land usage efficiency across 50k+ parcels. Municipal parcel data was wrangled and standardized with Python, served from a Dockerized PostGIS database using spatial index queries and dynamic color interpolation.",
    stack: ["Next.js", "React", "PostGIS", "Deck.gl", "Docker"],
    href: "https://github.com/TristanCC/Jeffco-Value-Per-Acre",
    video: "/parcel.mp4",
    caption: "FIG. 1 — NAVIGATING THE PARCEL MAP",
  },
  {
    title: "RAG PDF Search",
    description:
      "A Retrieval-Augmented Generation system enabling natural-language search across hundreds of PDF pages. Sentence-transformer embeddings and pgvector power fast semantic queries, with FastAPI and Express microservices handling document parsing, embedding, and storage, and the OpenAI API generating context-aware answers with referenced citations and page numbers.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "OpenAI API"],
    href: "https://github.com/TristanCC/pdf-rag-search",
  },
];

const ProjectVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Don't fetch or play this until it's actually scrolled into
    // view -- it's large, and there's no reason to load it for a
    // visitor who never gets this far down the page.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full block aspect-video bg-accent-foreground/5"
      src={src}
      muted
      loop
      playsInline
      preload="none"
    />
  );
};

const Work = () => {
  return (
    <div className="leading-relaxed space-y-8">
      <div className="flex justify-between border-b-2 border-accent-foreground pb-2">
        <div className="flex flex-col items-start justify-end px-2 font-bold grow">
          <span
            className="text-lg md:text-xl tracking-wider"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            ARTICLE III — WORK
          </span>
          <h1
            className="text-3xl md:text-5xl tracking-wide"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            SELECTED PROJECTS
          </h1>
        </div>
      </div>

      <div className="space-y-10">
        {projects.map((project, i) => {
          const isFeatured = i === 0;
          return (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col gap-3 ${
                isFeatured ? "" : "pt-8 border-t border-accent-foreground/10"
              }`}
            >
              <h3
                className="text-2xl md:text-3xl tracking-wide group-hover:text-orange-500 transition-colors duration-300"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {project.title} ↗
              </h3>

              {project.video && (
                <figure className="w-full max-w-sm md:max-w-md">
                  <ProjectVideo src={project.video} />
                  {project.caption && (
                    <figcaption className="text-xs uppercase tracking-wider text-muted-foreground mt-2">
                      {project.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              <p
                className={
                  isFeatured ? "text-base md:text-lg" : "text-sm md:text-base"
                }
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs uppercase tracking-wider px-2 py-1 border border-accent-foreground/20 text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Work;

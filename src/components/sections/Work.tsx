"use client";

import { useEffect, useRef } from "react";
import SectionHeading from "../ui/SectionHeading";
import MetaStamp from "../ui/MetaStamp";

type Project = {
  index: string;
  title: string;
  description: string;
  category: string;
  stack: string;
  href: string;
  video?: string;
  caption?: string;
};

const projects: Project[] = [
  {
    index: "01",
    title: "Birmingham Parcel Data Visualization",
    description:
      "An interactive 3D geospatial visualization of value-per-acre parcel data using Deck.gl and MapLibre, highlighting the interactions between municipal land usage efficiency and the lived experience of Birmingham residents across 50k+ parcels. Municipal parcel data was wrangled and standardized with Python, served from a Dockerized PostGIS database using spatial index queries and dynamic color interpolation.",
    category: "Personal project",
    stack: "Next.js, React, PostGIS, Deck.gl, Docker",
    href: "https://github.com/TristanCC/Jeffco-Value-Per-Acre",
    video: "/parcel.mp4",
    caption: "FIG. 1 — NAVIGATING THE PARCEL MAP",
  },
  {
    index: "02",
    title: "RAG PDF Search",
    description:
      "A Retrieval-Augmented Generation system enabling natural-language search across hundreds of PDF pages. Sentence-transformer embeddings and pgvector power fast semantic queries, with FastAPI and Express microservices handling document parsing, embedding, and storage, and the OpenAI API generating context-aware answers with referenced citations and page numbers.",
    category: "Personal project",
    stack: "Next.js, FastAPI, PostgreSQL, pgvector, OpenAI API",
    href: "https://github.com/TristanCC/pdf-rag-search",
  },
];

const ProjectVideo = ({
  src,
  className,
}: {
  src: string;
  className: string;
}) => {
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
      className={className}
      src={src}
      muted
      loop
      playsInline
      poster="/parcel-thumbnail.jpg"
      preload="none"
    />
  );
};

const Work = () => {
  return (
    <div>
      <SectionHeading index="03" label="WORK" title="Selected projects." />

      <div className="space-y-16 md:space-y-20">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 pt-8 border-t hairline"
          >
            <div className="md:col-span-3">
              <h3 className="font-heading font-bold text-2xl md:text-4xl tracking-tight mb-4 group-hover:text-[var(--accent-red)] transition-colors duration-200">
                {project.title} ↗
              </h3>
              <MetaStamp
                lines={[
                  { label: "C", value: project.category },
                  { label: "T", value: project.stack },
                ]}
              />
            </div>

            <div className="md:col-span-9">
              {project.video && (
                <div className="mb-4">
                  <ProjectVideo
                    src={project.video}
                    className="w-full aspect-video object-cover border hairline"
                  />
                  {project.caption && (
                    <span className="block mt-2 font-mono text-[13px] uppercase tracking-[0.1em] text-foreground/70">
                      {project.caption}
                    </span>
                  )}
                </div>
              )}
              <p className="text-base md:text-lg font-body leading-relaxed">
                {project.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Work;

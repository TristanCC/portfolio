import SectionHeading from "../ui/SectionHeading";
import MetaStamp from "../ui/MetaStamp";

type Project = {
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
    title: "Birmingham Parcel Data Visualization",
    description:
      "Explore land value across 50,000+ Birmingham parcels in an interactive 3D map. Python standardizes municipal data, PostGIS handles spatial queries, and Deck.gl and MapLibre bring the results into the browser.",
    category: "Personal project",
    stack: "Next.js, React, PostGIS, Deck.gl, Docker",
    href: "https://github.com/TristanCC/Jeffco-Value-Per-Acre",
    video: "/parcel.mp4",
    caption: "A look around the parcel map",
  },
  {
    title: "RAG PDF Search",
    description:
      "Ask questions across hundreds of PDF pages and get answers with citations and page numbers. Sentence-transformer embeddings and pgvector retrieve relevant passages; FastAPI and Express handle document processing, and the OpenAI API generates answers.",
    category: "Personal project",
    stack: "Next.js, FastAPI, PostgreSQL, pgvector, OpenAI API",
    href: "https://github.com/TristanCC/pdf-rag-search",
  },
];

const Work = () => {
  return (
    <div>
      <SectionHeading title="A few things I've made." />

      <div className="space-y-16 md:space-y-20">
        {projects.map((project) => (
          <article
            key={project.title}
            className="project-entry grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-6 py-8 md:py-10"
          >
            <div className="lg:col-span-4">
              <h3 className="font-heading font-medium text-2xl md:text-3xl tracking-tight mb-4">
                {project.title}
              </h3>
              <MetaStamp
                lines={[
                  { label: "Project", value: project.category },
                  { label: "Built with", value: project.stack },
                ]}
              />
            </div>

            <div className="lg:col-span-8">
              {project.video && (
                <div className="mb-4">
                  <div className="video-paper rotate-1">
                    <video
                      playsInline
                      autoPlay
                      loop
                      muted
                      preload="none"
                      poster="/parcel-thumbnail.jpg"
                      aria-label={`${project.title} demonstration`}
                      src={project.video}
                      className="block w-full aspect-video object-cover border hairline saturate-90 contrast-90"
                    />
                  </div>
                  {project.caption && (
                    <span className="block mt-2 font-body text-[13px] text-foreground/70">
                      {project.caption}
                    </span>
                  )}
                </div>
              )}
              <p className="text-base md:text-lg font-body leading-relaxed">
                {project.description}
              </p>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center mt-3 font-body text-sm underline underline-offset-4 hover:text-[var(--accent-red)]"
                aria-label={`View ${project.title} source on GitHub`}
              >
                View source on GitHub ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Work;

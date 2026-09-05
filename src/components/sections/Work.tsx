type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
};

const projects: Project[] = [
  {
    title: "RAG PDF Search",
    description:
      "A Retrieval-Augmented Generation system enabling natural-language search across hundreds of PDF pages. Sentence-transformer embeddings and pgvector power fast semantic queries, with FastAPI and Express microservices handling document parsing, embedding, and storage, and the OpenAI API generating context-aware answers with referenced citations and page numbers.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "OpenAI API"],
    href: "https://github.com/TristanCC/pdf-rag-search",
  },
  {
    title: "Birmingham Parcel Data Visualization",
    description:
      "An interactive 3D geospatial visualization of value-per-acre parcel data using Deck.gl and MapLibre, highlighting municipal land usage efficiency across 50k+ parcels. Municipal parcel data was wrangled and standardized with Python, served from a Dockerized PostGIS database using spatial index queries and dynamic color interpolation.",
    stack: ["Next.js", "React", "PostGIS", "Deck.gl", "Docker"],
    href: "https://github.com/TristanCC/Jeffco-Value-Per-Acre",
  },
];

const Work = () => {
  return (
    <div className="leading-relaxed tracking-wider space-y-6">
      <div className="flex justify-between border-b-2 border-accent-foreground pb-2">
        <div className="flex flex-col items-start justify-end px-2 font-bold grow">
          <span
            className="text-lg md:text-xl tracking-wider"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            ARTICLE III — WORK
          </span>
          <h1
            className="text-2xl md:text-3xl tracking-widest"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            SELECTED PROJECTS
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 p-4 border border-dashed border-accent-foreground/30
            hover:border-orange-500 transition-colors duration-300"
          >
            <h3
              className="text-xl tracking-wide group-hover:text-orange-500 transition-colors duration-300"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {project.title} ↗
            </h3>
            <p className="text-md" style={{ fontFamily: "var(--font-inter)" }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs uppercase tracking-wider px-2 py-1 border border-dashed border-orange-500/60 text-orange-500"
                >
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Work;

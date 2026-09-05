type Job = {
  role: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
};

const jobs: Job[] = [
  {
    role: "Software Engineer",
    company: "Progressive Victory",
    location: "Remote · Civic Tech Nonprofit",
    dates: "Feb. 2026 — Present",
    bullets: [
      "Developed production features for a Next.js/TypeScript platform serving a 12,000+ member community, collaborating through GitHub Actions CI/CD, code review, and Scrum.",
      "Owned features end-to-end, implementing REST API endpoints, MySQL schemas, and stored procedures to improve volunteer coordination and administrative capabilities.",
      "Improved backend data handling for edge-case inputs and wrote unit tests, reducing runtime errors and preventing bug introduction in production.",
    ],
  },
  {
    role: "Full-Stack Software Engineer",
    company: "A Pet's Day Out",
    location: "Birmingham, AL",
    dates: "Oct. 2024 — Nov. 2025",
    bullets: [
      "Architected a PERN full-stack business dashboard managing 10,000+ pet records, reducing intake errors and improving processing time for 30–40 daily appointments.",
      "Built a 25-endpoint RESTful API implementing CRUD operations and fuzzy search with pagination, eliminating N+1 queries via eager loading.",
      "Designed a relational PostgreSQL schema supporting many-to-many customer–pet relationships and automated household grouping.",
      "Built a secure photo upload pipeline using AWS S3 pre-signed URLs and AWS Lambda, preventing orphaned uploads and reducing server load.",
    ],
  },
];

const Experience = () => {
  return (
    <div className="leading-relaxed tracking-wider space-y-8">
      <div className="flex justify-between border-b-2 border-accent-foreground pb-2">
        <div className="flex flex-col items-start justify-end px-2 font-bold grow">
          <span
            className="text-lg md:text-xl tracking-wider"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            ARTICLE II — EXPERIENCE
          </span>
          <h1
            className="text-2xl md:text-3xl tracking-widest"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            CAREER HISTORY
          </h1>
        </div>
      </div>

      <div className="relative pl-6 md:pl-8 border-l border-dashed border-accent-foreground/30 space-y-10">
        {jobs.map((job) => (
          <div key={job.role} className="relative">
            <span className="absolute left-0 top-2 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-orange-500" />

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
              <h3
                className="text-xl md:text-2xl tracking-wide"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {job.role}
              </h3>
              <span className="text-sm uppercase tracking-wider text-orange-500 shrink-0">
                {job.dates}
              </span>
            </div>

            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
              {job.company} · {job.location}
            </p>

            <ul className="space-y-2">
              {job.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-2 text-md"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <span className="text-orange-500 shrink-0">—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;

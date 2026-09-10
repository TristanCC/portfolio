import SectionHeading from "../ui/SectionHeading";
import MetaStamp from "../ui/MetaStamp";

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
    <div>
      <SectionHeading index="02" label="EXPERIENCE" title="Career history." />

      <div className="space-y-12">
        {jobs.map((job) => (
          <div
            key={job.role}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 pt-6 border-t hairline"
          >
            <div className="md:col-span-3">
              <MetaStamp
                lines={[
                  { label: "D", value: job.dates },
                  { label: "C", value: `${job.company} · ${job.location}` },
                ]}
              />
            </div>

            <div className="md:col-span-9">
              <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-4">
                {job.role}
              </h3>

              <ul className="space-y-2">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-base md:text-lg font-body"
                  >
                    <span className="text-muted-foreground shrink-0">—</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;

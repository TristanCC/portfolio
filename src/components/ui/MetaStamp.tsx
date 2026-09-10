import type { ReactNode } from "react";

type StampLine = {
  label: string;
  value: ReactNode;
};

type MetaStampProps = {
  lines: StampLine[];
  className?: string;
};

// A recurring archival-index motif -- every entry on the site (a job,
// a project, the person themselves) gets stamped with the same set of
// single-letter fields, the way a catalog card would: D dates, C
// context/company, R role, T tools, L location.
const MetaStamp = ({ lines, className = "" }: MetaStampProps) => (
  <dl className={`font-mono text-[13px] md:text-sm space-y-2 ${className}`}>
    {lines.map(({ label, value }, i) => (
      <div key={`${label}-${i}`} className="flex gap-3">
        <dt className="text-muted-foreground w-3 shrink-0 select-none">
          {label}
        </dt>
        <dd className="min-w-0 text-foreground/90">{value}</dd>
      </div>
    ))}
  </dl>
);

export default MetaStamp;

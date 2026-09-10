import type { ReactNode } from "react";

type StampLine = {
  label: string;
  value: ReactNode;
};

type MetaStampProps = {
  lines: StampLine[];
  className?: string;
};

const MetaStamp = ({ lines, className = "" }: MetaStampProps) => (
  <dl className={`text-sm space-y-3 ${className}`}>
    {lines.map(({ label, value }, i) => (
      <div key={`${label}-${i}`} className="space-y-1">
        <dt className="text-muted-foreground">
          {label}
        </dt>
        <dd className="min-w-0 text-foreground/90 leading-relaxed">{value}</dd>
      </div>
    ))}
  </dl>
);

export default MetaStamp;

import type { ReactNode } from "react";

type BioItemProps = {
  label: string;
  children: ReactNode;
};

const BioItem = ({ label, children }: BioItemProps) => (
  <div className="mb-6">
    <h1 className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
      {label}
    </h1>
    <div className="text-base">{children}</div>
  </div>
);

export default BioItem
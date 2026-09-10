type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
};

const SectionHeading = ({ index, label, title }: SectionHeadingProps) => (
  <div className="mb-10 md:mb-14">
    <div className="font-mono text-xs tracking-[0.15em] text-muted-foreground mb-3">
      [{index}] {label}
    </div>
    <h2 className="font-heading font-bold tracking-tight text-4xl md:text-6xl">
      {title}
    </h2>
  </div>
);

export default SectionHeading;

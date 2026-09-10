type SectionHeadingProps = { title: string };

export default function SectionHeading({ title }: SectionHeadingProps) {
  return <h2 className="font-heading font-medium tracking-tight text-3xl md:text-5xl mb-8 md:mb-10">{title}</h2>;
}

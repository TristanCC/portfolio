const items = ["Work", "About", "Experience", "Contact"];

export default function Nav() {
  return (
    <nav aria-label="Main navigation" className="w-full lg:w-auto lg:ml-auto">
      <ul className="flex flex-wrap items-center gap-x-5 text-sm">
        {items.map((label) => (
          <li key={label}><a href={`#${label.toLowerCase()}`} className="inline-flex items-center min-h-11 text-foreground/75 hover:text-[var(--accent-red)]">{label}</a></li>
        ))}
        <li><a href="/TristanCJohnstonResume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 text-foreground/75 hover:text-[var(--accent-red)]">Resume ↗</a></li>
      </ul>
    </nav>
  );
}

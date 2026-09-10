const items = [
  { label: "ABOUT", index: "01" },
  { label: "EXPERIENCE", index: "02" },
  { label: "WORK", index: "03" },
  { label: "CONTACT", index: "04" },
];

const Nav = () => {
  return (
    <nav className="w-full">
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm tracking-[0.05em] uppercase">
        {items.map(({ label, index }) => (
          <li key={label}>
            <a
              href={`#${label.toLowerCase()}`}
              className="nav-link inline-flex items-baseline gap-1 py-2 text-foreground/65 hover:text-foreground transition-colors duration-200"
            >
              <span className="text-xs opacity-70">[{index}]</span>
              <span>{label}</span>
            </a>
          </li>
        ))}
        <li>
          <a
            href="/TristanCJohnstonResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-baseline gap-1 py-2 text-foreground/65 hover:text-foreground transition-colors duration-200"
          >
            <span className="text-xs opacity-70">[↓]</span>
            <span>RESUME</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

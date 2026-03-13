import { syne } from "../app/fonts";
const Nav = () => {
  return (
    <nav className="w-full sticky top-0">
      <ul
        style={{ fontFamily: "var(--font-syne)" }}
        className={`${syne.variable} flex flex-row w-full min-w-0  justify-center border-b-2 
     border-accent-foreground  tracking-wide text-nowrap overflow-x-auto bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]
      /* Small: Mobile-first defaults */
      text-md  py-4 2
      /* Medium: Tablet */
      md:text-xl md:gap-4 md:px-2
      /* Large: Desktop */
      lg:text-2xl lg:gap-8 lg:px-4
      `}
      >
        {["ABOUT", "WORK", "CONTACT", "RESUME"].map((item) => (
          <li key={item} className="self-center font-medium">
            <a
              href={`#${item.toLowerCase()}`}
              className="group relative flex items-center overflow-hidden
  hover:text-orange-500 transition-colors duration-300
  py-2 px-2 md:p-4 lg:px-6 nav-link"
            >
              <span className="relative z-10 flex items-center gap-1">
                <span className="hidden md:block transition-transform duration-300 ">
                  /
                </span>
                {item}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

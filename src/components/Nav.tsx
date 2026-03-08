import { syne } from "../app/fonts";
const Nav = () => {

    return (

<nav className="w-full sticky top-0">
  <ul
    style={{ fontFamily: "var(--font-syne)" }}
    className={`${syne.variable} flex flex-row w-full min-w-0 items-center justify-center border-b-2 
     border-accent-foreground font-bold tracking-wide text-nowrap overflow-x-auto
      /* Small: Mobile-first defaults */
      text-md gap-2 py-2
      /* Medium: Tablet */
      md:text-xl md:gap-4 md:px-2
      /* Large: Desktop */
      lg:text-2xl lg:gap-8 lg:px-4`}
  >
    {['ABOUT', 'WORK', 'CONTACT', 'RESUME'].map((item) => (
      <li
        key={item}
        className="self-center font-medium transition-all hover:cursor-pointer hover:outline-2 outline-accent-foreground transition-none
          /* Responsive Padding */
          py-2 px-1 
          md:p-4 
          lg:px-6"
      >
        <a href={`#${item.toLowerCase()}`} className="nav-link">/{item}</a>
      </li>
    ))}
  </ul>
</nav>

    )
}

export default Nav
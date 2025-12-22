import { syne } from "../../app/fonts";
const Nav = () => {

    return (

          <ul
            style={{fontFamily: "var(--font-syne)"}}
            className={` ${syne.variable} md:text-2xl text-lg tracking-wider flex flex-row md:gap- md:justify-start justify-center items-start mt-2 p-2
           font-bold w-full  mix-blend-hard-light border-accent-foreground border-t-2  border-b-2`}
          >
            <li
              className=" mix-blend-hard-light outline-sidebar-accent-foreground md:p-4 p-2 px-0 navLink
          rounded-xs border-accent-foreground md:w-[9rem] w-full md:pl-4 border-0 font-medium text-center hover:outline-2 "
            >
              <a href="">/ABOUT</a>
            </li>
            <li
              className="mix-blend-hard-light outline-sidebar-accent-foreground md:p-4 p-2 px-0 navLink
          rounded-xs border-accent-foreground md:w-[9rem] w-full font-medium  text-center hover:outline-2"
            >
              <a href="">/WORK</a>
            </li>
            <li
              className="mix-blend-hard-light outline-sidebar-accent-foreground md:p-4 p-2 px-0 navLink
          rounded-xs border-accent-foreground md:w-[9rem] w-full md:pl-4 font-medium text-center hover:outline-2"
            >
              <a href="">/CONTACT</a>
            </li>
          </ul>

    )
}

export default Nav
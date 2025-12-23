import { syne } from "../app/fonts";
const Nav = () => {

    return (

          <ul
            style={{fontFamily: "var(--font-syne)"}}
            className={` ${syne.variable} md:text-2xl text-lg tracking-wider flex flex-row md:gap- md:justify-start justify-center items-start mt-2 p-2
           font-bold w-full  mix-blend-hard-light border-accent-foreground border-t-2  border-b-2`}
          >
            <li
              className=" self-center p-4 hover:outline-2 outline-accent-foreground text-justify font-medium"
            >
              <a href="">/ABOUT</a>
            </li>
            <li
              className="self-center p-4 hover:outline-2 outline-accent-foreground text-justify font-medium"
            >
              <a href="">/WORK</a>
            </li>
            <li
              className=" self-center p-4 hover:outline-2 outline-accent-foreground text-justify font-medium"
            >
              <a href="">/CONTACT</a>
            </li>
          </ul>

    )
}

export default Nav
import { syne } from "../app/fonts";
const Nav = () => {

    return (

          <div className=" sticky top-0 ">
            <ul
              style={{fontFamily: "var(--font-syne)"}}
              className={` ${syne.variable} md:text-2xl text-md tracking-wide flex flex-row  gap-4 md:justify-start justify-center items-start mt-2 md:p-2
             font-bold w-full  mix-blend-hard-light border-accent-foreground border-t-2 border-b-2 text-nowrap`}
            >
              <li
                className=" self-center pt-4 pb-4 md:p-4 hover:outline-2 outline-accent-foreground text-justify font-medium hover:cursor-pointer"
              >
                <a href="">/ABOUT</a>
              </li>
              <li
                className="self-center pt-4 pb-4 md:p-4 hover:outline-2 outline-accent-foreground text-justify font-medium hover:cursor-pointer"
              >
                <a href="">/WORK</a>
              </li>
              <li
                className=" self-center pt-4 pb-4 md:p-4 hover:outline-2 outline-accent-foreground text-justify font-medium hover:cursor-pointer"
              >
                <a href="">/CONTACT</a>
              </li>
                          <li
                className=" self-center pt-4 pb-4 md:p-4 hover:outline-2 outline-accent-foreground text-justify font-medium hover:cursor-pointer"
              >
                <a href="">/RESUME</a>
              </li>
            </ul>
          </div>

    )
}

export default Nav
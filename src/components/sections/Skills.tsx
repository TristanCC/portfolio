import { IoSettingsOutline } from "react-icons/io5";
import { RiJavascriptFill } from "react-icons/ri";
import { AiOutlinePython } from "react-icons/ai";
import { FaNodeJs } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaReact } from "react-icons/fa";

const Skills = () => {
  return (
    <>
      <h1 className="md:text-3xl">Skills</h1>
      <div className="flex h-full w-full flex-wrap gap-4 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
            <RiJavascriptFill size={100} />
            <h1 className="text-2xl">Javascript</h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
            <AiOutlinePython size={100} />
            <h1 className="text-2xl">Python</h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
            <FaJava size={100} />
            <h1 className="text-2xl">Java</h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
            <FaReact size={100} />
            <h1 className="text-2xl">React</h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
            <FaNodeJs size={100} />
            <h1 className="text-2xl">Node.js</h1>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 pb-2 dark:border-2 rounded-lg flex flex-col justify-center items-center hover:scale-110 dark:bg-[rgba(1,1,1,0.05)] transition-transform duration-500">
            <SiExpress size={100} />
            <h1 className="text-2xl">Express.js</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;

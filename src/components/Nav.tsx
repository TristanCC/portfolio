import Link from "next/link"

const Nav = () => {

    return (
        
        <div className="w-full bg-background flex-row justify-center z-50 text-lg hidden md:flex">
            <ul className="flex flex-row justify-center items-center">
                <li className="w-[10rem] hover:bg-red-500 text-center p-4">Bio</li>
                <li className="w-[10rem] hover:bg-red-500 text-center p-4">Experience</li>
                <li className="w-[10rem] hover:bg-red-500 text-center p-4">Projects</li>
                <li className="w-[10rem] hover:bg-red-500 text-center p-4">Contact</li>
            </ul>
        </div>
    )
}

export default Nav
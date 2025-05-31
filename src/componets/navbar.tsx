import { FaBars } from "react-icons/fa"
import { useState } from "react"
import { Link } from "react-router"
import { ContextLog } from "./contextlog.tsx"
import { useContext } from "react"
import { FaGear } from "react-icons/fa6"
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    const { isLoggedIn } = useContext(ContextLog);
    return (
    <header className="flex-col bg-blue-500 text-white w-full fixed">
        <nav className="flex justify-between p-5 justify-align-items-baseline">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold"><Link to="/home">CareerCampus</Link></h1>
            </div>
            {/* desktop */}
            <ul className="hidden md:flex space-x-4 ">
                <li className="hover:text-blue-300"><Link to="/home">Home</Link></li>
                <li className="hover:text-blue-300"><Link to="/about">About</Link></li>
                <li className="hover:text-blue-300"><Link to="/course">Course</Link></li>
                <li className="hover:text-blue-300"><Link to="/service">Career</Link></li>
                <li className="hover:text-blue-300"><Link to="/contact">Contact</Link></li>
                <li className="hover:text-blue-300"><Link to="/setting"><FaGear className="font-bold " size={24}/></Link></li>
                
            </ul> 
            <button className={`hidden md:${isLoggedIn ? "hidden" : "flex"} border md:justify-center p-2 border-gray-800 text-white rounded-3xl h-10 w-20 bg-gray-800 hover:border-blue-700 hover:bg-blue-700 font-semibold`}>
                <Link to="/login">Login</Link>
            </button>
            <FaBars className="flex md:hidden" onClick={toggleMenu}/>
        </nav>
        {/* mobile */}
        {isOpen && (
            <div className="flex md:hidden">
                <ul className="flex-col justify-center p-5 space-y-5 ">
                    <li className="hover:text-blue-300"><Link to="/home">Home</Link></li>
                <li className="hover:text-blue-300"><Link to="/about">About</Link></li>
                <li className="hover:text-blue-300"><Link to="/course">Course</Link></li>
                <li className="hover:text-blue-300"><Link to="/service">Career</Link></li>
                <li className="hover:text-blue-300"><Link to="/contact">Contact</Link></li>
                    <div className={`flex md:hidden ${isLoggedIn ? "hidden" : "flex"} `}>
                        <button className={`border border-gray-800 text-white rounded-3xl h-10 w-30 bg-gray-800 hover:border-blue-700 hover:bg-blue-700 font-semibold`}><Link to="/login">Login</Link></button> 
                    </div>
                </ul> 
                
            </div>
        )}
    </header>
    )
}


import { FaBars } from "react-icons/fa"
import { useState } from "react"
import { Link } from "react-router"
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
    <header className="flex-col bg-blue-500 text-white w-full fixed">
        <nav className="flex justify-between p-5">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold"><Link to="/home">CareerCampus</Link></h1>
            </div>
            {/* desktop */}
            <ul className="hidden md:flex space-x-4 ">
                <li><a href="#" className="hover:text-blue-300"><Link to="/home">Home</Link></a></li>
                <li><a href="#" className="hover:text-blue-300"><Link to="/about">About</Link></a></li>
                <li><a href="#" className="hover:text-blue-300"><Link to="/course">Course</Link></a></li>
                <li><a href="#" className="hover:text-blue-300"><Link to="/service">Service</Link></a></li>
                <li><a href="#" className="hover:text-blue-300"><Link to="/contact">Contact</Link></a></li>
            </ul> 
            <FaBars className="flex md:hidden" onClick={toggleMenu}/>
        </nav>
        {/* mobile */}
        {isOpen && (
            <div className="flex md:hidden">
                <ul className="flex-col p-5 space-y-5 ">
                    <li><a href="#" className="hover:text-blue-300">Home</a></li>
                    <li><a href="#" className="hover:text-blue-300">About</a></li>
                    <li><a href="#" className="hover:text-blue-300">Contact</a></li>
                </ul> 
            </div>
        )}
    </header>
    )
}


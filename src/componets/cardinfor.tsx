 import {FaAirbnb, FaElementor}  from "react-icons/fa"
import { FaChartSimple, FaPerson } from "react-icons/fa6"


 function CardInfo({dark = false}) {
    const infor = [
        {
            icon: <FaAirbnb size={34}/>,
            title: "AI powered",
            description: "AI best career advise",
            color: "text-purple-500",
            bg: "bg-purple-100", 
            darkBg: "bg-gray-800"
        },
         {
            icon: <FaPerson size={34}/>,
            title: "Personalized",
            description: "Personalized learning",
            color: "text-purple-500",
            bg: "bg-purple-100", 
            darkBg: "bg-gray-800"
        },
         {
            icon: <FaChartSimple size={34}/>,
            title: "SKill Tracker",
            description: "Best Skill Tracker",
            color: "text-purple-500",
            bg: "bg-purple-100", 
            darkBg: "bg-gray-800"
        },
         {
            icon: <FaElementor size={34}/>,
            title: "Mentorship",
            description: "Best Mentorship",
            color: "text-purple-500",
            bg: "bg-purple-100", 
            darkBg: "bg-gray-800",
            baseline: "justify-iterm-baseline"
        }
    ]
    return( 
        <div className="flex-col space-y-4 border border-dark bg-gray-700 p-3 rounded-2xl">
            <h1 className="text-center text-4xl font-bold">What we Offer</h1>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl ${dark ? 'bg-gray-900' : 'bg-gray-900'} shadow-md`}>
                {infor.map((iterm, index)=>(
                    <div key={index} className={`flex items-start gap-4 p-4 rounded-xl hover:cursor-pointer ${iterm.baseline} ${dark ? iterm.darkBg : iterm.bg}`}>
                        <div className={`text-2xl ${iterm.color}`}>{iterm.icon}</div>
                        <div className={`${iterm.baseline}`}>
                            <h3 className={`font-semibold ${dark ? 'text-white' : 'text-black'}`}>{iterm.title}</h3>
                            <p className={`${dark ? 'text-gray-300' : 'text-gray-600'}`}>{iterm.description}</p>
                        </div>
                    </div>
                ))}
            </div> 
        </div>
        
    )
}
export default CardInfo
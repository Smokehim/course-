import { ContextLogProvider } from "./contextlog";

const courses = [
    {
        id:1,
        courseName: 'Engneering',
        link: 'https://www.coursera.org/search?query=engeneriing'
    },
    {
        id:2,
        courseName: 'computer science',
        link: 'https://www.coursera.org/search?query=computer%20science'
    },
    {
        id:3,
        courseName: 'Doctor',
        link: 'https://www.coursera.org/search?query=medicine&sortBy=BEST_MATCH'
    },
    {
        id:4,
        courseName: 'teacher',
        link: 'https://www.coursera.org/search?query=teacher&sortBy=BEST_MATCH'
    },
     {
        id:5,
        courseName: 'clincal medicine',
        link: 'https://www.coursera.org/search?query=clincal%20medicine&sortBy=BEST_MATCH'
    },
    {
        id:6,
        courseName: 'Pilote',
        link: 'https://www.coursera.org/search?query=pilote&sortBy=BEST_MATCH'
    },
    {
        id:7,
        courseName: 'Account',
        link: 'https://www.coursera.org/search?query=account&sortBy=BEST_MATCH'
    },
     {
        id:8,
        courseName: 'Banker',
        link: 'https://www.coursera.org/search?query=banking&sortBy=BEST_MATCH'
    }
]

export default function Course(){
    
    return(
        <ContextLogProvider>
        <div className="flex-col justify-center">
            <h1 className="text-center text-2xl">Frequentry Course</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 p-3 gap-5 rounded-lg">
                {courses.map((iterms)=>(
                    <a href={iterms.link} key={iterms.id}>
                        <div className="border bordr-gray-600 text-white p-4 rounded-lg text-center bg-gray-600 hover:pointer  hover:bg-blue-500 hover:border-blue-500" key={iterms.id}><p className="hover:cursor-pointer hover:text-red-500">{iterms.courseName}</p></div>
                    </a>
                ))}
            </div>
        </div>
        </ContextLogProvider>
    )
}

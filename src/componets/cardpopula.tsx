
const courses = [
    {
        id:1,
        courseName: 'Engneering'
    },
    {
        id:2,
        courseName: 'computer science'
    },
    {
        id:3,
        courseName: 'Doctor'
    },
    {
        id:4,
        courseName: 'teacher'
    },
     {
        id:5,
        courseName: 'clincal medicine'
    },
    {
        id:6,
        courseName: 'Pilote'
    },
    {
        id:7,
        courseName: 'Account'
    },
     {
        id:8,
        courseName: 'Banker'
    }
]

export default function Course(){
    
    return(
        <div className="flex-col justify-center">
            <h1 className="text-center text-2xl">Frequentry Course</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 p-3 gap-5 rounded-lg">
                {courses.map((iterms)=>(
                    <div className="border bordr-gray-600 text-white p-4 rounded-lg text-center bg-gray-600 hover:pointer  hover:bg-blue-500 hover:border-blue-500" key={iterms.id}><p>{iterms.courseName}</p></div>
                ))}
            </div>
        </div>
    )
}
 
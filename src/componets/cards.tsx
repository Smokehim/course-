import graphic from '../assets/graphic.jpg'
import web from '../assets/web.jpg'
import medicine from '../assets/medicine.png'
import cardesign from '../assets/carDesign.jpg'
const data =[
    {
        id: 1,
        img: web,
        title: 'Web Development',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
        id: 2,
        img: graphic,
        title: 'Graphic Design',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
        id: 3,
        img: medicine,
        title: 'Medicine',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
        id: 4,
        img: cardesign,
        title: 'Car Design',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    }
]
function Card(){

    return (
        <div className='flex flex-col md:flex-row gap-4 p-6 justify-content-md-center'>
            {data.map((item, index)=>(
            <div key={index} className="max-w-sm  bg-white rounded-xl shadow-md overflow-hidden p-5 hover:cursor-pointer hover:shadow-lg">
                <img src={item.img} className='rounded-lg w-80 h-50' alt="" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{item.title}</div>
                    <p className="text-gray-700 text-base">{item.description}</p>
                </div>
            </div>
        ))}
        </div>
        
    )
}
export default Card;
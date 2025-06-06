import graphic from '../assets/graphic.jpg'
import web from '../assets/web.jpg'
import medicine from '../assets/medicine.png'
import cardesign from '../assets/carDesign.jpg'
const data =[
    {
        id: 1,
        img: web,
        title: 'Web Development',
        description: 'Learn to Design and Create Websites. Build a responsive and accessible web portfolio using HTML5, CSS3, and JavaScript',
        link:'https://www.coursera.org/specializations/web-design'
    },
    {
        id: 2,
        img: graphic,
        title: 'Graphic Design',
        description: 'Make Compelling Design. Learn and apply the principles of graphic design towards a comprehensive branding project.',
        link:'https://www.coursera.org/specializations/graphic-design'
    },
    {
        id: 3,
        img: medicine,
        title: 'Medicine',
        description: 'Medical Neuroscience explores the functional organization and neurophysiology of the human central nervous system, while providing a neurobiological framework for understanding human behavior. ',
        link:'https://www.coursera.org/learn/medical-neuroscience'
    },
    {
        id: 4,
        img: cardesign,
        title: 'Car Design',
        description: 'This course will introduce you to the terminology, design considerations and safety assessment of self-driving cars. ',
        link:'https://www.coursera.org/learn/intro-self-driving-cars'
    }
]
function Card(){

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 p-6 justify-content-md-center'>
            {data.map((item, index)=>(
            <a href={item.link} key={item.id}>
                <div key={index} className="max-w-sm  bg-white rounded-xl shadow-md overflow-hidden p-5 hover:cursor-pointer hover:shadow-lg">
                <img src={item.img} className='rounded-lg w-80 h-50' alt="" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{item.title}</div>
                    <p className="text-gray-700 text-base">{item.description}</p>
                </div>
            </div>
            </a>
        ))}
        </div>
        
    )
}
export default Card;
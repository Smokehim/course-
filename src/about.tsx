import Header from './componets/navbar.tsx'
import Footer from './componets/footer.tsx'
import img from './componets/picture.jpg'
import { FaStar } from 'react-icons/fa';
import InputBar from './componets/inputbar.tsx';
export default function About() {
 

  return (
    <div className="layout">
      <Header />
      <main className='py-9 rounded-tr-5xl rounded-tl-5xl'>
        <section className='col-span-8 p-9'>
          <div className="flex justify-center p-9">
            <h1 className='text-8xl font-bold'>About Us</h1> 
          </div>
        </section> 
        <section className="flex flex-col md:flex-row bg-black p-8 gap-8 items-center">
          <img src={img} className='md:h-100 md:w-200 h-100 w-350 rounded-2xl' alt="" />
          <div className="flex-col p-5 space-y-5">
            <p className='text-gray-200 text-lg'>About Us</p>
            <h1 className='text-2xl text-gray-400'>We Always Help You To Find The Best Career</h1>
            <p className='text-gray-200'>
            CareerCampus is a smart platform designed to help students, graduates, 
            and career switchers identify the best career paths based on their skills, interests, and goals. 
            Whether you're unsure of your future or looking to pivot into something new, CareerCampus gives you clarity.
            </p>
            <button type="submit" className='border bg-white border-white text-gray-700 h-10 w-30 rounded-3xl font-bold hover:bg-gray-400'>Send</button>
          </div>
        </section>
        <section className='bg-black text-white flex-col md:grid md:grid-cols-2 p-5 gap-5 md:justify-center'>
          <div className="flex-col">
            <h1 className='text-3xl'>Our Skills</h1>
            <p>
              Career Campus is a modern, AI-enhanced platform designed to empower students, job seekers,
              and professionals with the tools and 
              guidance needed to build successful careers in the digital age
            </p>
            <div className='flex flex-col gap-5'>
              <InputBar/>
              <InputBar/>
              <InputBar/>
            </div>
          </div>
          <div className="grid grid-cols-2 pt-9 gap-5 rounded-lg text-white">
            <div className="flex-col">
              <p  className='text-3xl'>1,000+</p>
              <p>Advised</p>
            </div>
            <div className="flex-col">
              <p  className='text-3xl'>20+</p>
              <p>Years</p>
            </div>
            <div className="flex-col ">
              <p className='text-3xl'>300+</p>
              <p>Catisfired</p>
            </div>
            <div className="flex-col">
              <p className='flex justify-baseline text-3xl'>5<FaStar/>+</p>
              <p>Rating</p>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}
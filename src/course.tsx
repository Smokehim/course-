import Header from './componets/navbar.tsx'
import Footer from './componets/footer.tsx'
import {FaArrowDown} from 'react-icons/fa'
import Cards from './componets/cards.tsx'

export default function About() {
 

  return (
    <div className="layout">
      <Header />
      <main className='P-10'>
        <section className='col-span-8 p-9'>
          <div className="flex justify-center p-9">
            <h1 className='text-8xl font-bold'>COURSES</h1> 
          </div>
        </section>  
        <section>
          <div className='flex justify-between'>
            <h1 className='text-2xl'>My Course</h1>
            <div className="flex justify-baseline space-x-3 hover:cursor-pointer hover:bg-gray-500 border border-gray-200 rounded-3xl bg-white p-3">
              <div className="flex flex-col ">
                <h1>All Courses</h1>
              </div>
              <FaArrowDown  className='text-black'/>
            </div>
          </div>
          <Cards/>
        </section>
      </main>
      <footer className='pt-5'>
        <Footer />
      </footer>
      
    </div>
  )
}
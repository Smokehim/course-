import Header from './componets/navbar.tsx'
import './App.css'
import Cards from './componets/cardinfor.tsx'
import Footer from './componets/footer.tsx'
import CardCourse from './componets/cardpopula.tsx'
import { useEffect, useState } from 'react'
function App() {
 
  const [userName, getName] = useState('')
  
  useEffect( ()=>{
    const fetcheruser = async () => {
      try {
      const getdata = await fetch('http://localhost:1000/getusers')
      .then(response => {
        if (!response.ok) return Promise.reject(response)
        return response.json()
      })
      .then(datas => {
        getName(datas)
        console.log("here is your", datas)
      })
    } catch (error) {
      console.log("not able to get username",error)
    }
    }
    fetcheruser()
  }, [])

  return (
    <div className="layout">
      <Header />
      <main className='flex-col '>
        <section className='flex-col p-4'>
          <div className="flex items-center justify-center h-100 ">
            <div className='flex-col justify-baseline gap-20 '>
              <h1 className="md:text-8xl  text-center text-8xl font-bold text-blue-600 ">Welcome to CareerCampus</h1>
              <p className='p-5 text-lg font-semibold text-blue-600'>
                CareerCampus is a learning styles questionnaire that helps you learn better
                by suggesting the study strategies that are best for you. powered by VARk
              </p>
            </div>
          </div>
        </section>
        <section className='p-5 flex-col gap-4'>
          <CardCourse/>
          <Cards/>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default App

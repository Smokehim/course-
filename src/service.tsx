import Header from './componets/navbar.tsx'
import Question from './componets/question.tsx'
import Footer from './componets/footer.tsx'

export default function Service() {
 

  return (
    <div className="layout">
      <Header />
      <main>
        <section className='col-span-8 p-9'>
          <div className="flex justify-center p-9">
            <h1 className='md:text-8xl px-4 text-6xl font-bold'>The CareerCampus® Questionnaire How to find a career?</h1> 
          </div>
        </section>
        <section className='flex center'>
          <Question/>
        </section>
        <div className='flex justify-center pt-4'>
          <h1>answers</h1>
        </div>
      </main>
      <footer className='pt-3'>
        <Footer/>
      </footer>
    </div>
  )
}
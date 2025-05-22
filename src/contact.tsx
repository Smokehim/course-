import Header from './componets/navbar.tsx'
import Footer from './componets/footer.tsx'
function Conact(){

    return(
        <div className="layout">
            <Header/>
            <main className=' md:grid md:grid-cols-12 md:gap-4'>
                <section className='col-span-8 flex-col'>
                    <div className="flex-col"></div>
                </section>
            </main>
            <Footer/>
        </div>
            
    )
}
export default Conact;
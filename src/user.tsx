import Header from './componets/navbar.tsx'
import Settings from './componets/settings.tsx';
import Changers from './componets/privacy.tsx'

function User(){
    return(
        <div className="layout">
            <Header/>
            <main>
                <section className="flex h-screen pt-10 space-y-3 gap-9">
                    <div className="flex md:flex lg:flex-col  w-screen top-17  fixed  lg:top-20 lg:left-0 lg:w-1/4 lg:h-[calc(100vh-4rem)]   bg-gray-800 text-white p-5 ">
                        <div className="space-y-2 gap-5  md:gap-5 lg:flex-col flex justify-center">
                            <h2 className="md:text-xl text-l font-bold mb-4 ">User Settings</h2>
                            <p className='hover:text-blue-400'>Profile</p>
                            <p className='hover:text-blue-400'>Privacy</p>
                        </div>
                        
                    </div>
                    <div className="flex-grow  px-10 pt-10 lg:pl-64 lg:pt-20">
                        <Settings/>
                        <Changers/>
                    </div>
                </section>
            </main>
        </div>
    )
}
export default User;
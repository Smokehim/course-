import Header from './componets/navbar.tsx'
import Settings from './componets/settings.tsx';
import Changers from './componets/privacy.tsx'

function User(){
    return(
        <div className="layout">
            <Header/>
            <main>
                <section className="flex h-screen pt-10 space-y-3 gap-5">
                    <div className="flex md:flex-col  w-screen top-17  fixed  md:top-20 md:left-0 md:w-1/4 md:h-[calc(100vh-4rem)]   bg-gray-800 text-white p-5 ">
                        <div className="space-y-2 gap-5  md:gap-5 md:flex-col flex justify-center">
                            <h2 className="md:text-xl text-l font-bold mb-4 ">User Settings</h2>
                            <p className='hover:text-blue-400'>Profile</p>
                            <p className='hover:text-blue-400'>Privacy</p>
                            <p className='hover:text-blue-400'>Notifications</p>
                        </div>
                        
                    </div>
                    <div className="flex-grow  px-10 p-10">
                        <Settings/>
                        <Changers/>
                    </div>
                </section>
            </main>
        </div>
    )
}
export default User;
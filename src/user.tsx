import React, { useState } from 'react';
import Header from './componets/navbar.tsx'
import Settings from './componets/settings.tsx';
import Changers from './componets/privacy.tsx'
import { FaCog } from 'react-icons/fa';

function User(){
    const [activeTab, setActiveTab] = useState('profile');

    return(
        <div className="layout">
            <Header/>
            <main>
                <section className="flex h-screen pt-10 space-y-3 gap-9">
                    <div className="flex md:flex lg:flex-col w-screen top-17 items-baseline gap-10 fixed lg:top-20 lg:left-0 lg:w-1/4 lg:h-[calc(100vh-4rem)] bg-gray-800 text-white p-5 ">
                        <div className="flex gap-3 items-baseline ">
                            <FaCog size={23} />
                            <h2 className="md:text-xl text-l flex font-bold mb-4 ">User Settings</h2> 
                        </div>
                        <p
                            className={`cursor-pointer hover:text-blue-400 ${activeTab === 'profile' ? 'text-blue-400 font-bold' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </p>
                        <p
                            className={`cursor-pointer hover:text-blue-400 ${activeTab === 'privacy' ? 'text-blue-400 font-bold' : ''}`}
                            onClick={() => setActiveTab('privacy')}
                        >
                            Privacy
                        </p>
                    </div>
                    <div className="flex-grow px-10 pt-10 lg:pl-64 lg:pt-20">
                        {activeTab === 'profile' && <Settings />}
                        {activeTab === 'privacy' && <Changers />}
                    </div>
                </section>
            </main>
        </div>
    )
}
export default User;
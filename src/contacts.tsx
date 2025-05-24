import Header from './componets/navbar.tsx'
import Footer from './componets/footer.tsx'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Contacts(){

    return(
        <div className="layout">
            <Header/>
            <main className='p-10 flex flex-col md:grid md:grid-cols-12 '>
                <section className='col-span-8 flex-col p-8'>
                    <div className="flex-col space-y-5 justify-items-baseline">
                        <h1 className='text-8xl'>Contacts</h1>
                        <div className='flex gap-4 '>
                            <FaInstagram size={44}/>
                            <FaFacebook size={44}/>
                            <FaXTwitter size={44}/>
                            <FaLinkedin size={44}/>
                            <FaInstagram size={44}/>
                        </div>
                        <p className='text-justify'>We can be contacted by emailing contact@vark-learn.com, or by filling in the following form:</p>
                        <div className="flex-col gap-3">
                            <h1 className='prose text-xl font-bold text-red-800'>General Contact Form</h1>
                            <p className='prose'>Use this form to contact us to make comments about VARK, or about this website.</p>
                            <p className='prose'>If you want to ask for permission to use VARK copyright materials, use our Copyright Permission Request form.</p>
                            <p className='prose'>Forms are also available for those wanting to use VARK in any publication.</p>
                        </div>
                        <div  className="flex-col">
                            <div className="flex-col">
                                <h3 className='text-4xl font-bold'>Get in tourch</h3>
                                <p>Leave your message and will get back to you shortly</p>
                            </div>
                            <form action="" className="grid grid-cols-1 md:grid-cols-2 rounded-3xl bg-gray-100 gap-3 p-2 border border-gray-400" method="post">
                                <div className="flex flex-col space-y-5 p-5">
                                    <h1 className="font-bold text-xl">Name</h1>
                                    <input
                                    type="text"
                                    className="border border-gray-500 p-2 bg-gray-500 rounded-2xl hover:border-gray-800 h-10 w-full"
                                    placeholder="Name"
                                    />
                                </div>

                                <div className="flex flex-col space-y-5 p-5">
                                    <h1 className="font-bold text-xl">Email</h1>
                                    <input
                                    type="email"
                                    className="border border-gray-500 p-2 bg-gray-500 rounded-2xl hover:border-gray-800 h-10 w-full"
                                    placeholder="Email"
                                    />
                                </div>

                                <div className="flex flex-col space-y-5 p-5">
                                    <h1 className="font-bold text-xl">Phone</h1>
                                    <input
                                     type="text"
                                      className="border border-gray-500 p-2 bg-gray-500 rounded-2xl hover:border-gray-800 h-10 w-full"
                                     placeholder="Phone"
                                     />
                                </div>

                                <div className="flex flex-col space-y-5 p-5">
                                    <h1 className="font-bold text-xl">Address</h1>
                                    <input
                                    type="text"
                                    className="border border-gray-500 p-2 bg-gray-500 rounded-2xl hover:border-gray-800 h-10 w-full"
                                    placeholder="Address"
                                    />
                                </div>

                                <div className="flex flex-col col-span-2 space-y-5 p-5">
                               <h1 className="font-bold text-xl">Message</h1>
                                <textarea
                                className="border border-gray-500 bg-gray-500 p-2 rounded-lg hover:border-gray-800 h-40 w-full resize-none"
                                placeholder="Your message"
                               ></textarea>
                               </div>
                                <div className="w-full col-span-2 flex justify-center p-5">
                                    <button
                                    type="submit"
                                    className="border border-gray-800 text-white rounded-3xl h-10 px-10 bg-gray-800 hover:border-blue-700 hover:bg-blue-700 font-semibold"
                                    >
                                    Send
                                    </button>
                                </div>
                            </form>
                            <div className='p-4 gap-3'>
                                <h4 className='text-2xl font-bold'>Not getting a reply?</h4>
                                <p className='text-justify'>
                                    We receive many emails requesting permission to use the copyright 
                                    VARK questionnaire and associated materials. We are grateful that people ask for 
                                    permission and we try to respond to each request within 48 hours. Occasionally
                                     our response is returned to us so you do not get a reply. This may be because
                                </p>
                                <ul className='list-disc list-inside font-bold'>
                                    <li>the email address you gave us is incorrect, OR</li>
                                    <li>your mailbox is full, OR</li>
                                    <li>your spam checker thinks that “VARK” is a naughty word</li>
                                </ul>
                                <p>If you don’t get a reply within 48 hours, please email again,
                                     preferably with a solution that will allow us to 
                                     respond e.g. another email address</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='col-span-3'>
                    <h1 className='text-4xl p-6 font-bold md:flex hidden text-left'>CareerCampus</h1>
                    <div className='flex-col'>
                        <p className='text-2xl text-justify'><a href="">How to use CareerCampus ?</a></p>
                        <p>CareerCampus is a learning styles questionnaire that helps you learn better
                        by suggesting the study strategies that are best for you. powered by VARk</p>
                    </div>
                    
                </section>
            </main>
            <Footer/>
        </div>
    )
}
export default Contacts;
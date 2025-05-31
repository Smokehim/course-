import Header from './componets/navbar.tsx'
import Footer from './componets/footer.tsx'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react';

function Contacts(){
    const [email, getEmail] = useState('');
    const [name, getName] = useState('');
    const [phone, getPhone] = useState('');
    const [message, getMessage] = useState('');
    const [address, getAddress] = useState('');
    const [responseMsg, setResponseMsg] = useState(""); // <-- Add this line

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:1000/feedback", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({email, name, phone, message, address})
            });
            const data = await response.json();
            setResponseMsg(data.message || "Thank you for your feedback!"); // <-- Set message here
        } catch (error) {
            setResponseMsg("Not able to post data. Please try again."); // <-- Error message
        }
    };

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
                        <div  className="flex-col space-y-3 p-9 ">
                            <div className="flex-col">
                                <h3 className='text-4xl font-bold'>Get in tourch</h3>
                                <p>Leave your message and will get back to you shortly</p>
                            </div>
                            <form action="" className="flex flex-col border rounded-xl  p-7 gap-3" onSubmit={handleSubmit}>
                                <input type="text" placeholder='Name' className='border-2 border-gray-300 p-2 rounded-md' 
                                    value={name} onChange={(e)=>getName(e.target.value)} required/>
                                <input type="email" placeholder='Email' className='border-2 border-gray-300 p-2 rounded-md' 
                                    value={email} onChange={(e)=>getEmail(e.target.value)} required/>
                                <input type="tel" placeholder='Phone Number' className='border-2 border-gray-300 p-2 rounded-md' 
                                    value={phone} onChange={(e)=>getPhone(e.target.value)} required/>
                                <textarea placeholder='Message' className='border-2 border-gray-300 p-2 rounded-md'
                                    value={message} onChange={(e)=>getMessage(e.target.value)} required></textarea>
                                <input type="text" placeholder='Address' className='border-2 border-gray-300 p-2 rounded-md'
                                    value={address} onChange={(e)=>getAddress(e.target.value)} required/>
                                <button type="submit" className='bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-200'>
                                    Send Message
                                </button>
                            </form>
                            {/* Display the response message */}
                            {responseMsg && (
                                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded">
                                    {responseMsg}
                                </div>
                            )}
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
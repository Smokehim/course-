import { FaApper, FaFacebook, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import {  useState, useContext } from "react"
import { useNavigate } from "react-router";
import { ContextLog } from "./componets/contextlog";
import { ContextAPI} from './componets/input'



function Login(){
    // const {addUsers, addEmail} = useContext(ContextAPI);
    const {setLoging} = useContext(ContextLog);
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setError] = useState("");
    async function handleSign(e){
        e.preventDefault()
        const postUser = async ()=>{
            try { 
                const role = 'student'
                const payloard = {username, email, password, role }
                const postdata = await fetch('http://localhost:1000/signin',{
                    method: 'POST',
                        headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(payloard)
                })
                const result = await postdata.json()
                console.log("data has been sent", result)
                if (postdata.ok) {
                         // Successful login: redirect to home
                    
                    navigate("/home");
                    setLoging(true);
                } else {
                     const data = await result.json();
                    alert(data.message);
                    
                  }
            } catch (error) {
                console.log("not able to post data", error)
            }
        }
        postUser()
    }
    async function handleSunmit(e){
        e.preventDefault();
        const payloard = {username, email, password }
        const postdat = async()=>{
            try {
                const postdata = await fetch('http://localhost:1000/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payloard)
                });
                const getdata = await postdata.json(); // Only read once
                console.log("data has been sent", getdata);
                const results =  getdata.result
                console.log("data has been sent", getdata);
                
                if (postdata.ok) {
                    // addUsers(results.userName)
                    // addEmail(results.email)
                    navigate("/home");
                    setLoging(true);

                } else {
                    console.log("getting nothing", getdata);
                    setTimeout(()=>{
                        setError("Login failed. Please try again.");
                    },2000)
                    
                }
            } catch (error) {
                console.log("not able to post data", error)
            }
            }
            postdat()
        
    }  

    return(
        <div className="layout">
            <main className="flex justify-center">
                <div className="flex justify-content-center p-9">
                    
                    {showLogin && (
                        <form action="" onSubmit={handleSunmit}  className="flex-col p-2 border  w-100 border-gray-700 rounded-lg bg-gray-400 justify-center gap-3" method="post">
                            <h1 className="text-2xl text-center">Login</h1>
                            {errors && <p className="text-red-500 text-center">{errors}</p>}
                            <div className="flex flex-col space-y-5 p-5">
                                <h1 className="font-bold text-xl">Name</h1>
                                <input
                                onChange={(e) => setName(e.target.value)}
                                 type="text"
                                 value={username}
                                className="border border-gray-500 p-2 bg-white rounded-2xl hover:border-gray-800 h-10 w-full"
                                placeholder="Name"
                                />

                            </div>

                            <div className="flex flex-col space-y-5 p-5">
                                <h1 className="font-bold text-xl">Email</h1>
                                <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                className="border border-gray-500 p-2 bg-white rounded-2xl hover:border-gray-800 h-10 w-full"
                                placeholder="Email"
                                    />
                            </div>  
                            <div className="flex flex-col space-y-5 p-5">
                                <h1 className="font-bold text-xl">Password</h1>
                                <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                className="border border-gray-500 p-2 bg-white rounded-2xl hover:border-gray-800 h-10 w-full"
                                placeholder="Password"
                                />
                            </div> 
                            <div className="flex gap-5 ">
                                <div className="flex gap-3">
                                    <input type="checkbox" name="" id="" />
                                    <p>Kep me logged in</p>
                                </div>
                                <p className="text-left hover:text-blue-600 text-lg"><a  href="">forget password</a></p>
                            </div>
                            <div className="flex justify-center">
                                <button className="border border-gray-800 text-white rounded-3xl h-10 w-60 px-10 bg-gray-800 hover:border-blue-700 hover:bg-blue-700 font-semibold">Login</button> 
                            </div>
                            <div className="flex">
                                <p>Don't have an accout</p> 
                                <p className="text-blue-600 hover:cursor-pointer font-lg" onClick={()=>{setShowLogin(false)}}><a href=""></a>Create account</p>
                            </div>
                            <p>continue with</p>
                            <div className="flex justify-center gap-5 p-4">
                                <FaFacebook size={40}/>
                                <FaInstagram size={40}/>
                                <FaXTwitter size={40}/>
                                <FaApper size={40}/>
                            </div>
                            
                        </form>
                         )}
                          {!showLogin && (
                        <form action="" className="flex-col p-2 border w-100 border-gray-700 rounded-lg bg-gray-400 justify-center gap-3" method="post">
                            <h1 className="text-3xl font-bold text-center">Signin</h1>
                            <div className="flex flex-col space-y-5 p-5">
                                <h1 className="font-bold text-xl">Name</h1>
                                <input
                                 type="text"
                                 value={username}
                                 onChange={(e)=>{setName(e.target.value)}}
                                className="border border-gray-500 p-2 bg-white rounded-2xl hover:border-gray-800 h-10 w-full"
                                placeholder="Name"
                                />
                            </div>

                            <div className="flex flex-col space-y-5 p-5">
                                <h1 className="font-bold text-xl">Email</h1>
                                <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-500 p-2 bg-white rounded-2xl hover:border-gray-800 h-10 w-full"
                                placeholder="Email"
                                    />
                            </div>  
                            <div className="flex flex-col space-y-5 p-5">
                                <h1 className="font-bold text-xl">Password</h1>
                                <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-500 p-2 bg-white rounded-2xl hover:border-gray-800 h-10 w-full"
                                placeholder="Password"
                                />
                            </div> 
                            
                            <div className="flex justify-center">
                                <button onClick={handleSign} className="border border-gray-800 text-white rounded-3xl h-10 w-60 px-10 bg-gray-800 hover:border-blue-700 hover:bg-blue-700 font-semibold">Signup</button> 
                            </div>
                            <div className="flex justify-center">
                                <p>Have an accout</p> 
                                <p className="text-blue-600 hover:cursor-pointer font-lg" onClick={()=>{setShowLogin(true)}}><a href="">Login</a></p>
                            </div>
                            <p className="text-center">continue with</p>
                            <div className="flex justify-center gap-5 p-4">
                                <FaFacebook size={40}/>
                                <FaInstagram size={40}/>
                                <FaXTwitter size={40}/>
                                <FaApper size={40}/>
                            </div>
                        </form>
                         )}
                    
                    </div>
                    
            </main>
        </div>
    )
}
export default Login
import { FaUser } from "react-icons/fa";
import { useContext, useState } from "react";
import { ContextAPI } from "./input";


function Settings() {
    const { users, email } = useContext(ContextAPI);
    const [username, setName] = useState("");
    const [emails, setEmail] = useState("");
    const [update, setUpdate] = useState("");
    const [password, setPassword] = useState("");
   async function handleEdites(e){
        e.preventDefault()
        const payloard = {username, emails, password }
        const getData = async ()=>{
            try {
                const datas = await fetch('http://localhost:1000/putusers',{
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(payloard)
                })
                const result = await datas.json()
                console.log("data has been sent", result)
                if (datas.ok) {
                        setUpdate("updated")
                } else {
                     const data = await result.json();
                    alert(data.message);
                    
                  }
                
            } catch (error) {
                console.log("not able to get data", error)
            }
        }
        getData()
    }

    return(
        <div className=" flex-col items-center justify-center p-10 ">
            <data className="flex flex-col items-center justify-center p-10 gap-2">
                
               <div className="flex  border border-gray-200 hover:cursor-pointer hover:bg-blue-600 p-5 gap-4 rounded-3xl bg-gray-200 shadow-lg">
               <h1 className="text-xl font-bold pt-10">Your Profile</h1>
               <div className="flex  justify-center  items-center gap-5">
               <FaUser size={100}/>
               <div className="flex flex-col text-xl font-bold">
                <p className="text-gray-400">Username {users}</p>
                <p className="text-gray-400">email {email}</p>
               </div>
               </div>
                
               </div>
                <form onSubmit={handleEdites} className="flex flex-col space-y-3 mt-5 ">
                    <h1>Edit Profile</h1>
                    <label className="text-lg font-semibold">Username</label>
                    <input type="text" value={username} onChange={(e)=>setName(e.target.value)} className="border  hover:shadow-[0_4px_10px_rgba(0,0,255,0.4)] hover:border-blue-600 border-gray-400 p-2 rounded-lg w-80" placeholder="Enter your username" />
                
                    <label className="text-lg font-semibold">Email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border hover:shadow-[0_4px_10px_rgba(0,0,255,0.4)] hover:border-blue-600 border-gray-400 p-2 rounded-lg w-80" placeholder="Enter your email" />
                
                    <label className="text-lg font-semibold">Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border hover:shadow-[0_4px_10px_rgba(0,0,255,0.4)] hover:border-blue-600  border-gray-400 p-2 rounded-lg w-80" placeholder="Enter your password" />
                
                    <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mt-3">Save Changes</button>
                </form>
                <div className=" border  p-4 rounded-3xl b text-center hover:shadow-[0_4px_10px_rgba(0,0,255,0.4)]  text-2xl text-green-600 border-green-500 hover:cursor-point">
                    {update ? <p>{update}</p> : null}
                </div>
            </data>
            
        </div>
    )
}
export default Settings;
import { FaUser } from "react-icons/fa";

function Settings() {

    return(
        <div className=" flex-col items-center justify-center p-10 ">
            <data className="flex flex-col items-center justify-center p-10">
                <h1 className="text-xl font-bold pt-10">Your Profile</h1>
            <div className="flex  border border-black p-5 rounded-3xl bg-gray-200 shadow-lg">
                <FaUser size={100}/>
            </div>
            <div className="flex flex-col space-y-3 mt-5 ">
                <label className="text-lg font-semibold">Username</label>
                <input type="text" className="border border-gray-400 p-2 rounded-lg w-80" placeholder="Enter your username" />
                
                <label className="text-lg font-semibold">Email</label>
                <input type="email" className="border border-gray-400 p-2 rounded-lg w-80" placeholder="Enter your email" />
                
                <label className="text-lg font-semibold">Password</label>
                <input type="password" className="border border-gray-400 p-2 rounded-lg w-80" placeholder="Enter your password" />
                
                <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mt-3">Save Changes</button>
            </div>
            </data>
            
        </div>
    )
}
export default Settings;
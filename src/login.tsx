import {  useState, useContext } from "react"
import { useNavigate } from "react-router";
import { ContextLog } from "./componets/contextlog";
import { ContextAPI} from './componets/input'



function Login(){
     const {setUsers, setEmail} = useContext(ContextAPI);
    const {setLoging} = useContext(ContextLog);
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);
    const [username, setName] = useState("");
    const [email, setEmails] = useState("");
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
                  setUsers(result.userName) // or results.username, depending on your backend
                  setEmail(result.email)
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
                    setUsers(results.userName) // or results.username, depending on your backend
                    setEmail(results.email)
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
        <div className="layout bg-white min-h-screen">
  <main className="flex items-stretch justify-center h-screen bg-gray-100">
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
      {/* Welcome Section */}
      <div className="md:flex hidden md:flex-col items-center justify-center text-white p-10 bg-blue-500 h-full">
        <p className="text-6xl font-bold mb-4">CareeCampus</p>
        <div className="text-center space-y-4">
          <h1 className="text-xl font-semibold">
            {showLogin ? "Hello, Friend" : "Welcome back"}
          </h1>
          <p className="text-gray-100">
            {showLogin
              ? "Enter your personal details and start journey with us"
              : "To keep connected with us, please enter your personal information."}
          </p>
        </div>
        <div className="mt-6">
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="border border-white text-white rounded-3xl h-10 w-60 px-10 bg-transparent hover:bg-white hover:text-blue-500 font-semibold"
          >
            {showLogin ? "Signup" : "Login"}
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center bg-blue-600 md:bg-gray-100 h-full">
        <form
          onSubmit={showLogin ? handleSunmit : handleSign}
          className="w-full max-w-md md:bg-gray-500  p-8 rounded-lg shadow-xl space-y-6"
        >
          <h1 className="text-3xl font-bold text-center text-black">
            {showLogin ? "Login" : "Signup"}
          </h1>

          {errors && showLogin && (
            <p className="text-red-500 text-center">{errors}</p>
          )}

          <div>
            <label className="block font-bold text-xl mb-2">Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 p-2 rounded-2xl bg-white border border-gray-500 hover:border-blue-600"
              placeholder="Name"
            />
          </div>

          <div>
            <label className="block font-bold text-xl mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmails(e.target.value)}
              className="w-full h-10 p-2 rounded-2xl bg-white border border-gray-500 hover:border-blue-600"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block font-bold text-xl mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 p-2 rounded-2xl bg-white border border-gray-500 hover:border-blue-600"
              placeholder="Password"
            />
          </div>

          {showLogin && (
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Keep me logged in</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-800 text-white w-60 h-10 rounded-3xl font-semibold hover:bg-blue-700"
            >
              {showLogin ? "Login" : "Signup"}
            </button>
          </div>

          <div className="text-center text-black md:hidden flex md:text-blue-500">
            <p>
              {showLogin
                ? "Don't have an account?"
                : "Already have an account?"}
              <span
                onClick={() => setShowLogin(!showLogin)}
                className="ml-2    hover:underline cursor-pointer"
              >
                {showLogin ? "Create Account" : "Login"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </main>
</div>


    )
}
export default Login


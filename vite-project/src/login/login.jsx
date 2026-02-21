import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useAuthStore } from "../store/authStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function Login() {
  const [isEmailActive, setEmailActive] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const {token,signup, login}=useAuthStore()
  const [error,setError]=useState("")
 
  const handleSignup=async (e)=>{
    e.preventDefault()
    setError("")
    if (!email || !username) {
        setError("⚠️ Both email and username are required!");
    console.error("❗ Both email and username are required.");
    return;
  }

    try{
      const res = await signup(email,username);
      if (res.isUserAlreadyExists){
        await login(email)
        navigate("/dashboard")
      }else{
        navigate("/emailAuthentication")
      }
    }catch(error){
      console.log(error)
      setError(error.response?.data?.message || "❌ Signup failed. Please try again.");
    }
  }

  const navigate=useNavigate()
  const toggleForm = () => {
    setEmailActive((prev) => !prev);
  };

  return (
    <div className=" bg-gradient-to-br from-blue-200 via-green-100 to-pink-400 min-h-screen  flex flex-col items-center justify-center px-4">
      <h1 className="text-center font-serif font-bold text-gray-800 mb-4
  text-3xl sm:text-4xl lg:text-7xl">All You Need Is a Fresh Start</h1>
      <p className="font-bold text-center mb-6 text-gray-800
  text-xl sm:text-2xl lg:text-4xl">LOGIN OR SIGNUP</p>

      <div className="w-full max-w-md lg:max-w-5xl
  h-auto lg:h-[400px]
  flex flex-col lg:flex-row
  rounded-3xl overflow-hidden
  backdrop-blur-[5px]
  border border-white/50
  shadow-[0_0_30px_rgba(0,0,0,0.5)]
  transition-all duration-700">

        {/* LEFT PANEL */}
        <div className=" w-full lg:w-340
  flex flex-col items-center justify-center
  text-gray-800
  p-6 lg:p-0">

         
            <>
              <h2 className="text-2xl font-bold mb-6">Continue with Email</h2>
              <form className="flex flex-col gap-4 w-full max-w-100">
                <input className="border p-3 rounded-md text-gray-800" type="text" placeholder="Username" value={username}
                  onChange={(e) => setUsername(e.target.value)} />
                <input className="border p-3 rounded-md" type="email" placeholder="Email" value={email}
                  onChange={(e) => setEmail(e.target.value)}  />
                   {error && (
          <p className="text-red-500 text-sm font-semibold text-center -mt-2">{error}</p>
        )}
                <button type="submit" className="bg-white text-black py-2 rounded-md"
                  onClick={handleSignup}
                  >Send Code</button>
                
              </form>
            </>
        
        </div>       
      </div>
    </div>
  );
}

export default Login;

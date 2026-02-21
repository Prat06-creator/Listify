import React, { useState,useRef, useEffect }  from 'react'
import {motion} from 'framer-motion'; 
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';
function EmailAuthentication() {
  const navigate = useNavigate();
  const [code,setCode]=useState(["", "","","","",""]);
  const inputRefs=useRef([]);
  const {setToken,error, isLoading, verifyEmail}=useAuthStore()
  const handleChange=(index,value)=>{
    const newCode=[...code]

    if (value.length>1){
      const pastedCode =value.slice(0,6).split("")
      for (let i=0;i<6;i++){
        newCode[i]=pastedCode[i]||""
      }
      setCode(newCode)
      const lastfilledIndex=newCode.findLastIndex((digit)=>digit !=="") 
      const focusIndex=lastfilledIndex<5?lastfilledIndex+1:5
      inputRefs.current[focusIndex].focus()
    }else{
      newCode[index]=value
      setCode(newCode)
      if (value&&index<5){
        inputRefs.current[index+1].focus();
      }

    }
  }
  const handleKeyDown=(index,e)=>{
    if (e.key==='Backspace'&& !code[index]&&index>0){
      inputRefs.current[index-1].focus()
    }
    
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    const verificationCode=code.join("")
    alert(`Verification code: ${verificationCode}`)
   
    try{
      const res = await verifyEmail(verificationCode)
     setToken(res.token); 
      console.log("Token set in store:", res.token);
      toast.success("Email verified successfully")
      navigate("/dashboard")

    }catch(error){
       console.log(error)
    }
  }
  

  useEffect(()=>{
    if (code.every(digit=>digit !=='' )){
     handleSubmit(new Event('submit'))
    }
  },[code])

  return(
    <div className="bg-gradient-to-br from-blue-200 via-green-100 to-pink-400 min-h-screen flex flex-col items-center justify-center px-4 ">
      <motion.div className=' backdrop-blur-[5px]
    border border-white/50
    shadow-[0_0_30px_rgba(0,0,0,0.5)]
    transition-all duration-700
    rounded-3xl
    w-full max-w-sm lg:max-w-xl
    p-6 sm:p-8 lg:p-12'>
    
      
      <h2 className='font-bold text-center text-green-400 mb-4
  text-3xl sm:text-4xl lg:text-5xl '>Verify Email</h2>
      <p className='text-center text-black font-bold mb-6
  text-base sm:text-lg lg:text-2xl'>Enter the 6-digit code sent to your email</p>
      <form onSubmit={handleSubmit}    className="space-y-6">
        <div className='flex justify-center gap-2 sm:gap-3'>
          {code.map((digit,index)=>(
            <input 
            key={index}
            ref={(el)=>(inputRefs.current[index]=el)}
            type='text'
            maxLength='6'
            value={digit}
            onChange={(e)=>handleChange(index,e.target.value)}
            onKeyDown={(e)=>handleKeyDown(index,e)}
            className='w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12
        text-center font-bold
        text-lg sm:text-xl lg:text-2xl
        bg-gray-700 text-white
        border-2 border-gray-500
        rounded-lg
        focus:outline-none focus:border-blue-500'
            
            
            />
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-sm font-semibold text-center -mt-2">{error}</p>
        )}
        <button className='bg-white  text-black font-bold py-2 px-4 rounded ml-45' type='submit' onClick={handleSubmit}>Submit</button>
      </form>




      </motion.div>
   


    </div>
  )


}
export default EmailAuthentication;
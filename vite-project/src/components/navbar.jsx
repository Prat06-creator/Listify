import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleUser,faBell,} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../store/authStore";


const Navbar = () => {
   const user = useAuthStore((state) => state.user);
return (
       <div className="flex justify-end items-center w-full px-6 pt-1 text-white" >  

         

        <div className='mt-6 ml-10 w-[150px] h-[50px] rounded-4xl bg-white/50 flex items-center justify-center text-black'>
            <p className='text-[20px] '>Hi! {user?user.username:"guest"} </p>
                        <button className='pl-[10px] text-black font-bold text-2xl '>
                            <FontAwesomeIcon icon={faCircleUser} />
                            
                        </button>
                    </div>
       

       </div>







  )}

export default Navbar

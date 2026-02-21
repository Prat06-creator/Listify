import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    
    faCircleUser,
    faBell,
   
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    return (
        <div className='flex justify-center items-start absolute mt-[40px]'>
        <div >
                <div className="heading flex flex-col justify-center h-[130px] w-[800px] bg-[url('/image.png')] bg-contain bg-center rounded-[20px]  text-center text-[#000] 
                ">
    <p className="text-6xl font-medium  font-serif  ">Listify</p>
                    <p className="text-3xl mt-2 font-serif">Got mess. I'll list it out!!</p></div>
            </div>

            

            </div>
    )
}

export default Header







{/* <div >
        <div className="heading flex flex-col justify-start h-[130px] w-[800px] bg-[url('/image.png')] bg-contain bg-center rounded-[20px] ml-[400px] -mt-[500px] text-center text-[#000]
        ">
  <p className="text-6xl font-medium  font-serif overflow-hidden ">Listify</p>
          <p className="text-3xl mt-[10px] font-serif">Got mess. I'll list it out!!</p></div>
      </div> */}
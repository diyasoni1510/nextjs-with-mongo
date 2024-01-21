"use client"
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { FaVideo } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import Link from "next/link";

const ProfileFooter = () => {
  const router = useRouter()
  const pathname = usePathname()
    const username = pathname.split('profile/').pop();
  const [footerSlider , openFooterSlider] = useState(false)
  const logout = async () =>{
    console.log("logout")
    try {
       await axios.get("/api/users/logout")
       localStorage.removeItem("username")
       router.push("/login")
    } catch (error) {
        console.log(error)
      console.log(error.mesage)
    }
  }
  
  return (
    <>
    <div className="header-icons space-x-4 items-center justify-around flex md:hidden fixed bg-white py-2 bottom-0 w-full">
    <FaHome className="text-2xl cursor-pointer" onClick={()=>{router.push('/profile')}} />
        <IoSearch className="text-2xl cursor-pointer" onClick={()=>{router.push('/searchpage')}} />
        <FiPlusCircle className="text-2xl cursor-pointer" />
        <FaVideo className="text-2xl cursor-pointer" />

        <IoPersonCircle className="text-2xl cursor-pointer" onClick={()=>{
          footerSlider === true ? openFooterSlider(false) : openFooterSlider(true)
        }}/>
      </div>
      {footerSlider === true && <div className="fixed bottom-10 border-t-2 w-full bg-white flex flex-col space-y-3 py-2 ">
        <button>Switch Account</button>
        <button>Setting</button>
        <button onClick={()=>router.push(`/setdetails/${username}`)} >Edit profile</button>
        <button onClick={()=>router.push(`/profilepage/${localStorage.getItem("username")}`)}>Profile</button>
        <button className="text-red-500" onClick={logout}>Logout</button>
      </div>}
      
      </>
  )
}

export default ProfileFooter
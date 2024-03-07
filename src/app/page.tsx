"use client"
import React, { useState } from "react";
import LogInOrSignuppage from "./loginorsignuppage/page"
import { Toaster } from "react-hot-toast";


const Page = () => {
  const [isUserLoggedIn,setIsUserLoggedIn] = useState(false)
  return (
    <>
      <LogInOrSignuppage/>
      <Toaster/>
    </>
  );
};

export default Page;
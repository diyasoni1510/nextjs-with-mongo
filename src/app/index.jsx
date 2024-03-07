"use client"
import React, { useEffect } from "react";
import LogInOrSignuppage from "./loginorsignuppage/page"
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Profile from "./profile/page"

const index = () => {
  const LoggedUser = useSelector((state) => state.LoggedUser);
  const isUserPresent = localStorage?.getItem("userId")
  useEffect(() => {
    console.log(LoggedUser);
  }, [LoggedUser]);
  return (
    <>
    {/* { !LoggedUser ?
      <LogInOrSignuppage />
      :
      <Profile/>
    } */}
    { !LoggedUser && !isUserPresent ? <LogInOrSignuppage/> : <Profile/>}
      <Toaster />
    </>
  );
};

export default index;

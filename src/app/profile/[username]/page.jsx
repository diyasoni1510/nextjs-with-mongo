"use client"
import React, { useState } from 'react'
import ProfileHeader from "../profileheader/page"
import ProfileFooter from "../profilefooter/page"
import StorySection from "../storysection/page"
import PostSection from "../postsection/page"




const UserProfile = ({params}) => {
  return (
    <>
    <ProfileHeader/>
    <div className='mt-16 flex flex-col w-full relative'>
      <StorySection />
      <PostSection />
    </div>
    <ProfileFooter /> 
    </>
  )
}

export default UserProfile
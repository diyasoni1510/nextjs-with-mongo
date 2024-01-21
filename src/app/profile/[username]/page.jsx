"use client"
import React from 'react'
import ProfileHeader from "../profileheader/page"
import ProfileFooter from "../profilefooter/page"


const UserProfile = ({params}) => {
  return (
    <>
    <ProfileHeader/>
    <div className='mt-24'>
    <div>{params.username}</div>
    </div>
    <ProfileFooter /> 
    </>
  )
}

export default UserProfile
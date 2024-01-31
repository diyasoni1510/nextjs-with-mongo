"use client"
import React from 'react'
import { useParams } from 'next/navigation'

const MessagePage = () => {
    const params = useParams()
    const MessageWith = params.username
    
  return (
    <>
    <div>MessagePage {MessageWith} </div>
    
    </>
  )
}

export default MessagePage
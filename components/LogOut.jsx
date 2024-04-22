'use client'
import React from 'react'
import { signOut } from 'next-auth/react'

const LogOut = () => {
  return (
    <div>
        <button onClick={()=>signOut()} className='bg-blue-400 px-2 text-white'>Log Out</button>
    </div>
  )
}

export default LogOut
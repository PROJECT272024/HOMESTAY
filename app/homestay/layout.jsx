import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const HomestayLayout = async ({ children}) => {
  const session = await getServerSession(authOptions)
  if(!session || !(session?.user)){
      redirect("/",'replace');
  }
  return (
    <div className='flex flex-col min-h-screen relative'>
        <Navbar/>
        {children}
        <Footer className='mt-4 absolute bottom-0'/>
    </div>
  )
}

export default HomestayLayout
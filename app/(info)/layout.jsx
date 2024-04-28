import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const HomestayLayout = async ({ children}) => {
  
  return (
    <div className='flex flex-col min-h-screen relative'>
        <Navbar/>
        {children}
        <Footer className='mt-4 absolute bottom-0'/>
    </div>
  )
}

export default HomestayLayout
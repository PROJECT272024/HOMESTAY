import Footer from '@/components/Footer'
import NormalNavbar from '@/components/NormalNavbar'
import React from 'react'

const RegisterLayout = ({ children}) => {
  return (
    <div className='flex flex-col min-h-screen relative'>
        <NormalNavbar/>
        {children}
        <Footer className='absolute bottom-0'/>
    </div>
  )
}

export default RegisterLayout
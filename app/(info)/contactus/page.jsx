import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { IoLocationOutline } from "react-icons/io5"
import { FaPhoneAlt,FaRegClock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BsCalendarWeek } from "react-icons/bs";

const ContactUs = () => {
  return (

        <div className='mx-auto py-4'>
            <h1 className='font-bold text-2xl flex justify-center text-blue-500 p-4'>Contact Us</h1>
            <div className='h-px drop-shadow-md bg-gray-300 mb-4'></div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='flex items-center justify-center text-green-500 p-6'>
                    <div className='w-96 text-center  text-xl md:text-3xl'>
                        'We are committed to assists our guest for making their visit memorable.'
                    </div>
                    
                </div>
                <div className='flex flex-col justify-center gap-4 font-bold'>
                    
                    <div className='flex items-center'>
                        <IoLocationOutline className='mr-2 text-green-500'/> <p> : Paryatan Bhawan, Tadong, Gangtok, Sikkim 737102</p>
                    </div>
                    <div className='flex items-center'>
                        <FaPhoneAlt className='mr-2 text-green-500'/> <p> : 03592-209090</p>
                    </div>
                    <div className='flex items-center'>
                        <MdOutlineEmail className='mr-2 text-green-500'/> <p> : secy_tourism@yahoo.com</p>
                    </div>
                    <div className='flex items-center'>
                        <FaRegClock className='mr-2 text-green-500'/> <p> : 10:00 A.M. to 4:00 P.M.</p>
                    </div>
                    <div className='flex items-center'>
                    <BsCalendarWeek className='mr-2 text-green-500'/> <p> : Monday to Friday</p>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-red-600'>*</span> (Except on Saturdays, Sundays & Government Holidays)
                    </div>
                </div>
            </div>

        </div>
  )
}

export default ContactUs
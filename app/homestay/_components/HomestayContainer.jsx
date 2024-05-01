'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {toast} from "react-toastify"
import WhiteModal from '@/components/WhiteModal'
import { Pagination } from '@/components/Pagination'
import HomestayCard from './HomestayCard'

const HomestayContainer = ({data:homestays,setDelete,pageNo,setPageNo,totalItems,isLoading,setIsLoading,onPageChange}) => {
    const [isChange,setChange]=useState(true)
    const [status,setStatus]=useState(false)
    const router = useRouter()
    useEffect(()=>{
        if(homestays){
            setIsLoading(false)
        }
    },[homestays])
    
    useEffect(()=>{
        console.log('I was called 2 usereffect')
    },[isChange])
    const handleView = (e,id)=>{
        router.replace(`/homestay/${id}?q=1`);
    }
    const handleEdit = (e,id)=>{
        router.replace(`/homestay/${id}/edit`);
    }
    const handleDelete = async (e,id)=>{
       setStatus(true)
        try {
            let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`
            const homestay=homestays.filter((value)=>(value._id==id))
            let res = await fetch(url,{
                method:"DELETE"
            })
            if(res.status==201) {
                //const hs = homestays.filter((value)=>value._id!=id)
                //setHomeStays(hs)
                setDelete()            
                setChange(!isChange)
                toast.success("Homestay Removed Sucessfully")
            }else {
                console.log("Problem - ", id)
                toast.error("1. Problem in removing Homestay")
            }
        } catch (error) {
            console.log(error)
            toast.error("2. Problem in removing Homestay")
            
        } finally{
            setStatus(false)
        }
    }
  return (
    <section className='mx-2 sm:mx-20 pt-7 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 '>
        {
            homestays.length==0 && !isLoading && 
            <div className='flex justify-center md:col-span-2 lg:col-span-3 text-lg'>
                No Homestay found.
            </div>
    
        }
            <>
                {
                    homestays && homestays.map((homestay,i)=>(
                        <HomestayCard key={i} data={homestay} handleView ={handleView} 
                            handleEdit={handleEdit} handleDelete={handleDelete} />
                    ))
                }
                {
                    homestays.length>0 && <div className='flex justify-center md:col-span-2 lg:col-span-3 gap-1'>
                     <Pagination totalItems={totalItems} pageSize={6} page={pageNo} onPageChange={onPageChange}/>
                    </div>
                }
            </>
        </div>
        <WhiteModal status={status} title={'Deleting Files'}/>
        <WhiteModal status={isLoading} title={'Fetching Homestay'}/>
    </section>
        
  )
}

export default HomestayContainer
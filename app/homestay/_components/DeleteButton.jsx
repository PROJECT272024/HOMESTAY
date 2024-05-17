'use client'
import ConfirmModal from '@/components/ConfirmModel'
import WhiteModal from '@/components/WhiteModal'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

const DeleteButton = ({handleDelete,id}) => {
    const router =useRouter()
    const [message, setMessage] = useState('');
    const [isProcessing, setProcessing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [delId, setDelId] = useState('');
    const handleDeleteClick = (e) => {
        setDeleting(true)
        setDelId(id)
      }
    
      const handleDeleteOperation = (e,id) => {
        setDeleting(false)
        setProcessing(true)
        setMessage('Deleting Homestay')
        let callDelete = async () => {
          let response = await handleDelete(null,{id:delId})
          if(response.errors){
            toast.error(response.errors)
          }else{
            toast.success('Homestay Deleted Sucessfully')
            router.replace('/homestay')
          }
          setProcessing(false)
        }
        callDelete()
      }
  return (
    <>
       
        <button onClick={(e)=>handleDeleteClick(e,id)} className='p-2 sm:w-20 flex flex-row items-center 
                    justify-center bg-red-600 mr-2 rounded-lg 
                      hover:drop-shadow-md hover:bg-red-800'>
            <FaTrashAlt  className='font-bold sm:mr-2'/> <span className='hidden sm:flex'>Delete</span>
        </button>
        <WhiteModal status={isProcessing} title={message}/>
        <ConfirmModal isDeleting={isDeleting} setDeleting={setDeleting}  handleDeleteOperation={handleDeleteOperation}
         delId={delId}/>
    
    </>
    

  )
}

export default DeleteButton
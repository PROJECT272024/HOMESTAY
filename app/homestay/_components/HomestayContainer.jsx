'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify"
import WhiteModal from '@/components/WhiteModal'
import HomestayCard from './HomestayCard'
import ConfirmModal from '@/components/ConfirmModel'

const HomestayContainer = ({ data: homestays, setDelete,modifyData }) => {
    const [status, setStatus] = useState(false)
    const [delId, setDelId] = useState('')
    const [message, setMessage] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDeleteClick = (e, id) => {
        console.log('1.  Homestay ', delId)
        setDelId(id)
        setIsDeleting(true)
    }

    const handleDeleteOperation = (id) => {
        console.log('Deleting Homestay ', id)
        setIsDeleting(false)
        setStatus(true)
        setMessage('Deleting Homestay')
        let callDelete = async () => {
            let response = await setDelete(null, { id: delId })
            if (response.errors) {
                toast.error(response.errors)
            } else {
                toast.success('Homestay Deleted Sucessfully')
                modifyData(delId)
            }
            setStatus(false)
        }
        callDelete()
    }

    /*useEffect(() => {
        console.log('I was called 2 usereffect')
    }, [isChange])*/
    const handleView = (e, id) => {
        router.replace(`/homestay/${id}?q=1`);
    }
    const handleEdit = (e, id) => {
        router.replace(`/homestay/${id}/edit`);
    }
    
    return (
        <section className='mx-2 sm:mx-20 pt-7 pb-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 '>
                {
                    homestays.length == 0  &&
                    <div className='flex justify-center md:col-span-2 lg:col-span-3 text-lg'>
                        No Homestay found.
                    </div>

                }
                <>
                    {
                        homestays && homestays.map((homestay, i) => (
                            <HomestayCard key={i} data={homestay} handleView={handleView}
                                handleEdit={handleEdit} handleDelete={handleDeleteClick}  />
                        ))
                    }

                </>
            </div>
            <WhiteModal status={status} title={message} />
            <ConfirmModal isDeleting={isDeleting} setDeleting={setIsDeleting} handleDeleteOperation={handleDeleteOperation}
                delId={delId} />
        </section>

    )
}

export default HomestayContainer
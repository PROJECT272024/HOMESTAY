
import React from 'react'
import { allHomestayDataForCardView } from '@/actions/homestay'
import SearchOption from './_components/SearchOption'

const page = async () => {
    
  let result = async() => {
    return await allHomestayDataForCardView()
  }
  let data = await result();
  return (

    <div>
        {
         <SearchOption orgData={data.result}/> 
        }
    </div>
  )
}

export default page
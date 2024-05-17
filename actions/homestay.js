'use server'
import { revalidatePath } from 'next/cache';

export const listViewUpdateStatus = async(dummy,value) => {
    //console.log('Update status is called - ',value.status,value.id)
    let errors=''
    try {
      let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${value.id}`
      const res = await fetch(url,{
          method:'PUT',
          header:{
          "Content-Type":"application/json"
          },
          body:JSON.stringify({
            "isStatus":value.status
            })
      });
      
      if(res.status==201){
          console.log('status updated sucessfully')
          revalidatePath('/homestay/listview')
      }else{
        console.log('status update failed')
        errors = '1. Problem in updating status'
      }
    } catch (error) {
        console.log(error)
      errors = '2. Error in updating status'
    }
    return {errors}
}

export const listviewDeleteHomestay = async(dummy,value) => {
    console.log('deleteHomestay  is called - ',value)
    let errors=''
    try {
      let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${value.id}`
      const res = await fetch(url,{
          method:"DELETE"
      })
      if(res.status==201) {

        revalidatePath('/homestay/listview') 
      }else{
        errors='1. Problem in deleting homestay records'
    }
  } catch (error) {
      console.log(error)
      errors='1. Error in deleting homestay records'
  }
    
    return {errors}
}
export const deleteHomestay = async(dummy,value) => {
  console.log('deleteHomestay  is called - ',value)
  let errors=''
  try {
    let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${value.id}`
    const res = await fetch(url,{
        method:"DELETE"
    })
    if(res.status==201) {
      revalidatePath('/homestay/listview') 
    }else{
      errors='1. Problem in deleting homestay records'
  }
} catch (error) {
    console.log(error)
    errors='1. Error in deleting homestay records'
}
  
  return {errors}
}
'use server'
import { revalidatePath } from 'next/cache';

export const updateStatus = async(dummy,value) => {
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
          revalidatePath('/test')
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

export const deleteHomestay = async(dummy,value) => {
    console.log('deleteHomestay  is called - ',value)
    let errors=''
    /*try {
      let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${value.id}`
      const res = await fetch(url,{
          method:'DELETE',
          header:{
          "Content-Type":"application/json"
          },
          body:JSON.stringify({
            "isStatus":value.status
            })
      });
      
      if(res.status==201){
          console.log('status updated sucessfully')
          revalidatePath('/test')
      }else{
        console.log('status update failed')
        errors = '1. Problem in updating status'
      }
    } catch (error) {
      errors = '2. Error in updating status'
    }*/
    return {errors}
}
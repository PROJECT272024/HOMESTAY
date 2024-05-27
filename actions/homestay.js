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
          revalidatePath('/homestay') 
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
        revalidatePath('/homestay') 
        revalidatePath('/test') 
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
      revalidatePath('/homestay') 
      revalidatePath('/test') 
    }else{
      errors='1. Problem in deleting homestay records'
  }
} catch (error) {
    console.log(error)
    errors='1. Error in deleting homestay records'
}
  
  return {errors}
}


export const allHomestayDataForListView = async() => {
  let result=[]
  const project = {
    isUrbanOrRular: 1,
    isPrivateOrGovt: 1,
    isNormalOrHeritage:1,
    state:1,
    district:1,
    constituency:1,
    address: 1,
    homestayName: 1,
    manager: 1,
    isRegistredWithDot:1,
    isRegisteredWithLocal:1,
    contact: 1,
    email: 1,
    createdBy: 1,
    isStatus: 1,
  
  }
  const input = {
    "query":{},
    "project":project
  }
  
  let errors=''
  try {
    let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/search`
    let res = await fetch(url,{
      method:'POST',
      header:{
      "Content-Type":"application/json"
      },
      body:JSON.stringify(input)
    });
    if(res.status==200) {
      result = await res.json();
      revalidatePath('/homestay') 
    }else{
      errors='Problem in retreiving homestay records'
    }
  } catch (error) {
      console.log(error)
      errors='Error in retreiving homestay records'
  }
  return {result,errors}
}

export const allHomestayDataForCardView = async() => {
  let result=[]
  let project = {
    homestayName:1,
    isRegistredWithDot:1,
    homestayImages:1,
    isRegisteredWithLocal:1,
    manager:1,
    contact:1,
    address:1,
    mcnpgpuward:1,
    villageOrTown:1,
    constituency:1,
    district:1,
    state:1,
    createdBy:1
  }
  const input = {
    "query":{},
    "project":project
  }
  
  let errors=''
  try {
    let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/search`
    let res = await fetch(url,{
      method:'POST',
      header:{
      "Content-Type":"application/json"
      },
      body:JSON.stringify(input)
    });
    if(res.status==200) {
      result = await res.json();
      revalidatePath('/homestay') 
    }else{
      errors='Problem in retreiving homestay records'
    }
  } catch (error) {
      console.log(error)
      errors='Error in retreiving homestay records'
  }
  return {result,errors}
}

export const allHomestayDataForAnalysis = async() => {
  let result=[]
  const project = {
    isUrbanOrRular: 1,
    isPrivateOrGovt: 1,
    isNormalOrHeritage: 1,
    district: 1,
    constituency: 1,
    qualification:1,
    gender:1,
    isRegistredWithDot:1,
    isRegisteredWithLocal:1
  }
  const input = {
    "query":{},
    "project":project
  }
  
  let errors=''
  try {
    let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/search`
    let res = await fetch(url,{
      method:'POST',
      header:{
      "Content-Type":"application/json"
      },
      body:JSON.stringify(input)
    });
    if(res.status==200) {
      result = await res.json();
      revalidatePath('/homestay/analysis') 
    }else{
      errors='Problem in retreiving homestay records'
    }
  } catch (error) {
      console.log(error)
      errors='Error in retreiving homestay records'
  }
  return {result,errors}
}
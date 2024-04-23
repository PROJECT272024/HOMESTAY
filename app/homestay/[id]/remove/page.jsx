
import { redirect } from 'next/navigation'
import React from 'react'


const delData = async (params)=>{
    console.log("I am from delete page")
    let status=0
    try {
        let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${params.id}`
        console.log("Url to be used - ", params.id)
        const res = await fetch(url,{
            method:"DELETE"
        })
        if(res.status==201) {
            status=1
            
        }else {
            console.log("Problem - ", params.id)
            status =  0

        }
    } catch (error) {
        console.log(error)
        status= 0
    }
    return status
}
const HomeStayRemove = async({params}) => {
    
    const test = await delData(params)
    if(test==1){
        redirect("/homestay",'replace')
    }else{
        redirect("/homestay/"+params.id)
    }
    
    return 
}

export default HomeStayRemove
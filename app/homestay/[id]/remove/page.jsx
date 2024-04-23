import homeStay from '@/app/model/HomeStayStructure'
import { redirect } from 'next/navigation'
import React from 'react'

const delData = async (params,homestayImages,signature)=>{
    console.log("I am from delete page")
    try {
        let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${params.id}`
        console.log("Url to be used - ", params.id)
        const res = await fetch(url,{
            method:"DELETE",
            body:JSON.stringify({"id":params.id,
                "homestayImages":homestayImages,
                'signature':signature})
        })
        if(res.status==201) {
            console.log("Success - ", params.id)
            return 1
        }else {
            console.log("Problem - ", params.id)
            return 0

        }
    } catch (error) {
        console.log(error)
        return 0
    }
}
const HomeStayRemove = async({params,images:homestayImages,signature}) => {
    
    const test = await delData(params,homestayImages,signature)
    if(test==1){
        redirect("/homestay",'replace')
    }else{
        redirect("/homestay/"+params.id)
    }
    
    return 
}

export default HomeStayRemove
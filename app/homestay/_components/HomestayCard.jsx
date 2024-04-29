'use client'
import Image from 'next/image'
import React from 'react'
import { IoPersonCircleOutline, IoEyeOutline, IoLocationOutline} from "react-icons/io5"
import { FaRegEdit, FaPhoneAlt, FaTrashAlt, FaRegTimesCircle,FaRegCheckCircle   } from "react-icons/fa";


const HomestayCard = ({data,handleView,handleEdit,handleDelete}) => {
    const changeCase=(name)=>{
        let result = ""
        if(name){
            const words = name.split(" ");
            for(let word of words){
                if(isNaN(word[0])){
                    result += word[0].toUpperCase() + word.substring(1).toLowerCase()+ " "; 
                }else{
                    result += word; 
                }
            }
        }
        return result
    }
    const filterName1=()=>{
        let org = data.address +'**'+ data.mcnpgpuward +'**'+ data.villageOrTown;
        let result = ""
        org = org.trim()
        
        for(let name of org.split("**")){
            let change= false
            name = name.replace(",",'')
            if(name){
                const words = name.split(" ");
                let val = ''
                for(let word of words){
                    if (word.trim()=='') {
                        continue
                    }
                    word = word.toString()
                    val = word[0].toUpperCase() + word.substring(1).toLowerCase()+ " "; 
                    if (!result.includes(val)) {
                        result+=val 
                        change=true
                    }
                }
                if (change) {
                    result += ', '
                }
            }
        }
        return result
    }
    const filterName2=()=>{
        let org = data.constituency +'**'+ data.district +'**'+ data.state;
        let result = ""
        org = org.trim()        
        for(let name of org.split("**")){
            let change= false
            if(name!=""){
                const words = name.split(" ");
                let val = ''
                for(let word of words){
                    if (word.includes("-")) {
                        let pos = word.indexOf("-")
                        val = word.substring(0,pos) + '-'+ word[pos+1].toUpperCase() + word.substring(pos+2)
                    }else{
                        if(isNaN(word[0])){
                            val = word[0].toUpperCase() + word.substring(1).toLowerCase()+ " "; 
                        }else{
                            val = word.trim()+' '; 
                        }
                    }
                    if (!result.includes(val)) {
                        result+=val 
                        change=true
                    }
                }
                if (change) {
                    result += ', '
                }
            }
        }
        return result.substring(0,result.length-2)
    }

  return (
    <>
       
        <div className="w-full h-full flex  flex-col justify-center bg-white rounded-t-xl shadow-md relative  hover:drop-shadow-md hover:shadow-green-600">
            { data.homestayImages.length>0 &&
                <Image
                    src={data.homestayImages[0]}
                    alt="" height={0} width={0} sizes='100vw'            
                    className="w-full h-60 rounded-t-xl" priority
                />
            }
            { data.homestayImages.length==0 &&
                <Image
                    src="/images/buddhastatue.jpg" alt="" height={0} width={0} sizes='100vw'            
                    className="w-full h-60 rounded-t-xl" priority
                />
            }
            <div className="px-4 py-2 flex flex-col ">
                <div className="text-left  lg:text-left ">
                    <h3 className="text-xl font-bold text-green-800">{data.homestayName.toUpperCase()} &nbsp;</h3>
                </div>
                <div className='h-px border-1 w-full shadow-md bg-slate-800 my-1'></div>
                <div className="flex flex-col  gap-3 text-gray-900 ">
                    <div className='flex flex-col'>
                        <div className='flex flex-row items-center'>
                            {data.isRegistredWithDot=='Yes'?<FaRegCheckCircle className='text-green-600 mr-2'/> :
                                    <FaRegTimesCircle className='text-red-600 mr-2'/>}
                            <p>Registration with DOT&CAV</p>
                        </div>
                        <div className='flex flex-row items-center'>
                            {data.isRegisteredWithLocal=='Yes'?<FaRegCheckCircle className='text-green-600 mr-2'/> :
                                    <FaRegTimesCircle className='text-red-600 mr-2'/>}
                            <p>Registration with Local Bodies</p>
                        </div>
                        <div className='flex flex-row items-center'>
                            <IoPersonCircleOutline className='mr-2 text-green-500 text-xl'/> 
                            <div>{changeCase(data.manager)} &nbsp;</div>
                        </div>
                        <div className='flex flex-row items-center'>
                            <FaPhoneAlt className='mr-2 text-green-500'/> 
                            <div>{data.contact} &nbsp;</div>
                        </div>
                        <div className='flex flex-row items-center'>
                            <IoLocationOutline className='mr-2 text-green-500 text-xl'/> 
                            <div>
                                <p>{filterName1()}</p> 
                                <p>{filterName2()}</p> 
                            </div>
                        </div>
                        <div className='h-px border-1 w-full shadow-md bg-slate-800 my-1'></div>
                        <div className='flex flex-row justify-end p-1 text-white'>
                            <button className='p-2 w-20 flex flex-row items-center justify-center bg-green-600 mr-2 rounded-lg
                            hover:bg-green-800 hover:drop-shadow-md' onClick={(e)=>handleView(e,data._id)}>
                                <IoEyeOutline className='font-bold mr-2 text-xl'/><div>View</div>
                            </button>
                            <button className='p-2 w-20 flex flex-row items-center justify-center bg-blue-600 mr-2 rounded-lg 
                                hover:drop-shadow-md hover:bg-blue-800' onClick={(e)=>handleEdit(e,data._id)}>
                                <FaRegEdit className='font-bold mr-2'/> <div>Edit</div>
                            </button>
                            <button  signature={data.signature}  images={data.homestayImages} 
                                className='p-2 sm:w-20 flex flex-row items-center justify-center bg-red-600 mr-2 rounded-lg 
                                hover:drop-shadow-md hover:bg-red-800' onClick={(e)=>handleDelete(e,data._id)}>
                                <FaTrashAlt  className='font-bold sm:mr-2'/> <span className='hidden sm:flex'>Delete</span>
                            </button>
                        </div>  
                    </div>
                </div>                  
            </div>
        </div>
        
    </>
  )
}

export default HomestayCard
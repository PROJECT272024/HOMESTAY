'use client'

import React, { useEffect, useState } from 'react'
import FilterType from '../_components/FilterType'
import Analytics from '../_components/Analytics'
import WhiteModal from '@/components/WhiteModal'


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

const AnalysisPage  = () => {
  const type = {
    district: '',
    registration: '',
    type: '',
    gender: '',
  }

  const [category,setCategory] = useState(type) 
  const [query,setQuery] = useState({}) 
  const [modelStatus,setModelStatus] = useState(true) 

  

  const fetchData = async(query={})=>{

    let result=[]
    try {
      //setIsLoading(true)
      setModelStatus(true)
      let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/search`
      const pageSize = 2
      
      const input = {
        "query":query,
        "project":project
      }
      let res = await fetch(url,{
          method:'POST',
          header:{
          "Content-Type":"application/json"
          },
          body:JSON.stringify(input)
      });
      if(res.status==200){
        console.log('Print - ',input)
        result = await res.json()
        console.log('RESULT from api',result)
        result = await result
        setData(result)
        setModelStatus(false)
        return result
        //setOrgResults(result)
      }else{
        console.log('Error in api')
      }
    } catch (error) {
      console.log("eRROR IN BUTTON CLICK ",error)
    }finally{
      setModelStatus(false)
    }
    return result
  }
  const [data,setData] = useState([]) 

  useEffect (() =>{
    let result = fetchData();
    setData(result)
  },[])
  useEffect (() =>{
    let result = fetchData(query);
    setData(result)
  },[query])
  const handleCategory = (name,value) => {
    console.log('catagory - ', name,value)
    if(name=='district'){
      setCategory((prevFeilds)=>({
        ...prevFeilds,
        district:value
      }))
    }else if(name=='gender'){
      setCategory((prevFeilds)=>({
        ...prevFeilds,
        gender:value
      }))
    } else if(name=='type'){
      setCategory((prevFeilds)=>({
        ...prevFeilds,
        type:value
      }))
    } else{
      setCategory((prevFeilds)=>({
        ...prevFeilds,
        registration:value
      }))
    } 
    
  } 
  const handleQuery = (query) => {
    console.log(query)
    setQuery(query)
  } 
  return (
    <>
      <div className='w-full mx-auto'>
        <FilterType  category={category} setQuery = {handleQuery} setCategory={handleCategory} />
        <Analytics category={category} query={query} data={data} />
      </div>
      <div className='hidden'>
            <WhiteModal title='Please wait Analysing data ... ' status={modelStatus}/>
        </div>
    </>
    );
}

export default AnalysisPage
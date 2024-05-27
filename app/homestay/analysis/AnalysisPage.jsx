'use client'

import React, { useEffect, useState } from 'react'
import FilterType from '../_components/FilterType'
import Analytics from '../_components/Analytics'
import WhiteModal from '@/components/WhiteModal'


const AnalysisPage  = ({orgdata}) => {
  const type = {
    district: '',
    registration: '',
    type: '',
    gender: '',
  }

  const [category,setCategory] = useState(type) 
  const [modelStatus,setModelStatus] = useState(false) 
  const [data,setData] = useState(orgdata) 
  const [query,setQuery] = useState({}) 
  useEffect(() => {
    let tempData=orgdata
    console.log('query - ',query) 
    for (let key of Object.keys(query)) {
      console.log('key - ',key) 
      tempData = tempData.filter((val) => val[key] == query[key])
    }
    setData(tempData) 
  }, [query])
  
  
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
        <FilterType  setQuery = {handleQuery} setCategory={handleCategory} title='Analysis'/>
        <Analytics category={category}  data={data} />
      </div>
      <div className='hidden'>
            <WhiteModal title='Please wait, Analysing data ... ' status={modelStatus}/>
        </div>
    </>
    );
}

export default AnalysisPage
'use client'
import React, { useEffect, useState } from 'react'
import DropDownTypeStyle from './formfields/DropDownTypeStyle'
import { district, getConstituency } from '@/utils/district-constituency'
import InputTextStyle from './formfields/InputTypeStyle'
import InputNumberTextStyle from './formfields/InputNumberTypeStyle'
import homeStay from '@/app/model/HomeStayStructure'
import HomestayContainer from './HomestayContainer'
import {toast} from "react-toastify"
const SearchOption = () => {
  //const { data: session, status } = useSession();
  const [pageNo,setPageNo]=useState(1)
  const [totalItems,setTotalItems]=useState(0)
  const [orgResults,setOrgResults] = useState([])
  const [isOpen,setIsOpen] = useState(true)
  const [selectOption,setSelectOption]=useState("")
  const [searchText,setSearchText]=useState("")
  const [selectDistrict,setSelectDistrict]=useState("")
  const [selectConstituency,setSelectConstituency]=useState("")
  const [selectType,setSelectType]=useState("")
  const [selectGender,setGender]=useState("")
  const [selectRegistration,setSelectRegistration]=useState("")
  const [isLoading,setIsLoading]=useState(false)
  


  const regType = ['With DOT&CAV','With Local',
  'Not with DOT&CAV','Not with Local'];
  const estdType = ['Rular','Urban','Government','Private','Normal','Heritage']
  const genderType = ['Female','Male','Others']; 
  const optionType = ['HomeStay Name','Owner Name','DOT&CAV Registration Number',
    'Local Registration Number','Phone Number']
  const [selConstituency,setSelConstituency] = useState([])
  
  const fetchData = async(query={},pageNumb=1)=>{
    try {
      setIsLoading(true)
      let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/search`
      const pageSize = 6
      const input = {
        "query":query,
        "offset":((pageNumb-1)* pageSize)                   ,
        "pageSize":pageSize
        }
      let res = await fetch(url,{
          method:'POST',
          mode: 'no-cors',
          header:{
          "Content-Type":"application/json"
          },
          body:JSON.stringify(input)
      });
      if(res.status==200){
        console.log('Print - ',input)
        let result = await res.json()
        console.log('RESULT from api',result)
        setOrgResults(result)
      }else{
        console.log('Error in api')
      }
    } catch (error) {
      console.log("eRROR IN BUTTON CLICK ",error)
    }finally{
      setIsLoading(false)
    }
  }
  const handlePageChange = (newPage) => {
    setPageNo(()=>newPage);
    let query={}
    if(searchText=='' && selectOption!=""){
      return
    }else if(searchText!='' && selectOption!=""){
      switch(selectOption){
        case optionType[0]://homestay name
          query = {homestayName:searchText}
          break
        case optionType[1]://Owner name
          query = {ownerName:searchText}
          break
        case optionType[2]://Local Reg
          query = {registrationNumberDot:searchText}
          break
        case optionType[3]://Local Reg
          query = {registrationLocal:searchText}
          break
        case optionType[4]://Contact
          query = {contact:searchText}
          break
      }
    }
    fetchData(query,newPage)
  };

  useEffect(()=>{
    const onResize = () => {
      if (window.innerWidth >=640) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
    fetchData()
    const getCount = async()=>{
      try {
        let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/search`
        let res = await fetch(url,{
          method:'POST',
          mode: 'no-cors',
          header:{
          "Content-Type":"application/json"
          },
          body:JSON.stringify({query:{}})
        });
        console.log("Res status = ",res.status)
        if(res.status==200){
          let result = await res.json()
          console.log('RESULT from api count- ',result)
          setTotalItems(result.totalCount)
        }else{
          toast.info("No data fetched from database")
        }  
      } catch (error) {
        console.log(error)
        toast.error("Problem in retreiving data")
      }finally{
        setIsLoading(false)
      }
    }
    getCount();
    window.addEventListener('resize', onResize)
  
  },[]);

  const handleDelete = ()=>{
    setTotalItems((prev)=>prev-1)
    let customQuery={}
    if(selectDistrict!=''){
      customQuery.district = selectDistrict
    }
    if(selectConstituency!=''){
      customQuery.constituency = selectConstituency
    }
    if(selectGender!=""){
      customQuery.gender = selectGender
    }
    
    if(selectRegistration!=''){
      if(selectRegistration==regType[0]){
        customQuery.isRegistredWithDot = 'Yes'
      }else if(selectRegistration==regType[2]){
        customQuery.isRegistredWithDot = 'No'
      }else if(selectRegistration==regType[1]){
        customQuery.isRegisteredWithLocal = 'Yes'
      }else{
        customQuery.isRegisteredWithLocal = 'No'
      }
    }
    if(selectType!=""){
      if(selectType==estdType[2]|| selectType==estdType[3]){
        customQuery.isPrivateOrGovt = selectType
      }else if(selectType==estdType[0]|| selectType==estdType[1]){
        customQuery.isUrbanOrRular = selectType
      }else{
        customQuery.isNormalOrHeritage = selectType
      }          
    }
    fetchData(customQuery)
  }
  const handleDropDown = (event) => {
    const {name,value} = event.target
    // Handle the onChange event here
    let customQuery = {}
    if(name=='criteria'){
      setSelectOption(value)
      setSearchText('')
      fetchData()
    }else if(name=='district'){
      if(selectGender!="" ){
        customQuery.gender = selectGender
      }
      if(selectType!=""){
        if(selectType==estdType[2]|| selectType==estdType[3]){
            customQuery.isPrivateOrGovt = selectType
        }else if(selectType==estdType[0]|| selectType==estdType[1]){
          customQuery.isUrbanOrRular = selectType
        }else{
          customQuery.isNormalOrHeritage = selectType
        }
      }
      if(selectRegistration!=''){
        if(selectRegistration==regType[0]){
          customQuery.isRegistredWithDot = 'Yes'
        }else if(selectRegistration==regType[2]){
          customQuery.isRegistredWithDot = 'No'          
        }else if(selectRegistration==regType[1]){
          customQuery.isRegisteredWithLocal = 'Yes'
        }else{
          customQuery.isRegisteredWithLocal = 'No'
        }
      }
      if(value==""){
        setSelConstituency([])
      }else{
        setSelConstituency(getConstituency(value))
        customQuery.district = value
        
      } 
    fetchData(customQuery)
    setPageNo(1)
    setSelectDistrict(value)
    setSelectConstituency("")        

    }else if(name=='constituency'){
      if(selectGender!=""){
        customQuery.gender = selectGender
      }
      if(selectType!=""){
        if(selectType==estdType[2]|| selectType==estdType[3]){
            customQuery.isPrivateOrGovt = selectType
        }else if(selectType==estdType[0]|| selectType==estdType[1]){
          customQuery.isUrbanOrRular = selectType
        }else{
          customQuery.isNormalOrHeritage = selectType
        }
      }
      if(selectRegistration!=''){
        if(selectRegistration==regType[0]){
          customQuery.isRegistredWithDot = 'Yes'
        }else if(selectRegistration==regType[2]){
          customQuery.isRegistredWithDot = 'No'
        }else if(selectRegistration==regType[1]){
          customQuery.isRegisteredWithLocal = 'Yes'
        }else{
          customQuery.isRegisteredWithLocal = 'No'
        }
      }
      if(value==''){
        setSelectConstituency("")
      }else{
        customQuery.constituency = value
        setSelectConstituency(value)
      }
      fetchData(customQuery)
    }else if(name=='type'){
      if(selectDistrict!=''){
        customQuery.district = selectDistrict
      }
      if(selectConstituency!=''){
        customQuery.constituency = selectConstituency
      }
      if(selectGender!=""){
        customQuery.gender = selectGender
      }
      if(selectRegistration!=''){
        if(selectRegistration==regType[0]){
          customQuery.isRegistredWithDot = 'Yes'
        }else if(selectRegistration==regType[2]){
          customQuery.isRegistredWithDot = 'No'
        }else if(selectRegistration==regType[1]){
          customQuery.isRegisteredWithLocal = 'Yes'
        }else{
          customQuery.isRegisteredWithLocal = 'No'
        }
      }
      if(value!=""){
        if(value==estdType[2]|| value==estdType[3]){
          customQuery.isPrivateOrGovt = value
        }else if(value==estdType[0]|| value==estdType[1]){
          customQuery.isUrbanOrRular = value
        }else{
          customQuery.isNormalOrHeritage = value
        }          
      }
      fetchData(customQuery)
      setSelectType(value)
    }else if(name=='gender'){
      if(selectDistrict!=''){
        customQuery.district = selectDistrict
      }
      if(selectConstituency!=''){
        customQuery.constituency = selectConstituency
      }
      if(value!=""){
        customQuery.gender = value
      }
      
      if(selectRegistration!=''){
        if(selectRegistration==regType[0]){
          customQuery.isRegistredWithDot = 'Yes'
        }else if(selectRegistration==regType[2]){
          customQuery.isRegistredWithDot = 'No'
        }else if(selectRegistration==regType[1]){
          customQuery.isRegisteredWithLocal = 'Yes'
        }else{
          customQuery.isRegisteredWithLocal = 'No'
        }
      }
      if(selectType!=""){
        if(selectType==estdType[2]|| selectType==estdType[3]){
          customQuery.isPrivateOrGovt = selectType
        }else if(selectType==estdType[0]|| selectType==estdType[1]){
          customQuery.isUrbanOrRular = selectType
        }else{
          customQuery.isNormalOrHeritage = selectType
        }          
      }
      fetchData(customQuery)
      setGender(value)
    }else{
      if(selectDistrict!=''){
        customQuery.district = selectDistrict
      }
      if(selectConstituency!=''){
        customQuery.constituency = selectConstituency
      }
      if(selectGender!=""){
        customQuery.gender = selectGender
      }
      
      if(value!=''){
        if(value==regType[0]){
          customQuery.isRegistredWithDot = 'Yes'
        }else if(value==regType[2]){
          customQuery.isRegistredWithDot = 'No'
        }else if(value==regType[1]){
          customQuery.isRegisteredWithLocal = 'Yes'
        }else{
          customQuery.isRegisteredWithLocal = 'No'
        }
      }
      if(selectType!=""){
        if(selectType==estdType[2]|| selectType==estdType[3]){
         customQuery.isPrivateOrGovt = selectType 
        }else if(selectType==estdType[0]|| selectType==estdType[1]){
          customQuery.isUrbanOrRular = selectType
        }else{
          customQuery.isNormalOrHeritage = selectType
        }          
      }
      fetchData(customQuery)
      setSelectRegistration(value)
    }

    const getCount = async()=>{
      try {
        let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/search`
        let res = await fetch(url,{
          method:'POST',
          mode: 'no-cors',          
          header:{
          "Content-Type":"application/json"
          },
          body:JSON.stringify({query:customQuery})
          
        });
        console.log("Res status = ",res.status)
        if(res.status==200){
          let result = await res.json()
          console.log('RESULT from api count- ',result)
          setTotalItems(result.totalCount)
        }else{
          toast.info("No data fetched from database")
        }  
      } catch (error) {
        toast.error("Problem in retreiving data")
      }finally{
        setIsLoading(false)
      }
    }
    getCount();

  };
  const handleTextChange = (event) => {
    // Handle the onChange event here
    setSearchText(event.target.value);
  };
  const handleNumberChange = (event) => {
    let {name,value} = event.target
        
    let val = value.charCodeAt(value.length-1)
    if(val<48 || val>57){
        event.preventDefault()
        return
    }else{
      if(value.length>10){
        event.preventDefault()
        return
      }
    }
    setSearchText(event.target.value);
  }
  const handleSubmitClick = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    let query={}
    if(searchText=='' && selectOption!=""){
      return
    }else if(searchText!='' && selectOption!=""){
      switch(selectOption){
        case optionType[0]://homestay name
          query = {homestayName:searchText}
          break
        case optionType[1]://Owner name
          query = {ownerName:searchText}
          break
        case optionType[2]://Local Reg
          query = {registrationNumberDot:searchText}
          break
        case optionType[3]://Local Reg
          query = {registrationLocal:searchText}
          break
        case optionType[4]://Contact
          query = {contact:searchText}
          break
      }
    }
    fetchData(query)

    setGender('')
    setSelectDistrict('')
    setSelConstituency([])
    setSelectConstituency('')
    setSelectType('')
    setSelectRegistration('')
  }

  return (
      <>
        <section className="bg-green-700 py-12 mb-4 sm:px-6 md:px-[10%]">
          <div
            className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 items-center"
          >
            <div className="text-center">
              <h1
                className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
              >
                Discover HomeStay in Sikkim.
              </h1>
            </div>
            <form
              className="mt-4 w-full grid grid-cols-1 sm:grid-cols-5 items-center mb-4 gap-1"
            >
              <div className="w-full col-span-1">
                <label htmlFor="property-type" className="sr-only">Property Type</label>
                
                <DropDownTypeStyle id='criteria' name="criteria" placeholder='Search Criteria' 
                      startWithEmpty="Yes"  selectValue={selectOption} handler={handleDropDown}
                      options={optionType}/>
                    
              </div>
              
              {
                (selectOption=='') ?
                <div className="w-full col-span-1 sm:col-span-3 sm:">
                  <InputTextStyle id='ownerName' name='ownerName' required='false' 
                    readonly='false' value={searchText} 
                    placeholder='Enter (HomeStay Name, Owner Name)' handler={handleTextChange}/> 
                </div> : ''
              }
              {
                (selectOption=='Phone Number' || selectOption=='Pin Code') ?
                <div className="w-full col-span-1 sm:col-span-3 sm:">
                  <InputNumberTextStyle id='searchText' name='searchText' required='true' 
                    readonly='false' value={searchText} 
                    placeholder={`Enter ${selectOption}`} handler={handleNumberChange}/> 
                </div> : ''
              }
              {
                (selectOption!='' && selectOption!='Phone Number' && selectOption!='Pin Code')?
                <div className="w-full col-span-1 sm:col-span-3 sm:">
                  <InputTextStyle id='searchNumber' name='searchNumber' required='true' 
                    readonly='false' value={searchText} 
                    placeholder={`Enter ${selectOption}`} handler={handleTextChange}/> 
                </div> : ''
              }
              
              <button
                type="submit"
                className="w-full px-5 py-3 rounded-sm bg-white text-green-600 hover:font-bold 
                focus:outline-none focus:ring focus:ring-blue-500" onClick={handleSubmitClick}
              >
                Search
              </button>
              
            </form>
            <div className="w-full p-2">
                <div>
                  <button className='sm:hidden bg-white text-blue mb-2 p-2 rounded-sm'
                    onClick={()=>setIsOpen(!isOpen)}> {isOpen?`Hide Filter By`:`Show Filter By`}</button>
                  <label className='hidden sm:flex text-white mb-2 p-2 rounded-sm'
                    >Filter By</label>
                </div>
                {
                  isOpen && <div className='bg-white w-full p-2 rounded-sm'>
                  <div  className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 gap-2'>
                    <DropDownTypeStyle id='district' name="district" placeholder='District' 
                      startWithEmpty="Yes" options={district} selectValue={selectDistrict} handler={handleDropDown}/>
                    <DropDownTypeStyle id='constituency' name="constituency" placeholder='Constituency' 
                      startWithEmpty="Yes" options={selConstituency} selectValue={selectConstituency} handler={handleDropDown}/>
                    <DropDownTypeStyle id='type' name="type" placeholder='Estd Type' 
                      startWithEmpty="Yes" options={estdType} 
                      selectValue={selectType} handler={handleDropDown}/>
                    <DropDownTypeStyle id='gender' name="gender" placeholder='Gender' 
                      startWithEmpty="Yes" options={genderType} selectValue={selectGender} handler={handleDropDown}/>
                    <DropDownTypeStyle id='registration' name="registration" placeholder='Registration' 
                      startWithEmpty="Yes" options={regType} 
                      selectValue={selectRegistration} handler={handleDropDown}/>
                  </div>
                </div>
                }
            </div>
          </div>
        </section>
        <section>
          <HomestayContainer data={orgResults} setDelete={handleDelete}  
            isLoading={isLoading} setIsLoading={setIsLoading} pageNo={pageNo} 
            setPageNo={(prev)=>setPageNo()} totalItems={totalItems} onPageChange={handlePageChange}/>
        </section>
      </>
    )
}

export default SearchOption
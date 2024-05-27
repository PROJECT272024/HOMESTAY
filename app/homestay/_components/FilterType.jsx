'use client'
import DropDownTypeStyle from '@/components/formfields/DropDownTypeStyle';
import { district } from '@/utils/district-constituency';
import React, { useState } from 'react'


const FilterType = ({title, setQuery,setCategory}) => {
  const regType = ['With DOT&CAV','With Local',
                'Not with DOT&CAV','Not with Local'];
  const estdType = ['Rural','Urban','Government','Private','Normal','Heritage']
  const genderType = ['Female','Male','Others']; 
  const [selectDistrict,setSelectDistrict] = useState('')
  const [selectType,setSelectType] = useState('')
  const [selectGender,setSelectGender] = useState('')
  const [selectRegistration,setSelectRegistration] = useState('')

  
  const handleDropDown = (event) => {
    const {name,value} = event.target
    // Handle the onChange event here
    let customQuery = {}
    if(selectType!=""){
        if(selectType==estdType[2]|| selectType==estdType[3]){
            customQuery.isPrivateOrGovt = selectType
        }else if(selectType==estdType[0]|| selectType==estdType[1]){
        customQuery.isUrbanOrRular = selectType
        }else{
        customQuery.isNormalOrHeritage = selectType
        }
    }
    if(selectDistrict!="" ){
        customQuery.district = selectDistrict
    }
    if(selectGender!="" ){
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

    if(name=='district'){
        delete customQuery.district
        if(value!=''){
            customQuery.district = value
        }
        setSelectDistrict(value)
        setCategory(name,value)
    }else if(name=='gender'){
        delete customQuery.gender
        if(value!=''){
            customQuery.gender = value
        }
        setSelectGender(value)
        setCategory(name,value)
    } else if(name=='type'){
        if('isPrivateOrGovt' in customQuery){
            delete customQuery.isPrivateOrGovt
        }else if('isUrbanOrRular' in customQuery){
            delete customQuery.isUrbanOrRular
        }else if('isNormalOrHeritage' in customQuery){
            delete customQuery.isNormalOrHeritage
        }

        if(value!=''){
            if(value==estdType[2]|| value==estdType[3]){
                customQuery.isPrivateOrGovt = value
            }else if(value==estdType[0]|| value==estdType[1]){
                customQuery.isUrbanOrRular = value
            }else{
                customQuery.isNormalOrHeritage = value
            } 
        }
        setSelectType(value)
        setCategory(name,value)
    }else{
        if('isRegistredWithDot' in customQuery){
            delete customQuery.isRegistredWithDot
        }else if('isRegisteredWithLocal' in customQuery){
            delete customQuery.isRegisteredWithLocal
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
        setSelectRegistration(value)
        setCategory(name,value)
    }   
    setQuery(customQuery)
  };
  return (
    <div className='p-8 md:p-16 mx-auto bg-green-700 w-full flex flex-col'>
        <h1 className='flex justify-center text-xl md:text-6xl font-bold text-white'>Homestay {title}</h1>
        <div className='grid grid-cols-2 md:grid-cols-4 w-full gap-2 mt-8'>
            <DropDownTypeStyle id='district' name="district" placeholder='District' 
                startWithEmpty="Yes" options={district} selectValue={selectDistrict} handler={handleDropDown}/>
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
  )
}

export default FilterType
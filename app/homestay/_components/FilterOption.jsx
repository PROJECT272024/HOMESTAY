'use client'
import DropDownTypeStyle from '@/components/formfields/DropDownTypeStyle'
import { getConstituency,district } from '@/utils/district-constituency'
import React, { useState } from 'react'

const FilterOption = ({setQuery}) => {

    const [selectDistrict, setSelectDistrict] = useState("")
    const [selectConstituency, setSelectConstituency] = useState("")
    const [selectType, setSelectType] = useState("")
    const [selectGender, setSelectGender] = useState("")
    const [selectRegistration, setSelectRegistration] = useState("")
    const [selConstituency, setSelConstituency] = useState([])
    const regType = ['With DOT&CAV', 'With Local',
        'Not with DOT&CAV', 'Not with Local'];
    const estdType = ['Rural', 'Urban', 'Government', 'Private', 'Normal', 'Heritage']
    const genderType = ['Female', 'Male', 'Others'];

    const handleDropDown = (event) => {
        const { name, value } = event.target
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
        if(selectConstituency!="" ){
            customQuery.constituency = selectConstituency
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
        if (name == 'district') {
            delete customQuery.district
            if ('constituency' in customQuery) {
                delete customQuery.constituency
            }
            if (value != '') {
                customQuery.district = value
                setSelConstituency(getConstituency(value))
                setSelectConstituency('')
            }else{
                setSelectConstituency('')
                setSelConstituency([])
            }
            setSelectDistrict(value)
        }else if (name == 'constituency') {
            delete customQuery.constituency
            
            if (value != '') {
                customQuery.constituency = value
            }
            setSelectConstituency(value)
        }else if (name == 'gender') {
            delete customQuery.gender
            if (value != '') {
                customQuery.gender = value
            }
            setSelectGender(value)
        }else if (name == 'type') {
            if ('isPrivateOrGovt' in customQuery) {
                delete customQuery.isPrivateOrGovt
            } else if ('isUrbanOrRular' in customQuery) {
                delete customQuery.isUrbanOrRular
            } else if ('isNormalOrHeritage' in customQuery) {
                delete customQuery.isNormalOrHeritage
            }

            if (value != '') {
                if (value == estdType[2] || value == estdType[3]) {
                    customQuery.isPrivateOrGovt = value
                } else if (value == estdType[0] || value == estdType[1]) {
                    customQuery.isUrbanOrRular = value
                } else {
                    customQuery.isNormalOrHeritage = value
                }
            }
            setSelectType(value)
        }else if(name == 'registration') {
            if('isRegistredWithDot' in customQuery){
                delete customQuery.isRegistredWithDot
            }else if('isRegisteredWithLocal' in customQuery){
                delete customQuery.isRegisteredWithLocal
            }
            if (value != '') {
                if (value == regType[0]) {
                    customQuery.isRegistredWithDot = 'Yes'
                } else if (value == regType[2]) {
                    customQuery.isRegistredWithDot = 'No'
                } else if (value == regType[1]) {
                    customQuery.isRegisteredWithLocal = 'Yes'
                } else {
                    customQuery.isRegisteredWithLocal = 'No'
                }
            } 
            setSelectRegistration(value)
        } 
       setQuery(customQuery)
        console.log(customQuery)
    };
    return (
        
        <div className='bg-white w-full p-2 rounded-sm'>
            <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 gap-2'>
                <DropDownTypeStyle id='district' name="district" placeholder='District'
                    startWithEmpty="Yes" options={district} selectValue={selectDistrict} handler={handleDropDown} />
                <DropDownTypeStyle id='constituency' name="constituency" placeholder='Constituency'
                    startWithEmpty="Yes" options={selConstituency} selectValue={selectConstituency} handler={handleDropDown} />
                <DropDownTypeStyle id='type' name="type" placeholder='Estd Type'
                    startWithEmpty="Yes" options={estdType}
                    selectValue={selectType} handler={handleDropDown} />
                <DropDownTypeStyle id='gender' name="gender" placeholder='Gender'
                    startWithEmpty="Yes" options={genderType} selectValue={selectGender} handler={handleDropDown} />
                <DropDownTypeStyle id='registration' name="registration" placeholder='Registration'
                    startWithEmpty="Yes" options={regType}
                    selectValue={selectRegistration} handler={handleDropDown} />
            </div>
        </div>
    )
}

export default FilterOption
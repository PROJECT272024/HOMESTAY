'use client'
import React, { useState } from 'react'
import bcrypt from "bcryptjs"
import { district } from '@/utils/district-constituency'
import InputTextStyle from '@/components/formfields/InputTypeStyle';
import RadioGroupTypeStyle from '@/components/formfields/RadioGroupTypeStyle';
import DropDownTypeStyle from '@/components/formfields/DropDownTypeStyle';
import InputNumberTextStyle from '@/components/formfields/InputNumberTypeStyle';
import {Spinner} from "@nextui-org/spinner";
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';

const UserAdd = () => {
    const [cpassword,setCPassword]=useState("")
    const [errorMessageList,setErrorMessageList]=useState([])
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)
    const router = useRouter()
    const [feilds,setFeilds]= useState({
      name:"",
      empId:"",
      gender:"Female",
      dob:"",
      address:{
        location: "",
        city: "",
        district: "Gangtok",
        state: "Sikkim",
        pinCode: ""
      },
      organization: "",
      email: "",
      phone: "",
      altPhone: "",
      role: "Data Entry Operator", // Admin, DEO - data entry operator
      password:"",
      isStatus: 0 // 0 is not active, 1 is active, 2 is deactivated
      
    });
    const handleDistrictChange=(e)=>{
      setSelDistrict(e.target.value)
      setFeilds((prevFeilds)=>({
        ...prevFeilds,
        'address':{
          ...prevFeilds['address'],
          ['district']:e.target.value
        }         
      }));

    }
    const handleChange = (e)=>{
      const {name,value} = e.target

      if(name.includes('.')){
        const [outerKey,innerKey] = name.split(".")
        setFeilds((prevFeilds)=>({
            ...prevFeilds,
            [outerKey]:{
              ...prevFeilds[outerKey],
              [innerKey]:value
            }            
        }));
      }else{
        setFeilds((prevFeilds)=>({
          ...prevFeilds,
          [name]:value
        }));
      }      
    };
    const handleRadioGender = (e)=>{
      setFeilds((prevFeilds)=>({
        ...prevFeilds,
        gender:e
      }));
    };
    const handleRadioRole = (e)=>{
      setFeilds((prevFeilds)=>({
        ...prevFeilds,
        role:e
      }));
    };
    const handlePassword = (e)=>{
      setCPassword((prev)=>e.target.value)
    };
    const handleTextNumberChange = (e)=>{
      let {name,value} = e.target
      
      let val = value.charCodeAt(value.length-1)
      if(val<48 || val>57){
          e.preventDefault()
          toast.warning("Only digits allowed")
          return
          
      }else if(name=='phone' || name=='altPhone'){
          if(value.length>10){
            toast.warning("Phone Number consists of 10 Digits only") 
            e.preventDefault()
             return
          }
      }else if(name=='address.pinCode'){
        if(value.length>6){
             e.preventDefault()
             toast.warning("Pin Code consists of 6 Digits only")
             return
          }
      }
      if(name.includes('.')){
        const [outerKey,innerKey] = name.split(".")
        setFeilds((prevFeilds)=>({
            ...prevFeilds,
            [outerKey]:{
              ...prevFeilds[outerKey],
              [innerKey]:value
            }            
        }));
      }else{
        setFeilds((prevFeilds)=>({
          ...prevFeilds,
          [name]:value
        }));
      }
            
    };

    const handleSubmitData = async (e)=>{
      let message = []
      setLoading(true)
      e.preventDefault()
      if(feilds.name.trim()==""){
        message.push("Enter Name")
      }
      if(feilds.empId.trim()==""){
        message.push("Enter Employee Id")
      }
      if(feilds.dob.trim()==""){
        message.push("Enter Date of Birth")
      }
      if(feilds.address.location.trim()==""){
        message.push("Enter Address Location")
      }
      if(feilds.address.city.trim()==""){
        message.push("Enter City")
      }
      if(feilds.address.district.trim()==""){
        message.push("Enter District")
      }
      if(feilds.address.state.trim()==""){
        message.push("Enter State")
      }
      if(feilds.address.pinCode.trim()==""){
        message.push("Enter Pin Code")
      }else{
        if(feilds.address.pinCode.trim().length!=6){
          message.push("Enter 6 digits Pin Number");
        }
      }
      if(feilds.organization.trim()==""){
        message.push("Enter Organization Name")
      }
      if(feilds.email.trim()==""){
        message.push("Enter Email Address")
      }
      if(feilds.phone.trim()==""){
        message.push("Enter Phone Number")
      }else{
        if(feilds.phone.trim().length!=10){
          message.push("Enter 10 digits Phone Number");
        }
      }
      if(feilds.password.trim()==""){
        message.push("Enter Password")
      }
      if(cpassword.trim()==""){
        message.push("Enter Confirm Password")
      }
      if(feilds.password.trim()!="" && cpassword.trim()!=""){
        if(cpassword.trim()!=feilds.password.trim()){
          message.push("Enter the same password")
        }
      }

      if(message.length!=0){
        setError(true)
        setErrorMessageList(message)
        toast.warning("Provide input to all required feilds!")
      }else{
        const hashedPass = await bcrypt.hash(feilds.password,12)
        const userData = {
          name:feilds.name,
          empId:feilds.empId,
          gender:feilds.gender,
          dob:feilds.dob,
          address:{
            location: feilds.address.location,
            city: feilds.address.city,
            district: feilds.address.district,
            state: feilds.address.state,
            pinCode: feilds.address.pinCode
          },
          organization: feilds.organization,
          email: feilds.email,
          phone: feilds.phone,
          altPhone: feilds.altPhone,
          role: feilds.role, // Admin, DEO - data entry operator
          password:hashedPass,
          isStatus: 1
          
        }
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}api/users`,{
            method:"POST",
            header:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
          });
          console.log(res)
          if(res.status==201){
            setError(false)
            toast.success("Registration done sucessfully.")
            router.replace('/')
            toast.success('User Registered Successfully')
            router.refresh()
            
          }else{
            
            setErrorMessageList(["1. User with email already exits"])
            toast.error("1. User with email already exits")
            setError(true)
          }  
        } catch (error) {
          setErrorMessageList(["2. Problem in Registration"])
          setError(true)
          toast.warning("2. Problem in user registration")
          
          console.log("Error during registration ",error);
        }finally{
          setLoading(false)
        }
      }
    }
    return (
      <div className="m-3 flex justify-center flex-col border-1.5 w-3/4 border-green-300  shadow-md shadow-slate-300 p-3 mx-auto"> 
        
        <h1 className='font-bold'>Registration Form</h1>
       
        <form  method="POST" className='grid grid-cols-1 lg:grid-cols-2 gap-2  items-center '
          onSubmit={handleSubmitData}>
            <div className="my-1 lg:col-span-2 h-px bg-gray-200 shadow-md" />
            <InputTextStyle id='name' name='name' required='true' 
              readonly='false' value={feilds.name} 
              placeholder='Enter Name' handler={handleChange}/>
            
            <InputTextStyle id='empId' name='empId' required='true' 
              readonly='false' value={feilds.empId} 
              placeholder='Enter Employee Id' handler={handleChange}/>
            
            <RadioGroupTypeStyle id="gender" name="gender"
              type='horizontal' value={feilds.gender}
              handler={handleRadioGender}
              options={[['Female','Female'],['Male','Male'],
              ['Others','Others']]} title='Select Gender'/>
            
            <InputNumberTextStyle id='dob' name='dob' required='true' 
              readonly='false' value={feilds.dob} type="date"
              placeholder='Enter Date of Birth' handler={handleChange}/>
            
            <InputTextStyle id='address_location' name='address.location' required='true' 
              readonly='false' value={feilds.address.location} 
              placeholder='Enter Address Location' handler={handleChange}/>

            <InputTextStyle id='address_city' name='address.city' required='true' 
              readonly='false' value={feilds.address.city} 
              placeholder='Enter Village / Town Name' handler={handleChange}/>
            
            <DropDownTypeStyle id='address_district' name='address.district'
              options={district}  handler={handleChange} 
              placeholder='Select District' required='true' 
              selectValue={feilds.address.district} />

            <InputTextStyle id='address_state' name='address.state' required='true'   
              readonly='true' value={feilds.address.state} 
              placeholder='State Name'/>
            
            <InputNumberTextStyle id='address_pinCode' name='address.pinCode' required='true'   
              readonly='false' value={feilds.address.pinCode} placeholder='Enter Pin Code' handler={handleTextNumberChange}/>

            <InputTextStyle id='organization' name='organization' required='true'   
              value={feilds.organization} placeholder='Enter Organization' handler={handleChange}/>
            
            <InputTextStyle id='email' name='email' required='true'   
              value={feilds.email} placeholder='Enter Email Address' handler={handleChange}/>

            <InputNumberTextStyle id='phone' name='phone'  value={feilds.phone} required='true'  
              placeholder='Enter Phone Number' handler={handleTextNumberChange}/>

            <InputNumberTextStyle id='altPhone' name='altPhone'   
              readonly='false' value={feilds.altPhone} placeholder='Enter Alternative Phone Number' handler={handleTextNumberChange}/>
            
            <RadioGroupTypeStyle id="role" name="role"
              type='horizontal' value={feilds.role}
              handler={handleRadioRole}
              options={[['Admin','Admin'],['Data Entry Operator','Data Entry Operator']]} title='Select Role'/>

            <InputTextStyle id='password' name='password' required='true'   type="password"
              value={feilds.password} placeholder='Enter Password' handler={handleChange}/>
            <InputTextStyle id='cpassword' name='cpassword' required='true'   
              value={cpassword} placeholder='Confirm Your Password' handler={handlePassword}/>
        
            {
              error && <ul className='bg-red-400 w-full'>
                  {errorMessageList.map((value,index)=>
                    <li key={index}>{value}</li>)}
              </ul>
            }
            
              {loading && <Spinner label="Registration in Progress..." color="warning" />}
            
            <div>
              <button className='p-2 bg-green-600
                text-white rounded-md hover:bg-green-800' type='submit'>Submit</button>
            </div>
        </form>
      </div>
      
  )
};

export default UserAdd
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {Spinner} from "@nextui-org/spinner";
import InputTextStyle from './formfields/InputTypeStyle'

const Login = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)

    const router = useRouter()
    const handleSubmit = async (e)=>{
        setLoading(true)
        setError(false)
        e.preventDefault();
        try{
            const res = await signIn("credentials",{
                username,password,redirect:false
            });

            if(res.error){
                setError(true);
            }else{
                router.replace("homestay")
                router.refresh()
            }
            
        }catch(error){
            setError(true);
        }finally{
            setLoading(false);
        }
        return;
    }
    return (
    <div className=' bg-gradient-to-r from-indigo-300 from-5% 
    via-sky-300 via-30% to-emerald-500 to-70%  h-dvh grid place-content-center
    w-full'>
        <form onSubmit={handleSubmit} method='POST' className='w-80 sm:w-[30rem] p-1 sm:p-8 sm:drop-shadow-2xl  bg-white grid grid-cols-1 
           gap-2 place-content-center rounded-lg
            border-t-5  bg-none border-b-5 border-green-400'>
        
            <h1 className='font-bold text-blue-600'>Enter Login Credential</h1>
            <div className="my-1 w-full h-px border-solid border-gray-200 drop-shadow-sm" />
            
            <InputTextStyle id='username' name='username' required='true' 
                readonly='false' value={username} type="text" 
                placeholder='Enter Email / Mobile Number' handler={(e)=> setUsername(e.target.value)}/>
            

            <InputTextStyle id='password' name='password' required='true' 
                readonly='false' value={password} type="password" 
                placeholder='Enter Password' handler={(e)=> setPassword(e.target.value)}/>
            
            {
                loading && <Spinner label="Authenticating..." color="warning" />}
                <button
                type="submit" id="btnLogin" className='p-4 mt-2 bm-2 w-40 bg-blue-600
                 text-white rounded-lg hover:bg-blue-800 
                 hover:drop-shadow-md border-slate-400'>Login</button>
            {
                error && 
                <div className='p-2 bg-red-500 text-white'>
                    Provide valid login credentials.
                </div>
            }
            <Link href="/user/add" className='mt-2 flex justify-self-end'> 
                Not Register? Click here to <span className='text-blue-600 mr-2'> register</span>.
            </Link>
            
        </form>
    </div>
  )
}

export default Login
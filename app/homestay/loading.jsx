import { Spinner } from '@nextui-org/spinner'
import React from 'react'


const loading = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center
    bg-[length:100%_100%] bg-center bg-no-repeat bg-circular-gradient from-green-50 to-green-300'>
        <div className='h-40 w-40 flex  justify-center items-center rounded-lg bg-zinc-50 shadow-md p-4'>
            <Spinner label='Loading Page...' color="primary" size="lg"/>
        </div>
    </div>
  )
}

export default loading
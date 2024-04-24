import React from 'react'

const FileUploadStyle = ({id,name,multi='',required='false',
    placeholder='',handler=''}) => {
  return (
    <div className="relative">
        <input type='file' id={id} name={name}
            className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 
            bg-white rounded-sm border-2 drop-shadow-md border-green-300 appearance-none
             focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-blue-600 `}
             required={(required=='true') ? true:false} multiple={(multi=='') ? false:true}
             placeholder='' onChange={(handler=""?null:handler)} accept="image/*"/>
        <label htmlFor={id} className={`bg-white  absolute text-sm text-gray-500
             duration-300 transform -translate-y-4 scale-75
                top-2 z-10 origin-[0]  px-2 
                    peer-focus:px-2 peer-focus:text-blue-600 
                    peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
                    peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                    rtl:peer-focus:left-auto start-1`}>
                      {placeholder} <span className={`${(required=='true')?'text-red-500':'hidden'} `}>*</span>
        </label>
    </div>
  )
}

export default FileUploadStyle
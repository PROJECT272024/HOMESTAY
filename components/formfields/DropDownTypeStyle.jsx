import React from 'react'

const DropDownTypeStyle = ({id,name,options,placeholder='', required='false'
              ,selectValue='',handler='',startWithEmpty='No'}) => {
  return (
    <div className="relative">
      
        <select name={name} id={id} 
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-green-900 
            bg-white rounded-xs border-2 drop-shadow-md border-green-300 appearance-none
            dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer"  
            onChange={handler==''?null:handler} value={selectValue}>
            {
              startWithEmpty!='No'&& <option value="">Select</option>
            }
            {
              options.map((value,index)=>(
                  <option  key={index} value={value}>{value}</option>
              ))
            }
        </select>
        <label htmlFor={id} className="absolute text-sm text-gray-500
             dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 
                top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 
                    peer-focus:px-2 peer-focus:text-blue-600 
                    peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
                    peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                    rtl:peer-focus:left-auto start-1">
                      {placeholder} <span className={`${(required=='true')?'text-red-500':'hidden'} `}>*</span>
        </label>
    </div>
  )
}

export default DropDownTypeStyle
import React from 'react'

const DateInputTextStyle = ({id,name,value='',required='false',
            readonly='false',placeholder='',handler='',max='false',min=''}) => {
  return (
    <div className="relative">
        <input type='date' id={id} name={name}
            className={`${readonly=='true'? 'bg-gray-100':'bg-white' } block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 
             rounded-sm border-2 drop-shadow-md border-green-300 appearance-none
             dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
             focus:outline-none focus:ring-0 focus:border-blue-600 peer hover:border-blue-600 `}
             required={(required=='true') ? true:false}
             readOnly={(readonly=='true') ? true:false} placeholder=''
             onChange={handler==''?null:handler} value={value}  max={max=='false'?'':new Date().toISOString().split('T')[0]}
             min={min!=''?min:""}/>
        
        <label htmlFor={id} className={`${readonly=='true'? 'bg-gray-50':'bg-white' }  absolute text-sm text-gray-500
             dark:text-gray-400 duration-300 transform -translate-y-4 scale-75
                top-2 z-10 origin-[0]  dark:bg-gray-900 px-2 
                    peer-focus:px-2 peer-focus:text-blue-600 
                    peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
                    peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                    rtl:peer-focus:left-auto start-1`}>
                      {placeholder} <span className={`${(required=='true')?'text-red-500':'hidden'} `}>*</span>
        </label>
    </div>
  )
}

export default DateInputTextStyle
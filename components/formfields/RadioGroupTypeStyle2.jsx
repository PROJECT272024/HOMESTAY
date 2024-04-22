import React from 'react'

const RadioGroupTypeStyle2 = ({id,name,radioRef,title='',handler='',type='horizontal',value='',options=[],readOnly='false'}) => {
  
  
  return (
    (
      title=='' ?
      <div id={id} className={`p-2 flex  ${type=='horizontal'?'flex-row':'flex-col'}`}>
      {
          options.map((data,index)=>(
              <div key={index}  className='mr-2 flex items-center'>
                    <input type="radio" id={index} className='h-4 w-4' name={name} 
                    value={data[1]} checked={value==data[1]} 
                    onChange={handler==''?'': e => {
                      handler(e,name);
                    }}
                    disabled={readOnly=='true'?true:false}

                    />
                    <label className='ml-2 text-md text-black' htmlFor={index}>{data[0]}</label>
              </div>
          ))
        }
      </div> :
    
      title!='' &&
      <fieldset className='border-2 rounded-md border-green-300'>
        <legend className='text-gray-500 text-[10px] m-2 bg-[rgba(255,255,255,0.9)] drop-shadow-none'>{title}</legend>
        <div id={id} className={`-mt-4 py-2 px-2 flex  ${type=='horizontal'?'flex-row':'flex-col'}`}>
        {
            options.map((data,index)=>(
                <div key={index}  className='mr-2 flex items-center'>
                      <input type="radio" id={index} className='h-4 w-4' name={name} 
                      value={data[1]} defaultChecked={value==data[1]} onChange={handler}
                      disabled={readOnly=='true'?true:false}/>
                      <label className='ml-2 text-md text-black' htmlFor={index}>{data[0]}</label>
                </div>
            ))
          }
        </div>
      </fieldset>
    )
  )
}

export default RadioGroupTypeStyle2
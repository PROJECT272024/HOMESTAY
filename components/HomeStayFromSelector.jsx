import React from 'react'

const HomeStayFromSelector = ({number,content,isActive='false',handler=''}) => {
  const selected = 'w-10 h-10 rounded-full p-3 bg-blue-600  font-extrabold border-1'+ 
                      'drop-shadow-md border-white flex justify-center  items-center'
  const notselected = 'w-10  h-10 rounded-full p-3 bg-white text-black border-1 border-white flex justify-center items-center'

  const selectedText = 'text-yellow-500 font-bold'
  const notselectedText = 'text-white'

  return (
    <div className='grid grid-cols-1 gap-2 place-content-center cursor-pointer' onClick={handler==""?null:handler}>
      <div className='flex items-center'>
        <div className={(isActive=='true')? 'flex flex-row items-center' :'hidden lg:flex lg:flex-row lg:items-center'} >
            <div className={(isActive=='true')? selected:notselected}  >
              {number}
            </div>
            <div className='p-3'>
                <span className={(isActive=='true')? selectedText:notselectedText} >{content}</span>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default HomeStayFromSelector
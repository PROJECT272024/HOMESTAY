'use client'
import React, { useEffect, useRef, useState } from 'react'
import HomestayContainer from './HomestayContainer'
import DropDownTypeStyle from '@/components/formfields/DropDownTypeStyle'
import InputTextStyle from '@/components/formfields/InputTypeStyle'
import InputNumberTextStyle from '@/components/formfields/InputNumberTypeStyle'
import FilterOption from './FilterOption'
import { Pagination } from '@nextui-org/pagination'
import { deleteHomestay } from '@/actions/homestay'
const SearchOption = ({orgData}) => {
  //const { data: session, status } = useSession();
  const pageContent=6
  const [pageNo, setPageNo] = useState(1)
  const [totalItems, setTotalItems] = useState(1)
  
  const [isOpen, setIsOpen] = useState(true)
  const [selectOption, setSelectOption] = useState("HomeStay Name")
  const [searchText, setSearchText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState({})

  const [modOrgData, setModOrgData] = useState(orgData)
  const [result, setResult] = useState(modOrgData)
  const [disResult, setDisResult] = useState(modOrgData)
  const [change, setChange] = useState(true)//this is to track the change in tsearcchtext

  const containerRef = useRef()

  const project = {
    state: 1,
    district: 1,
    constituency: 1,
    villageOrTown: 1,
    mcnpgpuward: 1,
    address: 1,
    homestayName: 1,
    manager: 1,
    contact: 1,
    isRegisteredWithLocal: 1,
    isRegistredWithDot: 1,
    homestayImages: 1,
  }
  const optionType = ['HomeStay Name', 'Owner Name', 'DOT&CAV Registration Number',
    'Local Registration Number', 'Phone Number','Email of DEO']



  
  const handlePageChange = (newPage) => {
    setPageNo(newPage)
    console.log('page - ',(newPage-1)*pageContent, newPage*pageContent)
    setDisResult(result.slice((newPage-1)*pageContent, newPage*pageContent))
    containerRef.current.focus()
  };
  const getData = (otype='',textVal = '') => {
    //DFSFSD/** */
    let tempData = modOrgData
    console.log('Get data ',otype , textVal)
    textVal = textVal.trim()
    if(textVal!=''){
      let pattern = new RegExp(`${textVal}`, "i");//i;
      console.log(pattern)
      switch (otype) {
        //const optionType = ['HomeStay Name', 'Owner Name', 'DOT&CAV Registration Number',
        //'Local Registration Number', 'Phone Number','Email of DEO']
        case optionType[0]:
          textVal = textVal.trim().toLowerCase()
          console.log('i AM HERE IN OPTION 0')
          //tempData = tempData.filter((val) => val['homestayName'].toLowerCase().includes(textVal))
          tempData = tempData.filter((val) => pattern.test(val['homestayName']))
          break;
        case optionType[1]:
          textVal = textVal.trim().toLowerCase()
          console.log('i AM HERE IN OPTION 1')
          /*tempData = (tempData.filter((val) => val['ownerName'].toLowerCase().includes(textVal))
            ||
            tempData.filter((val) => val['manager'].toLowerCase().includes(textVal))
          )*/
          tempData = tempData.filter((val) => pattern.test(val['ownerName']) || pattern.test(val['manager'])) 
          break;
        case optionType[2]:
          textVal = textVal.trim().toLowerCase()
          console.log('i AM HERE IN OPTION 2')
          //tempData = tempData.filter((val) => val['registrationNumberDot'].toLowerCase().includes(textVal))
          tempData = tempData.filter((val) => pattern.test(val['registrationNumberDot']))
          break;
        case optionType[3]:
          textVal = textVal.trim().toLowerCase()
          console.log('i AM HERE IN OPTION 3')
          //tempData = tempData.filter((val) => val['registrationLocal'].toLowerCase().includes(textVal))
          tempData = tempData.filter((val) => pattern.test(val['registrationLocal']))
          break;
        case optionType[4]:
          console.log('i AM HERE IN OPTION 4')
          //tempData = tempData.filter((val) => val['contact'].toString().toLowerCase().includes(textVal))
          tempData = tempData.filter((val) => pattern.test(val['contact']))
          break;
        case optionType[5]:
          textVal = textVal.trim().toLowerCase()
          console.log('i AM HERE IN OPTION 5')
          //tempData = tempData.filter((val) => val['createdBy'].toLowerCase().includes(textVal))
          tempData = tempData.filter((val) => pattern.test(val['createdBy']))
          break;
      }
       
    }
    for (let key of Object.keys(query)) {
        console.log('key - ',key) 
        tempData = tempData.filter((val) => val[key] == query[key])
    } 
    setTotalItems(Math.ceil(tempData.length/pageContent))

    setResult(tempData)
  }

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
    getData(selectOption,searchText) 
    
    setDisResult(result.slice(0, pageContent))
    window.addEventListener('resize', onResize)

  }, []);

  useEffect(() => {
    console.log('Effect is done') 
    setPageNo(1) 
    getData(selectOption,searchText) 
    setDisResult(result.slice(0, pageContent))
  }, [query,change]);


  useEffect(() => {
    console.log('MOD EFFECT - ',(pageNo-1)*pageContent, pageNo*pageContent)
    setDisResult(result.slice((pageNo-1)*pageContent, pageNo*pageContent))
  }, [modOrgData]);
  
  const modifyData= (id) => {
    let prev = modOrgData.length
    
    let modData = modOrgData.filter((val) => val['_id']!=id )
    console.log('mOD data - ',id,prev,modData.length)
    let modRes = result.filter((val) => val['_id']!=id )
    setResult(modRes)
    setModOrgData(modData)
    if (prev%pageContent==1) {
      setPageNo(pageNo-1)
    }
    setTotalItems(Math.ceil(modRes.length/pageContent))
    
  };
  
  const handleDropDown = (event) => {
    const { value } = event.target
    // Handle the onChange event here
    console.log('dd',value)
    setSelectOption(value)
    setSearchText('')
    getData()
  };
  
  const handleTextChange = (event) => {
    // Handle the onChange event here
    let value = event.target.value.trim() 
    setSearchText(value);
    if (value.length > 1) {
      setChange(!change)
      console.log(value)
    }else{
      setChange(!change)
    }
  };
  const handleNumberChange = (event) => {
    let { name, value } = event.target

    let val = value.charCodeAt(value.length - 1)
    if (val < 48 || val > 57) {
      event.preventDefault()
      return
    } else {
      setSearchText(value)
      if (value.length > 1) {
        setChange(!change)
        console.log(value)
      }else{
        setChange(!change)
      }
    }
    
  }
  
  return (
    <>
      <section className="bg-green-700 py-12 mb-4 sm:px-6 md:px-[10%]">
        <div
          className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 items-center"
        >
          <div className="text-center">
            <h1
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
            >
              Discover HomeStay in Sikkim.
            </h1>
          </div>
          <form
            className="mt-4 w-full grid grid-cols-1 sm:grid-cols-4 justify-center items-center mb-4 gap-1"
          >
            <div className="w-full col-span-1">
              <label htmlFor="property-type" className="sr-only">Property Type</label>

              <DropDownTypeStyle id='criteria' name="criteria" placeholder='Search Criteria'
                selectValue={selectOption} handler={handleDropDown}
                options={optionType} />

            </div>

            {
              (selectOption == '') ?
                <div className="w-full col-span-1 sm:col-span-3 ">
                  <InputTextStyle id='ownerName' name='ownerName' required='false'
                    readonly='false' value={searchText}
                    placeholder='Enter HomeStay Name' handler={handleTextChange} />
                </div> : ''
            }
            {
              (selectOption == 'Phone Number') ?
                <div className="w-full col-span-1 sm:col-span-3 ">
                  <InputNumberTextStyle id='searchText' name='searchText' required='false'
                    readonly='false' value={searchText}
                    placeholder={`Enter ${selectOption}`} handler={handleNumberChange} />
                </div> : ''
            }
            {
              (selectOption != '' && selectOption != 'Phone Number' && selectOption != 'Pin Code') ?
                <div className="w-full col-span-1 sm:col-span-3">
                  <InputTextStyle id='searchNumber' name='searchNumber' required='false'
                    readonly='false' value={searchText}
                    placeholder={`Enter ${selectOption}`} handler={handleTextChange} />
                </div> : ''
            }
          </form>
          <div className="w-full p-2">
            <div>
              <button className='sm:hidden bg-white text-blue mb-2 p-2 rounded-sm'
                onClick={() => setIsOpen(!isOpen)}> {isOpen ? `Hide Filter By` : `Show Filter By`}</button>
              <label className='hidden sm:flex text-white mb-2 p-2 rounded-sm'
              >Filter By</label>
            </div>
            {
              isOpen && <FilterOption setQuery={setQuery} />
            }
          </div>
        </div>
      </section>
      <div className='h-0 w-0' >
        <button ref={containerRef} className='h-full w-full' ></button>
      </div>
      <section >
        <HomestayContainer data={disResult} setDelete={deleteHomestay}
          isLoading={isLoading} setIsLoading={setIsLoading}   modifyData={modifyData}/>
        
        {disResult && disResult.length>0  &&
          <div className="flex w-full p-5 justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="success"
              page={pageNo}
              total={totalItems}
              onChange={handlePageChange}
            />
          </div>
        }
      </section>
    </>
  )
}

export default SearchOption
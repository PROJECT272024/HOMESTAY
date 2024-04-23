
import React from 'react'
import { FaPhone,FaLocationDot,FaGlobe ,FaEnvelope } from "react-icons/fa6";
import Image from "next/image";
import Link from 'next/link';
import { FaRegEdit,FaTrashAlt,FaRegArrowAltCircleLeft } from "react-icons/fa";
import { URLSearchParams } from 'url';

const IndividualHomeStay = async ({params,searchParams }) => {
  const query = new URLSearchParams(searchParams).get('q');
  const getData = async()=>{
    try {
      const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${params.id}`
      const response = await fetch(url,{
        cache: 'no-store' 
      }); // {next: { revalidate: 120 }2minutes
      console.log(url)
      if(response.status==200){
        const data= await response.json()
        console.log(data)
        return data
      }else{
        console.log("I am here no data was fetched")
        return null
      }
    } catch (error) {
      console.log(error)   
      return null
    } 
  }

  const datas = await getData();
  const final = await datas
  return (

    <>
      {
        !final  && <div className='flex justify-center'>
          <p>Homestay not found with given Id</p>
        </div>
      }
      {final &&

        <main className='flex flex-col gap-2'>
          <div className='flex w-full h-72 bg-green-200'>
            This Section contains homestay images
          </div>
          <div id="mainContent" className='flex flex-col mx-6 gap-2'>
            <div className='grid grid-cols-1'>
              <div className='flex flex-row sm:justify-end p-1 text-white'>
                {
                    query && 
                    <Link href={`/homestay`} className='p-2 sm:w-20 flex flex-row items-center justify-center bg-blue-600 mr-2 rounded-lg 
                        hover:drop-shadow-md hover:bg-blue-800'>
                        <FaRegArrowAltCircleLeft className='font-bold sm:mr-2'/> <span className='hidden sm:flex'>Back</span>
                    </Link>
                  }
                  <Link href={`/homestay/${params.id}/edit`} className='p-2 sm:w-20 flex flex-row items-center justify-center bg-green-600 mr-2 rounded-lg 
                      hover:drop-shadow-md hover:bg-blue-800'>
                      <FaRegEdit className='font-bold sm:mr-2'/> <span className='hidden sm:flex'>Edit</span>
                  </Link>
                  <Link href={`/homestay/${params.id}/remove`} className='p-2 sm:w-20 flex flex-row items-center 
                    justify-center bg-red-600 mr-2 rounded-lg 
                      hover:drop-shadow-md hover:bg-red-800'>
                      <FaTrashAlt  className='font-bold sm:mr-2'/> <span className='hidden sm:flex'>Delete</span>
                  </Link>
              </div>
              <h1 className='font-bold text-blue-700 text-4xl'>{final.homestayName}</h1>
            </div>
            
            <div className='h-px drop-shadow-sm border-1 border-green-400'></div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2'>
              <div className='bg-green-500 text-xs font-bold text-white drop-shadow-md flex
                 items-middle justify-center rounded-full p-1'>{final.isUrbanOrRular}</div>
            
              <div className='bg-green-500 text-xs font-bold text-white drop-shadow-md flex
                  items-middle justify-center rounded-full p-1'>{final.isPrivateOrGovt}</div>
              <div className='bg-green-500 text-xs font-bold text-white drop-shadow-md flex
                  items-center justify-center rounded-full p-1'>{final.isNormalOrHeritage}</div>
              <div className={`${final.isRegistredWithDot=='Yes' ?'bg-green-500':'bg-red-500'} text-xs font-bold
                     text-white drop-shadow-md flex
                  items-middle justify-center rounded-full p-1 text-center`}>
                    <p>{final.isRegistredWithDot ?'Registered with DOT & CA':'Not Registered with DOT & CAV'}</p></div>
              <div className={`${final.isRegisteredWithLocal=='Yes' ?'bg-green-500':'bg-red-500'} text-xs font-bold
                     text-white drop-shadow-md flex
                  items-middle justify-center rounded-full p-1 text-center`}>
                    <p>{final.isRegisteredWithLocal ?'Registered with Local Bodies':'Not Registered with Local Bodies'}</p></div>


            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  mt-1'>
                <div className='flex flex-row items-center mx-2'>
                  <FaPhone className='text-green-600 text-md mr-1'/>
                  <div> {final.contact}</div>
                </div>
                
                {
                  final.email && <div className='flex flex-row items-center mx-2'>
                    <FaEnvelope  className='text-green-600 text-md mr-2'/>
                    <div> {final.email}</div>
                  </div>
                }
                { final.website  && <div className='flex flex-row items-center mx-2'>
                    <FaGlobe className='text-green-600 text-md mr-2'/>
                    <div> {final.website}</div>
                  </div>
                } 
               
            </div>
            <div className='flex flex-row mt-1 items-center'>
              <FaLocationDot className='text-green-600 text-md'/>
              {final.address}, {final.mcnpgpuward}, {final.villageOrTown}, {final.constituency},
               {final.district}, {final.state} 
            </div>
            <div className='h-px drop-shadow-sm border-1 border-green-400'></div>

            <div id='detailsofEstablishment' className='grid grid-cols-1 justify-center'>
                <div className='flex justify-center'>
                  <h2 className='font-bold text-blue-600 text-lg'>Details of Establishment</h2>
                </div>
                <div>
                  <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
                      <div className='shadow-md p-2'>
                        <span className='text-green-600 font-bold'>Ownership Information</span>
                        <div className='grid grid-cols-2 ml-2'>
                            <label className='font-bold'>Owner Name: </label>
                            <label>{final.ownerName}</label>
                            <label className='font-bold'>Owner Gender: </label>
                            <label>{final.gender}</label>
                            <label className='font-bold'>Owner Qualification: </label>
                            <label>{final.qualification}</label>
                            <label className='font-bold'>Manager: </label>
                            <label>{final.manager}</label>
                        </div>
                      </div>
                      <div className='shadow-md p-2'>
                          <span className='text-green-600 font-bold'>DOT&CAV Information</span>
                        <div className='grid grid-cols-2 ml-2'>
                            <label className='font-bold'>Registration Number: </label>
                            <label>{final.registrationNumberDot}</label>
                            <label className='font-bold'>Establishment Year: </label>
                            <label>{final.isRegistredWithDot=='Yes' ?(final.establishmentDate).toString().slice(0,10):""}</label>
                            <label className='font-bold'>Renewed Upto: </label>
                            <label>{final.isRegistredWithDot=='Yes' ?(final.renewDateDot).toString().slice(0,10):""}</label>
                        </div>
                      </div>
                      <div className='shadow-md p-2'>
                        <span className='text-green-600 font-bold'>Local Bodies Information</span>
                        <div className='grid grid-cols-2 ml-2'>
                            <label className='font-bold'>Local Registration Number: </label>
                            <label>{final.isRegisteredWithLocal=='Yes' ?final.registrationLocal:""}</label>
                            <label className='font-bold'>Renewed Upto: </label>
                            <label>{final.isRegisteredWithLocal=='Yes' ?(final.renewDateLocal).toString().slice(0,10):""}</label>
                        </div>
                      </div>
                      
                      <div className='shadow-md p-2'>
                        <span className='text-green-600 font-bold'>Rooms Information</span>
                        <div className='grid grid-cols-2 ml-2'>
                            <label className='font-bold'>Total Rooms: </label>
                            <label>{final.roomNumbers}</label>
                            <label className='font-bold'>Single Rooms: </label>
                            <label>{final.singleRoom}</label>
                            <label className='font-bold'>Double Rooms: </label>
                            <label>{final.doubleRoom}</label>
                            <label className='font-bold'>Carrying Capacity: </label>
                            <label>{final.carryingCapacity}</label>
                        </div>
                      </div>
                      <div className='shadow-md p-2'>
                        <span className='text-green-600 font-bold'>Staff Information</span>
                        <div className='grid grid-cols-2 ml-2'>
                            <label className='font-bold'>Local Employee: </label>
                            <label>{final.localStaff}</label>
                            <label className='font-bold'>Non Local-Employee: </label>
                            <label>{final.otherStaff}</label>
                            <label className='font-bold'>Skilled Employee: </label>
                            <label>{final.trainedStaff}</label>
                            <label className='font-bold'>Unskilled Employee: </label>
                            <label>{final.nontrainedStaff}</label>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
            {/* detail of establishment end */}
            <div className='h-px drop-shadow-sm border-1 border-green-400'></div>
            <div id='activity' className='grid grid-cols-1'>
            <div className='flex justify-center'>
                  <h2 className='font-bold text-blue-600 text-lg'>Activities</h2>
                </div>
              <div id='activitiesChild' className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2'>
                <div className='flex flex-col gap-1 shadow-md p-2'>
                    <div className='text-green-600 font-bold'>Local Village Tour / Walk </div>
                    <div className='ml-2'>
                      {final.villageTour}
                    </div>
                </div>  
                <div className='flex flex-col gap-1 shadow-md p-2'>
                    <div className='text-green-600 font-bold'>Bird Watching</div>
                    <div className='ml-2'>
                      {final.birdWatching}
                    </div>
                </div> 
                <div className='flex flex-col gap-1 shadow-md p-2'>
                    <div className='text-green-600 font-bold'>Organic Farming</div>
                    <div className='ml-2'>
                      {final.organicFarming}
                    </div>
                </div>
                <div className='flex flex-col gap-1 shadow-md p-2'>
                    <div className='text-green-600 font-bold'>Other Activities</div>
                    <div className='ml-2'>
                      {final.anyOtherActivity}
                    </div>
                </div>
                <div className='flex flex-col gap-1 shadow-md p-2'>
                    <div className='text-green-600 font-bold'>Major Tourist Attraction</div>
                    <div className='ml-2 grid grid-cols-2'>
                      <table>
                        <thead>
                          <tr className='text-left border-b-1 border-black'>
                            <th>Name</th>  
                            <th>Distance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {final.nearByAttraction.map((val,index)=>(
                              <tr key={index} className={`border-b-1 border-black  ${index%2==0?'':'bg-slate-200'}`}>
                                <td>{val.name}</td> 
                                <td>{val.distance}</td> 
                              </tr> 
                          ))}
                           
                        </tbody> 
                      </table>
                    </div>
                </div>              
              </div>
            </div>
            {/* activities end */}
            <div className='h-px drop-shadow-sm border-1 border-green-400'></div>
            <div id='facilities' className='grid grid-cols-1'>
            
              <div  className='flex justify-center'>
                  <h2 className='font-bold text-blue-600 text-lg'>Facilities</h2>
              </div>
              <div id='facilitiesChild' className='grid grid-cols-1gap-2'>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
                  <div className='flex flex-col gap-1 shadow-md p-2'>
                      <div className='text-green-600 font-bold'>Transporation </div>
                      <div className='ml-2'>
                        {final.transportation}
                      </div>
                  </div>  
                  <div className='flex flex-col gap-1 shadow-md p-2'>
                      <div className='text-green-600 font-bold'>Accessibility</div>
                      <div className='ml-2'>
                        {final.accessibility}
                      </div>
                  </div>
                  <div className='grid gap-1 col-span-2 lg:col-span-1 shadow-md p-2'>
                      <div className='text-green-600 font-bold'>Other Facilities</div>
                      <table>
                        <thead>
                          <tr className='text-left border-b-1 border-black'>
                            <th>Type</th>  
                            <th className='w-16'>Status</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='border-b-1 border-black'>
                            <td>Proper Waste Disposal System</td>
                            <td>{final.wasteDisposal.isYesorNo}</td>
                            <td>{final.wasteDisposal.isYesorNo=='Yes'?final.wasteDisposal.description:''}</td>
                          </tr> 
                          <tr className='border-b-1 border-black bg-slate-200'>
                            <td>Safe Drinking Water</td>
                            <td>{final.drinkingWater.isYesorNo}</td>
                            <td>{final.drinkingWater.isYesorNo=='Yes'?final.drinkingWater.description:''}</td>
                          </tr> 
                          <tr className='border-b-1 border-black'>
                            <td>First Aid</td>
                            <td>{final.firstAid.isYesorNo}</td>
                            <td>{final.firstAid.isYesorNo=='Yes'?final.firstAid.description:''}</td>
                          </tr> 
                          <tr className='border-b-1 border-black bg-slate-200'>
                            <td>Eco Friendly / Sustainable Practices</td>
                            <td>{final.ecoFriendly.isYesorNo}</td>
                            <td>{final.ecoFriendly.isYesorNo=='Yes'?final.ecoFriendly.description:''}</td>
                          </tr>
                          <tr className='border-b-1 border-black '>
                            <td>Clean Surroundings</td>
                            <td>{final.cleaning.isYesorNo}</td>
                            <td>{final.cleaning.isYesorNo=='Yes'?final.cleaning.description:''}</td>
                          </tr>
                          
                        </tbody> 
                      </table>
                      
                  </div>            
                </div>
                 
                  
              </div>
            </div>
            {/* facilities end */}
            <div className='h-px drop-shadow-sm border-1 border-green-400'></div>
            <div id='ota' className='grid grid-cols-1'>
              <div className='flex justify-center'>
                <h2 className='font-bold text-blue-600 text-lg'>Registration with Online Travel Aggregators</h2>
              </div>
              <div id='activitiesChild' className='grid grid-cols-1'>
                <div className='grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                  <div className='shadow-md p-2 w-full'>
                    <table className='w-full ml-2'>
                      <thead>
                        <tr className='text-left border-b-1 border-black'>
                          <th>Type</th>  
                          <th className='w-16'>Status</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='border-b-1 border-black'>
                          <td>Make My Trip</td>
                          <td>{final.makeMyTrip.isRegistered}</td>
                          <td>{final.makeMyTrip.isRegistered=='Yes'?final.makeMyTrip.percentage:''}</td>
                        </tr> 
                        <tr className='border-b-1 border-black bg-slate-200'>
                          <td>Agoda</td>
                          <td>{final.agoda.isRegistered}</td>
                          <td>{final.agoda.isRegistered=='Yes'?final.agoda.percentage:''}</td>
                        </tr> 
                        <tr className='border-b-1 border-black'>
                          <td>AirBnb</td>
                          <td>{final.airBnb.isRegistered}</td>
                          <td>{final.airBnb.isRegistered=='Yes'?final.airBnb.percentage:''}</td>
                        </tr> 
                        <tr className='border-b-1 border-black bg-slate-200'>
                          <td>Go Ibibo</td>
                          <td>{final.goIbibo.isRegistered}</td>
                          <td>{final.goIbibo.isRegistered=='Yes'?final.goIbibo.percentage:''}</td>
                        </tr> 
                      </tbody> 
                    </table>
                  </div>
                  
                  <div className='flex flex-col shadow-md p-2'>
                    <div className='text-green-600 font-bold'>Others</div>
                    <div className='ml-2'>
                      {final.otherOnline?final.otherOnline:"Not Available"}
                    </div>
                  </div>

                </div>   
              </div>
            </div>
            {/* OTA ENDS */}
            <div className='h-px drop-shadow-sm border-1 border-green-400'></div>
            <div id='record' className='grid grid-cols-1 gap-2'>
                <div className='flex justify-center'>
                      <p className='font-bold text-blue-600 text-lg'>Other Information</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                      <div className='flex flex-col shadow-md'>
                          <div className='text-green-600 font-bold'>Record Keeping </div>
                          <div className='grid grid-cols-1 gap-2 ml-2 p-2'>
                              <div className='font-bold'>Record Maintained</div>
                              <div>{final.isRecordMaintained}</div>
                              <div className='font-bold'>Maintain Type</div>
                              <div>{final.isRecordMaintained=='Yes'?final.isManualorDigital:""}</div>
                          </div>
                      </div>
                      <div className='flex flex-col shadow-md p-2'>
                          <div className='text-green-600 font-bold'>Occupancy Details</div>
                          <div className='grid grid-cols-1 gap-2 ml-2'>
                              <div className='font-bold'>Occupancy Rate in Peak Season</div>
                              <div>{final.occupancyInPeak}</div>
                              <div className='font-bold'>Occupancy Rate in Lean Season</div>
                              <div>{final.occupancyInLean}</div>
                              <div className='font-bold'>Last 12 months visitors</div>
                              <div>{final.touristInYear}</div>
                              <div className='font-bold'>Domestic Visitors</div>
                              <div>{final.domesticTourist}</div>
                              <div className='font-bold'>Foreign Visitors</div>
                              <div>{final.foreignTourist}</div>
                          </div>
                      </div>
                      <div className='flex flex-col shadow-md p-2'>
                          <div className='text-green-600 font-bold'>Technology Related</div>
                          <div className='grid grid-cols-1 gap-2 ml-2'>
                              <div className='font-bold'>Digital Technology Used or not</div>
                              <div>{final.isDigitalized}</div>
                              <div className='font-bold'>Technology Used</div>
                              <div>{final.isDigitalized=='Yes'?final.digitalEquiment:""}</div>
                              <div className='font-bold'>Technical Support Required</div>
                              <div>{final.digitalSupport}</div>
                          </div>
                      </div>
                      <div className='flex flex-col shadow-md p-2'>
                          <div className='text-green-600 font-bold'>Account Keeping</div>
                          <div className='grid grid-cols-1 gap-2 ml-2'>
                              <div className='font-bold'>Account Bookkeeping</div>
                              <div>{final.isAccountMaintained}</div>
                              <div className='font-bold'>Maintain Type</div>
                              <div>{final.isAccountMaintained=='Yes'?final.isAccountDigital:""}</div>
                          </div>
                      </div>
                </div>
                
            </div>
            {/* Other Info */}
            <div className='h-px drop-shadow-sm border-1 border-green-400'></div>
            <div className='grid grid-cols-1'>
              <div className='flex justify-center'>
                    <p className='text-blue-500 font-bold'>Uploaded  Images</p>
              </div>
              <div className='flex justify-center'>
                {final.homestayImages.length==0?"No Images Uploaded":
                  <div className={`grid ${(final.homestayImages.length>2)?" md:grid-cols-2 lg:grid-cols-3":
                                  (final.homestayImages.length>1 ?"md:grid-cols-2 ":
                                  "grid-cols-1")} justify-center gap-2`} >
                       {final.homestayImages.map((val,index)=>(
                          <div className='p-2 rounded-md'>
                            <Image src={val}
                            width={0} key={index}
                            height={0}
                            sizes='200'
                            alt={val}
                            className='block h-72 w-96 object-fill' priority={true}/>
                        </div>
                       ))}   
                  </div>
                }
              </div>
            </div>
            {/*Gallery ends*/}
            <div className='h-px drop-shadow-sm border-1 border-green-400'></div>
            <div className='grid grid-cols-1'>
              <div className='flex justify-center'>
                    <p className='text-blue-500 font-bold'>Uploaded  Signature</p>
              </div>
              <div className='flex justify-center mb-2'>
                {final.signature.length==0?"No Signature Uploaded":
                  <Image src={final.signature}
                  width={0}
                  height={0}
                  sizes='200'
                  alt=''
                  className='block h-60 w-96 object-fill' priority={true}/>}
              </div>
            </div>
          </div>
        </main>
        
      }
      
    </>
    
    
  )
}

export default IndividualHomeStay
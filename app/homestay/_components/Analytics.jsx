
'use client'
import React from 'react'

import { readyData } from '@/utils/ChartDataPrepare';
import PieChartTemplate from '@/components/chart/PieChartTemplate';
import BarChartTemplate from '@/components/chart/BarChartTemplate';
import StackBarChart from '@/components/chart/StackBarChart';

const Analytics = ({category,data}) => {
    
    const prepareDs = readyData(data) 
    

    return (
      <div>
        {prepareDs && <div className='flex flex-col'> 
          {
            !category.district  && 
            <div className='p-4 odd:bg-transparent even:bg-green-50'>
              <h1 className='flex justify-center font-bold text-2xl p-2'>Based on District</h1>
              <div className='w-full grid grid-cols-1 md:grid-cols-3 relative gap-1'>
                <table className='text-left'>
                  <thead >
                    <tr className='border-b-1 border-r-1 border-gray-100'>
                      <th>District</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                  { 
                    prepareDs.district.map((value,index)=>(
                      <tr key={index} className='odd:bg-gray-50 border-b-1 border-r-1 border-gray-100'>
                        <td>{value.x}</td>
                        <td>{value.y}</td>
                      </tr>
                    ))
                  }
                  <tr className='odd:bg-gray-50 border-b-1 border-r-1 border-gray-100'>
                        <th>Total</th>
                        <td className='font-bold'>{prepareDs.district[0].total}</td>
                      </tr>
                  </tbody>
                </table>
                <BarChartTemplate dataSet={prepareDs.district}/>
                <PieChartTemplate dataSet={prepareDs.district}/>
              </div> 
            </div>
          }
          {
            !category.registration  && 
            <div className='odd:bg-transparent even:bg-green-50 p-4'>
              <h1 className='flex justify-center font-bold text-2xl p-2'>Based on Registration</h1>
              <div className='w-full grid grid-cols-1 md:grid-cols-3 relative gap-1'>
                <div className='flex items-center'>
                  <table className='text-left h-20 w-full'>
                    <thead >
                      <tr className='border-b-1 border-r-1 border-gray-100'>
                        <th>Registration</th>
                        <th>DOT&CAV</th>
                        <th>Local</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='border-b-1 border-r-1 border-gray-100'>
                            <th >Yes</th>
                            <td>{prepareDs.registration[0].y}</td>
                            <td>{prepareDs.registration[2].y}</td>
                      </tr>
                      <tr className='bg-gray-50 border-b-1 border-r-1 border-gray-100'>
                            <th >No</th>
                            <td>{prepareDs.registration[1].y}</td>
                            <td>{prepareDs.registration[3].y}</td>
                      </tr>
                      <tr className='font-bold border-b-1 border-r-1 border-gray-100'>
                            <td >Total</td>
                            <td>{prepareDs.registration[1].total}</td>
                            <td>{prepareDs.registration[3].total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              
                <StackBarChart dataSet={prepareDs.stackedRegistration}/>
                <PieChartTemplate dataSet={prepareDs.registration}/>
              </div>
            </div>
          }
          {
            !category.type  && 
            <div className='p-4 odd:bg-transparent even:bg-green-50'>
              <h1 className='flex justify-center font-bold text-2xl p-2'>Based on Type</h1>
              <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 relative g-1'>
              <div className='flex items-center'>
                  <table className='text-left h-20 w-full'>
                    <thead >
                      <tr className='border-b-1 border-r-1 border-gray-100'>
                        <th colSpan={2}>Types</th>
                        <th>Count</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='border-b-1 border-r-1 border-gray-100'>
                            <th rowSpan={2} >Type I</th>
                            <th>Urban</th>
                            <td>{prepareDs.type[0].y}</td>
                            <td rowSpan={2}>{prepareDs.type[0].total}</td>
                      </tr>
                      <tr className='border-b-1 border-r-1 border-gray-100'>
                          <th>Rular</th>
                          <td>{prepareDs.type[1].y}</td>
                      </tr>
                      <tr className='bg-gray-50 border-r-1 border-b-1 border-gray-100'>
                            <th rowSpan={2} >Type II</th>
                            <th>Government</th>
                            <td>{prepareDs.type[2].y}</td>
                            <td rowSpan={2}>{prepareDs.type[2].total}</td>
                      </tr>
                      <tr className='bg-gray-50 border-r-1 border-b-1 border-gray-100'>
                          <th>Private</th>
                            <td>{prepareDs.type[3].y}</td>
                      </tr>
                      <tr className='border-b-1 border-r-1 border-gray-100'>
                            <th rowSpan={2} >Type III</th>
                            <th>Normal</th>
                            <td>{prepareDs.type[4].y}</td>
                            <td rowSpan={2}>{prepareDs.type[4].total}</td>
                      </tr>
                      <tr className='border-b-1 border-r-1 border-gray-100'>
                          <th>Heritage</th>
                            <td>{prepareDs.type[5].y}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <StackBarChart dataSet={prepareDs.stackedtype2}/>
                <PieChartTemplate dataSet={prepareDs.type}/>
              </div>
            </div>
          }
          {
            !category.gender  && 
            <div className='bg-green-50 p-4 odd:bg-transparent even:bg-green-50'>
              <h1 className='flex justify-center font-bold text-2xl p-2'>Based on Gender</h1>
              <div className='w-full grid grid-cols-1 md:grid-cols-3 relative g-1'>
              <table className='text-left'>
                  <thead >
                    <tr className='border-b-1 border-r-1 border-gray-100'>
                      <th>Gender</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                  { 
                    prepareDs.gender.map((value,index)=>(
                      <tr key={index} className='odd:bg-gray-50 border-b-1 border-r-1 border-gray-100'>
                        <td>{value.x}</td>
                        <td>{value.y}</td>
                      </tr>
                    ))
                  }
                  <tr className='odd:bg-gray-50 border-b-1 border-r-1 border-gray-100'>
                        <th>Total</th>
                        <td className='font-bold'>{prepareDs.gender[0].total}</td>
                      </tr>
                  </tbody>
                </table>
                <BarChartTemplate dataSet={prepareDs.gender}/>
                <PieChartTemplate dataSet={prepareDs.gender}/>
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Analytics

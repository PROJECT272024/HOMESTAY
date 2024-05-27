import { allHomestayDataForAnalysis } from '@/actions/homestay'
import React from 'react'
import AnalysisPage from './AnalysisPage'


const AnalyticsMain = async () => {
    let result = async() => {
        return await allHomestayDataForAnalysis()
      }
    let data = await result();
    data = await data.result

  return (
    <div>
        <AnalysisPage orgdata={data}/>
    </div>
  )
}

export default AnalyticsMain
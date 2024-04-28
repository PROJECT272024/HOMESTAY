'use client'
import React from 'react'
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend } from 'recharts';


const CustomTooltip = ({ active, payload, label}) => {
  
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-gray-50 p-2">
        <p className="label font-bold">{`${label}`}</p>
        <p className="desc text-[rgba(7,188,11,0.6)]">{payload[0].payload.label1} - {payload[0].value} </p>
        <p className="desc text-[rgba(231,76,60,0.6)]" >{payload[0].payload.label2} - {payload[1].value} </p>
      </div>
    );
  }

  return null;
};
const StackBarChart = ({dataSet}) => {
  return (
    <div style={{position: 'relative', width: '100%', paddingBottom: '0px'}}>
      <div >
        <ResponsiveContainer  aspect={1} height={300} width='100%' minHeight={300} minWidth='100%'
          maxHeight={300} maxWidth='100%'>
          <BarChart data={dataSet}  
                margin={{top:80, right:0, left:0, bottom:0}} width='100%' height='100%'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis/>
            <Tooltip content={<CustomTooltip/>}/>
            <Bar dataKey="x" label='label1' stackId="a" fill="rgba(7,188,11,0.6)"/>
            <Bar dataKey="y" label='label2' stackId="a" fill="rgba(231,76,60,0.6)"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StackBarChart
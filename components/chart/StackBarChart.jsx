'use client'
import React, { useState } from 'react'
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Cell } from 'recharts';

const COLORS = ['#F8B195', '#56C596', '#99B898', '#83AF9B','#534666','#F67280','#321456'];
const CustomTooltip = ({ active, payload, label}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-gray-50 p-2">
        <p className="label font-bold">{`${label}`}</p>
        <p style={{color: payload[0].payload.color1}}>{payload[0].payload.label1} - {payload[0].value} </p>
        <p style={{color: payload[0].payload.color2}}>{payload[0].payload.label2} - {payload[1].value} </p>
      </div>
    );
  }

  return null;
};
const StackBarChart = ({dataSet}) => {
  const [count,setCount]=useState(0)
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
            <Bar dataKey="x" label='label1' stackId="a" >
              {dataSet.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color1} />
              ))}
            </Bar>
            <Bar dataKey="y" label='label2' stackId="a">
              {dataSet.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color2} />
              ))}
            </Bar>
            
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StackBarChart
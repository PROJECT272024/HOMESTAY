'use client'
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

//const COLORS = ['#0088FE', '#00C49F', '#121212', '#F08042','#AA0042','#AA8000','#e74c3c'];
const COLORS = ['#F8B195', '#56C596', '#99B898','#534666','#83AF9B','#F67280','#321456'];
const BarChartTemplate = ({dataSet}) => {
  return(
    <div style={{position: 'relative', width: '100%', paddingBottom: '0px'}}>
      <div >
        <ResponsiveContainer  aspect={1} height={300} width='100%' minHeight={300} minWidth='100%'
          maxHeight={300} maxWidth='100%'>
              <BarChart width='100%' height='100%' data={dataSet}  
                margin={{top:0, right:0, left:0, bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey='x'/>
                  <YAxis dataKey='y'/>
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey='y'  fill="#8884d8"  > #0088FE
                    {dataSet.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} label={entry.x} />
                    ))}
                  </Bar>
              </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
};

export default BarChartTemplate;
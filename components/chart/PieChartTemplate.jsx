'use client'
import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip,Legend } from 'recharts';
import { FaSquareFull } from 'react-icons/fa';


const COLORS = ['#0088FE', '#00C49F', '#121212', '#F08042','#AA0042','#AA8000','#e74c3c'];

const CustomTooltip = ({ active, payload}) => {
  
  if (active && payload && payload.length) {
    let per=0
    let total = payload[0].payload.total
    if(total==0){ 
      per=0
    }else{ 
      per= ((payload[0].value/payload[0].payload.total)*100)
    }
    return (
      <div className="custom-tooltip bg-gray-50 p-2">
        <p className={`desc text-[${payload[0].payload.fill}]`}>
          {`${payload[0].payload.x} - ${payload[0].value} - ${Math.round(per)}%`}
        </p>
      </div>
    );
  }

  return null;
};

const CustomLegend = ({ payload}) => {
  
  if (payload && payload.length) {
    return (
      <div className="flex flex-wrap justify-center items-center">
        {
          payload.map((entry,index)=>(
            <div key={index} className='flex justify-center items-center'>
                <FaSquareFull className='mx-2' size={12} color={entry.payload.fill}/>
                <div className='mx-2' key={index}>
                  {entry.payload.x}
                </div>
            </div>
          ))
        }
      </div>
    );
  }

  return null;
};

const PieChartTemplate = ({dataSet}) => {
  
  return (
    <div style={{position: 'relative', width: '100%', paddingBottom: '0px'}}>
      <div className=''>
      <ResponsiveContainer  aspect={1} height={300} width='100%' minHeight={300} minWidth='100%'
          maxHeight={300} maxWidth='100%'>
            <PieChart width={300} height={300}>
              <Pie
                dataKey="y"
                isAnimationActive={false}
                data={dataSet}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8">
                {dataSet.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} label={entry.x} />
                ))}
              </Pie>
              <Legend content={<CustomLegend/>}/>
              <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
          </ResponsiveContainer>
          </div>
      </div>
  )
}

export default PieChartTemplate
import { red } from '@mui/material/colors';
import React, { PureComponent } from 'react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    ReferenceDot,
    ReferenceArea,
  } from 'recharts';
import DotForReference from './DotForReference';
import LableForReference from './LableForReference';


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{display:"flex", flexDirection:"column",fontSize:"7px", padding:"5px", background:"#402769", color:"white", width:"76px", height:"30px", border:"none"}} >
          <div style={{fontSize:"7px"}} >{`${label} Connectors`}</div>
          
          <div >{`${payload[0].value} days`}</div>
        </div>
      );
    }
  
    return null;
  };
  
const LineChartGraph = ({filterPeriod}) => {
    const data = [
        {
          name: 1,
          uv: 4000,
          days: 2.400,
          amt: 2.400,
        },
        {
          name: 2,
          uv: 3000,
          days: 1.398,
          amt: 2.210,
        },
        {
          name: 3,
          uv: 2000,
          days: 9.800,
          amt: 2.290,
        },
        {
          name: 4,
          uv: 2780,
          days: 3.908,
          amt: 2.000,
        },
        {
          name: 5,
          uv: 1890,
          days: 4.800,
          amt: 2.181,
        },
        {
          name: 6,
          uv: 2390,
          days: 3.800,
          amt: 2.500,
        },
        {
          name: 7,
          uv: 3490,
          days: 4.300,
          amt: 2.100,
        },
        {
          name: 8,
          uv: 3490,
          days: 4.300,
          amt: 2.100,
        },
        {
          name: 9,
          uv: 3490,
          days: 4.300,
          amt: 2.100,
        },
        {
          name: 10,
          uv: 3490,
          days: 4.300,
          amt: 2.100,
        },
        {
          name:11,
          uv: 3490,
          days: 2.00,
          amt: 2.100,
        },
        {
          name: 12,
          uv: 3490,
          days: 4.300,
          amt: 2.100,
        },
        {
          name: 13,
          uv: 3490,
          days: 4.300,
          amt: 2.100,
        },
        {
          name: 14,
          uv: 3490,
          days: 4.300,
          amt: 2.100,
        },
        {
          name: 15,
          uv: 3490,
          days: 4.500,
          amt: 2.100,
        },
        {
          name: 16,
          uv: 3490,
          days: 4.300,
          amt: 3.100,
        },
        {
          name: 17,
          uv: 3490,
          days: 4.500,
          amt: 2.100,
        },
        {
          name: 18,
          uv: 3490,
          days: 4.300,
          amt: 6.100,
        },
        {
          name: 19,
          uv: 3490,
          days: 8.00,
          amt: 2.100,
        },
        {
          name: 20,
          uv: 3490,
          days: 3.00,
          amt: 2.100,
        },
        {
          name: 20,
          uv: 3490,
          days: 19.00,
          amt: 2.100,
        },
      ];
    
  return (
    <div>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 50,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis minTickGap={1}  domain={['dataMin', 'dataMax']} tick={{ stroke: '#3D4A52' }} startOffset={0}  fontSize="10px" fontWeight={600}  strokeWidth={1} stroke='#E4E4E4' />
          <YAxis minTickGap={1} tick={{ stroke: '#3D4A52' }}  allowDataOverflow={true}  fontSize="10px" fontWeight={600}  strokeWidth={1} stroke='#E4E4E4' />
          <Tooltip content={<CustomTooltip />} payload={data} position={{  y: 50 }} itemStyle={{border:"none"}}  />
          {/* <Legend /> */}
          {/* <ReferenceLine x="Page C" stroke="#D73193" label="Max PV PAGE" /> */}
          <ReferenceLine strokeDasharray="10 10" y={4.5} x="16" label="" stroke="red" />
          <ReferenceLine x={16} label="" stroke="#CFC1E4" />
          <ReferenceDot x={16} y={4.5}  fill="#402769" stroke="#FFFFFF" strokeWidth="10px" />
          {/* <ReferenceArea x1={12} x2={16} y1={8} y2={10} stroke="#402769"   strokeOpacity={0.3}  /> */}
          <Line animationDuration={5000} animationBegin={2000} strokeDashArray="4"  animationEasing="ease-in-out" type="monotone" dataKey="days" stroke="#5AAAFA" strokeWidth={2} dot={false} />

          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */} 
        </LineChart>
    </div>
  )
}

export default LineChartGraph
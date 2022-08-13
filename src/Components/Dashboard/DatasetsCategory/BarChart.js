import { useForkRef } from "@mui/material";
import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartComponent = ({ barChartData }) => {
  const propsData = [
    {
      name: "Crop data",
      // uv: 4000,
      value: 2.2,
      amt: 2.4,
    },
    {
      name: "Land record",
      // uv: 3000,
      value: 2.2,
      amt: 2.21,
    },
    {
      name: "Farmer data",
      // uv: 2000,
      value: 4.2,
      amt: 2.29,
    },
    {
      name: "Pricing data",
      // uv: 2780,
      value: 2.2,
      amt: 2.0,
    },
    {
      name: "Insurance",
      // uv: 1890,
      value: 4.2,
      amt: 2.181,
    },
    {
      name: "Credit assessment",
      // uv: 2390,
      value: 10.0,
      amt: 2.5,
    },
    
    
  ];
  const [data, setData] = useState(propsData);
  useEffect(() => {
    if (barChartData) {
      setData([...data]);
    }
  },[]);

  // console.log(data)
  return (
    <div style={{ border: "1px solid #E4E4E4", borderRadius: "10px" }}>
      {/* <div style={{border:"1px solid red", borderRadius:"10px"}}> */}

      <BarChart
        width={600}
        height={183}
        data={data}
        margin={{ top: 0, right: 72, bottom: 0, left: -20 }}
        barSize={30}
        //    style={{border:"1px solid blue"}}
        isAnimationActive={true}
        // barCategoryGap="20%"
        
      >
        <YAxis
          padding={{ top: 20, bottom: 5 }}
          tickCount={data.length + 1}
          tickSize={0}
          minTickGap={1}
          domain={[0, "dataMax + 2"]}
          type="number"
          fontSize="10px"
          axisLine={false}
          isAnimationActive={true}
        />
        <XAxis
          padding={{ left: 30, right: 20 }}
          tickSize={1}
          minTickGap={-1}
          fontSize="10px"
          axisLine={false}
          type="category"
          dataKey="name"
          scale="point"
          interval={0}
          angle={propsData.length < 6 ? 0 : propsData.length >=10 ? 20 : 0 }
          tickMargin={1}
          
        />
        <Tooltip />

        <Bar 
        
        isAnimationActive={true}
        animationBegin="0"
        animationDuration={2000}
        dataKey="value" fill="#5AAAFA" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;

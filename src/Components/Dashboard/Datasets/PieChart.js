import React, { PureComponent, useEffect } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import PieChartsSideMenu from "./PieChartsSideMenu";
import styles from "./datasets.module.css";
import LegendValue from "./LegendValue";

const data = [
  { name: "Crop data", value: 400 },
  { name: "Land record", value: 300 },
  { name: "Farmers data", value: 300 },
  { name: "Pricing data", value: 200 },
  { name: "Insurance", value: 400 },
  { name: "Credit Assessment", value: 100 },
];
let totalSum = 0;
data.forEach((item) => (totalSum += +item.value));

const COLORS = [
  "#E7B100",
  "#402769",
  "#FD7B25",
  "#836400",
  "#096D0D",
  "#3BBFCC",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieChartMain extends PureComponent {
  //   static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  render() {
    return (
      <div className={styles.datasetsChartBox}>
        <PieChart
          style={{
            // border: "1px solid green",
            display: "flex",
            justifyContent: "left",
          }}
          width={640}
          height={317}
        >
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            labelLine={false}
            // label={renderCustomizedLabel}
            outerRadius={135.5}
            fill="#8884d8"
            dataKey="value"
            animationEasing="ease-out"
            animationBegin={500}
            animationDuration={3000}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            itemStyle={{ color: "#3D4A52" }}
            wrapperStyle={{ color: "green" }}
          />
          <Legend
            //          payload={
            //   data.map(
            //     (item, index) => ({
            //       id: item.name,
            //       type: "square",
            //       value: `${Math.round((item.value/totalSum) * 100)}% ${item.name}`,
            //       color: COLORS[index % COLORS.length]
            //     })
            //   )
            // }
            content={<LegendValue data={data} COLORS={COLORS} />}
            verticalAlign="middle"
            align="right"
            layout="vertical"
          />
        </PieChart>

        {/* <PieChartsSideMenu data={data} COLORS={COLORS} /> */}
      </div>
    );
  }
}

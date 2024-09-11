import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
// @ts-ignore
import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts"; // Import Tooltip from Recharts
import style from "./CardWithMultiValueGraph.module.css";
import NoDataAvailable from "./NoData";

// @ts-ignore
const ChartWithMultipleGraph = (props) => {
  const { maxHeight, data, dataKey, dataValue } = props;

  // @ts-ignore
  console.log(
    "🚀 ~ file: ChartWithMultiValueGraph.tsx:11 ~ CardWithMultiValueGraph ~ data:",
    data,
    "|",
    dataKey,
    "|",
    dataValue,
    "|"
  );
  let colours = [
    "#F5B406",
    "#00AB55",
    "#0050D6",
    "#FF780A",
    "#B800D6",
    "#5C046A",
    "#003690",
    "#FF3D00",
  ];

  const total = +data.reduce((total, item) => total + item.value, 0);

  return (
    <>
      {data.length > 0 ? (
        <Box className={style.containerGraph}>
          <div className={style.graphContainer}>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                cx={100}
                cy={100}
                innerRadius={60}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                // @ts-ignore
                {data.map((entry, index) => (
                  <Cell
                    // @ts-ignore
                    cornerRadius={10}
                    background={{ fill: "#eee" }}
                    key={`cell-${index}`}
                    fill={colours[index % colours.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ textAlign: "left", backgroundColor: "white" }}
                formatter={(value) => `${value} units`} // Format tooltip value
              />
            </PieChart>
          </div>
          <div className={`${style.textContainer} mt30`}>
            {data.map((entry, index) => (
              <div className={style.labelRow} key={`label-${index}`}>
                <span
                  className={style.colorBox}
                  style={{
                    backgroundColor: colours[index % colours.length],
                  }}
                ></span>
                <span className={style.labelText}>{entry.name}</span>
                <span
                  style={{ marginLeft: "80px" }}
                  className={style.percentageText}
                >
                  {total !== 0
                    ? `${Math.round((entry.value / total) * 100)}%`
                    : "0%"}
                </span>
              </div>
            ))}
          </div>
        </Box>
      ) : (
        <Box className={style.noData}>
          <NoDataAvailable />
        </Box>
      )}
    </>
  );
};

export default ChartWithMultipleGraph;

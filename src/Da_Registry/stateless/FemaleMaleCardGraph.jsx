import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
// @ts-ignore
import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts"; // Import Tooltip from Recharts
import style from "./FemaleMaleCard.module.css";
import CustomText from "Farmer-Registry/CustomText/CustomText";

// @ts-ignore
const FemaleMaleCard = (props) => {
  const { data } = props;
  // @ts-ignore
  let colours = ["#00AB55", "#FF780A"];

  // @ts-ignore
  const getTotalNoOfEA = () => {};

  useEffect(() => {}, []);

  const total = data.reduce((total, item) => total + item.value, 0);

  return (
    <>
      <Box className={style.container}>
        <div className={style.textContainer}>
          <CustomText
            size={"16px"}
            weight={400}
            value={"DA by gender"}
            color={"#000000"}
            className={style.title}
          />
          <div>
            {data.map((entry, index) => (
              <div className={style.labelRow} key={`label-${index}`}>
                <span
                  className={style.colorBox}
                  style={{ backgroundColor: colours[index] }}
                ></span>
                <span className={style.labelText}>{entry.name}</span>
                <span className={style.percentageText}>
                  {total !== 0
                    ? `${((entry.value / total) * 100).toFixed(0)}%`
                    : "0%"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={style.graphContainer}>
          <PieChart width={100} height={100}>
            <Pie
              data={data}
              cx={40}
              cy={50}
              innerRadius={30}
              outerRadius={40}
              fill="#8884d8"
              dataKey="value"
            >
              {/*@ts-ignore */}
              // @ts-ignore
              {data.map((entry, index) => (
                <Cell
                  // @ts-ignore
                  cornerRadius={5}
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
      </Box>
    </>
  );
};

export default FemaleMaleCard;

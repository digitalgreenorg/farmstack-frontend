import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts"; // Import Tooltip from Recharts
import style from "./style.module.css";
import NoDataAvailable from "../../NoData/NoData"

const PieChartCard = (props) => {
  const { maxHeight, data, dataKey, dataValue, unit } = props;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));

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

  const total = +data?.reduce((total, item) => total + item.value, 0);

  return (
    <>
      {data?.length > 0 ? (
        <Box className={style.containerGraph}>
          <div className={style.graphContainer}>
            <PieChart width={mobile ? 180 : 300} height={mobile ? 200 : 300}>
              <Pie
                data={data}
                cx={mobile ? 85 : 130}
                cy={mobile ? 90 : 140}
                innerRadius={mobile ? 55 : 90}
                outerRadius={mobile ? 65 : 105}
                fill="#8884d8"
                dataKey="value"
              >
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
          <div className={`${style.textContainer}`}>
            {data?.map((entry, index, value) => (
              <div className={style.labelRow} key={`label-${index}`}>
                <span
                  className={style.colorBox}
                  style={{
                    backgroundColor: colours[index % colours.length],
                  }}
                ></span>
                <span
                  style={{ marginRight: "20px" }}
                  className={style.percentageText}
                >
                  {total !== 0
                    ? `${Math.round((entry.value / total) * 100)}%`
                    : "0%"}
                </span>
                <span className={style.labelText}>{entry.name}</span>
                <span className={style.labelText}>{entry.value}</span>
                <span className={style.labelText}>{unit}</span>
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

export default PieChartCard;

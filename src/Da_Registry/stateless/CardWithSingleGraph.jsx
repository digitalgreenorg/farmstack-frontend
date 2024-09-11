// @ts-ignore
import * as React from "react";
import { Box } from "@mui/material";
import { RadialBar, RadialBarChart } from "recharts";
import style from "./CardWithSingleGraph.module.css";
import CustomText from "Farmer-Registry/CustomText/CustomText";

// @ts-ignore
const CardWithSingleGraph = (props) => {
  let colours = ["#F5B406", "#00AB55", "#0050D6", "#FF780A"];
  const { dotColor, graphData, graph, title, value } = props;

  let formattedValue = 0;
  if (typeof value == "number") {
    formattedValue = parseFloat(value.toFixed(0));
  }

  return (
    <>
      <Box className={style.container}>
        <div className={style.textContainer}>
          <CustomText
            size={"16px"}
            weight={400}
            value={title}
            color={"#000000"}
            className={style.title}
          />
          {dotColor ? (
            <span
              className={style.colorBox}
              style={{ backgroundColor: dotColor }}
            ></span>
          ) : null}
          <CustomText
            size={"20px"}
            weight={600}
            value={formattedValue.toLocaleString()}
            color={"#000000"}
            className={style.value}
            parentClassName={style.valueContainer}
          />
        </div>
        {graph ? (
          <div>
            <RadialBarChart
              width={120}
              height={120}
              cx={60}
              cy={50}
              innerRadius={30}
              outerRadius={50}
              barSize={8}
              data={graphData}
            >
              <RadialBar
                cornerRadius={10}
                // @ts-ignore
                minAngle={15}
                background
                clockWise
                dataKey="value"
              />
            </RadialBarChart>
          </div>
        ) : null}
      </Box>
    </>
  );
};
export default CardWithSingleGraph;

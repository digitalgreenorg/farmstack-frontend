import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
// @ts-ignore
import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts"; // Import Tooltip from Recharts
import style from "./FemaleMaleCard.module.css";
import CustomText from "Farmer-Registry/CustomText/CustomText";

// @ts-ignore
const FemaleMaleCardStatic = (props) => {
  const { data } = props;
  // @ts-ignore
  let colours = ["#00AB55", "#FF780A"];

  // @ts-ignore
  const getTotalNoOfEA = () => {};

  useEffect(() => {}, []);

  const total = data.reduce((total, item) => total + item.value, 0);

  return (
    <>
      <Box className={style.containerStatic}>
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
      </Box>
    </>
  );
};

export default FemaleMaleCardStatic;

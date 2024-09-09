import React from "react";
import style from "./style.module.css";
import { Box, useMediaQuery, useTheme } from "@mui/material";

import {
  BarChart,
  Bar,
  // @ts-ignore
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import NoDataAvailable from "../../NoData/NoData"

const BarGraphCard = (props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const { data, barColor, dataKeys, Values, axisLine } = props;

  //   const data = [
  //     {
  //       name: "Page A",
  //       value: 4000,
  //       pv: 2400,
  //       crop_name: 2400,
  //     },
  //     {
  //       name: "Page B",
  //       value: 3000,
  //       pv: 1398,
  //       crop_name: 2210,
  //     },
  //     {
  //       name: "Page C",
  //       value: 2000,
  //       pv: 9800,
  //       crop_name: 2290,
  //     },
  //     {
  //       name: "Page D",
  //       value: 2780,
  //       pv: 3908,
  //       crop_name: 2000,
  //     },
  //     {
  //       name: "Page E",
  //       value: 1890,
  //       pv: 4800,
  //       crop_name: 2181,
  //     },
  //     {
  //       name: "Page F",
  //       value: 2390,
  //       pv: 3800,
  //       crop_name: 2500,
  //     },
  //     {
  //       name: "Page G",
  //       value: 3490,
  //       pv: 4300,
  //       crop_name: 2100,
  //     },
  //   ];

  return (
    <>
      {" "}
      {data?.length ? (
        <Box className={style.containerGraph}>
          <Box className={style.graphContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={15}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey="value" tick={Values} axisLine={axisLine}/>
                <Tooltip
                  wrapperStyle={{
                    // height: "100px",
                    // overflowY: "auto",
                    zIndex: 1,
                    pointerEvents: "auto",
                  }}
                />
                {/* <Legend /> */}

                {dataKeys && dataKeys?.length ? (
                  dataKeys.map((item) => {
                    return (
                      <>
                        <Bar
                          barSize={mobile ? 20 : 40}
                          dataKey={item.key}
                          stackId="a"
                          fill={item.fill}
                        />
                        ;
                      </>
                    );
                  })
                ) : (
                  <Bar
                    barSize={mobile ? 20 : 40}
                    dataKey="value"
                    fill={barColor ?? "#00AB55"}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      ) : (
        <Box className={style.noData}>
          <NoDataAvailable />
        </Box>
      )}{" "}
    </>
  );
};

export default BarGraphCard;

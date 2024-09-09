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

const BarGraphPercentage = (props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const { data, barColor, dataKeys } = props;

const total = data.reduce((acc, entry) => acc + entry.value, 0);
const formatYAxisTick = (value) => `${Math.round((value / total) * 100)}%`;
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
                <YAxis dataKey="value" axisLine={false} tickFormatter={formatYAxisTick} />
                <Tooltip
                  wrapperStyle={{
                    zIndex: 1,
                    pointerEvents: "auto",
                  }}
                />

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

export default BarGraphPercentage;

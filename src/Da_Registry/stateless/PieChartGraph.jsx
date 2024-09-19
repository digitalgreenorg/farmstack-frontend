import React, { useContext } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
// @ts-ignore
import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts"; // Import Tooltip from Recharts
import style from "./PieChartGraph.module.css";
import NoDataAvailable from "./NoData";
import { Col, Row } from "react-bootstrap";
import FarmStackContext from "features/default/src/Components/Contexts/FarmStackContext";
import LoadingForCards from "./LoadingForCards";

// @ts-ignore
const PieChartGraph = (props) => {
  const { maxHeight, data, dataKey, dataValue } = props;
  // const { isDaBySpecializationLoading } = useContext(FarmStackContext);

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
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        fontSize={14}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {/* {`${(percent * 100).toFixed(0)}%`} */}
        {Math.round(percent * 100) == 0
          ? `${(percent * 100).toFixed(3)}%`
          : `${Math.round(percent * 100)}%`}
      </text>
    );
  };
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {data.length > 0 ? (
        <Row className={style.containerGraph}>
          <Col className={style.graphContainer} xs={12} sm={6} md={8} lg={7} xl={8}>
            <PieChart width={600} height={mobile ? 300 : 400}>
              <Pie
                data={data}
                innerRadius={0}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                labelLine
                minAngle={5}
                label={renderCustomizedLabel}
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
                contentStyle={{
                  textAlign: "left",
                  backgroundColor: "white",
                }}
                formatter={(value) => `${value} units`} // Format tooltip value
              /> 
            </PieChart>
          </Col>
          <Col
            className={style.textContainer}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={2}                 
            style={{
              overflowY: data.length > 15 ? "auto" : "visible",
            }}>
            <div>
              {data.map((entry, index) => (
                <div className={style.labelRow} key={`label-${index}`}>
                  <span
                    className={style.colorBox}
                    style={{
                      backgroundColor: colours[index % colours.length],
                    }}></span>
                  <span className={style.labelText}>{entry.name}</span>
                  <span
                    style={{ marginLeft: "0px" }}
                    className={style.percentageText}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "130px",
                      }}>
                      <div
                        style={{
                          width: "50%",
                          textAlign: "left",
                        }}>
                        {total !== 0
                          ? Math.round((entry.value / total) * 100) == 0
                            ? `${((entry.value / total) * 100).toFixed(3)}%`
                            : `${Math.round((entry.value / total) * 100)}%`
                          : "0%"}
                      </div>
                      <div
                        style={{
                          width: "50%",

                          textAlign: "left",
                        }}>{`( ${entry.value.toLocaleString()} )`}</div>
                    </div>
                  </span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      ) : (
        <Box className={style.noData}>
          {/* {isDaBySpecializationLoading ? <LoadingForCards /> : <NoDataAvailable />} */}

          <NoDataAvailable />
        </Box>
      )}
    </>
  );
};

export default PieChartGraph;

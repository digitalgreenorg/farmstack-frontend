import React, { useContext } from "react";
import { Box } from "@mui/material";
// @ts-ignore
import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts"; // Import Tooltip from Recharts
import style from "./CardWithMultiValueGraph.module.css";
import CustomText from "Farmer-Registry/CustomText/CustomText";
import NoDataAvailable from "./NoData";
import { FarmStackContext } from "features/default/src/Components/Contexts/FarmStackContext";
import LoadingForCards from "./LoadingForCards";

// @ts-ignore
const CardWithMultiValueGraph = (props) => {
  const { maxHeight, data, dataKey, dataValue } = props;
  // const { isLoading } = useContext(FarmStackContext);

  // @ts-ignore
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

  // const modifiedDataFun = () => {
  //   let tmpModifiedData = [];

  //   if (data?.length) {
  //     data.forEach((item: any) => {
  //       tmpModifiedData.push({
  //         name: item[dataKey],
  //         value: item[dataValue],
  //       });
  //     });
  //   }
  //   console.log(
  //     "🚀 ~ file: ChartWithMultiValueGraph.tsx:28 ~ modifiedDataFun ~ tmpModifiedData:",
  //     tmpModifiedData,
  //     data?.length
  //   );
  //   setModifiedData(tmpModifiedData);
  // };

  // useEffect(() => {
  //   console.log("useEffect 123", maxHeight);
  //   modifiedDataFun();
  // }, [data]);

  const totalValue = data.reduce((total, item) => total + item.value, 0);

  return (
    <>
      <Box sx={{ maxHeight: maxHeight }} className={style.container}>
        {data?.[0]?.value ? (
          <>
            <div className={style.graphContainer}>
              <PieChart width={80} height={110}>
                <Pie
                  data={data}
                  cx={40}
                  cy={55}
                  innerRadius={25}
                  outerRadius={35}
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
            <div
              className={`${style.textContainer_card} ${
                data.length > 3 ? style.overflowAuto : ""
              }`}
            >
              <CustomText
                size={"16px"}
                weight={400}
                value={"DAs by region"}
                color={"#000000"}
                className={style.title}
              />
              {data.map((entry, index) => (
                <div className={style.labelRow} key={`label-${index}`}>
                  <span
                    className={style.colorBox}
                    style={{ backgroundColor: colours[index % colours.length] }}
                  ></span>
                  <span className={style.labelText}>{entry.name}</span>
                  <span className={style.percentageText + " ms-auto"}>
                    {totalValue !== 0
                      ? `${((entry.value / totalValue) * 100).toFixed(0)}%`
                      : ""}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          // <>{isLoading ? <LoadingForCards /> : <NoDataAvailable />}</>
          <NoDataAvailable />
        )}
      </Box>
    </>
  );
};

export default CardWithMultiValueGraph;

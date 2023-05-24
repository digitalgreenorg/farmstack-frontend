import React, { useRef, useEffect } from "react";
import { Box } from "@mui/system";
import localStyle from "./customGraph.module.css";
import Chart from "chart.js/auto";
// import "chart.js/auto/Chart.css";

function CustomGraph(props) {
  const { title, data, chartType } = props;
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  console.log("data in graph", title, data);

  useEffect(() => {
    if (chartContainer.current) {
      // Destroy the previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create the new pie chart
      const ctx = chartContainer.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: chartType,
        data: typeof data != Number ? data : {},
        options: {
          plugins: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 20, // Adjust the width as needed
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <Box
      className={
        chartType == "bar"
          ? `${localStyle.barChartContainer}`
          : `${localStyle.container}`
      }
    >
      <div className={`${localStyle.title}`}>
        <p>{title}</p>

        <div>
          <canvas ref={chartContainer}></canvas>
        </div>
      </div>
    </Box>
  );
}

export default CustomGraph;

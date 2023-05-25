import React, { useRef, useEffect } from "react";
import { Box } from "@mui/system";
import localStyle from "./customGraph.module.css";
import Chart from "chart.js/auto";
import { Tooltip } from "@material-ui/core";

// import "chart.js/auto/Chart.css";

function CustomGraph(props) {
  const { title, data, chartType } = props;
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  console.log("data in graph", title, data);

  // Configure the chart options

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
          hover: {
            mode: "nearest",
            intersect: true,
            axis: "x", // Customize based on the desired axis
            animationDuration: 400,
          },
          // ...existing plugins

          // Configure label options on hover

          plugins: {
            legend: {
              position: "right",
              display: chartType != "bar" ?? true,
              labels: {
                boxWidth: 10, // Adjust the width as needed
                // fontSize: 100,
                font: {
                  size: 14,
                },
              },
            },
            // title: {
            //   display: true,
            //   font: {
            //     size: 50, // Increase the font size as desired
            //   },
            // },

            hover: {
              mode: "nearest",
              intersect: true,
              axis: "x", // Customize based on the desired axis
              animationDuration: 400,
            },
            tooltip: {
              enabled: false,
              mode: "custom",
              position: "nearest",
              external: (
                <Tooltip style={{ height: "200px !important" }} title="Delete">
                  dsfgkjhbdsjkfjkhsdhjkfhjas
                </Tooltip>
              ),
              intersect: false,
              callbacks: {
                label: (context) => context.label,
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
          {data?.datasets?.[0]?.data ? (
            <canvas ref={chartContainer}></canvas>
          ) : (
            <>
              <h2>No dataset</h2>
            </>
          )}
        </div>
      </div>
    </Box>
  );
}

export default CustomGraph;

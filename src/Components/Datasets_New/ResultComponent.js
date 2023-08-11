import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// Helper function to count occurrences of a specific value in the Data array for a given column name

const ResultComponent = ({
  measures,
  OnCreateMeasure,
  title,
  selectedRows,
  setSum,
  sum,
  Data
}) => {
  // Declare and initialize the selectedRows variable here

  useEffect(() => {
    const filterData = (row) => {
      if (row.operator === "Equal to") {
        return Data.data.content.filter((item) => item[row.columnName] === row.value);
      } else if (row.operator === "Less than") {
        return Data.data.content.filter(
          (item) => Number(item[row.columnName]) < Number(row.value)
        );
      } else if (row.operator === "Greater than") {
        return Data.data.content.filter(
          (item) => Number(item[row.columnName]) > Number(row.value)
        );
      }
      return [];
    };
    
  
    // Calculate the sum when the component mounts or when rows or selectedRowIds change
    let calculatedSum = 0;
  
    selectedRows.forEach((row) => {
      const filteredData = filterData(row);
      calculatedSum += filteredData.length;
    });
  
    // Update the state with the calculated sum
    setSum(calculatedSum);
  }, [selectedRows, setSum, Data]);
  // Add selectedRows as a dependency

  const history = useHistory();
  const handleMClick = () => {
    // Here, you can navigate to the AllMeasuresPage when Measures is clicked
    history.push({
      pathname: "/allmeasures",
      state: Data
    });
    console.log(Data);
  };
  console.log(Data);

  return (
    <div>
      <h3 onClick={handleMClick} style={{ cursor: "pointer" }}>
        Measures-
      </h3>
    </div>
  );
};

export default ResultComponent;

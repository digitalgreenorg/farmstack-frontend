import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ResultComponent = ({
  selectedRows,
  setSum,
  Data
}) => {
  

  useEffect(() => {
    const filterData = (row) => {
      let numericValue = row.value;
      
      if (!isNaN(row.value)) {
        numericValue = parseFloat(row.value);
      }   

      if (row.operator === "Equal to") {
        return Data.data.content.filter((item) => item[row.columnName] === numericValue);
      } else if (row.operator === "Less than") {
        return Data.data.content.filter(
          (item) => Number(item[row.columnName]) < numericValue
        );
      } else if (row.operator === "Greater than") {
        return Data.data.content.filter(
          (item) => Number(item[row.columnName]) > numericValue
        );
      }
      return [];
    };
   
    let calculatedSum = 0;
 
    selectedRows.forEach((row) => {
      const filteredData = filterData(row);
      calculatedSum += filteredData.length;
    });
 
    setSum(calculatedSum);
  }, [selectedRows, setSum, Data]);


  const history = useHistory();
  const handleMClick = () => {
    history.push({
      pathname: "/allmeasures",
      state: Data
    });
  };


  return (
    <div>
      <h3 onClick={handleMClick} 
      style={{ 
        cursor: "pointer",
        color:"#445069",
        padding:"10px",
        border:"2px solid #ccc",
        borderRadius:"10px",
        marginBottom:"15px"
      }}>
        Measures-
      </h3>
    </div>
  );
};


export default ResultComponent;
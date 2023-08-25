import React, { useState} from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { FormControl, Select, MenuItem } from '@mui/material';
import NumberCard from "./NumberCard";


const ChartComponent = ({draggedMeasureIdx,measures,Data,editedSum}) => {

  var ChartMeasure=(measures[draggedMeasureIdx.index]);

  const editedkey = Object.keys(editedSum.editedSum)[0];
  const draggedkey=ChartMeasure.id;

  const sum= (Number(editedkey)===Number(draggedkey)) ? 
  (editedSum.editedSum[editedkey]) : (ChartMeasure.sum);
  const selectedRows=ChartMeasure.selectedRows;
  const Title=ChartMeasure.title;
  
  const [chartType, setChartType] = useState('numeric');

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
  };


  const labels = selectedRows
  ? selectedRows.map((row) => [row.columnName, row.operator, row.value].join(' '))
  : [];


  var calculatedVal=0;


  const data = {
    labels: labels,
    datasets: [
      {
        label: Title,
        data: selectedRows
          ? selectedRows.map((selectedRow) => {
            const filteredData = filterData(selectedRow);
            calculatedVal = filteredData.length;
            return calculatedVal ? calculatedVal : 0;
            })
          : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
 


  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };


  const renderChart = () => {
    switch (chartType) {
      case 'numeric':
        return <NumberCard title={Title} sum={sum}/>
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'line':
        return <Line data={data} options={options} />;
      default:
        return null;
    }
  };


  return (
    <div>
      <div>
        <FormControl>
          <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <MenuItem value="numeric">Number Metric</MenuItem>
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="pie">Pie Chart</MenuItem>
            <MenuItem value="line">Line Chart</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ width: '100%', margin: '20px auto', padding:"5px"}}>
        {renderChart()}
      </div>
    </div>
  );
};


export default ChartComponent;
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Line,
} from "recharts";
import {
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import style from "./index.module.css";
import globalStyle from "../../../Assets/CSS/global.module.css";
import FarmerDemographics from "./stateless/FarmerDemography";
import WaterSource from "./stateless/WaterSource";
import InsuranceInformations from "./stateless/InsuranceInformation";
import MyMap from "./stateless/GoogleMap";

const Dashboard = () => {
  const [dataSource, setDataSource] = useState("");
  const [county, setCounty] = useState("");
  const [kcsapBeneficiary, setKcsapBeneficiary] = useState("");
  const [gender, setGender] = useState("");
  const [primaryValueChain, setPrimaryValueChain] = useState("");

  const handleApplyFilter = () => {};

  const handleClearFilter = () => {
    setDataSource("");
    setCounty("");
    setKcsapBeneficiary("");
    setGender("");
    setPrimaryValueChain("");
  };
  const livestockData = [
    { category: "Cattle", value: 120 },
    { category: "Sheep", value: 80 },
    { category: "Chickens", value: 250 },
    { category: "Pigs", value: 150 },
  ];

  const financialData = [
    { category: "January", value: 250 },
    { category: "February", value: 300 },
    { category: "March", value: 280 },
    // Add more financial data here
  ];

  const fertilisersData = [
    { category: "DAP", value: 80 },
    { category: "NPK", value: 30 },
    { category: "SSP", value: 50 },
    { category: "CAN", value: 20 },
    { category: "Urea", value: 90 },
    { category: "Others", value: 5 },
    // Add more fertilizers data here
  ];

  const populerFertilisers = [
    {
      name: "Crop production 6794",
      uv: 6794,
      pv: 4567,
      fill: "#00AB55",
    },
    {
      name: "livestock production 794",
      uv: 794,
      pv: 1398,
      fill: "#3366FF",
    },
  ];

  const chartStyle = {
    margin: "20px 0",
    // padding: "10px 0",
    // border: "1px solid #e2e2e2",
  };

  const barStyle = {
    width: "20px",
  };

  const livestockColors = ["#00AB55", "#3366FF", "#9747FF", "#DB5126"];
  const financialColors = ["#00AB55", "#3366FF", "#9747FF", "#DB5126"];
  const fertilisersColors = [
    "#00AB55",
    "#3366FF",
    "#9747FF",
    "#DB5126",
    "#D3008D",
  ];

  return (
    <>
      <div className={style.root}>
        <Typography className={style.title} variant="h6">
          Farmer Profile Dataset
        </Typography>
        <div className={style.filterContainer}>
          <FormControl sx={{ minWidth: 190 }} className={style.formControl}>
            <InputLabel>Data Source</InputLabel>
            <Select
              value={dataSource}
              onChange={(e) => setDataSource(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Source 1">Source 1</MenuItem>
              <MenuItem value="Source 2">Source 2</MenuItem>
              {/* Add more options */}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 190 }} className={style.formControl}>
            <InputLabel>County</InputLabel>
            <Select value={county} onChange={(e) => setCounty(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="County 1">County 1</MenuItem>
              <MenuItem value="County 2">County 2</MenuItem>
              {/* Add more options */}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 190 }} className={style.formControl}>
            <InputLabel>KCSAP Beneficiary</InputLabel>
            <Select
              value={kcsapBeneficiary}
              onChange={(e) => setKcsapBeneficiary(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
              {/* Add more options */}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 190 }} className={style.formControl}>
            <InputLabel>Gender</InputLabel>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              {/* Add more options */}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 190 }} className={style.formControl}>
            <InputLabel>Primary Value Chain</InputLabel>
            <Select
              value={primaryValueChain}
              onChange={(e) => setPrimaryValueChain(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Value Chain 1">Value Chain 1</MenuItem>
              <MenuItem value="Value Chain 2">Value Chain 2</MenuItem>
              {/* Add more options */}
            </Select>
          </FormControl>
          <Button
            className={`${style.primary_button} ${globalStyle.primary_button}`}
            onClick={handleApplyFilter}
          >
            Apply Filter
          </Button>
          <Button
            className={`${style.outlined_button} ${globalStyle.outlined_button}`}
            onClick={handleClearFilter}
          >
            Clear Filter
          </Button>
        </div>

        <FarmerDemographics
          records={1234}
          female={567}
          male={789}
          counties={12}
          subCounties={34}
          constituencies={56}
        />
        <div className={`${style.mainGraphContainer}`}>
          <div className={`${style.graphContainer}`}>
            <Typography className={`${style.ghraphTitle}`}>
              Livestock & Poultry Production
            </Typography>
            <div className={style.graph}>
              <RadialBarChart
                width={400}
                height={240}
                cx={120}
                cy={120}
                innerRadius={60}
                outerRadius={80}
                barSize={9}
                data={populerFertilisers}
              >
                <RadialBar
                  minAngle={15}
                  label={{ position: "insideStart", fill: "#fff" }}
                  background
                  clockWise
                  dataKey="uv"
                />
                <Legend
                  iconSize={10}
                  width={150}
                  height={170}
                  layout="horizontal"
                  align="right"
                />
              </RadialBarChart>
            </div>
          </div>
          {/* Livestock & Poultry Production Bar Chart */}
          <div className={`${style.graphContainer}`}>
            <Typography className={`${style.ghraphTitle}`}>
              Livestock & Poultry Production
            </Typography>
            <div className={style.graph}>
              <BarChart
                width={450}
                height={200}
                data={livestockData}
                style={chartStyle}
              >
                <CartesianGrid />
                <XAxis axisLine={false} dataKey="category" />
                <YAxis axisLine={false} />
                <Tooltip />
                {/* <Legend /> */}

                <Bar dataKey="value" style={barStyle} barSize={10} radius={50}>
                  {livestockData.map((entry, index) => {
                    return <Cell fill={livestockColors[index]} />;
                  })}
                </Bar>
              </BarChart>
            </div>
          </div>

          {/* Financial Livelihood Bar Chart */}
          <div className={`${style.graphContainer}`}>
            <Typography className={`${style.ghraphTitle}`}>
              Financial Livelihood
            </Typography>
            <div className={style.graph}>
              <BarChart
                width={400}
                height={200}
                data={financialData}
                style={chartStyle}
              >
                <CartesianGrid />
                <XAxis axisLine={false} dataKey="category" />
                <YAxis axisLine={false} />
                <Tooltip />
                {/* <Legend /> */}
                <Bar
                  dataKey="value"
                  fill={(entry, index) => financialColors[index]}
                  style={barStyle}
                  barSize={10}
                  radius={50}
                >
                  {financialData.map((entry, index) => {
                    return <Cell fill={financialColors[index]} />;
                  })}
                </Bar>
              </BarChart>
            </div>
          </div>
        </div>
        <div className={`${style.mainGraphContainer}`}>
          <div className={`${style.mainGraphContainer}`}>
            <div>
              <WaterSource
                boreWell={120045}
                irrigation={234553}
                rainWater={2467876}
              />
              <InsuranceInformations
                insuredCorps={120045}
                insuredMachineries={234553}
              />
            </div>
            {/* Popular Fertilisers Used Bar Chart */}
            <div className={`${style.graphContainer}`}>
              <Typography className={`${style.ghraphTitle}`}>
                Popular Fertilisers Used
              </Typography>
              <div className={style.graph}>
                <BarChart
                  width={550}
                  height={200}
                  data={fertilisersData}
                  style={chartStyle}
                >
                  <CartesianGrid />
                  <XAxis axisLine={false} dataKey="category" />
                  <YAxis axisLine={false} />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar
                    dataKey="value"
                    style={barStyle}
                    barSize={10}
                    radius={50}
                  >
                    {fertilisersData.map((entry, index) => {
                      return <Cell fill={fertilisersColors[index]} />;
                    })}
                  </Bar>
                </BarChart>
              </div>
            </div>
            <div>
              <Typography className={`${style.ghraphTitle}`}>
                Geographic Information
              </Typography>
              <MyMap />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

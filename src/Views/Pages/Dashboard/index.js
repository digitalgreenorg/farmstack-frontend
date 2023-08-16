import React, { useEffect, useState, useContext } from "react";
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
import HTTPService from "../../../Services/HTTPService";
import UrlConstant from "../../../Constants/UrlConstants";
import FarmStackProvider, {
  FarmStackContext,
} from "../../../Components/Contexts/FarmStackContext";
import { useHistory, useParams } from "react-router-dom";
import { GetErrorHandlingRoute } from "../../../Utils/Common";
import { Col, Row } from "react-bootstrap";

const Dashboard = () => {
  const [dataSource, setDataSource] = useState("");
  const [county, setCounty] = useState("");
  const [kcsapBeneficiary, setKcsapBeneficiary] = useState("");
  const [gender, setGender] = useState("");
  const [primaryValueChain, setPrimaryValueChain] = useState("");
  const [dashboardData, setDashboardData] = useState({});
  const [farmingPractices, setFarmingPractices] = useState([]);
  const [livestockAndPoultryProduction, setLivestockAndPoultryProduction] =
    useState([]);
  const [financialLivelhood, setFinancialLivelhood] = useState([]);
  const [populerFertilisers, setPopulerFertilisers] = useState([]);

  const { callLoader, callToast } = useContext(FarmStackContext);
  const history = useHistory();
  const { datasetid } = useParams();

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

  // const populerFertilisers = [
  //   {
  //     name: "",
  //     value: 8794,
  //     // pv: 4567,
  //     fill: "#fff",
  //   },

  //   {
  //     name: "Crop production 6794",
  //     value: 6794,
  //     // pv: 4567,
  //     fill: "#00AB55",
  //   },
  // ];

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

  const getDashboardForDataset = (id) => {
    // let id = "43da7c4e-6bfc-4224-98c4-a0c1da0ae61f"
    callLoader(true);
    let url =
      UrlConstant.base_url +
      UrlConstant.get_dashboard_for_dataset +
      id +
      "/get_dashboard_chart_data/";

    HTTPService("GET", url, false, false, true)
      .then((response) => {
        console.log("🚀 ~ file: index.js:122 ~ .then ~ response:", response);
        callLoader(false);
        setDashboardData(response?.data);
      })
      .catch(async (e) => {
        console.log("🚀 ~ file: DashboardNew.js:44 ~ getDashboard ~ e:", e);
        callLoader(false);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        // console.log(e);
        if (error.toast) {
          callToast(
            error?.message || "Something went wrong",
            error?.status === 200 ? "success" : "error",
            true
          );
        }
        console.log("error", error);
        if (error.path) {
          history.push(error.path);
        }
      });
  };

  const modifyFarmingPracticesData = () => {
    // expected data format

    // {
    //   name: "name",
    //   value: 6794,
    //   fill: "#00AB55",
    // },
    let allKey = dashboardData?.farming_practices
      ? Object.keys(dashboardData.farming_practices)
      : [];
    let tmpFarmingData = [
      {
        name: "",
        value: 150557,
        fill: "#fff",
      },
    ];
    const colors = ["#00AB55", "#3366FF", "#9747FF", "#DB5126"];
    let index = 0;
    for (let i in allKey) {
      let key = allKey[i];
      let obj = {};
      try {
        obj["name"] = key;
        obj["value"] = dashboardData?.farming_practices?.[key] || 0;
        obj["fill"] = colors[index];
        index++;
      } catch {
        // callToast("error","Something ")
      }
      tmpFarmingData.push(obj);
    }
    setFarmingPractices([...tmpFarmingData]);
  };

  const modifyLiveStockAndPoultry = () => {
    let allKeys = dashboardData?.livestock_and_poultry_production
      ? Object.keys(dashboardData.livestock_and_poultry_production)
      : [];
    console.log(
      "🚀 ~ file: index.js:207 ~ modifyLiveStockAndPoultry ~ allKeys:",
      allKeys
    );
    // expected data format

    // [{ category: "Cattle", value: 120 },]
    if (dashboardData?.livestock_and_poultry_production) {
      var tmpLivestockAndPoultryProduction = [];
      for (let i in allKeys) {
        let obj = {};
        obj["category"] = allKeys[i];
        obj["value"] =
          dashboardData?.livestock_and_poultry_production[allKeys[i]];
        console.log(
          "🚀 ~ file: index.js:216 ~ modifyLiveStockAndPoultry ~ obj:",
          obj
        );
        tmpLivestockAndPoultryProduction.push(obj);
      }
      setLivestockAndPoultryProduction([...tmpLivestockAndPoultryProduction]);
    }
  };
  const modifyFinancialLivelhood = () => {
    let allKeys = dashboardData?.financial_livelihood
      ? Object.keys(dashboardData.financial_livelihood)
      : [];

    // expected data format
    // [{ category: "Cattle", value: 120 },]

    if (dashboardData?.financial_livelihood) {
      var tmpFinancialLivelhood = [];
      for (let i in allKeys) {
        let obj = {};
        obj["category"] = allKeys[i];
        obj["value"] = dashboardData?.financial_livelihood[allKeys[i]];
        console.log(
          "🚀 ~ file: index.js:216 ~ modifyLiveStockAndPoultry ~ obj:",
          obj
        );
        tmpFinancialLivelhood.push(obj);
      }
      setFinancialLivelhood([...tmpFinancialLivelhood]);
    }
  };
  const modifyPopulerFertilisers = () => {
    let allKeys = dashboardData?.popular_fertilizer_user
      ? Object.keys(dashboardData.popular_fertilizer_user)
      : [];

    // expected data format
    // [{ category: "Cattle", value: 120 },]

    if (dashboardData?.popular_fertilizer_user) {
      let tmpPopularFertilisers = [];
      for (let i in allKeys) {
        let obj = {};
        obj["category"] = allKeys[i];
        obj["value"] = dashboardData?.popular_fertilizer_user[allKeys[i]];

        tmpPopularFertilisers.push(obj);
      }
      setPopulerFertilisers([...tmpPopularFertilisers]);
    }
  };

  useEffect(() => {
    let id = "c6552c05-0ada-4522-b584-71e26286a2e3";
    // datasetid
    getDashboardForDataset(id);
  }, []);

  useEffect(() => {
    modifyFarmingPracticesData();
    modifyLiveStockAndPoultry();
    modifyFinancialLivelhood();
    modifyPopulerFertilisers();
  }, [dashboardData]);

  return (
    <>
      <div className={style.root}>
        <div className={style.filterContainer}>
          <Row>
            <Col className={style.padding0} sm={12} md={12} lg={12}>
              <FormControl
                size="small"
                sx={{ minWidth: 190 }}
                className={style.formControl}
              >
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

              <FormControl
                size="small"
                sx={{ minWidth: 190 }}
                className={style.formControl}
              >
                <InputLabel>County</InputLabel>
                <Select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="County 1">County 1</MenuItem>
                  <MenuItem value="County 2">County 2</MenuItem>
                  {/* Add more options */}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{ minWidth: 190 }}
                className={style.formControl}
              >
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

              <FormControl
                size="small"
                sx={{ minWidth: 190 }}
                className={style.formControl}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  {/* Add more options */}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{ minWidth: 190 }}
                className={style.formControl}
              >
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
              {/* </Col>
            <Col className={style.padding0} sm={3} md={3} lg={3}> */}
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
            </Col>
          </Row>
        </div>
        <div>
          <FarmerDemographics
            records={dashboardData?.total_no_of_records || 0}
            female={dashboardData?.female_count || 0}
            male={dashboardData?.male_count || 0}
            counties={dashboardData?.counties || 0}
            subCounties={dashboardData?.sub_counties || 0}
            constituencies={dashboardData?.constituencies || 0}
          />
        </div>
        <div
          className={`${style.mainGraphContainer} ${style.graphAndDataContainer}`}
        >
          {/* Water source and Insurance Information data */}
          <div>
            <WaterSource
              boreWell={dashboardData?.water_sources?.borewell ?? 0}
              irrigation={dashboardData?.water_sources?.irrigation ?? 0}
              rainWater={dashboardData?.water_sources?.rainwater ?? 0}
            />
            <InsuranceInformations
              insuredCorps={
                dashboardData?.insurance_information?.insured_crops ?? 0
              }
              insuredMachineries={
                dashboardData?.insurance_information?.insured_machinery ?? 0
              }
            />
          </div>
          <div className={`${style.graphContainer}`}>
            <Typography className={`${style.ghraphTitle}`}>
              Farming Practices
            </Typography>
            <div className={`${style.graph} ${style.radialGraph}`}>
              <ResponsiveContainer width="100%" height={250}>
                <RadialBarChart
                  width={400}
                  height={240}
                  cx={100}
                  cy={120}
                  innerRadius={60}
                  outerRadius={80}
                  barSize={100}
                  data={farmingPractices}
                >
                  <RadialBar
                    radius={20}
                    minAngle={15}
                    background
                    clockWise
                    dataKey="value"
                  />
                  <Legend
                    iconSize={10}
                    width={195}
                    height={170}
                    // layout="horizontal"
                    // align="left"
                    layout="horizontal"
                    align="right"
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <Typography className={`${style.ghraphTitle}`}>
              Geographic Information
            </Typography>
            <MyMap />
          </div>
        </div>
        <Row className={`${style.mainGraphContainer}`}>
          {/* <div className={`${style.mainGraphContainer}`}> */}
          <Col
            sm={12}
            xs={12}
            md={12}
            lg={6}
            xl={6}
            className={`${style.graphContainer}`}
          >
            <Typography className={`${style.ghraphTitle}`}>
              Livestock & Poultry Production
            </Typography>
            <div className={style.graph}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  width={600}
                  height={200}
                  data={livestockAndPoultryProduction}
                  style={chartStyle}
                  margin={{ top: 5, right: 5, bottom: 5, left: 20 }}
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
                    {livestockData.map((entry, index) => {
                      return <Cell fill={livestockColors[index]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>

          {/* Financial Livelihood Bar Chart */}
          <Col
            sm={12}
            xs={12}
            md={12}
            lg={6}
            xl={6}
            className={`${style.graphContainer}`}
          >
            <Typography className={`${style.ghraphTitle}`}>
              Financial Livelihood
            </Typography>
            <div className={style.graph}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  width={600}
                  height={200}
                  style={chartStyle}
                  data={financialLivelhood}
                >
                  <CartesianGrid />
                  <XAxis axisLine={false} dataKey="category" />
                  <YAxis axisLine={false} />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill={(entry, index) => financialColors[index]}
                    barSize={10}
                    radius={50}
                  >
                    {financialData.map((entry, index) => {
                      return <Cell fill={financialColors[index]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
          {/* Popular Fertilisers Used Bar Chart */}
          <Col
            sm={12}
            xs={12}
            md={12}
            lg={6}
            xl={6}
            className={`${style.graphContainer}`}
          >
            <Typography className={`${style.ghraphTitle}`}>
              Popular Fertilisers Used
            </Typography>
            <div className={style.graph}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  width={600}
                  height={200}
                  data={populerFertilisers}
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
                    {populerFertilisers.map((entry, index) => {
                      return <Cell fill={fertilisersColors[index]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
        {/* </div> */}
      </div>
    </>
  );
};

export default Dashboard;

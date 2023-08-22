import React, { useEffect, useState, useContext, useCallback } from "react";
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
  PieChart,
  Pie,
  Sector,
  Text,
} from "recharts";
import {
  Typography,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Select,
  Chip,
  Box,
} from "@mui/material";
import { Transition } from "react-transition-group";
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
import EmptyFile from "../../../Components/Datasets_New/TabComponents/EmptyFile";
// import { Select } from "@material-ui/core";

const Dashboard = (props) => {
  const [county, setCounty] = useState(["BUSIA"]);
  const [gender, setGender] = useState("");
  const [valueChain, setValueChain] = useState([]);
  const [allValueChain, setAllValueChain] = useState([
    "Maize",
    "Avocados",
    "Bananas",
  ]);
  const [dashboardData, setDashboardData] = useState({});
  const [farmingPractices, setFarmingPractices] = useState([]);
  const [livestockAndPoultryProduction, setLivestockAndPoultryProduction] =
    useState([]);
  console.log(
    "🚀 ~ file: index.js:62 ~ livestockAndPoultryProduction:",
    livestockAndPoultryProduction
  );
  const [financialLivelhood, setFinancialLivelhood] = useState([]);
  const [populerFertilisers, setPopulerFertilisers] = useState([]);
  const [femaleAndMaleFarmerCount, setFemaleAndMaleFarmerCount] = useState([
    {
      category: "Male",
      value: 0,
    },
    {
      category: "Female",
      value: 0,
    },
  ]);
  const [farmerInSubCounty, setFarmerInSubCounty] = useState([
    {
      name: "A",
      male: 4000,
      female: 2400,
      amt: 2400,
    },
    {
      name: "B",
      male: 3000,
      female: 1398,
      amt: 2210,
    },
    {
      name: "C",
      male: 2000,
      female: 9800,
      amt: 2290,
    },
    {
      name: "D",
      male: 2780,
      female: 3908,
      amt: 2000,
    },
    {
      name: "E",
      male: 1890,
      female: 4800,
      amt: 2181,
    },
    {
      name: "F",
      male: 2390,
      female: 3800,
      amt: 2500,
    },
    {
      name: "G",
      male: 3490,
      female: 4300,
      amt: 2100,
    },
  ]);
  const [farmerBasedOnEducationLevel, setFarmerBasedOnEducationLevel] =
    useState([]);
  const [allCounty, setAllCounty] = useState(["BUSIA"]);
  const [allSubCounties, setAllSubCounties] = useState([
    "BUNYALA",
    "BUSIA",
    "BUTULA",
    "NAMBALE",
    "SAMIA",
    "TESO NORTH",
    "TESO SOUTH",
  ]);
  const [subCounties, setSubCounties] = useState([]);
  const [filterCounty, setFilterCounty] = useState("");
  const [activeIndex, setActiveIndex] = useState({
    "Livestock & Poultry Production": null,
    "Female & Male Farmer": null,
    "Financial Livelihood": null,
  });
  // if (filter == "county") {
  //   setCounty([...value]);
  // }
  // if (filter == "sub_counties") {
  //   setSubCounties(value);
  // }
  // if (filter == "value_chain")
  const [selectAll, setSelectAll] = useState({
    county: false,
    sub_counties: false,
    value_chain: false,
  });

  const { callLoader, callToast, selectedFileDetails } =
    useContext(FarmStackContext);

  const [notAvailableMessage, setNotAvailableMessage] = useState("");
  const history = useHistory();

  const onMouseOver = useCallback((data, index, title) => {
    setActiveIndex({ ...activeIndex, [title]: index });
    // setTimeout(() => {
    //   // setActiveIndex({ ...activeIndex, [title]: null });
    // }, 2000);
    console.log("mouse hover");
  }, []);
  const onMouseLeave = useCallback((data, index, title) => {
    console.log("mouse leave");
    setActiveIndex({ ...activeIndex, [title]: null });
  }, []);
  const handleApplyFilter = () => {
    getDashboardForDataset(true);
  };

  const handleClearFilter = () => {
    setCounty(["BUSIA"]);
    setGender("");
    setValueChain([]);
    setSubCounties([]);
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
    "#0088FE",
    "#00C49F",
    "#00AB55",
    "#3366FF",
    "#9747FF",
    "#DB5126",
    "#D3008D",
  ];

  const RADIAN = Math.PI / 180;

  // const AnimatedRect = motion.rect; // Wrap rect component with motion
  // const AnimatedSector = motion.path; // Wrap path component with motion

  const [animationProps, setAnimationProps] = useState({ outerRadius: 0 });

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      startAngle,
      endAngle,
      midAngle,
      outerRadius,
      fill,
      active,
      category,
    } = props;
    console.log("🚀 ~ file: index.js:147 ~ renderActiveShape ~ props:", props);
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (animationProps.outerRadius + 1) * cos;
    const sy = cy + (animationProps.outerRadius + 1) * sin;

    // const radiusOffset = active ? 10 : 0; // Offset for radius to keep the sector within the UI
    // const sin = Math.sin(-RADIAN * midAngle);
    // const cos = Math.cos(-RADIAN * midAngle);
    // const scaledOuterRadius = animationProps.outerRadius + radiusOffset;
    // const sx = Math.max(
    //   scaledOuterRadius,
    //   Math.min(cx + scaledOuterRadius * cos, 100)
    // );
    // const sy = Math.max(
    //   scaledOuterRadius,
    //   Math.min(cy + scaledOuterRadius * sin, 100)
    // );
    let customClassName =
      category == "Male" ? style.animatedSectorDown : style.animatedSector;
    return (
      <Sector
        className={customClassName}
        cx={sx}
        cy={sy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          filter: `drop-shadow(0px 0px 5px ${fill})`,
        }}
      />
    );
  };
  const getDashboardForDataset = (filter) => {
    console.log(
      "🚀 ~ file: index.js:297 ~ getDashboardForDataset ~ filter:",
      filter
    );
    // let id = "43da7c4e-6bfc-4224-98c4-a0c1da0ae61f"
    // let id = "c6552c05-0ada-4522-b584-71e26286a2e3";
    let id = selectedFileDetails.id;
    let url =
      UrlConstant.base_url +
      UrlConstant.get_dashboard_for_dataset +
      id +
      "/get_dashboard_chart_data/";
    let payload = {};
    if (filter) {
      payload["county"] = county;

      if (!selectAll.sub_counties && subCounties?.length > 0) {
        payload["sub_county"] = subCounties;
      }

      if (gender) payload["gender"] = [gender];
      // if (valueChain?.length > 0) payload["value_chain"] = valueChain;
    }
    callLoader(true);
    HTTPService("POST", url, payload, false, true)
      .then((response) => {
        console.log("🚀 ~ file: index.js:122 ~ .then ~ response:", response);
        callLoader(false);
        if (
          typeof response?.data === "object" &&
          !Array.isArray(response?.data) &&
          response?.data !== null
        ) {
          setDashboardData(response?.data);
        } else {
          setNotAvailableMessage(response?.data);
        }
      })
      .catch(async (e) => {
        console.log("🚀 ~ file: DashboardNew.js:44 ~ getDashboard ~ e:", e);
        callLoader(false);
        let error = await GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        console.log(e);
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

  // const modifyFarmingPracticesData = () => {
  //   // expected data format

  //   // {
  //   //   name: "name",
  //   //   value: 6794,
  //   //   fill: "#00AB55",
  //   // },
  //   let allKey = dashboardData?.farming_practices
  //     ? Object.keys(dashboardData.farming_practices)
  //     : [];
  //   let tmpFarmingData = [
  //     {
  //       name: "",
  //       value: 150557,
  //       fill: "#fff",
  //     },
  //   ];
  //   const colors = ["#00AB55", "#3366FF", "#9747FF", "#DB5126"];
  //   let index = 0;
  //   for (let i in allKey) {
  //     let key = allKey[i];
  //     let obj = {};
  //     try {
  //       obj["name"] = key;
  //       obj["value"] = dashboardData?.farming_practices?.[key] || 0;
  //       obj["fill"] = colors[index];
  //       index++;
  //     } catch {
  //       // callToast("error","Something ")
  //     }
  //     tmpFarmingData.push(obj);
  //   }
  //   setFarmingPractices([...tmpFarmingData]);
  // };

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
        obj["category"] = firstLetterCaps(allKeys[i]);
        obj["value"] =
          (dashboardData?.livestock_and_poultry_production[allKeys[i]]?.Male ??
            0) +
          (dashboardData?.livestock_and_poultry_production[allKeys[i]]
            ?.Female ?? 0);
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
        obj["category"] = firstLetterCaps(allKeys[i]);
        obj["value"] =
          (dashboardData?.financial_livelihood[allKeys[i]].Male ?? 0) +
          (dashboardData?.financial_livelihood[allKeys[i]].Female ?? 0);
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
    let allKeys = dashboardData?.popular_fertilizer_used
      ? Object.keys(dashboardData.popular_fertilizer_used)
      : [];

    // expected data format
    // [{ category: "Cattle", value: 120 },]

    if (dashboardData?.popular_fertilizer_used) {
      let tmpPopularFertilisers = [];
      for (let i in allKeys) {
        let obj = {};
        obj["category"] = firstLetterCaps(allKeys[i]);
        obj["value"] =
          (dashboardData?.popular_fertilizer_used[allKeys[i]]?.Male ?? 0) +
          (dashboardData?.popular_fertilizer_used[allKeys[i]]?.Female ?? 0);

        tmpPopularFertilisers.push(obj);
      }
      console.log(
        "🚀 ~ file: index.js:417 ~ modifyPopulerFertilisers ~ tmpPopularFertilisers:",
        tmpPopularFertilisers,
        dashboardData?.popular_fertilizer_used
      );
      setPopulerFertilisers([...tmpPopularFertilisers]);
    }
  };

  const setDataForFemaleAndMaleFarmerCount = () => {
    setFemaleAndMaleFarmerCount([
      {
        category: "Female",
        value: dashboardData?.female_count,
      },
      {
        category: "Male",
        value: dashboardData?.male_count,
      },
    ]);
  };

  const setFarmerDataInSubCounty = () => {
    let allKeys = dashboardData?.sub_county_ratio
      ? Object.keys(dashboardData.sub_county_ratio)
      : [];

    // expected data format
    // [{ category: "Cattle", value: 120 },]

    if (dashboardData?.sub_county_ratio) {
      let tmpSubCountyRatio = [];
      for (let i in allKeys) {
        let obj = {};
        obj["name"] = firstLetterCaps(allKeys[i]);
        obj["Male"] = dashboardData?.sub_county_ratio[allKeys[i]]?.Male;
        obj["Female"] = dashboardData?.sub_county_ratio[allKeys[i]]?.Female;

        tmpSubCountyRatio.push(obj);
      }
      console.log(
        "🚀 ~ file: index.js:417 ~ modifyPopulerFertilisers ~ tmpPopularFertilisers:",
        tmpSubCountyRatio
      );
      setFarmerInSubCounty([...tmpSubCountyRatio]);
    }
  };

  const setEducationLevelData = () => {
    let allKeys = dashboardData?.education_level
      ? Object.keys(dashboardData.education_level)
      : [];

    // expected data format
    // [{ category: "Cattle", value: 120 },]

    if (dashboardData?.education_level) {
      let tmpEducationLevel = [];
      for (let i in allKeys) {
        let obj = {};
        let key =
          allKeys[i]?.length > 15
            ? allKeys[i].slice(0, 13) + "..."
            : allKeys[i];
        obj["name"] = firstLetterCaps(key);
        obj["Male"] = dashboardData?.education_level[allKeys[i]]?.Male;
        obj["Female"] = dashboardData?.education_level[allKeys[i]]?.Female;

        tmpEducationLevel.push(obj);
      }
      console.log(
        "🚀 ~ file: index.js:417 ~ modifyPopulerFertilisers ~ tmpPopularFertilisers:",
        tmpEducationLevel
      );
      setFarmerBasedOnEducationLevel([...tmpEducationLevel]);
    }
  };
  const firstLetterCaps = (text) => {
    return (
      text &&
      `${text}`.charAt(0).toUpperCase() + `${text}`.slice(1, text.length)
    );
  };
  const CustomXAxisTick = ({ x, y, payload }) => {
    if (payload && payload.value) {
      return (
        <Text
          fontSize={"12px"}
          width={"12px"}
          x={x}
          y={y}
          textAnchor="middle"
          verticalAnchor="start"
        >
          {payload.value}
        </Text>
      );
    }
    return null;
  };
  const handleFillter = (filter, value, all, e) => {
    console.log(
      "🚀 ~ file: index.js:544 ~ handleFillter ~ filter, value:",
      filter,
      value,
      all
    );
    if (all) {
      setSelectAll((selectAll) => ({
        ...selectAll,
        [filter]: !selectAll[filter],
      }));
    }
    if (filter == "county") {
      setCounty(value);
    }
    if (filter == "sub_counties") {
      // if (all) {
      //   setSubCounties([]);
      // } else {
      setSubCounties(value);
      // }
    }
    if (filter == "value_chain") {
      // if (all) {
      //   setValueChain([]);
      // } else {
      setValueChain(value);
      // }
    }
    if (filter == "gender") {
      setGender(value);
    }
  };
  console.log("pringing everthing", selectAll, subCounties);
  console.log("valuechain....", valueChain);
  const handleSelectAll = (filter, value) => {
    console.log(
      "🚀 ~ file: index.js:576 ~ handleSelectAll ~ filter, value:",
      filter,
      value,
      subCounties
    );
    setSelectAll((selectAll) => ({
      ...selectAll,
      [filter]: !selectAll[filter],
    }));
    if (filter == "county") {
      // setCounty([]);
    }
    if (filter == "sub_counties") {
      setSubCounties([]);
    }
    if (filter == "value_chain") {
      setValueChain([]);
    }
    handleFillter(filter, value);
  };

  console.log(
    "counties and all counties filter",
    subCounties,
    allSubCounties,
    selectAll
  );
  const handleChipDelete = (filterType, index, value) => {
    if (filterType == "county") {
    }
    if (filterType == "sub_county") {
      let tmpSubCounty = [...subCounties];
      tmpSubCounty.splice(index, 1);
      setSubCounties(tmpSubCounty);
    }
    if (filterType == "value_chain") {
      let tmpValueChain = [...valueChain];
      tmpValueChain.splice(index, 1);
      setValueChain(tmpValueChain);
    }
    if (filterType == "gender") {
      setGender("");
    }
  };

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.js:633 ~ useEffect ~ selectedFileDetails?.id:",
      selectedFileDetails?.id
    );
    setDashboardData({});
    if (selectedFileDetails?.id) {
      getDashboardForDataset(true);
    }
    // datasetid
    // callLoader(false);
  }, [JSON.stringify(selectedFileDetails)]);

  useEffect(() => {
    // modifyFarmingPracticesData();
    modifyLiveStockAndPoultry();
    modifyFinancialLivelhood();
    modifyPopulerFertilisers();
    setDataForFemaleAndMaleFarmerCount();
    setFarmerDataInSubCounty();
    setEducationLevelData();
  }, [dashboardData]);
  console.log("testtttt", femaleAndMaleFarmerCount);
  return (
    <>
      {notAvailableMessage ? (
        <Box sx={{ marginTop: "145px" }}>
          <EmptyFile text={notAvailableMessage ? notAvailableMessage : ""} />
        </Box>
      ) : (
        <div className={style.root}>
          <div className={style.filterContainer}>
            <Row>
              <Col className={style.padding0} sm={12} md={12} lg={12}>
                <FormControl
                  size="medium"
                  sx={{ minWidth: 190, maxWidth: 200 }}
                  className={style.formControl}
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"

                  // MenuProps={MenuProps}
                >
                  <InputLabel>Select County</InputLabel>
                  <Select
                    label="Select County"
                    onChange={(e) => {
                      if (
                        !e.target.value[e.target.value?.length - 1] &&
                        selectAll.county
                      ) {
                        handleFillter("county", ["BUSIA"], "all");
                      } else if (
                        e.target.value[e.target.value?.length - 1] == "ALL"
                      ) {
                        handleFillter("county", ["ALL"], "all");
                      } else if (!selectAll.county) {
                        // handleFillter("county", e.target.value);

                        // static county filter
                        handleFillter("county", ["BUSIA"]);
                      }
                    }}
                    renderValue={(county) => {
                      if (selectAll.county) return "ALL";
                      else {
                        return county.length ? county.join(", ") : "ALL";
                      }
                    }}
                    multiple
                    value={county}
                  >
                    <MenuItem value={"ALL"}>
                      <Checkbox checked={selectAll.county} />
                      <ListItemText primary={"ALL"} />
                    </MenuItem>
                    {allCounty?.map((name) => {
                      return (
                        <MenuItem key={name} value={name}>
                          <Checkbox
                            checked={
                              selectAll.county || county?.indexOf(name) > -1
                            }
                          />
                          <ListItemText primary={name} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl
                  size="medium"
                  sx={{ minWidth: 190, maxWidth: 200 }}
                  className={style.formControl}
                >
                  <InputLabel>Select Sub-County </InputLabel>
                  <Select
                    label="Select Sub-County "
                    value={subCounties}
                    multiple
                    onChange={(e) => {
                      console.log(
                        "e.target.value[e.target.value?.length - 1]",
                        e.target.value[e.target.value?.length - 1]
                      );
                      if (
                        !e.target.value[e.target.value?.length - 1] &&
                        selectAll.sub_counties
                      ) {
                        handleFillter("sub_counties", [], "all");
                      } else if (
                        e.target.value[e.target.value?.length - 1] == "ALL"
                      ) {
                        handleFillter("sub_counties", ["ALL"], "all");
                      } else if (!selectAll.sub_counties) {
                        handleFillter("sub_counties", e.target.value);
                      }
                    }}
                    renderValue={(subCounties) => {
                      if (selectAll.sub_counties) {
                        return "ALL";
                      } else {
                        return subCounties.length
                          ? subCounties.join(", ")
                          : "Default";
                      }
                    }}
                  >
                    <MenuItem value={"ALL"}>
                      <Checkbox checked={selectAll.sub_counties} />
                      <ListItemText primary={"ALL"} />
                    </MenuItem>
                    {allSubCounties?.map((name, index) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox
                          checked={
                            selectAll.sub_counties ||
                            subCounties?.indexOf(name) > -1
                          }
                        />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}

                    {/* Add more options */}
                  </Select>
                </FormControl>

                <FormControl
                  size="medium"
                  sx={{ minWidth: 190, maxWidth: 200 }}
                  className={style.formControl}
                >
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
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
                  size="medium"
                  sx={{ minWidth: 190, maxWidth: 200 }}
                  className={style.formControl}
                >
                  <InputLabel>Value Chain</InputLabel>
                  <Select
                    label="Value Chain"
                    value={valueChain}
                    multiple
                    renderValue={(valueChain) =>
                      selectAll.value_chain
                        ? "ALL"
                        : valueChain.length
                        ? valueChain.join(", ")
                        : "Default"
                    }
                    onChange={(e) => {
                      if (
                        !e.target.value[e.target.value?.length - 1] &&
                        selectAll.value_chain
                      ) {
                        handleFillter("value_chain", [], "all");
                      }
                      if (e.target.value[e.target.value?.length - 1] == "ALL") {
                        handleFillter("value_chain", ["ALL"], "all");
                      } else if (!selectAll.value_chain) {
                        handleFillter("value_chain", e.target.value);
                      }
                    }}
                  >
                    <MenuItem value={"ALL"}>
                      <Checkbox checked={selectAll.value_chain} />
                      <ListItemText primary={"ALL"} />
                    </MenuItem>
                    {allValueChain?.map((name, index) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox
                          checked={
                            selectAll.value_chain ||
                            valueChain?.indexOf(name) > -1
                          }
                        />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className={style.buttonContainer}>
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
              </Col>
            </Row>
            <Box sx={{ textAlign: "left", margin: "15px 0 15px 100px" }}>
              {!selectAll.county &&
                county.map((county, index) =>
                  county ? (
                    <Chip
                      value={county}
                      label={county}
                      onDelete={() => handleChipDelete("county", index)}
                    />
                  ) : (
                    ""
                  )
                )}
              {!selectAll.sub_counties &&
                subCounties.map((subCounty, index) =>
                  subCounty ? (
                    <Chip
                      value={subCounty}
                      label={subCounty}
                      onDelete={() => handleChipDelete("sub_county", index)}
                    />
                  ) : (
                    ""
                  )
                )}
              {gender ? (
                <Chip
                  value={gender}
                  label={gender}
                  onDelete={() => handleChipDelete("gender")}
                />
              ) : (
                ""
              )}
              {!selectAll.value_chain &&
                valueChain.map((valueChain, index) =>
                  valueChain ? (
                    <Chip
                      value={valueChain}
                      label={valueChain}
                      onDelete={() => handleChipDelete("value_chain", index)}
                    />
                  ) : (
                    ""
                  )
                )}
            </Box>
          </div>
          <div>
            <FarmerDemographics
              records={dashboardData?.total_number_of_records || 0}
              counties={dashboardData?.counties || 0}
              mobileNumber={dashboardData?.farmer_mobile_numbers || 0}
              subCounties={dashboardData?.sub_counties || 0}
              constituencies={dashboardData?.constituencies || 0}
            />
          </div>
          <Row
            className={`${style.mainGraphContainer} ${style.graphAndDataContainer}`}
          >
            <Col
              sm={12}
              xs={12}
              md={12}
              lg={4}
              xl={4}
              className={`${style.graphContainer}`}
            >
              <Typography className={`${style.ghraphTitle}`}>
                Female & Male Farmer
              </Typography>
              <div className={style.graph}>
                <PieChart width={400} height={250}>
                  <Tooltip />
                  <Pie
                    data={femaleAndMaleFarmerCount}
                    cx={150}
                    cy={120}
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="category"
                    // paddingAngle={3}
                    activeShape={renderActiveShape}
                    activeIndex={activeIndex?.["Female & Male Farmer"]}
                    onMouseOver={(data, index) =>
                      onMouseOver(data, index, "Female & Male Farmer")
                    }
                    onMouseLeave={(data, index) =>
                      onMouseLeave(data, index, "Female & Male Farmer")
                    }
                  >
                    {femaleAndMaleFarmerCount?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={livestockColors[index]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    align="right"
                    verticalAlign="middle"
                    layout="vertical"
                    iconType="square"
                    iconSize={10}
                    formatter={(value, entry, index) => {
                      const color = livestockColors[index];
                      return <span style={{ color }}>{value}</span>;
                    }}
                  />
                </PieChart>
              </div>
            </Col>

            {/* All female and male farmer per county */}
            <Col
              sm={12}
              xs={12}
              md={12}
              lg={8}
              xl={8}
              className={`${style.graphContainer} ${style.padding0}`}
            >
              <Typography className={`${style.ghraphTitle}`}>
                Female & Male Farmer Per County
              </Typography>
              <div className={style.graph}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    width={600}
                    height={300}
                    data={farmerInSubCounty}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid />
                    <XAxis
                      interval={0}
                      // minTickGap={5}
                      tick={<CustomXAxisTick />}
                      allowDataOverflow={true}
                      dataKey="name"
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      background={{ fill: "#eee", radius: 5 }}
                      dataKey="Male"
                      stackId="a"
                      fill={livestockColors[1]}
                      barSize={30}
                    />
                    <Bar
                      radius={[5, 5, 0, 0]}
                      // background={{ fill: "#eee", radius: 50 }}
                      dataKey="Female"
                      stackId="a"
                      fill={livestockColors[0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Col>
          </Row>
          <Row className={`${style.mainGraphContainer}`}>
            {/* Water source and Insurance Information data */}
            <div>
              <WaterSource
                rivers={
                  dashboardData?.water_sources?.rivers
                    ? (dashboardData?.water_sources?.rivers?.Male ?? 0) +
                      (dashboardData?.water_sources?.rivers?.Female ?? 0)
                    : 0
                }
                irrigation={
                  dashboardData?.water_sources?.irrigation
                    ? (dashboardData?.water_sources?.irrigation?.Male ?? 0) +
                      (dashboardData?.water_sources?.irrigation?.Female ?? 0)
                    : 0
                }
                waterPan={
                  dashboardData?.water_sources?.water_pan
                    ? (dashboardData?.water_sources?.water_pan?.Male ?? 0) +
                      (dashboardData?.water_sources?.water_pan?.Female ?? 0)
                    : 0
                }
              />
              <InsuranceInformations
                insuredCorps={
                  dashboardData?.insurance_information?.insured_crops
                    ? (dashboardData?.insurance_information?.insured_crops
                        ?.Male ?? 0) +
                      (dashboardData?.insurance_information?.insured_crops
                        ?.Female ?? 0)
                    : 0
                }
                insuredMachineries={
                  dashboardData?.insurance_information?.insured_machinery
                    ? (dashboardData?.insurance_information?.insured_machinery
                        ?.Male ?? 0) +
                      (dashboardData?.insurance_information?.insured_machinery
                        ?.Female ?? 0)
                    : 0
                }
              />
            </div>

            <Col
              sm={12}
              xs={12}
              md={12}
              lg={8}
              xl={8}
              className={`${style.graphContainer}`}
            >
              <Typography className={`${style.ghraphTitle}`}>
                Education Qualification
              </Typography>
              <div className={style.graph}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    width={600}
                    height={300}
                    data={farmerBasedOnEducationLevel}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid />
                    <XAxis
                      interval={0}
                      tick={<CustomXAxisTick />}
                      dataKey="name"
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      background={{ fill: "#eee", radius: 5 }}
                      dataKey="Male"
                      stackId="a"
                      fill={livestockColors[1]}
                      barSize={30}
                    />
                    <Bar
                      radius={[5, 5, 0, 0]}
                      // background={{ fill: "#eee", radius: 50 }}
                      dataKey="Female"
                      stackId="a"
                      fill={livestockColors[0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Col>
          </Row>
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
                {/* <ResponsiveContainer width="100%" height={250}>
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

                  <Bar
                    dataKey="value"
                    style={barStyle}
                    barSize={10}
                    radius={50}
                    background={{ fill: "#eee", radius: 50 }}
                  >
                    {livestockData.map((entry, index) => {
                      return <Cell fill={livestockColors[index]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer> */}
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart width={600} height={300}>
                    <Tooltip />
                    <Pie
                      data={livestockAndPoultryProduction}
                      cx={250}
                      cy={150}
                      labelLine={false}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="category"
                      paddingAngle={3}
                      activeShape={renderActiveShape}
                      activeIndex={
                        activeIndex?.["Livestock & Poultry Production"]
                      }
                      onMouseOver={(data, index) =>
                        onMouseOver(
                          data,
                          index,
                          "Livestock & Poultry Production"
                        )
                      }
                      onMouseLeave={(data, index) =>
                        onMouseLeave(
                          data,
                          index,
                          "Livestock & Poultry Production"
                        )
                      }
                    >
                      {livestockAndPoultryProduction?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={livestockColors[index]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      align="right"
                      verticalAlign="middle"
                      layout="vertical"
                      iconType="square"
                      iconSize={10}
                      formatter={(value, entry, index) => {
                        const color = livestockColors[index];
                        return <span style={{ color }}>{value}</span>;
                      }}
                    />
                  </PieChart>
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
                <ResponsiveContainer width="100%" height={300}>
                  {/* <BarChart
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
                    background={{ fill: "#eee", radius: 50 }}
                  >
                    {financialData.map((entry, index) => {
                      return <Cell fill={financialColors[index]} />;
                    })}
                  </Bar>
                </BarChart> */}
                  <PieChart width={600} height={300}>
                    <Tooltip />
                    <Pie
                      data={financialLivelhood}
                      cx={150}
                      cy={150}
                      labelLine={false}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="category"
                      paddingAngle={3}
                      activeShape={renderActiveShape}
                      activeIndex={activeIndex?.["Financial Livelihood"]}
                      onMouseOver={(data, index) =>
                        onMouseOver(data, index, "Financial Livelihood")
                      }
                      onMouseLeave={(data, index) =>
                        onMouseLeave(data, index, "Financial Livelihood")
                      }
                    >
                      {financialLivelhood?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={financialColors[index]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      align="right"
                      verticalAlign="middle"
                      layout="vertical"
                      iconType="square"
                      iconSize={10}
                      formatter={(value, entry, index) => {
                        const color = livestockColors[index];
                        return <span style={{ color }}>{value}</span>;
                      }}
                    />
                  </PieChart>
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
                  <PieChart width={800} height={400}>
                    <Tooltip />

                    <Pie
                      data={populerFertilisers}
                      cx={200}
                      cy={120}
                      innerRadius={50}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={3}
                      dataKey="value"
                      nameKey="category"
                    >
                      {populerFertilisers.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={fertilisersColors[index]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      align="right"
                      verticalAlign="middle"
                      style={{ right: "30px" }}
                      layout="vertical"
                      iconType="square"
                      iconSize={10}
                      formatter={(value, entry, index) => {
                        const color = livestockColors[index];
                        return <span style={{ color }}>{value}</span>;
                      }}
                    />
                  </PieChart>
                  {/* <BarChart
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
                  {/* <Bar
                    dataKey="value"
                    style={barStyle}
                    barSize={10}
                    radius={50}
                    background={{ fill: "#eee", radius: 50 }}
                  >
                    {populerFertilisers.map((entry, index) => {
                      return <Cell fill={fertilisersColors[index]} />;
                    })}
                  </Bar>
                </BarChart> */}
                </ResponsiveContainer>
              </div>
            </Col>
            <Col
              sm={12}
              xs={12}
              md={12}
              lg={6}
              xl={6}
              className={`${style.graphContainer}`}
            >
              <Typography className={`${style.ghraphTitle}`}>
                Geographic Information
              </Typography>
              <MyMap />
            </Col>
          </Row>
          {/* </div> */}
        </div>
      )}
    </>
  );
};

export default Dashboard;

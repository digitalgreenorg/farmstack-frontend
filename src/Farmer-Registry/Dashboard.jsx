import React, { useContext, useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import CustomText from "./CustomText/CustomText";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// import  "react-bootstrap/Row";
import CustomCard from "./Stateless/Card/CustomCard";
import PieChartCard from "./Stateless/PieChart/PieChart";
import style from "./style.module.css";
import BarGraphCard from "./Stateless/BarGraph/BarGraph";
import BarGraphPercentage from "./Stateless/BarGraph/BarGraphPercentage";

import UrlConstants from "../features/default/src/Constants/UrlConstants";
import {
  getTokenLocal,
  getWoreda,
  handleApiError,
  isLogedInUserAdmin,
  isLogedInUserKebeleOfficer,
  isLogedInUserNationalOfficer,
  isLogedInUserRegionalOfficer,
  isLogedInUserWoredaOfficer,
  isLogedInUserZonalOfficer,
  setRoleLocal,
  setTokenLocal,
  setUser,
} from "../features/default/src/Utils/Common"
import HTTPService from "../features/default/src/Services/HTTPServiceFarmer"
import Filters from "./Stateless/Filter/Filters";
import grass from "../features/default/src/Assets/Img/grass.svg"
import group from "../features/default/src/Assets/Img/group.svg"
import pets from "../features/default/src/Assets/Img/pets.svg"
import { FarmStackContext } from "common/components/context/DefaultContext/FarmstackProvider";

const Dashboard = () => {
  const [farmerProfileDetails, setFarmerProfileDetails] = useState({});
  const [devlopmentGroupInfo, setDevlopmentGroupInfo] = useState({
    development_group_count: 0,
    total_farmers: 0,
    female_farmers: 0,
    male_farmers: 0,
    development_group_type_details: {
      "Women only development group": 0,
    },
    development_groups_by_location: {
      "Kebele 1": 0,
      "Kebele 2": 0,
      "Kebele 3": 0,
      "Kebele 4": 0,
    },
  });
  const [auth, setAuth] = useState(false);
  const [farmerInfo, setFarmerInfo] = useState({});
  const [livestockDetails, setLivestockDetails] = useState({});
  const [cropInfo, setCropInfo] = useState({});
  const [cropFieldSize, setCropFieldSize] = useState({});
  const [priorityCrops, setPriorityCrops] = useState([]);
  const [allRegions, setAllRegions] = useState([]);
  const [allZones, setAllZones] = useState([]);
  const [allWoreda, setAllWoreda] = useState([]);
  const [allKabele, setAllKabele] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(0);
  const [location, setLocation] = useState({
    region: "",
    zone: "",
    woreda: "",
    kebele: "",
  });
  const [farmerFilterOptions, setFarmerFilterOptions] = useState({
    genders: [],
    maritalStatus: [],
    householdTypes: [],
    farmerCategories: [],
  });
  const [farmerFilter, setFarmerFilter] = useState({
    gender: [],
    maritalStatus: [],
    householdType: [],
    farmerCategory: "",
  });
  const [livestockFilterOptions, setLivestockFilterOptions] = useState({
    livestocks: [],
    ages: [],
    breeds: [],
  });
  const [livestockFilter, setLivestockFilter] = useState({
    livestock: [],
    age: "",
    breed: "",
  });
  const [cropTypeOptions, setCropTypeOptions] = useState({
    cropTypes: [],
    farmerTypes: [],
  });
  const [cropType, setCropType] = useState({
    cropType: [],
    farmerType: "",
  });
  const [allLoader, setAllLoader] = useState({
    getFarmerProfileInfo: false,
    getDevlopmentGroupInfo: false,
    getFarmerInfo: false,
    getLivestockDetails: false,
    getCropInfo: false,
    getRegions: false,
    getZones: false,
    getWoreda: false,
    getKabele: false,
  });
  const [selectedRegions, setSeletedRegions] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedWoredas, setSelectedWoredas] = useState([]);
  const [selectedKebeles, setSelectedKebeles] = useState([]);
  const { callToast, callLoader } = useContext(FarmStackContext);
  const history = useHistory();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : miniLaptop ? "50px" : "50px",
    marginRight: mobile || tablet ? "30px" : miniLaptop ? "50px" : "50px",
    marginTop: "30px",
  };

  function dataInPieFormat(data) {
    const convertedData = [];

    for (const key in data) {
      convertedData.push({ name: key, value: data[key] });
    }

    return convertedData;
  }
  function convertLivestockWithLocation(data) {
    const transformedData =
      typeof data == "object" &&
      Object.keys(data).map((key) => {
        const obj = data[key];
        const value = Object.values(obj).reduce((acc, val) =>
          val !== "name" ? acc + val : acc
        );
        return {
          name: key,
          ...obj,
          value,
        };
      });

    return transformedData;
  }
  function getTopNObjects(data) {
    data.sort((a, b) => b.value - a.value);
    // const topNObjects = data.slice(0, n);

    return data;
  }

  const getDevlopmentQueryParam = () => {
    const queryParams = {};
    // @ts-ignore
    if (cropType.cropType.length > 0) queryParams.crop_type = cropType.cropType;
    if (cropType.farmerType) queryParams.farming_type = cropType.farmerType;

    if (livestockFilter.livestock.length > 0)
      // @ts-ignore
      queryParams.live_stock_type = livestockFilter.livestock;
    // @ts-ignore
    if (selectedRegions.length > 0) queryParams.region_id = selectedRegions;
    // @ts-ignore
    if (selectedZones.length > 0) queryParams.zone_id = selectedZones;
    // @ts-ignore

    if (selectedWoredas.length > 0) queryParams.woreda_id = selectedWoredas;
    // @ts-ignore

    if (selectedKebeles.length > 0) queryParams.kebele_id = selectedKebeles;

    const queryString = new URLSearchParams(queryParams).toString();
    return queryString;
  };

  // dashboard api call
  const getFarmerProfileInfo = () => {
    let url = UrlConstants.base_url_farmer_registry + UrlConstants.farmer_profile_details;

    setAllLoader((prv) => ({ ...prv, getFarmerProfileInfo: true }));

    HTTPService("GET", url, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((response) => {
        setAllLoader((prv) => ({ ...prv, getFarmerProfileInfo: false }));
        if(response.data){
         setFarmerProfileDetails(response.data)}
      })
      .catch((error) => {
        setAllLoader((prv) => ({ ...prv, getFarmerProfileInfo: false }));
        let errorRes = handleApiError(error);
        if (errorRes?.path) {
          history.push(errorRes.path);
        } else if (errorRes?.toast) {
          callToast("error", errorRes.message, true);
        }
      });
  };
  const getDevlopmentGroupInfo = (clearFilter) => {
    let url = UrlConstants.base_url_farmer_registry + UrlConstants.devlopment_group_info;
    let queryParams = getDevlopmentQueryParam();
    if (!clearFilter) {
      url += `?${queryParams}`;
    }
    setAllLoader((prv) => ({ ...prv, getDevlopmentGroupInfo: true }));

    HTTPService("GET", url, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((response) => {
        setAllLoader((prv) => ({ ...prv, getDevlopmentGroupInfo: false }));
        if(response.data){
          setDevlopmentGroupInfo(response.data)
        }
      })
      .catch((error) => {
        setAllLoader((prv) => ({ ...prv, getDevlopmentGroupInfo: false }));
        let errorRes = handleApiError(error);
        if (errorRes?.path) {
          history.push(errorRes.path);
        } else if (errorRes?.toast) {
          callToast("error", errorRes.message, true);
        }
      });
  };

  const getFarmerInfo = (clearFilter) => {
    let url = UrlConstants.base_url_farmer_registry + UrlConstants.farmer_info;
    const queryParams = {};
  
    // Add filters to queryParams
    if (selectedRegions.length > 0)
      queryParams.kebele__woreda__zone__region__in = selectedRegions;
    if (selectedZones.length > 0)
      queryParams.kebele__woreda__zone__in = selectedZones;
    if (selectedWoredas.length > 0)
      queryParams.kebele__woreda__in = selectedWoredas;
    if (selectedKebeles.length > 0) queryParams.kebele__in = selectedKebeles;
    if (farmerFilter.maritalStatus.length > 0)
      queryParams.marital_status__in = farmerFilter.maritalStatus;
    if (cropType.cropType.length > 0)
      queryParams.farmers_farmland__farmland_crop__crop__crop_type__in =
        cropType.cropType;
    if (livestockFilter.livestock.length > 0)
      queryParams.farmers_farmland__farmland_livestock__breed_id__livestock__livestock_type__in =
        livestockFilter.livestock;
    if (farmerFilter.gender.length > 0)
      queryParams.gender__in = farmerFilter.gender;
    if (farmerFilter.householdType.length > 0)
      queryParams.household_type__in = farmerFilter.householdType;
  
    const queryString = new URLSearchParams(queryParams).toString();
    if (!clearFilter) {
      url += `?${queryString}`;
    }
  
    setAllLoader((prv) => ({ ...prv, getFarmerInfo: true }));
  
    // Making the API call with X-SHARED-KEY header
    HTTPService("GET", url, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((response) => {
        setAllLoader((prv) => ({ ...prv, getFarmerInfo: false }));
        if (response.data) {
          setFarmerInfo(response.data);
        }
      })
      .catch((error) => {
        setAllLoader((prv) => ({ ...prv, getFarmerInfo: false }));
        let errorRes = handleApiError(error);
        if (errorRes?.path) {
          history.push(errorRes.path);
        } else if (errorRes?.toast) {
          callToast("error", errorRes.message, true);
        }
      });
  };
  
  const getLivestockDetails = (clearFilter) => {
    let url = UrlConstants.base_url_farmer_registry + UrlConstants.livestock_details;
    const queryParams = {};
    // @ts-ignore
    if (selectedRegions.length > 0) queryParams.region_id = selectedRegions;
    // @ts-ignore
    if (selectedZones.length > 0) queryParams.zone_id = selectedZones;
    // @ts-ignore

    if (selectedWoredas.length > 0) queryParams.woreda_id = selectedWoredas;
    // @ts-ignore

    if (selectedKebeles.length > 0) queryParams.kebele_id = selectedKebeles;
    // @ts-ignore
    if (farmerFilter.gender.length > 0)
      // @ts-ignore
      queryParams.gender = farmerFilter.gender;
    if (farmerFilter.maritalStatus.length > 0)
      // @ts-ignore
      queryParams.marital_status = farmerFilter.maritalStatus;
    if (farmerFilter.householdType.length > 0)
      // @ts-ignore
      queryParams.household_type = farmerFilter.householdType;
    if (livestockFilter.livestock.length > 0)
      // @ts-ignore
      queryParams.livestock_type = livestockFilter.livestock;
    // @ts-ignore
    if (cropType.cropType.length > 0) queryParams.crop_type = cropType.cropType;

    const queryString = new URLSearchParams(queryParams).toString();
    if (!clearFilter) {
      url += `?${queryParams}`;
    }
    setAllLoader((prv) => ({ ...prv, getLivestockDetails: true }));
    HTTPService("GET", url, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((response) => {
        setAllLoader((prv) => ({ ...prv, getLivestockDetails: false }));
        if(response.data){
          setLivestockDetails(response.data)
        }
      })
      .catch((error) => {
        setAllLoader((prv) => ({ ...prv, getLivestockDetails: false }));
        let errorRes = handleApiError(error);
        if (errorRes?.path) {
          history.push(errorRes.path);
        } else if (errorRes?.toast) {
          callToast("error", errorRes.message, true);
        }
      });
  };
  const getCropInfo = (clearFilter) => {
    let url = UrlConstants.base_url_farmer_registry + UrlConstants.crop_info;
    const queryParams = {};
    if (selectedRegions.length > 0) queryParams.region_id = selectedRegions;

    if (selectedZones.length > 0) queryParams.zone_id = selectedZones;

    if (selectedWoredas.length > 0) queryParams.woreda_id = selectedWoredas;

    if (selectedKebeles.length > 0) queryParams.kebele_id = selectedKebeles;
    if (farmerFilter.gender.length > 0)
      queryParams.gender = farmerFilter.gender;
    if (farmerFilter.maritalStatus.length > 0)
      queryParams.marital_status = farmerFilter.maritalStatus;
    if (farmerFilter.householdType.length > 0)

      queryParams.household_type = farmerFilter.householdType;
    if (livestockFilter.livestock.length > 0)

      queryParams.livestock_type = livestockFilter.livestock;
    if (cropType.cropType.length > 0) queryParams.crop_type = cropType.cropType;

    callLoader(true);

    const queryString = new URLSearchParams(queryParams).toString();
    if (!clearFilter) {
      url += `?${queryParams}`;
    }
    setAllLoader((prv) => ({ ...prv, getCropInfo: true }));

    HTTPService("GET", url, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((response) => {
        setAllLoader((prv) => ({ ...prv, getCropInfo: false }));
        if(response.data){
          setCropInfo(response.data)
        }
      })
      .catch((error) => {
        setAllLoader((prv) => ({ ...prv, getCropInfo: false }));
        let errorRes = handleApiError(error);
        if (errorRes?.path) {
          history.push(errorRes.path);
        } else if (errorRes?.toast) {
          callToast("error", errorRes.message, true);
        }
      });
  };

  if (
    !allLoader.getCropInfo &&
    !allLoader.getDevlopmentGroupInfo &&
    !allLoader.getFarmerInfo &&
    !allLoader.getFarmerProfileInfo &&
    !allLoader.getLivestockDetails &&
    !allLoader.getRegions &&
    !allLoader.getZones &&
    !allLoader.getWoreda &&
    !allLoader.getKabele
  ) {
    callLoader(false);
  }
  if (
    allLoader.getCropInfo ||
    allLoader.getDevlopmentGroupInfo ||
    allLoader.getFarmerInfo ||
    allLoader.getFarmerProfileInfo ||
    allLoader.getLivestockDetails ||
    allLoader.getRegions ||
    allLoader.getZones ||
    allLoader.getWoreda ||
    allLoader.getKabele
  ) {
    callLoader(true);
  }
  // location filter option
  const getRegions = () => {
    let url = UrlConstants.base_url_farmer_registry + UrlConstants.regions;
    setAllLoader((prv) => ({ ...prv, getRegions: true }));
    HTTPService("GET", url, false, false, false)
      .then((response) => {
        setAllLoader((prv) => ({ ...prv, getRegions: false }));
        if(response.data){
          setAllRegions(response.data)
          localStorage.setItem("role_farmer", JSON.stringify("national_officer"));
        }
      })
      .catch((error) => {
        setAllLoader((prv) => ({ ...prv, getRegions: false }));
        let errorRes = handleApiError(error);
        if (errorRes?.path) {
          history.push(errorRes.path);
        } else if (errorRes?.toast) {
          callToast("error", errorRes.message, true);
        }
      });
  };
  const getZones = (regionId) => {
    let url = UrlConstants.base_url_farmer_registry + UrlConstants.zones;
    if (regionId) {
      url += "?region__in=" + regionId;
    }
    setAllLoader((prv) => ({ ...prv, getZones: true }));
    HTTPService("GET", url, false, false, false)
      .then((response) => {
        setAllLoader((prv) => ({ ...prv, getZones: false }));
        if(response.data){
          setAllZones(response.data)
        }
      })
      .catch((error) => {
        setAllLoader((prv) => ({ ...prv, getZones: false }));
        let errorRes = handleApiError(error);
        if (errorRes?.path) {
          history.push(errorRes.path);
        } else if (errorRes?.toast) {
          callToast("error", errorRes.message, true);
        }
      });
  };
  const getWoreda = (zoneId) => {
    let url = UrlConstants.base_url_farmer_registry + UrlConstants.woredas;
    if (zoneId) {
      url += "?zone__in=" + zoneId;
    }
    setAllLoader((prv) => ({ ...prv, getWoreda: true }));
    HTTPService("GET", url, false, false, false)
      .then((response) => {
        setAllLoader((prv) => ({ ...prv, getWoreda: false }));
        if(response.data){
          setAllWoreda(response.data)
        }
      })
      .catch((error) => {
        setAllLoader((prv) => ({ ...prv, getWoreda: false }));
        let errorRes = handleApiError(error);
        if (errorRes?.path) {
          history.push(errorRes.path);
        } else if (errorRes?.toast) {
          callToast("error", errorRes.message, true);
        }
      });
  };
  const getKabele = (woredaId) => {
    let url = UrlConstants.base_url_farmer_registry + UrlConstants.kebeles;
    if (woredaId) {
      url += "?woreda__in=" + woredaId;
    }
    setAllLoader((prv) => ({ ...prv, getKabele: true }));
    HTTPService("GET", url, false, false, false)
      .then((response) => {
        setAllLoader((prv) => ({ ...prv, getKabele: false }));
        if(response.data){
          setAllKabele(response.data)
        }
      })
      .catch((error) => {
        setAllLoader((prv) => ({ ...prv, getKabele: false }));
        let errorRes = handleApiError(error);
        if (errorRes?.path) {
          history.push(errorRes.path);
        } else if (errorRes?.toast) {
          callToast("error", errorRes.message, true);
        }
      });
  };
  const getFilterOption = () => {
    let url = UrlConstants.base_url_farmer_registry + UrlConstants.filter_data;

    callLoader(true);
    HTTPService("GET", url, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((response) => {
        callLoader(false);
        if (response?.data) {
          setFarmerFilterOptions({
            genders: response?.data?.gender ?? [],
            maritalStatus: response?.data?.marital_status ?? [],
            householdTypes: response?.data?.household_type ?? [],
            farmerCategories: response?.data?.farmer_category ?? [],
          });
          let ageNumber = new Array(100).fill(0);
          ageNumber.map((item, index) => (ageNumber[index] = index + 1));
          setLivestockFilterOptions({
            livestocks: response?.data?.livestock_types ?? [],
            ages: ageNumber ?? [],
            breeds: response?.data?.breed_names ?? [],
          });
          setCropTypeOptions({
            cropTypes: response?.data?.crop_type ?? [],
            farmerTypes: [],
          });
        }
      })
      .catch((error) => {
        callLoader(false);
        let errorRes = handleApiError(error);
        if (errorRes?.path) {
          history.push(errorRes.path);
        } else if (errorRes?.toast) {
          callToast("error", errorRes.message, true);
        }
      });
  };

  const handleApplyFilter = (clearFilter) => {
    getDevlopmentGroupInfo(clearFilter);
    getFarmerInfo(clearFilter);
    getLivestockDetails(clearFilter);
    getCropInfo(clearFilter);
  };
  let updatedObj = {};

  const recursion = (data) => {
    // Check if data is an object
    if (typeof data !== "object" || data === null) {
      return;
    }

    // Find the first non-null key
    const key = Object.keys(data).find((key) => data[key] !== null);

    // If no non-null key is found, return
    if (!key) {
      return;
    }

    const value = data[key];

    // Check if the value is an object and has an id property
    if (typeof value === "object" && value !== null && value.id) {
      let tmpName = `name`;

      updatedObj[key] = {
        id: value.id,
        [tmpName]: value.name || value[tmpName],
      };

      console.log("updatedObj", updatedObj);

      // Prepare the next data for recursion
      let tmpData = { ...value };
      delete tmpData.id;
      delete tmpData[tmpName];

      recursion(tmpData);
    }
  };
  const updateRes = (data) => {
    recursion(data);
    return updatedObj;
  };

  useEffect(() => {
    if (auth) {
      getFarmerProfileInfo();
      getDevlopmentGroupInfo();
      getFarmerInfo();
      getLivestockDetails();
      getCropInfo();
      // allAPICalls();
      getRegions();
      getFilterOption();
    }
  }, [auth]);

  useEffect(() => {
    // filters

    let jurisdiction = localStorage.getItem("jurisdiction");
    jurisdiction = jurisdiction ? JSON.parse(jurisdiction) : null;
    if (isLogedInUserNationalOfficer() || isLogedInUserAdmin()) {
    } else if (isLogedInUserRegionalOfficer()) {
      // @ts-ignore
      if (jurisdiction?.region?.id) {
        setLocation((prv) => ({
          ...prv,
          // @ts-ignore
          region: jurisdiction?.region,
        }));
        // @ts-ignore
        getZones(jurisdiction?.region?.id);
      }
    } else if (isLogedInUserZonalOfficer()) {
      // @ts-ignore
      if (jurisdiction?.region?.id) {
        setLocation((prv) => ({
          ...prv,
          // @ts-ignore
          region: jurisdiction?.region,
        }));
      }
      // @ts-ignore
      if (jurisdiction?.zone?.id) {
        setLocation((prv) => ({
          ...prv,
          // @ts-ignore
          zone: jurisdiction?.zone,
        }));
        // @ts-ignore

        getWoreda(jurisdiction?.zone?.id);
      }
    } else if (isLogedInUserWoredaOfficer()) {
      // @ts-ignore
      if (jurisdiction?.region?.id) {
        setLocation((prv) => ({
          ...prv,
          // @ts-ignore
          region: jurisdiction?.region,
        }));
      }
      // @ts-ignore
      if (jurisdiction?.zone?.id) {
        setLocation((prv) => ({
          ...prv,
          // @ts-ignore
          zone: jurisdiction?.zone,
        }));
      }
      // @ts-ignore
      if (jurisdiction?.woreda?.id) {
        setLocation((prv) => ({
          ...prv,
          // @ts-ignore
          woreda: jurisdiction?.woreda,
        }));
        // @ts-ignore
        getKabele(jurisdiction?.woreda?.id);
      }
    } else if (isLogedInUserKebeleOfficer()) {
      // @ts-ignore
      if (jurisdiction?.region?.id) {
        setLocation((prv) => ({
          ...prv,
          // @ts-ignore
          region: jurisdiction?.region,
        }));
      }
      // @ts-ignore
      if (jurisdiction?.zone?.id) {
        setLocation((prv) => ({
          ...prv,
          // @ts-ignore
          zone: jurisdiction?.zone,
        }));
      }
      // @ts-ignore
      if (jurisdiction?.woreda?.id) {
        setLocation((prv) => ({
          ...prv,
          // @ts-ignore
          woreda: jurisdiction?.woreda,
        }));
      }
      // @ts-ignore
      if (jurisdiction?.kebele?.id) {
        setLocation((prv) => ({
          ...prv,
          // @ts-ignore
          kebele: jurisdiction?.kebele,
        }));
      }
    }
  }, [toggleFilter]);

  useEffect(() => {
    // @ts-ignore
    let updatedFieldSize = dataInPieFormat(cropInfo?.crop_field_sizes ?? {});
    // getTopNObjects
    setCropFieldSize(getTopNObjects(updatedFieldSize));
    // @ts-ignore
    setPriorityCrops(getTopNObjects(updatedFieldSize));
  }, [cropInfo, farmerInfo]);

  useEffect(() => {
    if (!getTokenLocal()) {
      let body = {
        email: "national@digitalgreen.org",
        password: "@gmail.com",
      };
      HTTPService(
        "POST",
        UrlConstants.base_url_farmer_registry + UrlConstants.login,
        body,
        false,
        false
      )
        .then((res) => {
          callLoader(false);
          setTokenLocal(res?.data?.token);
          setUser(res?.data?.user);
          setRoleLocal(res?.data?.user?.role);
          setAuth(true);
          let jurisdiction = updateRes(
            res?.data?.user?.jurisdictions?.[0] ?? {}
          );
          console.log(
            "🚀 ~ file: Login.tsx:113 ~ .then ~ jurisdiction:",
            jurisdiction,
            res?.data?.user?.jurisdictions,
            res?.data?.user
          );
          localStorage.setItem("jurisdiction", JSON.stringify(jurisdiction));
          // // @ts-ignore
          // setRegion(jurisdiction?.region);
          // // @ts-ignore
          // setZone(jurisdiction?.zone);
          // // @ts-ignore
          // setWoreda(jurisdiction?.woreda);
          // // @ts-ignore
          // setKebele(jurisdiction?.kebele);
          history.push("/farmer/dashboard");
        })
        .catch((err) => {
          console.log("🚀 ~ file: Login.tsx:101 ~ handleSubmit ~ err:", err);
          callLoader(false);
        });
    } else {
      setAuth(true);
    }
  }, []);
  return (
    <Box sx={containerStyle}>
      <Box className="mt30">
        <CustomText
          size={"24px"}
          weight={700}
          lineHeight={"44px"}
          value={"Farmer profile details"}
          color={"#3D4A52"}
        />
      </Box>
      <Row>
        <Col xl={2} lg={4} md={4} sm={12} xs={12}>
          <Box className={style.staticCard}>
            <CustomCard
              title={"Total no.of farmers"}
              // @ts-ignore
              value={farmerProfileDetails?.total_farmers_count ?? 0}
              dotColor="#00AB55"
            />
          </Box>
        </Col>
        <Col xl={2} lg={4} md={4} sm={12} xs={12}>
          <Box className={style.staticCard}>
            <CustomCard
              title={"No.of Female farmers"}
              // @ts-ignore

              value={farmerProfileDetails?.female_farmers ?? 0}
              dotColor="#5C046A"
            />
          </Box>
        </Col>
        <Col xl={2} lg={4} md={4} sm={12} xs={12}>
          <Box className={style.staticCard}>
            <CustomCard
              title={"No.of Mixed farmers"}
              // @ts-ignore

              value={farmerProfileDetails?.mixed_farmers_count ?? 0}
              dotColor="#B800D6"
            />
          </Box>
        </Col>
        <Col xl={2} lg={6} md={6} sm={12} xs={12}>
          <Box className={style.staticCard}>
            <CustomCard
              title={"No.of Crop farmers"}
              // @ts-ignore

              value={farmerProfileDetails?.croptype_farmers_count ?? 0}
              dotColor="#3A70CA"
            />
          </Box>
        </Col>
        <Col xl={3} lg={6} md={6} sm={12} xs={12}>
          <Box className={style.staticCard}>
            <CustomCard
              title={"No.of Livestock farmers"}
              // @ts-ignore

              value={farmerProfileDetails?.livestock_farmers_count ?? 0}
              dotColor="#FF007A"
            />
          </Box>
        </Col>
      </Row>
      {/* filter */}
      <Row className={style.filterContainer}>
        <Filters
          getZones={getZones}
          zones={allZones}
          setLocation={setLocation}
          location={location}
          regions={allRegions}
          getWoredas={getWoreda}
          getKebeles={getKabele}
          woredas={allWoreda}
          kebeles={allKabele}
          genders={farmerFilterOptions?.genders}
          maritalStatus={farmerFilterOptions?.maritalStatus}
          houseHoldTypes={farmerFilterOptions?.householdTypes}
          farmerCategories={farmerFilterOptions?.farmerCategories}
          liveStockTypes={livestockFilterOptions.livestocks}
          breeds={livestockFilterOptions.breeds}
          ages={livestockFilterOptions.ages}
          farmerFilter={farmerFilter}
          setFarmerFilter={setFarmerFilter}
          livestockFilter={livestockFilter}
          setLivestockFilter={setLivestockFilter}
          setCropTypeOptions={setCropTypeOptions}
          cropTypeOptions={cropTypeOptions}
          cropType={cropType}
          setCropType={setCropType}
          handleApplyFilter={handleApplyFilter}
          setToggleFilter={setToggleFilter}
          setAllZones={setAllZones}
          setAllWoreda={setAllWoreda}
          setAllKabele={setAllKabele}
          selectedRegions={selectedRegions}
          setSeletedRegions={setSeletedRegions}
          selectedZones={selectedZones}
          setSelectedZones={setSelectedZones}
          selectedWoredas={selectedWoredas}
          setSelectedWoredas={setSelectedWoredas}
          selectedKebeles={selectedKebeles}
          setSelectedKebeles={setSelectedKebeles}
        />
      </Row>
      <hr />
      <Row className="justify-content-center">
        <CustomText
          size={"24px"}
          weight={600}
          lineHeight={"44px"}
          value={"Farmer informations"}
          // color={"#3D4A52"}
        />
        <Row>
          <Col sm={12} md={6} lg={6}>
            <CustomText
              size={"20px"}
              weight={600}
              lineHeight={"44px"}
              value={"Farmers count"}
              // color={"#3D4A52"}
            />
            <Row>
              <Col sm={12} md={6} lg={6}>
                <CustomCard
                  title={"No. of Male farmer"}
                  // @ts-ignore

                  value={
                    farmerInfo?.gender_bifurcation?.male_farmers_count ?? 0
                  }
                  dotColor="#3A70CA"
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CustomCard
                  title={"No. of Female farmer"}
                  // @ts-ignore

                  value={
                    farmerInfo?.gender_bifurcation?.female_farmers_count ?? 0
                  }
                  dotColor="#B800D6"
                />
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <CustomText
              size={"20px"}
              weight={600}
              lineHeight={"44px"}
              value={"Household type"}
              // color={"#3D4A52"}
            />
            <Row>
              <Col sm={12} md={6} lg={6}>
                <CustomCard
                  title={"Male head"}
                  // @ts-ignore

                  value={farmerInfo?.house_hold_counts?.male_headed ?? 0}
                  dotColor="#3A70CA"
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CustomCard
                  title={"Female head"}
                  // @ts-ignore

                  value={farmerInfo?.house_hold_counts?.female_headed ?? 0}
                  dotColor="#B800D6"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
      <Row className="justify-content-center">
        <Col xxl={7} xl={7} lg={7} md={12} sm={12} xs={12}>
          <CustomText
            size={"20px"}
            weight={600}
            lineHeight={"44px"}
            value={"Production type"}
            // color={"#3D4A52"}
          />

          <BarGraphPercentage
            barColor="#003690"
            data={dataInPieFormat(
              // @ts-ignore

              farmerInfo?.count_farmers_by_production_type ?? {}
            )}
          />
        </Col>
        <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
          <Box>
            <CustomText
              size={"20px"}
              weight={600}
              lineHeight={"44px"}
              value={"Farming type"}
              color={"#3D4A52"}
            />
          </Box>
          <Row>
            <Col xxl={6} xl={6} lg={6} md={4} sm={6} xs={12}>
              <CustomCard
                margin={40}
                title={"Crop only"}
                icon={grass}
                // @ts-ignore

                value={farmerInfo?.crop_type_farmers_count ?? 0}
                dotColor="#B800D6"
              />
            </Col>
            <Col xxl={6} xl={6} lg={6} md={4} sm={6} xs={12}>
              <CustomCard
                title={"Livestock only"}
                icon={pets}
                // @ts-ignore

                value={farmerInfo?.livestock_farmers_count ?? 0}
                dotColor="#3A70CA"
              />
            </Col>
            <Col xxl={12} xl={12} lg={12} md={4} sm={12} xs={12}>
              <CustomCard
                margin={40}
                title={"Mixed (livestock & crop)"}
                icon={group}
                // @ts-ignore
                value={farmerInfo?.mixed_farmers_count ?? 0}
                dotColor="#B800D6"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <CustomText
          size={"24px"}
          weight={700}
          lineHeight={"44px"}
          value={"Farmer category"}
          color={"#3D4A52"}
        />
        <Col lg={3} md={6}>
          <CustomCard
            title={"Model farmer"}
            // @ts-ignore

            value={farmerInfo?.farmer_category_counts?.model_farmer ?? 0}
            dotColor="#00AB55"
          />
        </Col>
        <Col lg={3} md={6}>
          <CustomCard
            title={"Middle farmer"}
            // @ts-ignore
            value={farmerInfo?.farmer_category_counts?.middle_farmer ?? 0}
            dotColor="#B800D6"
          />
        </Col>
        <Col lg={3} md={6}>
          <CustomCard
            title={"Rich farmer"}
            // @ts-ignore
            value={
              // @ts-ignore

              farmerInfo?.farmer_category_counts?.rich_farmer ?? 0
            }
            dotColor="#3A70CA"
          />
        </Col>
        <Col lg={3} md={6}>
          <CustomCard
            title={"Resource Poor farmer"}
            // @ts-ignore
            value={
              // @ts-ignore

              farmerInfo?.farmer_category_counts?.resource_poor_farmer ?? 0
            }
            dotColor="#3A70CA"
          />
        </Col>
      </Row>
      <hr />

      <Box className="mt30">
        <CustomText
          size={"24px"}
          weight={700}
          lineHeight={"44px"}
          value={"Development group informations"}
          // color={"#3D4A52"}
        />
      </Box>
      <Row className={style.graphRows}>
        <Col xs={12} sm={12} md={12} xl={3} style={{ padding: "0px 10px" }}>
          <Col
            className={`${style.devGroup}`}
            style={
              !mobile && !tablet && !miniLaptop
                ? { maxWidth: "390px" }
                : { maxWidth: "fit-content" }
            }
          >
            <Row>
              <Col xl={12} lg={6} md={6} sm={12}>
                <Row className={style.top14}>
                  <Col lg={12}>
                    <CustomText
                      size={"16px"}
                      weight={400}
                      value={"No of development groups"}
                      color={"#000000"}
                      className={style.title}
                    />
                    <CustomText
                      size={"18px"}
                      weight={600}
                      value={devlopmentGroupInfo?.development_group_count ?? 0}
                      color={"#000000"}
                      className={style.value}
                      parentClassName={style.valueContainer}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xl={12} lg={6} md={6} sm={12}>
                <Row className={style.top14}>
                  <Col lg={12}>
                    <CustomText
                      size={"16px"}
                      weight={400}
                      value={"No.of Mixed development group"}
                      color={"#000000"}
                      className={style.title}
                    />
                    <CustomText
                      size={"18px"}
                      weight={600}
                      value={devlopmentGroupInfo?.mixed_group_counts ?? 0}
                      color={"#000000"}
                      className={style.value}
                      parentClassName={style.valueContainer}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xl={12} lg={6} md={6} sm={12}>
                <Row className={style.top14}>
                  <Col lg={12}>
                    <CustomText
                      size={"16px"}
                      weight={400}
                      value={"No.of Youth development group"}
                      color={"#000000"}
                      className={style.title}
                    />
                    <CustomText
                      size={"18px"}
                      weight={600}
                      value={devlopmentGroupInfo?.youth_group_counts ?? 0}
                      color={"#000000"}
                      className={style.value}
                      parentClassName={style.valueContainer}
                    />
                  </Col>
                </Row>
              </Col>

              {/* <Row className={style.top30}>
            <Col lg={12}>
              <CustomText
                size={"16px"}
                weight={400}
                value={"No.of male farmers"}
                color={"#000000"}
                className={style.title}
              />
              <CustomText
                size={"18px"}
                weight={600}
                value={devlopmentGroupInfo?.male_farmers ?? 0}
                color={"#000000"}
                className={style.value}
                parentClassName={style.valueContainer}
              />
            </Col>
          </Row> */}
              <Col xl={12} lg={6} md={6} sm={12}>
                <Row className={style.top14}>
                  <Col lg={12}>
                    <CustomText
                      size={"16px"}
                      weight={400}
                      value={"No.of female development group"}
                      color={"#000000"}
                      className={style.title}
                    />
                    <CustomText
                      size={"18px"}
                      weight={600}
                      value={0}
                      color={"#000000"}
                      className={style.value}
                      parentClassName={style.valueContainer}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Col>

        <Col xs={12} sm={12} md={12} xl={5} className={style.typeDev}>
          <CustomText
            size={"20px"}
            weight={600}
            lineHeight={"44px"}
            value={"Development group"}
            // color={"#3D4A52"}
          />
          <PieChartCard
            data={dataInPieFormat(
              // @ts-ignore
              devlopmentGroupInfo?.count_of_farmers_with_dev_groups ?? {}
            )}
            unit={"Farmers"}
          />
        </Col>
        <Col xs={12} sm={12} md={12} xl={4} className={style.typeDevloc}>
          <CustomText
            size={"20px"}
            weight={600}
            lineHeight={"44px"}
            value={"Distribution of development group by location"}
            // color={"#3D4A52"}
          />
          <PieChartCard
            data={dataInPieFormat(
              devlopmentGroupInfo?.development_groups_by_location ?? {}
            )}
            unit={"DGs"}
          />
        </Col>
      </Row>
      <hr />
      <Box className="mt30">
        <CustomText
          size={"24px"}
          weight={700}
          lineHeight={"44px"}
          value={"Crop information details"}
          // color={"#3D4A52"}
        />
      </Box>
      <Row sm={1} md={2} lg={4}>
        {cropFieldSize?.[0]?.name ? (
          <Col lg={2} className={style.staticCard}>
            <CustomCard
              title={cropFieldSize?.[0]?.name}
              value={cropFieldSize?.[0]?.value}
              dotColor="#00AB55"
            />
          </Col>
        ) : (
          ""
        )}
        {cropFieldSize?.[1]?.name ? (
          <Col lg={2} className={style.staticCard}>
            <CustomCard
              title={cropFieldSize?.[1]?.name}
              value={cropFieldSize?.[1].value}
              dotColor="#B800D6"
            />
          </Col>
        ) : (
          ""
        )}
        {cropFieldSize?.[2]?.name ? (
          <Col lg={2} className={style.staticCard}>
            <CustomCard
              title={cropFieldSize?.[2]?.name}
              value={cropFieldSize?.[2]?.value}
              dotColor="#3A70CA"
            />
          </Col>
        ) : (
          ""
        )}
        {cropFieldSize?.[3]?.name ? (
          <Col lg={2} className={style.staticCard}>
            <CustomCard
              title={cropFieldSize?.[3]?.name}
              value={cropFieldSize?.[3]?.value}
              dotColor="#5C046A"
            />
          </Col>
        ) : (
          ""
        )}
        {cropFieldSize?.[4]?.name ? (
          <Col lg={2} className={style.staticCard}>
            <CustomCard
              title={cropFieldSize?.[4]?.name}
              value={cropFieldSize?.[4]?.value}
              dotColor="#FFE227"
            />
          </Col>
        ) : (
          ""
        )}
      </Row>
      <Row className={style.graphRow}>
        <Col lg={6}>
          <CustomText
            size={"20px"}
            weight={600}
            lineHeight={"44px"}
            value={"Size of land per cultivation "}
            // color={"#3D4A52"}
          />
          <PieChartCard
            // @ts-ignore

            data={dataInPieFormat(
              // @ts-ignore

              cropInfo.number_of_cultivations_per_crop ?? {}
            )}
            unit={"hector"}
          />
        </Col>
        <Col lg={6}>
          <CustomText
            size={"20px"}
            weight={600}
            lineHeight={"44px"}
            value={"Soil type"}
            // color={"#3D4A52"}
          />
          <BarGraphPercentage
            barColor="#003690"
            // @ts-ignore

            data={dataInPieFormat(cropInfo.soil_info ?? {})}
          />
        </Col>
        <Col lg={12}>
          <CustomText
            size={"20px"}
            weight={600}
            lineHeight={"44px"}
            value={"Location based crop production"}
            // color={"#3D4A52"}
          />
          <BarGraphCard
            data={convertLivestockWithLocation(
              // @ts-ignore

              cropInfo?.crop_production_based_on_location ?? {}
            )}
            dataKeys={[
              {
                key: "teff",
                fill: "#c3cb44",
              },
              {
                key: "potato",
                fill: "#4185e1",
              },
              {
                key: "niger",
                fill: "#35ba27",
              },
              {
                key: "gardening",
                fill: "#294f84",
              },
              {
                key: "sorghum",
                fill: "#4be44e",
              },
              {
                key: "other_vegetables",
                fill: "#c5f53c",
              },
              {
                key: "common_haricot_bean",
                fill: "#92017f",
              },
              {
                key: "fruit_trees",
                fill: "#74b67d",
              },
              {
                key: "chickpea",
                fill: "#141346",
              },
              {
                key: "cowpea",
                fill: "#e9d62d",
              },
              {
                key: "pearl_millet",
                fill: "#ddf1e1",
              },
              {
                key: "sesame",
                fill: "#61637e",
              },
              {
                key: "ground_nut",
                fill: "#56f9f",
              },
              {
                key: "linseed",
                fill: "#2fda22",
              },
              {
                key: "wheat",
                fill: "#b7232c",
              },
              {
                key: "field_pea",
                fill: "#6b5ead",
              },
              {
                key: "red_lentil",
                fill: "#bc176e",
              },
              {
                key: "onion",
                fill: "#f513bf",
              },
              {
                key: "sun_flower",
                fill: "#54cc13",
              },
              {
                key: "faba_bean",
                fill: "#6e1ed1",
              },
              {
                key: "irrigated_rice",
                fill: "#1a0c7c",
              },
              {
                key: "tomato",
                fill: "#a099dd",
              },
              {
                key: "soybean",
                fill: "#1c92cb",
              },
              {
                key: "barley",
                fill: "#574ed5",
              },
              {
                key: "maize",
                fill: "#f4cc52",
              },
              {
                key: "safflower",
                fill: "#374fbc",
              },
              {
                key: "cabbage",
                fill: "#9808dc",
              },
              {
                key: "rape",
                fill: "#a3fd51",
              },
            ]}
            Values={false}
            axisLine={false}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <CustomText
          size={"24px"}
          weight={700}
          lineHeight={"44px"}
          value={"Livestock details"}
          color={"#3D4A52"}
        />
        <Col md={6}>
          <CustomCard
            title={"No.of livestock count"}
            // @ts-ignore

            value={livestockDetails?.counts?.total_number_of_live_stocks ?? 0}
            dotColor="#B800D6"
          />
        </Col>
        <Col md={6}>
          <CustomCard
            title={"No.of breed count"}
            // @ts-ignore

            value={livestockDetails?.total_no_of_breed_counts ?? 0}
            dotColor="#3A70CA"
          />
        </Col>
        {/* <Col lg={4}>
          <CustomCard
            title={"Average age of livestock"}
            // @ts-ignore
            value={livestockDetails?.age ?? 0}
            dotColor="#3A70CA"
          />
        </Col> */}
      </Row>
      {/* <Row>
        <Col lg={12}>
          <CustomText
            size={"20px"}
            weight={600}
            lineHeight={"44px"}
            value={"Livestock breeds"}
            // color={"#3D4A52"}
          />
          <BarGraphCard
            barColor="#003690"
            data={dataInPieFormat(
              // @ts-ignore

              livestockDetails?.livestock_breeds ?? {}
            )}
          />
        </Col>
      </Row> */}

      <Row>
        <Col lg={6}>
          <CustomText
            size={"20px"}
            weight={600}
            lineHeight={"44px"}
            value={"Livestock type"}
            // color={"#3D4A52"}
          />
          <PieChartCard
            data={dataInPieFormat(
              // @ts-ignore

              livestockDetails?.livestock_type_with_farmer_counts
            )}
          />
        </Col>
        <Col lg={6}>
          <CustomText
            size={"20px"}
            weight={600}
            lineHeight={"44px"}
            value={"Geography"}
            // color={"#3D4A52"}
          />
          <BarGraphCard
            data={convertLivestockWithLocation(
              // @ts-ignore

              livestockDetails?.livestock_with_location ?? {}
            )}
            dataKeys={[
              { key: "cattle", fill: "#FF3D00" },
              { key: "equine", fill: "#B800D6" },
              { key: "fish", fill: "#FFE227" },
              { key: "goat", fill: "#5C046A" },
              { key: "sheep", fill: "#3A70CA" },
              { key: "poultry", fill: "#8884d8" },
            ]}
          />
        </Col>
      </Row>
    </Box>
  );
};

export default Dashboard;

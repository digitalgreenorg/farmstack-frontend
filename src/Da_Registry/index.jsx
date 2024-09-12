import CustomText from "../Farmer-Registry/CustomText/CustomText"
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import HTTPService from "features/default/src/Services/HTTPServiceFarmer";
import { getRoleLocal, getTokenLocal, handleApiError } from "../features/default/src/Utils/Common"
import UrlConstants from "features/default/src/Constants/UrlConstants";
import labels from "features/default/src/Constants/labels";
import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Bar, BarChart, Cell, Tooltip, XAxis, YAxis } from "recharts";
import { getKebele, getRegion, getWoreda, getZone } from "../features/default/src/Utils/Common"
import style from "./index.module.css";
import CardWithSingleGraph from "./stateless/CardWithSingleGraph";
import CardWithMultiValueGraph from "./stateless/ChartWithMultiValueGraph";
import FemaleMaleCard from "./stateless/FemaleMaleCardGraph";
import FemaleMaleCardStatic from "./stateless/FemaleMaleCardStatic";
import Filter from "./stateless/Filter";
import LoadingForCards from "./stateless/LoadingForCards";
import LocationCard from "./stateless/LocationStats";
import NoDataAvailable from "./stateless/NoData";
import PieChartGraph from "./stateless/PieChartGraph";
import { FarmStackContext } from "common/components/context/DefaultContext/FarmstackProvider";

const Dashboard = () => {
  const [totalNoOfEAs, setTotalNoOfEAs] = useState([
    {
      name: "total",
      value: 0,
      fill: "#f7f7f7",
    },
    {
      name: "Total no.of EAs",
      value: 0,
      fill: "#00AB55",
    },
  ]);
  const [EAsByRegion, setEAsByRegion] = useState([{ name: "", value: 0 }]);
  const [averageEAs, setAverageEAs] = useState([
    {
      name: "total",
      value: 0,
      fill: "#f7f7f7",
    },
    {
      name: "Total no.of EAs",
      value: 0,
      fill: "#F5B406",
    },
  ]);
  const [totalSpecialisations, setTotalSpecialisations] = useState();
  const [filterTotalNoOfEAs, setFilterTotalNoOfEAs] = useState([
    {
      name: "total",
      value: 0,
    },
    {
      name: "Total no.of EAs",
      value: 0,
    },
  ]);
  const [filterAverageEAs, setFilterAverageEAs] = useState([
    {
      name: "total",
      value: 0,
    },
    {
      name: "Total no.of EAs",
      value: 0,
    },
  ]);
  const [femaleMaleCount, setFemaleMaleCount] = useState([
    { name: "Male", value: 0 },
    { name: "Female", value: 0 },
  ]);
  const [eaBySpecialisations, setEaBySpecialisations] = useState([]);
  const [locatioStats, setLocationStats] = useState({
    Region: 0,
    Zone: 0,
    Woreda: 0,
    Kebele: 0,
  });
  const [querysetLocationStats, setQuerysetLocationStats] = useState({
    Region: 0,
    Zone: 0,
    Woreda: 0,
    Kebele: 0,
  });
  const [easByEducation, setEasByEducation] = useState([]);
  const [gender, setGender] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [kebele, setKebele] = useState("");
  const [zone, setZone] = useState("");
  const [region, setRegion] = useState("");
  const [woreda, setWoreda] = useState("");
  const [genders, setGenders] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [specializations, setSpecialisations] = useState([]);
  const [zones, setZones] = useState([]);
  const [regions, setRegions] = useState([]);
  const [woredas, setWoredas] = useState([]);
  const [kebeles, setKebeles] = useState([]);
  const [filterUpdated, setFilterUpdated] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(0);
  const [totalGenders, setTotalGenders] = useState([
    { name: "Male", value: 0 },
    { name: "Female", value: 0 },
  ]);
  const {
    callLoader,
    callToast,
    // callStaticDataLoader,
    // callDaBySpecializationLoader,
    // isDaBySpecializationLoading,
  } = useContext(FarmStackContext);
  const history = useHistory()

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  const containerStyle = {
    marginLeft: mobile || tablet ? "30px" : miniLaptop ? "50px" : "50px",
    marginRight: mobile || tablet ? "30px" : miniLaptop ? "50px" : "50px",
    marginTop: "30px",
  };

  let colours = ["#F5B406", "#00AB55", "#0050D6", "#FF780A"];


  const customizedGroupTick = (props) => {
    const { payload } = props;
    return (
      <g>
        <g>
          <text
            {...props}
            style={{ textAlign: "right", margin: "10px", padding: "10px" }}>
            {payload?.value}
          </text>
          {/* <text x={x} y={y}>
        data
      </text> */}
        </g>
      </g>
    );
    
  };

  const generateUrl = () => {
    const role = getRoleLocal();
    const queryParams = [
      role !== labels.ROLES.WOREDA_OFFICER &&
        role !== labels.ROLES.EA_LEADER &&
        role !== labels.ROLES.ZONAL_OFFICER &&
        role !== labels.ROLES.REGIONAL_OFFICER &&
        role !== labels.ROLES.KEBELE_OFFICER &&
        region &&
        region !== "none" &&
        `region_id=${region}`,
      role !== labels.ROLES.ZONAL_OFFICER &&
        role !== labels.ROLES.WOREDA_OFFICER &&
        role !== labels.ROLES.EA_LEADER &&
        role !== labels.ROLES.KEBELE_OFFICER &&
        zone &&
        zone != "none" &&
        `zone_id=${zone}`,
      role !== labels.ROLES.WOREDA_OFFICER &&
        role !== labels.ROLES.EA_LEADER &&
        role !== labels.ROLES.KEBELE_OFFICER &&
        woreda &&
        woreda != "none" &&
        `woreda_id=${woreda}`,
      role !== labels.ROLES.KEBELE_OFFICER && kebele && kebele != "none" && `kebele_id=${kebele}`,
      specialisation && specialisation != "none" && `specialization=${specialisation}`,
      educationLevel && educationLevel != "none" && `education_level=${educationLevel}`,
      gender && gender != "none" && `gender=${gender}`,
    ]
      .filter(Boolean)
      .join("&");

    return `${UrlConstants.base_url_da_registry}${UrlConstants.dashboard}?${queryParams}`;
  };
  const getStaticData = () => {
    // callStaticDataLoader(true);
    let accessToken = getTokenLocal() ?? false;
    let tempUrl = UrlConstants.base_url_da_registry + UrlConstants.dashboard_static_data;
    let payload = "";
    HTTPService("GET", tempUrl, payload, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((response) => {
        let tmpAverageEA = [...averageEAs];
        tmpAverageEA[1].value = response?.data?.average_ea_per_kebele;
        tmpAverageEA[0].value = response?.data?.average_ea_per_kebele * 1.4;
        setAverageEAs(tmpAverageEA);
        let tmpTotalNoEAs = [...totalNoOfEAs];
        tmpTotalNoEAs[1].value = response?.data?.total_eas;
        tmpTotalNoEAs[0].value = response?.data?.total_eas * 1.3;
        setTotalNoOfEAs(tmpTotalNoEAs);
        // gender count
        let updatedGenderCount = [...totalGenders];
        const maleTotalCount = response?.data?.ea_by_gender?.Male || 0;
        const femaleTotalCount = response?.data?.ea_by_gender?.Female || 0;
        updatedGenderCount[0].value = maleTotalCount;
        updatedGenderCount[1].value = femaleTotalCount;

        setTotalGenders(updatedGenderCount);

        const easByRegionData = response?.data?.eas_by_location?.eas_by_regions;
        const easByRegionArray = easByRegionData
          ? Object.keys(easByRegionData).map((regionName) => {
              const formattedRegionName = regionName
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return {
                name: formattedRegionName,
                value: easByRegionData[regionName],
              };
            })
          : [];

        const locationStats = {};
        if (response?.data?.location_stats?.Region) {
          locationStats.Region = response.data.location_stats.Region;
        }

        if (response?.data?.location_stats?.Zone) {
          locationStats.Zone = response.data.location_stats.Zone;
        }

        if (response?.data?.location_stats?.Woreda) {
          locationStats.Woreda = response.data.location_stats.Woreda;
        }

        if (response?.data?.location_stats?.Kebele) {
          locationStats.Kebele = response.data.location_stats.Kebele;
        }
        setLocationStats(locationStats);

        setEAsByRegion(easByRegionArray);

        const totalSpecialisation = response?.data?.total_specialization;
        setTotalSpecialisations(totalSpecialisation);
        // callStaticDataLoader(false);
      })
      .catch((error) => {
        // callStaticDataLoader(false);

        let errorObj = handleApiError(error);
        if (errorObj?.path) {
          history.push(errorObj.path);
        }
        if (errorObj?.toast) {
          callToast("error", errorObj?.errorMessage, true);
        } else if (errorObj?.errorMessage && errorObj?.path) {
          callToast("error", errorObj?.errorMessage, true);
        }
      });
  };

  const educationLevelFormatednames = {
    level_iii: "Level 3",
    null: "Null",
    level_ii: "Level 2",
    NULL: "Null",
    "2nd_degree": "2nd Degree",
    level_iv: "Level 4",
    level_i: "Level 1",
    diploma: "Diploma",
    phd: "Phd",
    "1st_degree": "1st Degree",
  };

  const getTotalNoOfEAs = (clearFilter) => {
    callLoader(true);
    // callDaBySpecializationLoader(true);
    let accessToken = getTokenLocal() ?? false;
    let tempUrl = generateUrl();
    if (clearFilter) {
      tempUrl = UrlConstants.base_url_da_registry + UrlConstants.dashboard;
    }
    let payload = "";
    HTTPService("GET", tempUrl, payload, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((response) => {
        let tmpAverageEA = [...filterAverageEAs];
        tmpAverageEA[1].value = response?.data?.average_ea_per_kebele;
        tmpAverageEA[0].value = response?.data?.average_ea_per_kebele * 1.4;
        setFilterAverageEAs(tmpAverageEA);

        // Assuming response.data.queryset_location_stats is of the correct type
        if (response?.data?.queryset_location_stats) {
          // Ensure that the object has the required structure
          const stats = response.data.queryset_location_stats;
          const newStats = {
            Region: stats.Region || 0,
            Zone: stats.Zone || 0,
            Woreda: stats.Woreda || 0,
            Kebele: stats.Kebele || 0,
          };
          setQuerysetLocationStats(newStats);
        }

        let tmpTotalNoEAs = [...filterTotalNoOfEAs];
        tmpTotalNoEAs[1].value = response?.data?.total_eas;
        tmpTotalNoEAs[0].value = response?.data?.total_eas * 1.3;
        setFilterTotalNoOfEAs(tmpTotalNoEAs);
        let updatedCounts = [...femaleMaleCount];

        const maleCount = response?.data?.ea_by_gender?.Male || 0;
        const femaleCount = response?.data?.ea_by_gender?.Female || 0;

        updatedCounts[0].value = maleCount;
        updatedCounts[1].value = femaleCount;
        // Set the updated state
        setFemaleMaleCount(updatedCounts);
        // let updatedGenderCount = [...totalGenders];
        // const maleTotalCount =
        //   response?.data?.ea_by_gender_total_stats?.Male || 0;
        // const femaleTotalCount =
        //   response?.data?.ea_by_gender_total_stats?.Female || 0;
        // updatedGenderCount[0].value = maleTotalCount;
        // updatedGenderCount[1].value = femaleTotalCount;

        // setTotalGenders(updatedGenderCount);
        const eaBySpecializationsKeys = Object.keys(response?.data?.ea_by_specializations);
        let tempArr = [];

        eaBySpecializationsKeys.map((key, index) => {
          const formattedKey = key
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          let obj = {
            name: formattedKey,
            value: response?.data?.ea_by_specializations[key],
          };
          tempArr.push(obj);
        });

        var sortedEasSpecialization = tempArr.sort((a, b) => b.value - a.value);
        setEaBySpecialisations(sortedEasSpecialization);

        const easByEducationArray = Object.entries(response.data.ea_by_education).map(([name, value]) => {
          return {
            name: educationLevelFormatednames[name] ?? name,
            value: value ,
          };
        });

        var sortedEasByEducationArray = easByEducationArray.sort((a, b) => b.value - a.value);
        setEasByEducation(sortedEasByEducationArray);

        callLoader(false);
        // callDaBySpecializationLoader(false);
      })
      .catch((error) => {
        callLoader(false);
        // callDaBySpecializationLoader(false);

        let errorObj = handleApiError(error);
        if (errorObj?.path) {
          history.push(errorObj.path);
        }
        if (errorObj?.toast) {
          callToast("error", errorObj?.errorMessage, true);
        } else if (errorObj?.errorMessage && errorObj?.path) {
          callToast("error", errorObj?.errorMessage, true);
        }
      });
  };
  const getByRegions = () => {
    HTTPService("GET", UrlConstants.base_url_da_registry + UrlConstants.filter_regions, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((res) => {
        setRegions(res?.data);
      })
      .catch((error) => {
        callLoader(false);
        let errorObj = handleApiError(error);
        if (errorObj?.path) {
          history.push(errorObj.path);
        }
        if (errorObj?.toast) {
          callToast("error", errorObj?.errorMessage, true);
        } else if (errorObj?.errorMessage && errorObj?.path) {
          callToast("error", errorObj?.errorMessage, true);
        }
      });
  };
  const getByZones = (regionId) => {
    let params = regionId ? `?region=${regionId}` : "";
    let url = UrlConstants.base_url_da_registry + UrlConstants.filter_zones + params;
    callLoader(true);

    HTTPService("GET", url, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((res) => {
        callLoader(false);
        setZones(res?.data);
      })
      .catch((error) => {
        callLoader(false);
        let errorObj = handleApiError(error);
        if (errorObj?.path) {
          history.push(errorObj.path);
        }
        if (errorObj?.toast) {
          callToast("error", errorObj?.errorMessage, true);
        } else if (errorObj?.errorMessage && errorObj?.path) {
          callToast("error", errorObj?.errorMessage, true);
        }
      });
  };
  const getByWoredas = (zoneId) => {
    let params = zoneId ? `?zone=${zoneId}` : "";
    let url = UrlConstants.base_url_da_registry + UrlConstants.filter_woredas + params;
    callLoader(true);

    HTTPService("GET", url, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((res) => {
        callLoader(false);

        setWoredas(res?.data);
      })
      .catch((error) => {
        callLoader(false);
        let errorObj = handleApiError(error);
        if (errorObj?.path) {
          history.push(errorObj.path);
        }
        if (errorObj?.toast) {
          callToast("error", errorObj?.errorMessage, true);
        } else if (errorObj?.errorMessage && errorObj?.path) {
          callToast("error", errorObj?.errorMessage, true);
        }
      });
  };
  const getByKebeles = (woredaId) => {
    let params = woredaId ? `?woreda=${woredaId}` : "";
    let url = UrlConstants.base_url_da_registry + UrlConstants.filter_kebeles + params;
    callLoader(true);
    HTTPService("GET", url, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((res) => {
        callLoader(false);

        setKebeles(res?.data);
      })
      .catch((error) => {
        callLoader(false);
        let errorObj = handleApiError(error);
        if (errorObj?.path) {
          // Commented this for untill this api is fix from backend
          // history.push(errorObj.path);
        }
        if (errorObj?.toast) {
          callToast("error", errorObj?.errorMessage, true);
        } else if (errorObj?.errorMessage && errorObj?.path) {
          callToast("error", errorObj?.errorMessage, true);
        }
      });
  };
  const getByGenders = () => {
    HTTPService("GET", UrlConstants.base_url_da_registry + UrlConstants.filter_genders, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((response) => {
        setGenders(response?.data);
      })
      .catch((error) => {
        callLoader(false);
        let errorObj = handleApiError(error);
        if (errorObj?.path) {
          history.push(errorObj.path);
        }
        if (errorObj?.toast) {
          callToast("error", errorObj?.errorMessage, true);
        } else if (errorObj?.errorMessage && errorObj?.path) {
          callToast("error", errorObj?.errorMessage, true);
        }
      });
  };
  const getBySpecializations = () => {
    HTTPService("GET", UrlConstants.base_url_da_registry + UrlConstants.filter_specializations, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((response) => {
        setSpecialisations(response?.data);
      })
      .catch((error) => {
        callLoader(false);
        let errorObj = handleApiError(error);
        if (errorObj?.path) {
          history.push(errorObj.path);
        }
        if (errorObj?.toast) {
          callToast("error", errorObj?.errorMessage, true);
        } else if (errorObj?.errorMessage && errorObj?.path) {
          callToast("error", errorObj?.errorMessage, true);
        }
      });
  };
  const getByEducation = () => {
    HTTPService("GET", UrlConstants.base_url_da_registry + UrlConstants.filter_education_level, null, false, false, null, false, {
      "X-SHARED-KEY": "zjejd25s",
      "Accept": "application/json"
    })
      .then((response) => {
        setEducationLevels(response?.data);
      })
      .catch((error) => {
        callLoader(false);
        let errorObj = handleApiError(error);
        if (errorObj?.path) {
          history.push(errorObj.path);
        }
        if (errorObj?.toast) {
          callToast("error", errorObj?.message, true);
        } else if (errorObj?.errorMessage && errorObj?.path) {
          callToast("error", errorObj?.errorMessage, true);
        }
      });
  };

  const handleFilterAccess = () => {
    const role = getRoleLocal();

    if (getRegion()?.id) {
      setRegion(getRegion()?.id);
    }

    if (getZone()?.id) {
      setZone(getZone()?.id);
      if (role === labels.ROLES.ZONAL_OFFICER) {
        getByWoredas(getZone()?.id);
      }
    }

    if (getWoreda()?.id) {
      setWoreda(getWoreda()?.id);
      if (role === labels.ROLES.WOREDA_OFFICER) {
        getByKebeles(getWoreda()?.id);
      }
    }

    if (getKebele()?.id) {
      setKebele(getKebele()?.id);
    }
  };

  // Used to control the overflow behaviour of ea by specialization horizontal barchart section
  const eaBySpecialisationsRefContainerRef = useRef(null);

  useEffect(() => {
    if (eaBySpecialisationsRefContainerRef.current) {
      if (eaBySpecialisationsRefContainerRef.current.scrollTop) {
        eaBySpecialisationsRefContainerRef.current.scrollTop = 0;
      }
    }
  }, [eaBySpecialisations]);

  useEffect(() => {
    getStaticData();
    getTotalNoOfEAs(false);
    getByEducation();
    getByGenders();
    getBySpecializations();
    getByRegions();
  }, []);

  useEffect(() => {
    // getTotalNoOfEAs(false);
  }, [filterUpdated]);

  useEffect(() => {
    handleFilterAccess();
    if (getRegion()?.id && getRegion()?.name) {
      getByZones(getRegion().id);
    }
    if (getZone()?.id && getZone()?.name) {
      getByWoredas(getZone().id);
    }
    if (getWoreda()?.id && getWoreda()?.name) {
      getByKebeles(getWoreda().id);
    }
  }, [toggleFilter]);

  const CustomizedLabelNew = ({ x, y, value }) => (
    <text
      x={x + 10}
      y={y}
      dy={-10}
      textAnchor="start"
      fill="#333">
      {value}
    </text>
  );
  let graphHeight =
    typeof eaBySpecialisations == "object" && Object.keys(eaBySpecialisations).length
      ? Object.keys(eaBySpecialisations).length * 50
      : 500;
  return (
    <Box sx={containerStyle}>
      <Box className="mt30">
        <CustomText
          size={"32px"}
          weight={700}
          lineHeight={"44px"}
          value={"DA registry dashboard"}
          color={"#3D4A52"}
        />
      </Box>
      <div>
        <CustomText
          size={"20px"}
          weight={600}
          lineHeight={"24px"}
          value={"Total Stats"}
          color={"#3D4A52"}
          parentClassName={style.graphHeadingContainer}
          className={style.graphHeading}
        />
      </div>
      <Grid container>
        <Grid item xl={2} lg={1.5} md={4} sm={6} xs={12} sx={{ paddingX:'8px' }}>
          <CardWithSingleGraph
            title={"Total no.of DAs"}
            graph={false}
            graphData={totalNoOfEAs}
            value={totalNoOfEAs[1].value}
            dotColor="#00AB55"
          />
        </Grid>
        <Grid item xl={2} lg={1.75} md={4} sm={6} xs={12} sx={{ paddingX:'8px' }}>
          <CardWithSingleGraph
            title={"Average DA per kebele"}
            graph={false}
            graphData={averageEAs}
            value={averageEAs[1].value}
            dotColor={"#FF780A"}
          />
        </Grid>
        <Grid item xl={2} lg={2} md={4} sm={6} xs={12} sx={{ paddingX:'8px' }}>
          <FemaleMaleCardStatic data={totalGenders} />
        </Grid>
        <Grid item xl={2} lg={1.5} md={4} sm={6} xs={12} sx={{ paddingX:'8px' }}>
          <CardWithSingleGraph
            title={"Total specialisations "}
            graph={false}
            value={totalSpecialisations}
          />
        </Grid>
        <Grid item xl={2} lg={2.5} md={4} sm={6} xs={12} sx={{ paddingX:'8px' }}>
          <CardWithMultiValueGraph
            data={EAsByRegion}
            dataKey="region_name"
            dataValue="total_eas"
            maxHeight={"120px"}
          />
        </Grid>
        <Grid item xl={2} lg={2.75} md={4} sm={6} xs={12} sx={{ paddingX:'8px' }}>
          <LocationCard data={locatioStats} title={"Location stats"} />
        </Grid>
      </Grid>
      <div>
        <CustomText
          size={"20px"}
          weight={600}
          lineHeight={"24px"}
          value={"Filter by"}
          color={"#3D4A52"}
          className={style.graphHeading}
          parentClassName={style.graphHeadingContainer}
        />
      </div>
      <Row>
        <Col lg={12}>
          <Filter
            setZones={setZones}
            setWoredas={setWoredas}
            setKebeles={setKebeles}
            gender={gender}
            setGender={setGender}
            educationLevel={educationLevel}
            setEducationLevel={setEducationLevel}
            specialisation={specialisation}
            setSpecialisation={setSpecialisation}
            kebele={kebele}
            setKebele={setKebele}
            zone={zone}
            setZone={setZone}
            region={region}
            setRegion={setRegion}
            woreda={woreda}
            setWoreda={setWoreda}
            regions={regions}
            zones={zones}
            woredas={woredas}
            kebeles={kebeles}
            genders={genders}
            specializations={specializations}
            educationLevels={educationLevels}
            getTotalNoOfEAs={getTotalNoOfEAs}
            getBySpecializations={getBySpecializations}
            getByZones={getByZones}
            getByWoredas={getByWoredas}
            getByKebeles={getByKebeles}
            handleFilterAccess={handleFilterAccess}
            toggleFilter={toggleFilter}
            setToggleFilter={setToggleFilter}
          />
        </Col>
      </Row>
      <div>
        <CustomText
          size={"20px"}
          weight={600}
          lineHeight={"24px"}
          value={"DA by region"}
          color={"#3D4A52"}
          className={style.graphHeading}
          parentClassName={style.graphHeadingContainer}
        />
      </div>
      <Row>
        <Col
          xl={3}
          lg={6}
          md={6}
          sm={12}>
          <CardWithSingleGraph
            title={"Total no.of DAs"}
            graph={false}
            dotColor="#00AB55"
            value={filterTotalNoOfEAs ? filterTotalNoOfEAs[1].value : totalNoOfEAs[1].value}
          />
        </Col>
        <Col
          xl={3}
          lg={6}
          md={6}
          sm={12}>
          <CardWithSingleGraph
            title={"Average DA per kebele"}
            graph={false}
            dotColor="#E86872"
            value={filterAverageEAs ? filterAverageEAs[1].value : averageEAs[1].value}
          />
        </Col>
        <Col
          xl={3}
          lg={6}
          md={6}
          sm={12}>
          <FemaleMaleCard data={femaleMaleCount} />
        </Col>
        <Col
          xl={3}
          lg={6}
          md={6}
          sm={12}>
          {/* className={style.maxContent + " " + style.locationStatsCol}> */}
          <LocationCard
            data={querysetLocationStats}
            title={"Location stats"}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <div>
            <CustomText
              size={"20px"}
              weight={600}
              lineHeight={"24px"}
              value={"DA by specialisations"}
              color={"#3D4A52"}
              className={style.graphHeading}
              parentClassName={style.graphHeadingContainer}
            />
          </div>

          {eaBySpecialisations.length > 0 ? (
            <Col
              ref={eaBySpecialisationsRefContainerRef}
              className={style.verticalGraph}>
              <BarChart
                layout="vertical"
                width={850}
                height={graphHeight}
                data={eaBySpecialisations}
                barSize={12}
                margin={{ left: 30 }}>
                <XAxis
                  type="number"
                  includeHidden
                  axisLine={false}
                  hide={true}
                />
                <YAxis
                  tick={{
                    fontSize: 15,
                    color: "red",
                  }}
                  tickLine={false}
                  tickMargin={20}
                  dataKey="name"
                  type="category"
                  width={300}
                  axisLine={false}

                  // tickLine={false}
                  // tick={customizedGroupTick}
                  // dataKey="name"
                  // type="category"
                  // // @ts-ignore
                  // padding={{ left: 400 }}
                  // // tickMargin={150}
                  // margin={{ left: 150 }}
                  // // dy={150}
                />
                <Tooltip />
                {/* <Legend /> */}
                <Bar
                  minPointSize={6}
                  isAnimationActive={false}
                  dataKey="value"
                  background={{ fill: "#D9D9D9", radius: 10 }}
                  activeBar={{ stroke: "white", strokeWidth: 2 }}>
                  {/* @ts-ignore */}
                  {eaBySpecialisations?.map((entry, index) => (
                    <>
                      <Cell
                        radius={10}
                        fill={colours[index % colours.length]}
                      />
                    </>
                  ))}
                  {/* <LabelList
                  dataKey="pv"
                  position="right"
                  content={CustomizedLabelNew}
                /> */}
                  {/* {eaBySpecialisations.map((entry, index) => (
                  <LabelList
                    dataKey="pv"
                    position="right"
                    content={({ x, y, value }) => (
                      <text
                        x={x + maxPv + 100}
                        y={y}
                        dy={-10}
                        textAnchor="start"
                        fill="#333"
                      >
                        {value}
                      </text>
                    )} */}
                  {/* />
                ))} */}
                </Bar>
              </BarChart>
            </Col>
          ) : (
            <Box className={style.noData}>
              {/* {isDaBySpecializationLoading ? <LoadingForCards /> : <NoDataAvailable />} */}
              <NoDataAvailable />
            </Box>
          )}
        </Col>

        <Col lg={6}>
          <div>
            <CustomText
              size={"20px"}
              weight={600}
              lineHeight={"24px"}
              value={"DA by education level "}
              color={"#3D4A52"}
              className={style.graphHeading}
              parentClassName={style.graphHeadingContainer}
            />
          </div>
          <PieChartGraph
            data={easByEducation}
            dataKey="region_name"
            dataValue="total_eas"
          />
        </Col>
      </Row>
      <Row>
        {/* <Col lg={6} style={{ height: "270px" }}>
          <div>
            <CustomText
              size={"20px"}
              weight={600}
              lineHeight={"24px"}
              value={"Data disaggregated"}
              color={"#3D4A52"}
              className={style.graphHeading}
              parentClassName={style.graphHeadingContainer}
            />
          </div>
          <ResponsiveContainer height={"100%"} width={"100%"}>
            <BarChart
              // width={600}
              // height={800}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              // barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3" />
              <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
          </ResponsiveContainer>
        </Col> */}
        {/* <Col lg={6}>
          <div>
            <CustomText
              size={"20px"}
              weight={600}
              lineHeight={"24px"}
              value={"DA by education level "}
              color={"#3D4A52"}
              className={style.graphHeading}
              parentClassName={style.graphHeadingContainer}
            />
          </div>
          <PieChartGraph
            data={easByEducation}
            dataKey="region_name"
            dataValue="total_eas"
          />
        </Col> */}
      </Row>
    </Box>
  );
};

export default Dashboard;

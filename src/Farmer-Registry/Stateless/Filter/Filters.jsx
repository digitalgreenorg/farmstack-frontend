import React from "react";
import { Box, Button, FormControlLabel, Checkbox, Grid } from "@mui/material";
import Chip from "@mui/material/Chip";
import CustomText from "../../CustomText/CustomText";
import style from "./index.module.css";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapIcon from "@mui/icons-material/Map";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PetsIcon from "@mui/icons-material/Pets";
import GrassIcon from "@mui/icons-material/Grass";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  isLogedInUserAdmin,
  isLogedInUserNationalOfficer,
  isLogedInUserRegionalOfficer,
  isLogedInUserWoredaOfficer,
  isLogedInUserZonalOfficer,
} from "../../../features/default/src/Utils/Common";

export default function Filters(props) {
  const {
    regions,
    zones,
    woredas,
    kebeles,
    getZones,
    getWoredas,
    getKebeles,
    setLocation,
    location,
    genders,
    maritalStatus,
    houseHoldTypes,
    liveStockTypes,
    farmerFilter,
    setFarmerFilter,
    livestockFilter,
    setLivestockFilter,
    cropTypeOptions,
    cropType,
    setCropType,
    handleApplyFilter,
    setToggleFilter,
    setAllZones,
    setAllWoreda,
    setAllKabele,
    selectedRegions,
    setSeletedRegions,
    selectedZones,
    setSelectedZones,
    selectedWoredas,
    setSelectedWoredas,
    selectedKebeles,
    setSelectedKebeles,
  } = props;
  console.log("🚀 ~ file: Filters.tsx:61 ~ Filters ~ zones:", zones);
  const [showFilter, setShowFilter] = useState(false);
  const [regionName, setRegionName] = useState([]);

  console.log("regions", regions);

  const [type, setType] = useState("");

  const handleFilterClick = (newType) => {
    if (type == newType) {
      setType("");
    } else {
      setType(newType);
    }
    if (type == newType) {
      setShowFilter(!showFilter);
    } else {
      setShowFilter(true);
    }
  };
  const clearAllFilters = () => {
    setShowFilter(false);
    setCropType({
      cropType: [],
      farmerType: "",
    });

    setLivestockFilter({
      livestock: [],
      age: "",
      breed: "",
    });

    setFarmerFilter({
      gender: [],
      maritalStatus: [],
      householdType: [],
      farmerCategory: "",
    });

    setLocation({
      region: "",
      zone: "",
      woreda: "",
      kebele: "",
    });
    setSeletedRegions([]);
    setSelectedZones([]);
    setSelectedKebeles([]);
    setSelectedWoredas([]);
    setAllZones([]);
    setAllWoreda([]);
    setAllKabele([]);
    setToggleFilter((prv) => prv + 1);
    handleApplyFilter(true);
    setType("");
  };

  const FilterDropdownButton = ({ children, onClick, className }) => {
    return (
      <Grid item xs={4} sm={1.7} md={1.32} lg={1.3} xl={1.34}>
        <div
          onClick={onClick}
          className={className}
          style={{ maxWidth: "fit-content", marginTop: "2px" }}
        >
          {children}
        </div>
      </Grid>
    );
  };

  return (
    <Box>
      <Box className={style.mBottom25}>
        <CustomText
          size={"20px"}
          weight={700}
          lineHeight={"28px"}
          value={"Filters"}
          color={"#3D4A52"}
          parentClassName="mt30"
        />
      </Box>
      <Grid
        container
        className="mt10 align-items-center"
        // className={`d-flex mt10 justify-content- align-items-center flex-wrap`}
      >
        <FilterDropdownButton
          onClick={() => {
            if (regions?.length) {
              handleFilterClick("region");
            }
          }}
          className={
            !regions?.length
              ? style.disable
              : type === "region"
              ? style.filterComp + " " + style.activeColor
              : style.filterComp
          }
        >
          <SouthAmericaIcon />
          <span className={style.mLeft10}>
            Region <KeyboardArrowDownIcon />
          </span>
        </FilterDropdownButton>

        <FilterDropdownButton
          onClick={() => {
            if (zones?.length) {
              handleFilterClick("zone");
            }
          }}
          className={
            !zones?.length
              ? style.disable
              : type === "zone"
              ? style.filterComp + " " + style.activeColor
              : style.filterComp
          }
        >
          <MapIcon />
          <span className={style.mLeft10}>
            Zone <KeyboardArrowDownIcon />
          </span>
        </FilterDropdownButton>

        <FilterDropdownButton
          onClick={() => {
            if (woredas?.length) {
              handleFilterClick("woreda");
            }
          }}
          className={
            !woredas?.length
              ? style.disable
              : type === "woreda"
              ? style.filterComp + " " + style.activeColor
              : style.filterComp
          }
        >
          <MapIcon />
          <span className={style.mLeft10}>
            Woreda <KeyboardArrowDownIcon />
          </span>
        </FilterDropdownButton>

        <FilterDropdownButton
          onClick={() => {
            if (kebeles?.length) {
              handleFilterClick("kebele");
            }
          }}
          className={
            !kebeles?.length
              ? style.disable
              : type === "kebele"
              ? style.filterComp + " " + style.activeColor
              : style.filterComp
          }
        >
          <MapIcon />
          <span className={style.mLeft10}>
            Kebele <KeyboardArrowDownIcon />
          </span>
        </FilterDropdownButton>

        <FilterDropdownButton
          onClick={() => handleFilterClick("farmer")}
          className={
            type == "farmer"
              ? style.filterComp + " " + style.activeColor
              : style.filterComp
          }
        >
          <AgricultureIcon />
          <span className={style.mLeft10}>
            Farmer <KeyboardArrowDownIcon />
          </span>
        </FilterDropdownButton>
        <FilterDropdownButton
          onClick={() => handleFilterClick("livestock")}
          className={
            type == "livestock"
              ? style.filterComp + " " + style.activeColor
              : style.filterComp
          }
        >
          <PetsIcon />
          <span className={style.mLeft10}>
            Livestock <KeyboardArrowDownIcon />
          </span>
        </FilterDropdownButton>
        <FilterDropdownButton
          onClick={() => handleFilterClick("crops")}
          className={
            type == "crops"
              ? style.filterComp + " " + style.activeColor
              : style.filterComp
          }
        >
          <GrassIcon />
          <span className={style.mLeft10}>
            Crop <KeyboardArrowDownIcon />
          </span>
        </FilterDropdownButton>
        <Grid item xs={4} sm={2} md={1.32} lg={1.3} xl={1.3}>
          <div>
            <Button
              sx={{
                fontFamily: "Arial",
                fontWeight: 700,
                fontSize: "16px",
                width: { md: "100px" },
                height: "45px",
                textTransform: "none",
                margin: "10px 0px",
              }}
              style={{
                color: "#ffffff",
                border: "1px solid rgba(0, 171, 85, 0.48)",
                borderRadius: "8px",
                backgroundColor: "#00A94F",
              }}
              variant="outlined"
              id="category-close-filter-id"
              onClick={() => {
                handleApplyFilter();
                setType("");
              }}
            >
              Apply
            </Button>
          </div>
        </Grid>
        <Grid item xs={4} sm={2} md={1.32} lg={1.3} xl={1.3}>
          <div onClick={() => clearAllFilters()} className={style.clearAll}>
            <CloseIcon />
            <span>Clear all</span>
          </div>
        </Grid>
      </Grid>
      {showFilter ? (
        <>
          {type === "region" ? (
            <>
              <CustomText
                size={"20px"}
                weight={700}
                lineHeight={"24px"}
                value={"By region"}
                color={"#3D4A52"}
                parentClassName="mt30"
              />
              <Box className={style.checkBox}>
                {regions?.map((item, index) => (
                  <FormControlLabel
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 400,
                      fontSize: "16px",
                      textTransform: "none",
                      marginRight: "30px",
                      alignItem: "left",
                      // color: "#00AB55"
                    }}
                    value={location.region === item.id}
                    // multiple
                    control={
                      <Checkbox
                        sx={{
                          color: "#00AB55",
                          // backgroundColor: "#00AB55",
                        }}
                        key={index}
                        onChange={(e) => {
                          setSeletedRegions((prevSelectedLocations) => {
                            const updatedLocations = e.target.checked
                              ? [...prevSelectedLocations, item.id]
                              : prevSelectedLocations.filter(
                                  (id) => id !== item.id
                                );
                            console.log(
                              "🚀 ~ file: Filters.tsx:313 ~ setSeletedRegions ~ updatedLocations:",
                              updatedLocations,
                              location
                            );
                            setLocation((prv) => {
                              return {
                                ...prv,
                                region: updatedLocations,
                              };
                            });
                            if (updatedLocations?.length < 1) {
                              setAllZones([]);
                              setAllWoreda([]);
                              setAllKabele([]);
                              setSelectedZones([]);
                              setSelectedWoredas([]);
                              setSelectedKebeles([]);
                            } else {
                              setAllWoreda([]);
                              setAllKabele([]);
                              setSelectedZones([]);
                              setSelectedWoredas([]);
                              setSelectedKebeles([]);
                              getZones(updatedLocations);
                            }
                            return updatedLocations;
                          });
                        }}
                        checked={selectedRegions.includes(item.id)}
                      />
                    }
                    label={item?.name}
                  />
                ))}
              </Box>
            </>
          ) : type === "zone" ? (
            <Box className={style.checkBoxStyle}>
              <CustomText
                size={"20px"}
                weight={700}
                lineHeight={"24px"}
                value={"By zone"}
                color={"#3D4A52"}
                parentClassName="mt30"
              />
              <Box>
                {zones?.map((item, index) => (
                  <FormControlLabel
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 400,
                      fontSize: "16px",
                      textTransform: "none",
                      marginRight: "30px",
                      alignItem: "left",
                    }}
                    control={
                      <Checkbox
                        sx={{
                          color: "#00AB55",
                          // backgroundColor: "#00AB55",
                        }}
                        key={index}
                        onChange={(e) => {
                          setSelectedZones((prevSelectedLocations) => {
                            const updatedLocations = e.target.checked
                              ? [...prevSelectedLocations, item.id]
                              : prevSelectedLocations.filter(
                                  (id) => id !== item.id
                                );
                            setLocation((prv) => {
                              return {
                                ...prv,
                                zone: updatedLocations,
                              };
                            });
                            if (updatedLocations?.length < 1) {
                              setAllWoreda([]);
                              setAllKabele([]);
                              setSelectedWoredas([]);
                              setSelectedKebeles([]);
                            } else {
                              setAllKabele([]);
                              setSelectedWoredas([]);
                              setSelectedKebeles([]);
                              getWoredas(updatedLocations);
                            }
                            // setLocation(updatedLocations);
                            // getWoredas(updatedLocations);
                            return updatedLocations;
                          });
                        }}
                        checked={selectedZones.includes(item.id)}
                      />
                    }
                    label={item?.name}
                  />
                ))}
              </Box>
            </Box>
          ) : type === "woreda" ? (
            <Box className={style.checkBoxStyle}>
              <CustomText
                size={"20px"}
                weight={700}
                lineHeight={"24px"}
                value={"By woreda"}
                color={"#3D4A52"}
                parentClassName="mt30"
              />
              <Box>
                {woredas?.map((item, index) => (
                  <FormControlLabel
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 400,
                      fontSize: "16px",
                      textTransform: "none",
                      marginRight: "30px",
                      alignItem: "left",
                      // color: "#00AB55"
                    }}
                    control={
                      <Checkbox
                        sx={{
                          color: "#00AB55",
                          // backgroundColor: "#00AB55",
                        }}
                        key={index}
                        onChange={(e) => {
                          setSelectedWoredas((prevSelectedLocations) => {
                            const updatedLocations = e.target.checked
                              ? [...prevSelectedLocations, item.id]
                              : prevSelectedLocations.filter(
                                  (id) => id !== item.id
                                );
                            setLocation((prv) => {
                              return {
                                ...prv,
                                woreda: updatedLocations,
                              };
                            });
                            if (updatedLocations?.length < 1) {
                              setAllKabele([]);
                              setSelectedKebeles([]);
                            } else {
                              setSelectedKebeles([]);
                              getKebeles(updatedLocations);
                            }
                            // setLocation(updatedLocations);
                            // getKebeles(updatedLocations);
                            return updatedLocations;
                          });
                        }}
                        checked={selectedWoredas.includes(item.id)}
                      />
                    }
                    label={item?.name}
                  />
                ))}
              </Box>
            </Box>
          ) : type === "kebele" ? (
            <Box className={style.checkBoxStyle}>
              <CustomText
                size={"20px"}
                weight={700}
                lineHeight={"24px"}
                value={"By Kebele"}
                color={"#3D4A52"}
                parentClassName="mt30"
              />
              <Box>
                {kebeles?.map((item, index) => (
                  <FormControlLabel
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 400,
                      fontSize: "16px",
                      textTransform: "none",
                      marginRight: "30px",
                      alignItem: "left",
                      // color: "#00AB55"
                    }}
                    control={
                      <Checkbox
                        sx={{
                          color: "#00AB55",
                          // backgroundColor: "#00AB55",
                        }}
                        key={index}
                        onChange={(e) => {
                          setSelectedKebeles((prevSelectedLocations) => {
                            const updatedLocations = e.target.checked
                              ? [...prevSelectedLocations, item.id]
                              : prevSelectedLocations.filter(
                                  (id) => id !== item.id
                                );
                            setLocation((prv) => {
                              return {
                                ...prv,
                                kebele: updatedLocations,
                              };
                            });
                            // setLocation(updatedLocations);
                            return updatedLocations;
                          });
                        }}
                        checked={selectedKebeles.includes(item.id)}
                      />
                    }
                    label={item?.name}
                  />
                ))}
              </Box>
            </Box>
          ) : type === "farmer" ? (
            <Row>
              <Col className={style.fitContent}>
                <CustomText
                  size={"20px"}
                  weight={700}
                  lineHeight={"24px"}
                  value={"By gender"}
                  color={"#3D4A52"}
                  parentClassName="mt30"
                />
                <Box className={style.checkBox}>
                  {genders?.map((item, index) => (
                    <FormControlLabel
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: 400,
                        fontSize: "16px",
                        textTransform: "none",
                        marginRight: "30px",
                        alignItem: "left",
                        // color: "#00AB55"
                      }}
                      control={
                        <Checkbox
                          sx={{
                            color: "#00AB55",
                            // backgroundColor: "#00AB55",
                          }}
                          key={index}
                          onChange={(e) => {
                            setFarmerFilter((prevFarmerFilter) => {
                              const updatedGender = e.target.checked
                                ? [...prevFarmerFilter.gender, item]
                                : prevFarmerFilter.gender.filter(
                                    (gender) => gender !== item
                                  );

                              return {
                                ...prevFarmerFilter,
                                gender: updatedGender,
                              };
                            });
                          }}
                          checked={farmerFilter.gender.includes(item)}
                        />
                      }
                      label={item}
                    />
                  ))}
                </Box>
              </Col>
              <Col>
                <CustomText
                  size={"20px"}
                  weight={700}
                  lineHeight={"24px"}
                  value={"By Marital Status"}
                  color={"#3D4A52"}
                  parentClassName="mt30"
                />
                <Box className={style.checkBox}>
                  {maritalStatus?.map((item, index) => (
                    <FormControlLabel
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: 400,
                        fontSize: "16px",
                        textTransform: "none",
                        marginRight: "30px",
                        alignItem: "left",
                        // color: "#00AB55"
                      }}
                      control={
                        <Checkbox
                          sx={{
                            color: "#00AB55",
                          }}
                          key={index}
                          onChange={(e) => {
                            setFarmerFilter((prevFarmerFilter) => {
                              const updatedStatus = e.target.checked
                                ? [...prevFarmerFilter.maritalStatus, item]
                                : prevFarmerFilter.maritalStatus.filter(
                                    (maritalStatus) => maritalStatus !== item
                                  );

                              return {
                                ...prevFarmerFilter,
                                maritalStatus: updatedStatus,
                              };
                            });
                          }}
                          checked={farmerFilter.maritalStatus.includes(item)}
                        />
                      }
                      label={item}
                    />
                  ))}
                </Box>
              </Col>
              <Col>
                <CustomText
                  size={"20px"}
                  weight={700}
                  lineHeight={"24px"}
                  value={" By Household type"}
                  color={"#3D4A52"}
                  parentClassName="mt30"
                />
                <Box className={style.checkBox}>
                  {houseHoldTypes?.map((item, index) => (
                    <FormControlLabel
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: 400,
                        fontSize: "16px",
                        textTransform: "none",
                        marginRight: "30px",
                        alignItem: "left",
                        // color: "#00AB55"
                      }}
                      control={
                        <Checkbox
                          sx={{
                            color: "#00AB55",
                            // backgroundColor: "#00AB55",
                          }}
                          key={index}
                          onChange={(e) => {
                            setFarmerFilter((prevFarmerFilter) => {
                              const updatedType = e.target.checked
                                ? [...prevFarmerFilter.householdType, item]
                                : prevFarmerFilter.householdType.filter(
                                    (householdType) => householdType !== item
                                  );

                              return {
                                ...prevFarmerFilter,
                                householdType: updatedType,
                              };
                            });
                          }}
                          checked={farmerFilter.householdType.includes(item)}
                        />
                      }
                      label={item}
                    />
                  ))}
                </Box>
              </Col>
            </Row>
          ) : type === "crops" ? (
            <Box className={style.checkBoxStyle}>
              <CustomText
                size={"20px"}
                weight={700}
                lineHeight={"24px"}
                value={"By Crop type"}
                color={"#3D4A52"}
                parentClassName="mt30"
              />
              <Box>
                {cropTypeOptions?.cropTypes?.map((item, index) => (
                  <FormControlLabel
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 400,
                      fontSize: "16px",
                      textTransform: "none",
                      marginRight: "30px",
                      alignItem: "left",
                      // color: "#00AB55"
                    }}
                    control={
                      <Checkbox
                        sx={{
                          color: "#00AB55",
                          // backgroundColor: "#00AB55",
                        }}
                        key={index}
                        onChange={(e) => {
                          setCropType((prevCropType) => {
                            const updatedType = e.target.checked
                              ? [...prevCropType.cropType, item]
                              : prevCropType.cropType.filter(
                                  (cropType) => cropType !== item
                                );

                            return {
                              ...prevCropType,
                              cropType: updatedType,
                            };
                          });
                        }}
                        checked={cropType.cropType.includes(item)}
                      />
                    }
                    label={item}
                  />
                ))}
              </Box>
            </Box>
          ) : type === "livestock" ? (
            <Row>
              <Col lg={6} className={style.checkBoxStyle}>
                <CustomText
                  size={"20px"}
                  weight={700}
                  lineHeight={"24px"}
                  value={"By type"}
                  color={"#3D4A52"}
                  parentClassName="mt30"
                />
                <Box>
                  {liveStockTypes?.map((item, index) => (
                    <FormControlLabel
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: 400,
                        fontSize: "16px",
                        textTransform: "none",
                        marginRight: "30px",
                        alignItem: "left",
                        // color: "#00AB55"
                      }}
                      control={
                        <Checkbox
                          sx={{
                            color: "#00AB55",
                            // backgroundColor: "#00AB55",
                          }}
                          key={index}
                          onChange={(e) => {
                            setLivestockFilter((prevLiveStockFilter) => {
                              const updatedType = e.target.checked
                                ? [...prevLiveStockFilter.livestock, item]
                                : prevLiveStockFilter.livestock.filter(
                                    (livestock) => livestock !== item
                                  );

                              return {
                                ...prevLiveStockFilter,
                                livestock: updatedType,
                              };
                            });
                          }}
                          checked={livestockFilter.livestock.includes(item)}
                        />
                      }
                      label={item}
                    />
                  ))}
                </Box>
              </Col>
            </Row>
          ) : (
            " "
          )}
        </>
      ) : (
        <></>
      )}

      <Row>
        <Box className={style.chipStyle}>
          {selectedRegions.length > 0 && (
            <>
              {selectedRegions.map((regionId, index) => {
                const selectedRegion = regions.find(
                  (region) => region.id === regionId
                );
                const regionName = selectedRegion ? selectedRegion.name : "";

                return (
                  <Chip
                    key={index}
                    label={regionName}
                    variant="outlined"
                    // @ts-ignore
                    onDelete={() => {
                      let updatedSelectedRegions = selectedRegions.filter(
                        (id) => id !== regionId
                      );
                      setSeletedRegions((prevSelectedregions) =>
                        prevSelectedregions.filter((id) => id !== regionId)
                      );
                      setLocation((prev) => ({
                        ...prev,
                        region: updatedSelectedRegions,
                      }));
                      if (updatedSelectedRegions?.length < 1) {
                        setAllZones([]);
                        setAllWoreda([]);
                        setAllKabele([]);
                        setSelectedZones([]);
                        setSelectedWoredas([]);
                        setSelectedKebeles([]);
                      } else {
                        setAllWoreda([]);
                        setAllKabele([]);
                        setSelectedZones([]);
                        setSelectedWoredas([]);
                        setSelectedKebeles([]);
                        getZones(updatedSelectedRegions);
                      }
                      // setAllZones([]);
                      // setAllWoreda([]);
                      // setAllKabele([]);
                    }}
                    style={{
                      color: "#00ab55",
                      border: "1px solid #00ab55",
                      marginRight: "5px",
                    }}
                  />
                );
              })}
            </>
          )}
          {selectedZones.length > 0 && (
            <>
              {selectedZones.map((zoneId, index) => {
                const selectedZone = zones.find((zone) => zone.id === zoneId);
                const zoneName = selectedZone ? selectedZone.name : "";

                return (
                  <Chip
                    key={index}
                    label={zoneName}
                    variant="outlined"
                    // @ts-ignore
                    onDelete={() => {
                      // console.log("setSelectedKebeles", selectedKebeles);

                      setSelectedZones((prevSelectedzones) =>
                        prevSelectedzones.filter((id) => id !== zoneId)
                      );
                      let updatedSelectedZones = selectedZones.filter(
                        (id) => id !== zoneId
                      );
                      setLocation((prev) => ({
                        ...prev,
                        zone: updatedSelectedZones,
                      }));
                      if (updatedSelectedZones?.length < 1) {
                        setAllWoreda([]);
                        setAllKabele([]);
                        setSelectedWoredas([]);
                        setSelectedKebeles([]);
                      } else {
                        setAllKabele([]);
                        setSelectedWoredas([]);
                        setSelectedKebeles([]);
                        getWoredas(updatedSelectedZones);
                      }
                      // setLocation((prv: any) => ({
                      //   ...prv,
                      //   zone: "",
                      //   woreda: "",
                      //   kebele: "",
                      // }));
                      // setAllWoreda([]);
                      // setAllKabele([]);
                    }}
                    style={{
                      color: "#00ab55",
                      border: "1px solid #00ab55",
                      marginRight: "5px",
                    }}
                  />
                );
              })}
            </>
          )}
          {selectedZones.length > 0 && (
            <>
              {selectedWoredas.map((woredaId, index) => {
                const selectedWoreda = woredas.find(
                  (woreda) => woreda.id === woredaId
                );
                const woredaName = selectedWoreda ? selectedWoreda.name : "";

                return (
                  <Chip
                    key={index}
                    label={woredaName}
                    variant="outlined"
                    // @ts-ignore
                    onDelete={() => {
                      setSelectedWoredas((prevSelectedworedas) =>
                        prevSelectedworedas.filter((id) => id !== woredaId)
                      );
                      let updatedSelectedWoreda = selectedWoredas.filter(
                        (id) => id !== woredaId
                      );
                      setLocation((prev) => ({
                        ...prev,
                        woreda: updatedSelectedWoreda,
                      }));
                      if (updatedSelectedWoreda?.length < 1) {
                        setAllKabele([]);
                        setSelectedKebeles([]);
                      } else {
                        setSelectedKebeles([]);
                        getKebeles(updatedSelectedWoreda);
                      }
                      // setLocation((prv: any) => ({
                      //   ...prv,
                      //   woreda: "",
                      //   kebele: "",
                      // }));
                      // setAllKabele([]);
                    }}
                    style={{
                      color: "#00ab55",
                      border: "1px solid #00ab55",
                      marginRight: "5px",
                    }}
                  />
                );
              })}
            </>
          )}
          {selectedKebeles.length > 0 && (
            <>
              {selectedKebeles.map((kebeleId, index) => {
                const selectedKebele = kebeles.find(
                  (kebele) => kebele.id === kebeleId
                );
                const kebeleName = selectedKebele ? selectedKebele.name : "";

                return (
                  <Chip
                    key={index}
                    label={kebeleName}
                    variant="outlined"
                    // @ts-ignore
                    onDelete={() => {
                      setLocation((prv) => ({ ...prv, kebele: "" }));
                      setSelectedKebeles((prevSelectedKebeles) =>
                        prevSelectedKebeles.filter((id) => id !== kebeleId)
                      );
                      let updatedSelectedKebele = selectedKebeles.filter(
                        (id) => id !== kebeleId
                      );
                      setLocation((prev) => ({
                        ...prev,
                        kebele: updatedSelectedKebele,
                      }));
                      // if (updatedSelectedKebele?.length < 1) {
                      //   setAllKabele([]);
                      // }
                    }}
                    style={{
                      color: "#00ab55",
                      border: "1px solid #00ab55",
                      marginRight: "5px",
                    }}
                  />
                );
              })}
            </>
          )}
          {farmerFilter?.gender.length > 0 && (
            <div>
              {farmerFilter.gender.map((gender, index) => (
                <Chip
                  key={index}
                  label={gender}
                  variant="outlined"
                  onDelete={() =>
                    setFarmerFilter((prevFarmerFilter) => ({
                      ...prevFarmerFilter,
                      gender: prevFarmerFilter.gender.filter(
                        (item) => item !== gender
                      ),
                    }))
                  }
                  style={{
                    color: "#00ab55",
                    border: "1px solid #00ab55",
                    marginRight: "5px",
                  }}
                />
              ))}
            </div>
          )}
          {farmerFilter?.maritalStatus.length > 0 && (
            <>
              {farmerFilter.maritalStatus.map((status, index) => (
                <Chip
                  key={index}
                  label={status}
                  variant="outlined"
                  onDelete={() =>
                    setFarmerFilter((prevFarmerFilter) => ({
                      ...prevFarmerFilter,
                      maritalStatus: prevFarmerFilter.maritalStatus.filter(
                        (item) => item !== status
                      ),
                    }))
                  }
                  style={{
                    color: "#00ab55",
                    border: "1px solid #00ab55",
                    marginRight: "5px",
                  }}
                />
              ))}
            </>
          )}
          {farmerFilter?.householdType.length > 0 && (
            <>
              {farmerFilter.householdType.map((household, index) => (
                <Chip
                  key={index}
                  label={household}
                  variant="outlined"
                  onDelete={() =>
                    setFarmerFilter((prevFarmerFilter) => ({
                      ...prevFarmerFilter,
                      householdType: prevFarmerFilter.householdType.filter(
                        (item) => item !== household
                      ),
                    }))
                  }
                  style={{
                    color: "#00ab55",
                    border: "1px solid #00ab55",
                    marginRight: "5px",
                  }}
                />
              ))}
            </>
          )}
          {livestockFilter?.livestock.length > 0 && (
            <>
              {livestockFilter.livestock.map((livestock, index) => (
                <Chip
                  key={index}
                  label={livestock}
                  variant="outlined"
                  onDelete={() =>
                    setLivestockFilter((prevLivestockFilter) => ({
                      ...prevLivestockFilter,
                      livestock: prevLivestockFilter.livestock.filter(
                        (item) => item !== livestock
                      ),
                    }))
                  }
                  style={{
                    color: "#00ab55",
                    border: "1px solid #00ab55",
                    marginRight: "5px",
                  }}
                />
              ))}
            </>
          )}
          {cropType?.cropType.length > 0 && (
            <>
              {cropType.cropType.map((crop, index) => (
                <Chip
                  key={index}
                  label={crop}
                  variant="outlined"
                  onDelete={() =>
                    setCropType((prevCropType) => ({
                      ...prevCropType,
                      cropType: prevCropType.cropType.filter(
                        (item) => item !== crop
                      ),
                    }))
                  }
                  style={{
                    color: "#00ab55",
                    border: "1px solid #00ab55",
                    marginRight: "5px",
                  }}
                />
              ))}
            </>
          )}
        </Box>
      </Row>
    </Box>
  );
}

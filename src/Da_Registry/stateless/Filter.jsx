import React from "react";
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
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import style from "./Filter.module.css";
import labels from "features/default/src/Constants/labels";
import { getRoleLocal } from "../../features/default/src/Utils/Common"

const Filter = (props) => {
  const {
    gender,
    setGender,
    educationLevel,
    setEducationLevel,
    specialisation,
    setSpecialisation,
    kebele,
    setKebele,
    zone,
    setZone,
    region,
    setRegion,
    woreda,
    setWoreda,
    regions,
    zones,
    woredas,
    kebeles,
    genders,
    specializations,
    educationLevels,
    getTotalNoOfEAs,
    getByZones,
    getByWoredas,
    getByKebeles,
    setZones,
    setWoredas,
    setKebeles,
    handleFilterAccess,
    setToggleFilter,
  } = props;

  const handleApplyFilter = () => {
    getTotalNoOfEAs();
  };
  const handleClearFilter = () => {
    setGender("");
    setEducationLevel("");
    setSpecialisation("");
    setRegion("");
    setZone("");
    setZones([]);
    setWoreda("");
    setWoredas([]);
    setKebele("");
    setKebeles([]);
    getTotalNoOfEAs(true);
    handleFilterAccess();
    setToggleFilter((prv) => prv + 1);
  };
  const isRoleAllowedForField = (role, allowedRoles) => {
    return allowedRoles.includes(role);
  };

  const handleDisable = (component) => {
    const role = getRoleLocal();

    const allowedRoles = {
      region: [labels.ROLES.ADMIN, labels.ROLES.NATIONAL_OFFICER],
      zone: [
        labels.ROLES.ADMIN,
        labels.ROLES.NATIONAL_OFFICER,
        labels.ROLES.REGIONAL_OFFICER,
      ],
      woreda: [
        labels.ROLES.ADMIN,
        labels.ROLES.NATIONAL_OFFICER,
        labels.ROLES.REGIONAL_OFFICER,
        labels.ROLES.ZONAL_OFFICER,
      ],
      kebele: [
        labels.ROLES.ADMIN,
        labels.ROLES.NATIONAL_OFFICER,
        labels.ROLES.REGIONAL_OFFICER,
        labels.ROLES.ZONAL_OFFICER,
        labels.ROLES.WOREDA_OFFICER,
      ],
    };

    return !isRoleAllowedForField(role, allowedRoles[component]);
  };

  const isRegionDisabled = handleDisable("region");

  const isZoneDisabled = handleDisable("zone");

  const isWoredaDisabled = handleDisable("woreda");

  const isKebeleDisabled = handleDisable("kebele");

  return (
    <Box className={`d-flex mt10 justify-content-between align-items-center`}>
      <Box className={`${style.padding0} ${style.filterRow}`}>
        <FormControl
          component="div"
          size="small"
          className={style.formControl}
          id="demo-multiple-checkbox"
        >
          <InputLabel>Region</InputLabel>
          <Select
            sx={{ width: "150px", textAlign: "left" }}
            label="Region"
            // disabled={isRegionDisabled}
            value={region}
            onChange={(e) => {
              if (e.target.value == "none") {
                setRegion(e.target.value);
                setZones([]);
                setWoredas([]);
                setKebeles([]);
                setZone("");
                setWoreda("");
                setKebele("");
              } else {
                setRegion(e.target.value);
                getByZones(e.target.value);
                setWoreda("");
                setKebele("");
                setZone("");
                setZones([]);
                setWoredas([]);
                setKebeles([]);
              }
            }}
          >
            <MenuItem value="none">None</MenuItem>
            {regions?.map((item, index) => (
              <MenuItem key={item?.id} value={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" className={style.formControl}>
          <InputLabel>Zone </InputLabel>
          <Select
            sx={{ width: "150px", textAlign: "left" }}
            label="Zone"
            value={zone}
            // disabled={isZoneDisabled}
            onChange={(e) => {
              if (e.target.value == "none") {
                setZone(e.target.value, () => {});
                setWoredas([]);
                setKebeles([]);
                setWoreda("");
                setKebele("");
              } else {
                getByWoredas(e.target.value);
                setZone(e.target.value);
                setWoreda("");
                setKebele("");
                setWoredas([]);
                setKebeles([]);
              }
            }}
          >
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            {zones?.map((item, index) => (
              <MenuItem key={item?.id} value={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" className={style.formControl}>
          <InputLabel>Woreda</InputLabel>
          <Select
            sx={{ width: "150px", textAlign: "left" }}
            label="Woreda"
            value={woreda}
            // disabled={isWoredaDisabled}
            onChange={(e) => {
              if (e.target.value == "none") {
                setWoreda(e.target.value);
                setKebeles([]);
                setKebele("");
              } else {
                setWoreda(e.target.value);
                getByKebeles(e.target.value);
                setKebele("");
                setKebeles([]);
              }
            }}
          >
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            {woredas?.map((item, index) => (
              <MenuItem key={item?.id} value={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" className={style.formControl}>
          <InputLabel>Kebele</InputLabel>
          <Select
            sx={{ width: "150px", textAlign: "left" }}
            label="Kebele"
            value={kebele}
            // disabled={isKebeleDisabled}
            onChange={(e) => {
              setKebele(e.target.value);
            }}
          >
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            {kebeles?.map((item, index) => (
              <MenuItem key={item?.id} value={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" className={style.formControl}>
          <InputLabel>Gender</InputLabel>
          <Select
            sx={{ width: "150px", textAlign: "left" }}
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            {genders?.map((item, index) => (
              <MenuItem key={item?.id} value={item?.name}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" className={style.formControl}>
          <InputLabel>Specialisation</InputLabel>
          <Select
            sx={{ width: "150px", textAlign: "left" }}
            label="Specialisation"
            value={specialisation}
            onChange={(e) => setSpecialisation(e.target.value)}
          >
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            {specializations?.map((item, index) => (
              <MenuItem key={item?.id} value={item?.name}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" className={style.formControl}>
          <InputLabel>Education level</InputLabel>
          <Select
            sx={{ width: "150px", textAlign: "left" }}
            label="Education level"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
          >
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            {educationLevels?.map((item, index) => (
              <MenuItem key={item?.id} value={item?.name}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={style.buttonContainer}>
          <Button
            className={`${style.primary_button}`}
            onClick={handleApplyFilter}
          >
            Apply
          </Button>
          <Button
            className={` ${style.outlined_button}`}
            onClick={handleClearFilter}
          >
            Clear
          </Button>
        </div>
      </Box>
    </Box>
  );
};
export default Filter;

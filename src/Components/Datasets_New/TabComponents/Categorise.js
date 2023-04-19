import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ControlledAccordion from "../../Accordion/Accordion";
import CheckBoxWithText from "./CheckBoxWithText";
import { getTokenLocal } from "../../../Utils/Common";
import HTTPService from "../../../Services/HTTPService";
import UrlConstant from "../../../Constants/UrlConstants";
// import { Country, State, City } from 'country-state-city'
const Categorise = (props) => {
  const [allCategories, setAllCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { Country, State, City } = props;
  const handleCheckBox = (keyName, value) => {
    let tempCategories = { ...props.categorises };
    let tempJson = Object.keys(props.categorises);

    if (tempJson.includes(keyName)) {
      if (tempCategories[keyName].includes(value)) {
        if (tempCategories[keyName]?.length === 1) {
          delete tempCategories[keyName];
        } else {
          let index = tempCategories[keyName].indexOf(value);
          tempCategories[keyName].splice(index, 1);
        }
      } else {
        tempCategories[keyName].push(value);
      }
      props.setCategorises({ ...tempCategories });
    } else {
      props.setCategorises((currentState) => {
        return { ...currentState, [keyName]: [value] };
      });
    }
  };
  const getAllCategoryAndSubCategory = () => {
    let checkforAccess = getTokenLocal() ?? false;
    HTTPService(
      "GET",
      UrlConstant.base_url + UrlConstant.add_category_edit_category,
      "",
      true,
      true,
      checkforAccess
    )
      .then((response) => {
        let prepareArr = [];
        for (const [key, value] of Object.entries(response.data)) {
          let obj = {};
          obj[key] = value;
          prepareArr.push(obj);
        }
        let tempCategories = [];
        prepareArr.forEach((item, index) => {
          let keys = Object.keys(item);
          let tCategory = props?.categorises?.[keys];
          let prepareCheckbox = item?.[keys[0]]?.map((res, ind) => {
            return (
              <CheckBoxWithText
                key={ind}
                text={res}
                checked={tCategory?.includes(res)}
                categoryKeyName={keys[0]}
                keyName={res}
                handleCheckBox={handleCheckBox}
              />
            );
          });
          let obj = {
            panel: index + 1,
            title: keys[0],
            details: prepareCheckbox ? prepareCheckbox : [],
          };
          tempCategories.push(obj);
        });
        setAllCategories(tempCategories);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllCategoryAndSubCategory();
  }, [props.categorises]);

  useEffect(() => {
    // setCountries(Country.getAllCountries());
    // if (props.geography?.country) {
    //   setStates(State?.getStatesOfCountry(props.geography?.country?.isoCode));
    // }
    // if (props.geography?.country && props.geography?.state?.name) {
    //   setCities(
    //     City.getCitiesOfState(
    //       props.geography?.state?.countryCode,
    //       props.geography?.state?.isoCode
    //     )
    //   );
    // }
  }, [props.geography]);
  return (
    <div className="mt-20">
      <Typography
        sx={{
          fontFamily: "Montserrat !important",
          fontWeight: "600",
          fontSize: "32px",
          lineHeight: "40px",
          color: "#000000",
          textAlign: "left",
        }}
      >
        Categories
      </Typography>
      <div className="mt-30">
        <ControlledAccordion
          data={allCategories}
          customBorder={true}
          showDeleteIcon={true}
          customPadding={true}
        />
      </div>
      <Box className="d-flex mt-50">
        <Box className="w-100">
          <Typography
            sx={{
              fontFamily: "Montserrat !important",
              fontWeight: "600",
              fontSize: "32px",
              lineHeight: "40px",
              color: "#000000",
              textAlign: "left",
            }}
          >
            Geography
          </Typography>
          <Box className="d-flex justify-content-between">
            <FormControl fullWidth sx={{ width: "330px" }} className="mt-30">
              <InputLabel id="test-select-label">Select Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.geography?.country?.name}
                onChange={(e) =>
                  props.setGeography((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
                sx={{
                  textAlign: "left",
                  "&.MuiInputBase-root": {
                    height: "56px",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#919EAB",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#919EAB",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#919EAB",
                  },
                }}
                label="Select Country"
                placeholder="Select Country"
              >
                {countries?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ width: "330px" }} className="mt-30">
              <InputLabel id="test-select-label">Select State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.geography?.state?.name}
                onChange={(e) =>
                  props.setGeography((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
                sx={{
                  textAlign: "left",
                  "&.MuiInputBase-root": {
                    height: "56px",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#919EAB",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#919EAB",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#919EAB",
                  },
                }}
                label="Select State"
                placeholder="Select State"
              >
                {states?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ width: "330px" }} className="mt-30">
              <InputLabel id="test-select-label">Select City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.geography?.city?.name}
                onChange={(e) =>
                  props.setGeography((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                sx={{
                  textAlign: "left",
                  "&.MuiInputBase-root": {
                    height: "56px",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#919EAB",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#919EAB",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#919EAB",
                  },
                }}
                label="Select City"
                placeholder="Select City"
              >
                {cities?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        {/* <Box sx={{ marginLeft: '122px' }}>
                    <Typography sx={{
                        fontFamily: "Montserrat !important",
                        fontWeight: "600",
                        fontSize: "32px",
                        lineHeight: "40px",
                        color: "#000000",
                        textAlign: 'left'
                    }}>Value chain</Typography>
                    <FormControl fullWidth sx={{ width: '368px' }} className='mt-30' >
                        <InputLabel id='test-select-label'>Select value chain</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.valueChain}
                            onChange={props.setValueChain}
                            sx={{
                                textAlign: 'left',
                                '&.MuiInputBase-root': {
                                    height: '56px'
                                },
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#919EAB',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#919EAB',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#919EAB',
                                }
                            }}
                            label="Select value chain"
                            placeholder='Select value chain'
                        >
                            {props.menus?.map((menu) => (
                                <MenuItem value={menu}>{menu}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box> */}
      </Box>
    </div>
  );
};

export default Categorise;

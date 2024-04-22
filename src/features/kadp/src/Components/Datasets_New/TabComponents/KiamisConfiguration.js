import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { State } from "country-state-city";

const KiamisConfiguration = (props) => {
  const [states, setStates] = useState([]);
  const [geography, setGeography] = useState({
    country: {
      name: "Kenya",
      isoCode: "KE",
      flag: "🇰🇪",
      phonecode: "254",
      currency: "KES",
      latitude: "1.00000000",
      longitude: "38.00000000",
      timezones: [
        {
          zoneName: "Africa/Nairobi",
          gmtOffset: 10800,
          gmtOffsetName: "UTC+03:00",
          abbreviation: "EAT",
          tzName: "East Africa Time",
        },
      ],
    },
    state: null,
    city: null,
  });

  const handleFetch = () => {
    let payload = {
      dataset: "add88591-3595-428b-bc73-de97e7681a30",
      source: "KIAMIS",
      county: geography?.state,
    };
  };
  useEffect(() => {
    const statesData = State.getStatesOfCountry(geography.country.isoCode);
    setStates(statesData);
    if (statesData.length > 0 && !geography.state) {
      setGeography((prev) => ({
        ...prev,
        state: statesData[0].name, // Setting default state if none is selected
      }));
    }
  }, [geography.country.isoCode]);

  return (
    <Box>
      <Typography
        sx={{
          fontFamily: "Arial !important",
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#00A94F",
          textAlign: "left",
          marginTop: "43px",
        }}
      >
        Configuration for Importing Kiamis Data
      </Typography>
      <FormControl fullWidth sx={{ marginTop: "30px" }}>
        <InputLabel htmlFor="geography-select-state">Select County</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="geography-select-state"
          value={geography.state?.name || ""}
          onChange={(e) =>
            setGeography((prev) => ({
              ...prev,
              state: states.find((state) => state.name === e.target.value),
              city: null,
            }))
          }
          renderValue={(value) => value || "Select County"}
          label="Select County"
          sx={{
            textAlign: "left",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#919EAB",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00A94F",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00A94F",
            },
          }}
        >
          {states.map((state) => (
            <MenuItem key={state.isoCode} value={state.name}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ textAlign: "end", marginTop: "31px" }}>
        <Button
          id={`upload-dataset-kiamis-import-btn`}
          sx={{
            fontFamily: "Arial",
            fontWeight: 700,
            fontSize: "16px",
            width: "171px",
            height: "48px",
            border: "1px solid rgba(0, 171, 85, 0.48)",
            borderRadius: "8px",
            color: "#00A94F",
            textTransform: "none",
            marginLeft: "60px",
            "&:hover": {
              background: "none",
              border: "1px solid rgba(0, 171, 85, 0.48)",
            },
          }}
          variant="outlined"
          disabled={geography.state?.name ? false : true}
          onClick={() => handleFetch()}
          data-testid="kiamis_fetch_btn"
        >
          Fetch
        </Button>
      </Box>
    </Box>
  );
};

export default KiamisConfiguration;

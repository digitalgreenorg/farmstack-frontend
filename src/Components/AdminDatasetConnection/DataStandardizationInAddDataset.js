import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./DataStandardizationInAddDataset.css";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";

const DataStandardizationInAddDataset = () => {
  const [keysInUploadedDataset, setKeysInUploadedDataset] = useState([
    "user_name",
    "user_phone_number",
    "user_address",
  ]);
  const [standardColumnNames, setStandardColumnNames] = useState([
    { key: "farmer_name", description: "give farmer name" },
    { key: "farmer_name", description: "give farmer name" },
    { key: "farmer_name", description: "give farmer name" },
  ]);
  const [checkBox, setCheckBox] = useState(false);

  const handleChange = (e) => {
    console.log("handle change clicked");
    // setAge(e.target.value);
  };

  return (
    <>
      <div className="data_standardization_title">
        <span>Uploaded Data Column Name</span>
        <span>Standard Data Column Name</span>
      </div>
      {keysInUploadedDataset?.map((keyNames, index) => {
        return (
          <>
            <div className="data_standardization_cloumn_container">
              <div className="uploaded_data_column_name_title_container">
                
                <div className="uploaded_data_column_name_title">
                  {keyNames}
                </div>
              </div>
              <div>
                <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
                  <InputLabel id="demo-select-small">
                    Select column/key
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    // value={age}
                    onChange={handleChange}
                  >
                    {standardColumnNames?.map((item, index) => {
                      return (
                        <>
                          <MenuItem value={item.key}>{item.key}</MenuItem>
                        </>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={() => setCheckBox(true)} />}
                    label="Mask"
                  />
                </FormGroup>
            </div>
            <hr />
          </>
        );
      })}
    </>
  );
};

export default DataStandardizationInAddDataset;

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const SelectWithOption = (props) => {
  const { value, setValue } = props;
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <FormControl sx={{ width: "320px" }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          fullWidth
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl>
    </>
  );
};

export default SelectWithOption;

import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Search = (props) => {
  return (
    <><span className='searchBarForDataset' > 
      
    <TextField
        id="filled-basic"
        label="Search for dataset..."
        variant="filled"
        style={{width:"100%"}}
        className="searchInputValue"
        value={props.searchDatasetVar}
        InputProps={{
            endAdornment: <InputAdornment position="end"><SearchOutlinedIcon/></InputAdornment>,
          }}
        // className="signupemail"
        onChange={(e)=>{
          props.setSearchDatasetVar(e.target.value)
          props.debounceOnChange(e.target.value,false, props.isMemberTab)
        }}
        // onChange={(e) => props.debounceOnChange(e.target.value,false, props.isMemberTab)}
/></span></>
  )
}

export default Search
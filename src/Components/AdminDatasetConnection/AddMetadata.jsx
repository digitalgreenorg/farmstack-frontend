import { Alert, Checkbox, FormControlLabel, InputAdornment, List, ListItem, ListItemText, OutlinedInput, Stack, Switch, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CategorySelector from './CategorySelector';
import { useEffect } from 'react';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import labels from '../../Constants/labels';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200,
        },
    },
};



const AddMetadata = (props) => {
    const { handleChangeCategory, category, subCategoryNameList, categoryNameList, handleSubCategory, subCategory, geography, handleChangeGeography, conscent, setConscent, handleAddDatasetSubmit, isSubmitted,
        selectedCat,
        setSelectedCat,
        selectedSubCat,
        setSelectedSubCat,
        handleChangeSubCatList, SubCatList,
        allCatFetched, handleSubCategoryListForFinal, finalJson, lengthOfSubCat } = props
    const [screenlabels, setscreenlabels] = useState(labels["en"]);
    let sublist = []
    let catList = Object.keys(finalJson)
    for (let i = 0; i < catList.length; i++) {
        sublist = [...sublist, ...finalJson[catList[i]]]
    }
    useEffect(() => {

    }, [categoryNameList])
    return (
        <>
            <Row style={{ height: "200px" }}>

                <Col xs="12" sm="6" md="6" lg="3">
                    {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={category}
                            onChange={handleChange}
                            label="Category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}></MenuItem>
                            <MenuItem value={20}></MenuItem>
                            <MenuItem value={30}></MenuItem>
                        </Select>
                    </FormControl> */}

                    <CategorySelector selectedCat={selectedCat} heading={"Category"} handler={handleChangeCategory} category={category} list={categoryNameList} />

                </Col>
                <Col xs="12" sm="6" md="6" lg="3">

                    <FormControl sx={{ m: 1, width: 250 }}>
                        <InputLabel id="demo-multiple-checkbox-label">{"Sub categories"}</InputLabel>
                        <Select name="sub_category" id="sub_cat">
                            {Object.keys(selectedCat).map((key) => {
                                return allCatFetched[key].map((sub) => {
                                    return <span style={{ display: "flex", justifyContent: "space-evenly" }}><Checkbox checked={sublist.includes(sub)} onClick={(e) => handleSubCategoryListForFinal(e.target.checked, sub, key)} />
                                        <MenuItem value={sub}>{sub}</MenuItem>
                                    </span>
                                })

                            })}
                            {/* {Object.keys(allCatFetched).map((key) => {
                                if (category.includes(key)) {
                                    console.log(allCatFetched[key], key)
                                    allCatFetched[key].map((sub_cat) => {
                                        
                                    })
                                }
                            })} */}
                            {/* {category.map(()=>{
                                allCatFetched
                            })} */}
                            {/* {Object.keys(selectedCat).map((key)=>{

                            })} */}
                        </Select>
                    </FormControl>
                    {/* <CategorySelector heading={"Sub category"} handler={handleSubCategory} category={subCategory} list={subCategoryNameList} /> */}
                </Col>
                <Col xs="12" sm="6" md="6" lg="3">
                    <FormControl sx={{ m: 1, width: "250px" }}>
                        <InputLabel id="demo-simple-select-standard-label">Geography</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={geography}
                            onChange={handleChangeGeography}
                            label="Geography"
                        >
                            {/* <MenuItem value="">
                                <em>None</em>
                            </MenuItem> */}
                            <MenuItem value={"India"}>India</MenuItem>
                            <MenuItem value={"Ethiopia"}>Ethiopia</MenuItem>
                            <MenuItem value={"Kenya"}>Kenya</MenuItem>
                        </Select>
                    </FormControl>
                </Col>

                <Col xs="12" sm="6" md="6" lg="3">
                    {/* Selected Subcategory
                    <ul>
                        
                    </ul> */}

                    <label htmlFor="">Selected Category list</label>
                    <List sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 150,

                        '& ul': { padding: 0 },
                    }} >
                        {Object.keys(finalJson).map((key) => finalJson[key].map((eachSub) => {
                            return <ListItem>
                                <span>{`${eachSub} from ${key} category`}</span> {" "}
                            </ListItem>
                        }))}
                    </List>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <span className="AddDatasetsecondaryheading">
                        {screenlabels.dataset.Interval}
                    </span>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <FormControlLabel
                        value="start"
                        control={
                            <Switch
                                checked={props.Switchchecked}
                                onChange={props.handleChangeSwitch}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        }
                        label={screenlabels.dataset.Constantly_updating}
                        labelPlacement="start"
                        className="constantswitch"
                    />
                </Col>
            </Row>
            {props.Switchchecked ? (
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} className="FromDate">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                inputFormat="dd/MM/yyyy"
                                disabled
                                value={props.fromdate}
                                onChange={props.handleChangeFromDate}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id="filled-basic"
                                        variant="filled"
                                        className="fromtextfield"
                                    />
                                )}
                                error={props.dataCaptureStartErrorMessage ? true : false}
                                helperText={props.dataCaptureStartErrorMessage}
                            />
                        </LocalizationProvider>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} className="toDate">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disabled
                                value={props.todate}
                                inputFormat="dd/MM/yyyy"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id="filled-basic"
                                        variant="filled"
                                        className="totextfield"
                                        disabled
                                    />
                                )}
                                error={props.dataCaptureEndErrorMessage ? true : false}
                                helperText={props.dataCaptureEndErrorMessage}
                            />
                        </LocalizationProvider>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className="FromDate addDatasetFromdate"
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                inputFormat="dd/MM/yyyy"
                                disableFuture
                                label={screenlabels.dataset.Start_Date}
                                value={props.fromdate}
                                onChange={props.handleChangeFromDate}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id="filled-basic"
                                        variant="filled"
                                        className="fromtextfield"
                                        aria-readonly
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Col>
                    <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className="toDate addDatasetTodate"
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                inputFormat="dd/MM/yyyy"
                                disabled={props.fromdate ? false : true}
                                disableFuture
                                label={screenlabels.dataset.End_Date}
                                minDate={props.fromdate}
                                value={props.todate}
                                onChange={props.handleChangeToDate}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id="filled-basic"
                                        variant="filled"
                                        className="totextfield"
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Col>
                </Row>
            )}
            <Row style={{ marginTop: "20px" }}>
                <Col lg={1} >
                    {/* <Stack sx={{ width: "100%", textAlign: "left" }} spacing={2}> */}
                    <Checkbox checked={conscent} onChange={(e) => setConscent(e.target.checked)} />
                    {/* </Stack> */}
                </Col>
                <Col lg={11}>
                    <Alert severity="warning">
                        {/* <AlertTitle style={{ textAlign: "left" }}>Warning</AlertTitle> */}
                        {/* This is a warning alert —{" "} */}
                        <strong>
                            This table's sample dataset is solely meant to be used as a
                            source of information. Despite the fact that accuracy is a
                            goal, the steward is not accountable for the information.
                            Please let the admin know if you come across any information
                            that you think is inaccurate.
                        </strong>
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        onClick={handleAddDatasetSubmit}
                        variant="contained"
                        className="submitbtn"
                        type="submit"
                        disabled={(conscent && geography != "" && (!props.Switchchecked ? props.fromdate && props.todate : props.Switchchecked)) && !isSubmitted ? false : true}
                    >
                        {screenlabels.common.submit}
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default AddMetadata
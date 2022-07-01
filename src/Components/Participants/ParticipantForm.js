import React, { useState, useMemo } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import THEME_COLORS from '../../Constants/ColorConstants'
import labels from '../../Constants/labels';
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import countryList from "react-select-country-list";
import MuiPhoneNumber from "material-ui-phone-number";
import RegexConstants from '../../Constants/RegexConstants';
import { handleAddressCharacters, handleNameFieldEntry, validateInputField } from '../../Utils/Common';
// import Select from 'react-select'
const useStyles = {
    btncolor: {color: THEME_COLORS.THEME_COLOR, "border-color": THEME_COLORS.THEME_COLOR, "border-radius": 0},
    marginrowtop: {"margin-top": "20px"},
    inputwidth:{width: "95%", "text-align": "left"},
    headingbold:{fontWeight: "bold"}
};
export default function ParticipantForm(props) {
    const [screenlabels, setscreenlabels] = useState(labels['en']);
    const options = useMemo(() => countryList().getData(), [])

    return (
        <>
            <Row style={useStyles.marginrowtop}>
                <span className="mainheading">
                    {props.first_heading}
                </span>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <TextField
                        style={useStyles.inputwidth}
                        id="filled-basic"
                        variant="filled"
                        required
                        value={props.organisationname}
                        onChange={(e) =>validateInputField(e.target.value,RegexConstants.ORG_NAME_REGEX)? props.setorganisationname(e.target.value): e.preventDefault()}
                        label={screenlabels.addparticipants.organisation_name}
                    />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        style={useStyles.inputwidth}
                        id="filled-basic"
                        variant="filled"
                        required
                        value={props.orginsationemail}
                        onChange={(e) => props.setorginsationemail(e.target.value.trim())}
                        label={screenlabels.addparticipants.email}
                        error={props.isorganisationemailerror}
                        helperText={props.isorganisationemailerror ? "Enter Valid Email id" : ""}
                    />
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <TextField
                        style={useStyles.inputwidth}
                        variant="filled"
                        required
                        value={props.websitelink}
                        onChange={(e) => props.setwebsitelink(e.target.value.trim())}
                        label={screenlabels.addparticipants.website_link}
                        error={props.iswebsitelinkrerror}
                        helperText={props.iswebsitelinkrerror ? "Enter Valid Website Link" : ""}
                    />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        style={useStyles.inputwidth}
                        id="filled-basic"
                        variant="filled"
                        required
                        label={screenlabels.addparticipants.organisation_address}
                        value={props.organisationaddress}
                        onKeyDown={(e) => handleAddressCharacters(props.organisationaddress,e)}
                        onChange={(e) => props.setorganisationaddress(e.target.value)}
                    />
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <TextField 
                        select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        style={useStyles.inputwidth}
                        variant="filled"
                        required
                        value={props.countryvalue}
                        onChange={(e) => props.setcountryvalue(e.target.value)}
                        isSearchable={true}
                        label={screenlabels.addparticipants.country}
                    >
                        {options.map((rowData, index) => (
                            <MenuItem value={rowData.label}>{rowData.label}</MenuItem>
                        ))}
                    </TextField>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <TextField
                       style={useStyles.inputwidth}
                        id="filled-basic"
                        variant="filled"
                        required
                        type="number"
                        label={screenlabels.addparticipants.pincode}
                        value={props.pincode}
                        onChange={(e) => validateInputField(e.target.value,RegexConstants.PINCODE_REGEX) ? props.setpincode(e.target.value.trim()) : e.preventDefault()}
                        //error={props.ispincodeerror}
                        // helperText={props.ispincodeerror ? "Enter Valid Pin Code" : ""}
                    />
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <span className="mainheading">
                    {props.second_heading}
                </span>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <TextField
                        style={useStyles.inputwidth}
                        id="filled-basic"
                        variant="filled"
                        required
                        label={screenlabels.addparticipants.first_name}
                        value={props.firstname}
                        // onKeyDown={(e) => handleNameFieldEntry(props.firstname,e)}
                        onChange={(e) => validateInputField(e.target.value,RegexConstants.TEXT_REGEX) ? props.setfirstname(e.target.value.trim()) : e.preventDefault()}
                    />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        style={useStyles.inputwidth}
                        id="filled-basic"
                        variant="filled"
                        label={screenlabels.addparticipants.last_name}
                        value={props.lastname}
                        // onKeyDown={(e) => handleNameFieldEntry(props.lastname,e)}
                        onChange={(e) => validateInputField(e.target.value,RegexConstants.TEXT_REGEX) ? props.setlastname(e.target.value.trim()) : e.preventDefault()}
                    />
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <TextField
                        style={useStyles.inputwidth}
                        id="filled-basic"
                        variant="filled"
                        required
                        label={screenlabels.addparticipants.email}
                        value={props.useremail}
                        onChange={(e) => props.setuseremail(e.target.value.trim())}
                        error={props.isuseremailerror}
                        helperText={props.isuseremailerror ? "Enter Valid Email id" : ""}
                    />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <MuiPhoneNumber
                        defaultCountry={"in"}
                        style={useStyles.inputwidth}
                        id="filled-basic"
                        label={screenlabels.addparticipants.contact_number}
                        variant="filled"
                        required
                        value={props.contactnumber}
                        onChange={(e) => props.setcontactnumber(e)}
                        error={props.iscontactnumbererror}
                        helperText={props.iscontactnumbererror ? "Enter Valid Number" : ""}
                    />
                </Col>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <span className="mainheading">
                    {props.third_heading}
                </span>
            </Row>
            <Row style={useStyles.marginrowtop}>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <TextField
                        select
                        variant="filled"
                        required
                        style={useStyles.inputwidth}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        //label={screenlabels.addparticipants.subscripiton_length}
                        value={props.organisationlength}
                        onChange={(e) => props.setorganisationlength(e.target.value)}
                    >
                        <MenuItem value={1}>1 month</MenuItem>
                        <MenuItem value={3}>3 month</MenuItem>
                        <MenuItem value={6}>6 month</MenuItem>
                        <MenuItem value={12}>12 month</MenuItem>
                    </TextField>
                </Col>
            </Row>
        </>
    );
}

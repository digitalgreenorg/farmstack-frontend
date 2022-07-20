import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import labels from '../../Constants/labels';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import $ from 'jquery';
import FilterCheckBox from '../../Components/Datasets/FilterCheckBox';

export default function DataSetFilter(props) {
    const [screenlabels, setscreenlabels] = useState(labels['en']);

    const [geographyList, setGeographyList] = useState(["India","Ethiopia","Nepal","Kenya"])
    const [geoCheckStateList, setGeoCheckStateList] = useState([false,false,false,false])

    const [cropList,setCropList] = useState(["Rice","Wheat","Maize"])
    const [cropCheckStateList, setCropCheckStateList] = useState([false,false,false])

    const [ageList, setAgeList] = useState(["3 Months","6 Months","9 Months","Constantly Updating"])
    const [ageCheckStateList, setAgeCheckStateList] = useState([false,false,false,false])

    const handleCheckListFilterChange = (listName,index) => {

        var resetCheckStateList = []
        var tempList = []
        if(listName==="geography"){
            tempList = [...geoCheckStateList]
            tempList[index] = !geoCheckStateList[index]
            setGeoCheckStateList(tempList)

            setCropCheckStateList(resetCheckStateList)
            setAgeCheckStateList(resetCheckStateList)
            
        } else if(listName === "crop"){
            tempList = [...cropCheckStateList]
            tempList[index] = !cropCheckStateList[index]
            setCropCheckStateList(tempList)

            setGeoCheckStateList(resetCheckStateList)
            setAgeCheckStateList(resetCheckStateList)
        } else if(listName === "age"){
            tempList = [...ageCheckStateList]
            tempList[index] = !ageCheckStateList[index]
            setAgeCheckStateList(tempList)

            setGeoCheckStateList(resetCheckStateList)
            setCropCheckStateList(resetCheckStateList)
        }
        
    }

  const filterObject = props.filterObject
  return (
    <div>
        <Row className="supportfilterfirstrow">
            <Col className='supportfiltertext'>
            <span className="fontweight600andfontsize14pxandcolor3A3A3A" >{screenlabels.dataset.filter}</span>
            </Col>
            
            <Col className='supportfiltertext'>
            <span className="fontweight600andfontsize14pxandcolor3A3A3A" >{screenlabels.dataset.filter}</span>
            </Col>
        </Row>
        {filterObject.all ? 
        <Row onClick={() => props.filterRow('all', false, 'all')} className="supportfiltersecondrow">
            <span className="supportallicon">
                <img
                    src={require('../../Assets/Img/filter.svg')}
                    alt="new"
                />
            </span>
            <span className="fontweight600andfontsize14pxandcolorFFFFFF supportalltexticon">{screenlabels.support.all}</span>
        </Row> :
        <Row onClick={() => props.filterRow('all', true, 'all')} className="supportfiltersecondrowbold">
            <span className="supportallicon">
                <img
                    src={require('../../Assets/Img/filter_bold.svg')}
                    alt="new"
                />
            </span>
            <span className="fontweight600andfontsize14pxandcolor3D4A52 supportalltexticon">{screenlabels.support.all}</span>
        </Row>}
        <Row className={props.secondrow ? 'supportfilterthirdrowhighlight' : "supportfilterthirdrow"}>
          <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterthirdrowheadingtext">{screenlabels.support.date}</span>
          <span className="supportcardfromdate">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                      inputFormat="dd/MM/yyyy"
                      disableFuture
                      label="From Date *"
                      value={props.fromdate}
                      onChange={(newValue) => {
                          props.settodate(null)
                          props.setfromdate(newValue);
                          setTimeout(() => {
                              $(".supportcardtodate input.MuiInputBase-input").attr("disabled", "disabled");
                          }, 100)
                      }}
                      renderInput={(params) => <TextField {...params} />}
                  />
              </LocalizationProvider>
          </span>
          <span className="supportcardtodate">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                      inputFormat="dd/MM/yyyy"
                      disabled={props.fromdate ? false : true}
                      disableFuture
                      label="To Date *"
                      minDate={props.fromdate}
                      value={props.todate}
                      onChange={(newValue) => {
                          props.settodate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                  />
              </LocalizationProvider>
          </span>
          {props.fromdate && props.todate ? <span className="supportsubmitbrn">
              <Button onClick={() => props.filterByDates()} variant="contained" className="enabledatesubmitbtn">
                  Submit
          </Button>
          </span> :
              <span className="supportsubmitbrn">
                  <Button variant="outlined" className="disbaledatesubmitbtn">
                      Submit
                  </Button>
              </span>}
      </Row>
      <Row className="supportfiltersecondrowbold">
          <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterheadingtext">{screenlabels.dataset.geography}</span>
      </Row>
      
      <Row>
        {geographyList && geographyList.map((geography,index) => (
            <FilterCheckBox
                label={geography}
                checked={geoCheckStateList[index]}
                handleCheckListFilterChange={() => handleCheckListFilterChange("geography",index)}
            />
        ))}  
      </Row>
      
      <Row className="supportfiltersecondrowbold">
          <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterheadingtext">{screenlabels.dataset.age}</span>
      </Row>
      <Row>
        {ageList && ageList.map((age,index) => (
            <FilterCheckBox
                label={age}
                checked={ageCheckStateList[index]}
                handleCheckListFilterChange={() => handleCheckListFilterChange("age",index)}
            />
        ))}  
      </Row>
      <Row className="supportfiltersecondrowbold">
          <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterheadingtext">{screenlabels.dataset.crop}</span>
      </Row>
      <Row>
        {cropList && cropList.map((crop,index) => (
            <FilterCheckBox
                label={crop}
                checked={cropCheckStateList[index]}
                handleCheckListFilterChange={() => handleCheckListFilterChange("crop",index)}
            />
        ))}  
      </Row>
      
    </div>
  )
}

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
import { SearchSharp } from '@mui/icons-material';

export default function DataSetFilter(props) {
    const [screenlabels, setscreenlabels] = useState(labels['en']);

    const [geoMasterList,setGeoMasterList] = useState(["India","Ethiopia","Nepal","Kenya"])
    const [geographyList, setGeographyList] = useState(["India","Ethiopia","Nepal","Kenya"])
    const [geoCheckStateList, setGeoCheckStateList] = useState([false,false,false,false])

    const [cropMasterList, setCropMasterList] = useState(["Rice","Wheat","Maize"])
    const [cropList,setCropList] = useState(["Rice","Wheat","Maize"])
    const [cropCheckStateList, setCropCheckStateList] = useState([false,false,false])

    const [ageMasterList, setAgeMasterList] = useState(["3 Months","6 Months","9 Months","Constantly Updating"])
    const [ageList, setAgeList] = useState(["3 Months","6 Months","9 Months","Constantly Updating"])
    const [ageCheckStateList, setAgeCheckStateList] = useState([false,false,false,false])

    const handleCheckListFilterChange = (listName,index) => {

        var resetCheckStateList = []
        var tempList = []
        if(listName==="geography"){
            console.log("Toggled Geography Filter index:", index)
            tempList = [...geoCheckStateList]
            tempList[index] = !geoCheckStateList[index]
            setGeoCheckStateList(tempList)

            setCropCheckStateList(resetCheckStateList)
            setAgeCheckStateList(resetCheckStateList)
            
        } else if(listName === "crop"){
            console.log("Toggled Crop Filter Index:", index)
            tempList = [...cropCheckStateList]
            tempList[index] = !cropCheckStateList[index]
            setCropCheckStateList(tempList)

            setGeoCheckStateList(resetCheckStateList)
            setAgeCheckStateList(resetCheckStateList)
        } else if(listName === "age"){
            console.log("Toggled Age Filter Index:", index)
            tempList = [...ageCheckStateList]
            tempList[index] = !ageCheckStateList[index]
            setAgeCheckStateList(tempList)

            setGeoCheckStateList(resetCheckStateList)
            setCropCheckStateList(resetCheckStateList)
        }
        
    }

    const handleGeoSearch = (e) => {
        const searchText = e.target.value
        var tempList =[]
        if(searchText == ""){
            tempList = geoMasterList
        } else {
            tempList = geoMasterList.filter((geo)=>{
                return geo.startsWith(searchText)
            })
        }
        setGeographyList(tempList)
    }

    const handleCropSearch = (e) => {
        const searchText = e.target.value
        var tempList =[]
        if(searchText == ""){
            tempList = cropMasterList
        } else {
            tempList = cropMasterList.filter((crop)=>{
                return crop.startsWith(searchText)
            })
        }
        setCropList(tempList)
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
      <Row className="supportfiltersecondrowbold">
          <TextField 
            style={{ "width":"100%", "margin-left":"10px","margin-right":"10px","text-align": "left", color: '#3D4A52'}}
            id="filled-basic"
            variant="filled"
            label={screenlabels.dataset.search}
            onChange={(e) => handleGeoSearch(e)}
          />
      </Row>
      <Row>
        {geographyList && geographyList.map((geography) => (
            <FilterCheckBox
                label={geography}
                checked={geoCheckStateList[geoMasterList.findIndex((geo)=> geo == geography)]}
                handleCheckListFilterChange={() => handleCheckListFilterChange("geography",geoMasterList.findIndex((geo)=> geo == geography))}
            />
        ))}  
      </Row>
      
      <Row className="supportfiltersecondrowbold">
          <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterheadingtext">{screenlabels.dataset.age}</span>
      </Row>
      <Row>
        {ageList && ageList.map((age) => (
            <FilterCheckBox
                label={age}
                checked={ageCheckStateList[ageMasterList.findIndex((a)=> a == age)]}
                handleCheckListFilterChange={() => handleCheckListFilterChange("age",ageMasterList.findIndex((a)=> a == age))}
            />
        ))}  
      </Row>
      <Row className="supportfiltersecondrowbold">
          <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterheadingtext">{screenlabels.dataset.crop}</span>
      </Row>
      <Row className="supportfiltersecondrowbold">
          <TextField 
            style={{ "width":"100%", "margin-left":"10px","margin-right":"10px","text-align": "left", color: '#3D4A52'}}
            id="filled-basic"
            variant="filled"
            label={screenlabels.dataset.search}
            onChange={(e) => handleCropSearch(e)}
          />
      </Row>
      <Row>
        {cropList && cropList.map((crop) => (
            <FilterCheckBox
                label={crop}
                checked={cropCheckStateList[cropMasterList.findIndex((c)=> c == crop)]}
                handleCheckListFilterChange={() => handleCheckListFilterChange("crop",cropMasterList.findIndex((c)=> c == crop))}
            />
        ))}  
      </Row>
      
    </div>
  )
}

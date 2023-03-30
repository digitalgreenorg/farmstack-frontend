import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./standardizationInOnbording.css";
// import { Button } from 'antd';
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from '@mui/icons-material/Info';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import HTTPService from "../../Services/HTTPService";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import UrlConstant from "../../Constants/UrlConstants";
import Loader from "../Loader/Loader";
import { message, Space } from "antd";
import RegexConstants from "../../Constants/RegexConstants";
import { handleUnwantedSpace } from "../../Utils/Common";

const StandardizationInOnbord = (props) => {
  const { inSettings, isaccesstoken, showBrandingScreen, isOnborading } = props;
  const [allDatapoints, setAllDataPoints] = useState([
    // { datapoint_category: "Farmer profile", datapoint_description: "Add Datapoint attributes" },
    // { datapoint_category: "Farmer profile", datapoint_description: "Add Datapoint attributes" },
  ]);
  const [allAttributes, setAllAttributes] = useState({});
  const [allAttributesDes, setAllAttributesDes] = useState({});
  const [datapointName, setDatapointName] = useState("");
  const [datapointDes, setDatapointDes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessage] = useState("");
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false)
  const [editCategoryTitle, setEditCategoryTitle] = useState([])
  const [datapointNameError,setDatapointNameError] = useState("")
  const [accordionDatapointNameError,setAccordionDatapointNameError] = useState([])

  const history = useHistory();

  const [messageApi, contextHolder] = message.useMessage();
  const success = (text, type) => {
    messageApi.open({
      type: type,
      content: text,
      duration: 5,
    });
  };

  console.log("all datapoints", allDatapoints);

  const handleDatapointCategoryName = (e) =>{

    setDatapointNameError("")
    if(e.target.value.length<51 && e.target.value.match(RegexConstants.connector_name)) setDatapointName(e.target.value)
  }

  const handleDatapointCategoryDescription = (e) =>{

    if(e.target.value.length<251) setDatapointDes(e.target.value)
    
  }

  const handleNameField = (e) => {

    handleUnwantedSpace(datapointName, e)
  }

  const handledescriptionKeydowndes = (e) => {

    handleUnwantedSpace(datapointDes, e);

  };

  const handleAddDatapoint = () => {
      if(!datapointName || !datapointDes ){
        return
      }
      setSaveButtonEnabled(true)
      let tmpAllDatapoints = [...allDatapoints];
      let newDatapoint = {
        datapoint_category: datapointName,
        datapoint_description: datapointDes,
      };
      // Check if category name already exist or not
      let returnFromFuntion = false
      tmpAllDatapoints.forEach((category,index)=>{
        if(category.datapoint_category === datapointName) {
          setDatapointNameError("Category already exists!")
          returnFromFuntion = true;
          return
        }
      })
      if(returnFromFuntion) return


    let tmpAllAttributes = { ...allAttributes };
    let tmpAllAttributesDes = { ...allAttributesDes };

    let keys = Object.keys(allAttributes);
    console.log("keys", keys);

    tmpAllAttributes[keys.length] = [];
    tmpAllAttributesDes[keys.length] = [];

    console.log("all attribute tmp in add", tmpAllAttributes);

    setAllAttributes({ ...tmpAllAttributes });
    setAllAttributesDes({ ...tmpAllAttributesDes });

    console.log('tmpAllDatapoints in add',tmpAllDatapoints)

    tmpAllDatapoints.push(newDatapoint);
    setAllDataPoints(tmpAllDatapoints);
    setDatapointName("");
    setDatapointDes("");
  };
    const handleUpdateCategoryName = (index,newValue) =>{
    setSaveButtonEnabled(true)

    let tmpAllDatapoints = [...allDatapoints];
    console.log('error array', accordionDatapointNameError)

      //Check if category name already exist or not
      // let returnFromFuntion = false
      // tmpAllDatapoints.forEach((category)=>{
      //   if(category.datapoint_category === newValue) {
      //     let tmpDatapointNameError = [...accordionDatapointNameError]
        //tmpDatapointNameError[index] = ` ${newValue} Category already exists!`
      //     setAccordionDatapointNameError(tmpDatapointNameError)
      //     returnFromFuntion = true;
      //     return
      //   }
      // })
      // if(returnFromFuntion) return
      // let tmpDatapointNameError = [...accordionDatapointNameError]
      //     tmpDatapointNameError[index] = ""
      //     setAccordionDatapointNameError(tmpDatapointNameError)
    if(newValue.length<51 && newValue.match(RegexConstants.NEW_NAME_REGEX)){
      tmpAllDatapoints[index].datapoint_category = newValue;
      setAllDataPoints(tmpAllDatapoints);
    }else{
      return
    }

  }
  const handleNameExistsUpdate = (index, newValue) => {
    let tmpAllDatapoints = [...allDatapoints];
    let newCategoryName = newValue.trim();
  
    // Check if category name already exists or not
    let categoryAlreadyExists = tmpAllDatapoints.some((category, i) => {
      return i !== index && category.datapoint_category === newCategoryName;
    });
  
    if (categoryAlreadyExists) {
      let errorofnewValue = [...accordionDatapointNameError];
      errorofnewValue[index] = `"${newCategoryName}" is already taken. Please choose a different name.`;
      setAccordionDatapointNameError(errorofnewValue);
      
    }else if (newCategoryName === ""){
      let errorofnewValue = [...accordionDatapointNameError]
      errorofnewValue[index] = "This field may not be blank"
      setAccordionDatapointNameError(errorofnewValue)
      
    } else {
      let tmpDatapointNameError = [...accordionDatapointNameError];
      tmpDatapointNameError[index] = "";
      setAccordionDatapointNameError(tmpDatapointNameError);
      handleUpdateCategoryName(index, newCategoryName);
      let tmp = [...editCategoryTitle]
      tmp[index] = false
      console.log('edit title', tmp, editCategoryTitle)
      setEditCategoryTitle(tmp)

    }
  };
  

  const hanldeAttributeInputChange = (
    index,
    allAttributesArrIndex,
    newValue
  ) => {
    
    if(newValue.length>=251 || !newValue.match(RegexConstants.DATAPOINT_ATTRIBUTE_REGEX)){
      return
    }
    setSaveButtonEnabled(true)
    console.log("allAttribute in start of function", allAttributes);
    let tmpAllAttributes = { ...allAttributes };

    tmpAllAttributes[index][allAttributesArrIndex] = newValue;
    setAllAttributes(tmpAllAttributes);
    console.log("allAttribute", allAttributes);
  };
  const hanldeAttributeDesInputChange = (
    index,
    allAttributesArrIndex,
    newValue
  ) => {

    if(newValue.length>=251){
      return
    }
    if(newValue == " "){
      newValue.replace("")
    }
    setSaveButtonEnabled(true)

    console.log("allAttribute Des in start of function", allAttributesDes);
    let tmpAllAttributesDes = { ...allAttributesDes };

    tmpAllAttributesDes[index][allAttributesArrIndex] = newValue;
    setAllAttributesDes(tmpAllAttributesDes);
    console.log("allAttributeDes", allAttributesDes);
  };

  const handleAddDatapointAttribute = (index) => {

    if(!allAttributes[index][0] || !allAttributesDes[index][0]){
        return
    }
    setSaveButtonEnabled(true)

    let tmpAllAttributes = { ...allAttributes };
    tmpAllAttributes[index].push(tmpAllAttributes[index][0]);
    tmpAllAttributes[index][0] = "";
    setAllAttributes(tmpAllAttributes);

    // For Des
    let tmpAllAttributesDes = { ...allAttributesDes };
    tmpAllAttributesDes[index].push(tmpAllAttributesDes[index][0]);
    tmpAllAttributesDes[index][0] = "";
    setAllAttributesDes(tmpAllAttributesDes);
    console.log("all Des", tmpAllAttributesDes);
  };

  const handleDatapointAtticuteDelete = (index, arrIndex) => {
    let tmpAllAttributes = { ...allAttributes };
    tmpAllAttributes[index].splice(arrIndex, 1);
    setAllAttributes(tmpAllAttributes);
    console.log("tmpAllAttributes", tmpAllAttributes);
  };

  const handleDatapointCategoryDelete = (index) => {
    if (allDatapoints[index]["id"]) {
      console.log("id", allDatapoints[index]["id"]);
      deleteDatapointCategory(allDatapoints[index]["id"], index);
    } else {
      let tmpAllDatapoints = [...allDatapoints];
      tmpAllDatapoints.splice(index, 1);
      setAllDataPoints(tmpAllDatapoints);
      
      let tmpAllAttributes = {...allAttributes};
      tmpAllAttributes[index] = []
      setAllAttributes(tmpAllAttributes)
      success("Category deleted successfully.", "success");
    }
  };

  //   API calls

  const handleSubmit = () => {
    let payload = [...allDatapoints];

    console.log('payload before setting up', payload)

    for (let index = 0; allDatapoints[index]; index++) {
      let attributeObj = {};
      for (let i = 1; i < allAttributes[index].length; i++) {
        attributeObj[allAttributes[index][i]] = allAttributesDes[index][i];
      }
      payload[index]["datapoint_attributes"] = attributeObj;
    }

    console.log("final payload", payload);

    let method = inSettings ? "PUT" : isOnborading ? "POST" : "POST";
    let url = isOnborading
      ? UrlConstant.base_url + UrlConstant.standardization_post_data
      : inSettings
      ? UrlConstant.base_url + UrlConstant.standardization_update_data
      : UrlConstant.base_url + UrlConstant.standardization_post_data;

    setIsLoading(true);
    HTTPService(method, url, payload, false, true, isOnborading ? isaccesstoken : false)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response.status == 201) {
          if (inSettings) {
            success("Standardization template updated!", "success");
          } else {
            success(
              "Standardization template created successfully.",
              "success"
            );
          }
          console.log("success");
          if (isOnborading) {
            showBrandingScreen();
          }
          else if (inSettings) {
          getStandardiziedTemplate()
          }
        }
      })
      .catch((e) => {
        setIsLoading(false);
        //   success('Standardization template created successfully')
        console.log(e);
        if (
          e.response != null &&
          e.response != undefined &&
          (e.response.status === 401 || e.response.status === 502)
        ) {
          setError(true);
          // success(
          //   e.response.data && e.response.data.message
          //     ? e.response.data.message
          //     : "User not registered", "error"
          // );
          history.push(GetErrorHandlingRoute(e));
        } else {
          setError(false);
          success(
            e.response.data
              ? e.response.data
              : "Something went wrong.",
            "error"
          );
        }
      });
  };

  const getStandardiziedTemplate = () => {
    let url = UrlConstant.base_url + UrlConstant.standardization_get_data;

    setIsLoading(true);
    HTTPService("GET", url, false, false, true)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response.status == 200) {
          setAllDataPoints(response?.data);
          let tmp = { ...allAttributes };
          let tmpDes = { ...allAttributesDes };
          response.data.forEach((item, index) => {
            tmp[index] = Object.keys(item.datapoint_attributes);
            tmp[index].push(tmp[index]?.[0]);
            tmp[index][0] = "";

            tmpDes[index] = Object.values(item.datapoint_attributes);
            tmpDes[index].push(tmpDes[index]?.[0]);
            tmpDes[index][0] = "";
          });
          setAllAttributes(tmp);
          setAllAttributesDes(tmpDes);
          console.log("tmp in get call attributes", tmp,tmpDes, allAttributes);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        //   success('Standardization template created successfully')
        console.log(e);
        if (
          e.response != null &&
          e.response != undefined &&
          (e.response.status === 401 || e.response.status === 502)
        ) {
          setError(true);
          // success(
          //   e.response.data && e.response.data.message
          //     ? e.response.data.message
          //     : "User not registered", "error"
          // );
          history.push(GetErrorHandlingRoute(e));
        } else {
          setError(false);
          success(
            e.response.data && e.response.data.message
              ? e.response.data.message
              : "Something went wrong.",
            "error"
          );
        }
      });
  };

  const deleteDatapointCategory = (id, index) => {
    let url =
      UrlConstant.base_url +
      UrlConstant.standardization_delete_category +
      id +
      "/";

    HTTPService("DELETE", url, false, false, true)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        let tmpAllAttributes = {...allAttributes};
      tmpAllAttributes[index] = []
      setAllAttributes(tmpAllAttributes)
        success("Category deleted successfully.", "success");

        let tmpAllDatapoints = [...allDatapoints];
        tmpAllDatapoints.splice(index, 1);
        setAllDataPoints(tmpAllDatapoints);
        return true;
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
        if (
          e.response != null &&
          e.response != undefined &&
          (e.response.status === 401 || e.response.status === 502)
        ) {
          setError(true);
          history.push(GetErrorHandlingRoute(e));
        } else {
          setError(false);
          success(
            e.response.data && e.response.data.message
              ? e.response.data.message
              : "Something went wrong.",
            "error"
          );
        }
      });
  };

  // useEffect(()=>{
  //     console.log('attribute in use effect to check', allAttributes)
  // },[allAttributes])

  //   useEffect(() => {
  //     console.log('use effect run 1')
  //     let tmpAllAttributes = { ...allAttributes };
  //     let tmpAllAttributesDes = { ...allAttributesDes };
  //     allDatapoints.forEach((item, index) => {

  //         // if(!allAttributes[index]){
  //         //     // console.log('in use effect loop', allAttributes, index, tmpAllAttributes)
  //         //     tmpAllAttributes[index] = [];
  //         //     tmpAllAttributesDes[index] = [];

  //         // }
  //     });
  //     console.log("all attribute in map", allAttributes,tmpAllAttributes);
  //     // setAllAttributes(tmpAllAttributes);
  //     // setAllAttributesDes(tmpAllAttributesDes)

  //   }, [allDatapoints]);

  useEffect(() => {
    if (inSettings) {
      getStandardiziedTemplate();
    }
  }, []);

  console.log("all attribute", allAttributes);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      {contextHolder}
      <div className="main-container">
        <div className="title-container">
          <h1>Datapoint category details</h1>
          <p>
            Enter the datapoints and datapoints attributes, we will show to
            others!
          </p>
        </div>
        <div className="data-point-input-box-container">
          <TextField
          required
            value={datapointName}
            onChange={(e) => handleDatapointCategoryName(e)}
            onKeyDown={handleNameField}
            inputProps={{ maxLength: 250 }}
            className="datapoint-name-input-box"
            id="datapoint-name-input-box-id"
            label="Datapoint category name"
            variant="outlined"
            error={datapointNameError ? datapointNameError : "" }
            helperText={datapointNameError ? datapointNameError : "" }
          />
          <TextField
          required
            value={datapointDes}
            onChange={(e) => handleDatapointCategoryDescription(e)}
            onKeyDown={handledescriptionKeydowndes}
            inputProps={{ maxLength: 250 }}
            multiline
            size="small"
            className="datapoint-name-input-box-description"
            id="datapoint-name-input-box-description-id"
            label="Datapoint category description"
            variant="outlined"
          />
        </div>
        <div className="datapoint-add-button-classname">
          <Button
            variant="contained"
            className="datapoint-add-button"
            id="add-datapoint-button"
            onClick={handleAddDatapoint}
            disabled={!datapointName || !datapointDes }
          >
            Add
          </Button>
        </div>

        <div className="attribute-container">
          <h1>Datapoint attributes</h1>
          {allDatapoints?.map((item, index) => {
            // let tmpAllAttributes = {...allAttributes}
            // tmpAllAttributes[index] = []
            // setAllAttributes(tmpAllAttributes)
            // console.log('all attribute in map', allAttributes)

            return (
              <>
                <Accordion className="accordion-main-classname">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="attribute-accordion-titile"
                  >
                    {/* <Typography className="accordion-title" variant="h5">
                      {item.datapoint_category}
                    </Typography> */}

                    {
                      editCategoryTitle[index] ? 
                      <TextField
                      value={item.datapoint_category}
                      required
                      onChange={(e) => handleUpdateCategoryName(index,e.target.value,e)}
                      inputProps={{ maxLength: 250 }}
                      className="datapoint-name-input-box"
                      id="datapoint-name-input-box-id"
                      label="Datapoint category name"
                      variant="outlined"
                      helperText={accordionDatapointNameError[index] ? accordionDatapointNameError[index] : accordionDatapointNameError[index]}
                      error={accordionDatapointNameError[index] ? accordionDatapointNameError[index] : accordionDatapointNameError[index]}
                        />
                      :
                      <div >

                      <Typography  className="accordion-title" variant="h5">
                      {item.datapoint_category}
                    </Typography>
                      </div>
                    }{
                      editCategoryTitle[index]  ?
                      <IconButton>
                        <Button onClick={() => handleNameExistsUpdate(index, item.datapoint_category)}
                          // this funtion will make a particular index of editCategoryTitle array false       
                          className="update-category-button" >Update</Button>
                      </IconButton>
                    : 
                    null
                    }
                    {/* <div> */}
                    <IconButton onClick={(e) => {
                         // this funtion will make a particular index of editCategoryTitle array true 
                         e.stopPropagation();
                         let tmp = [...editCategoryTitle]
                         tmp[index] = true
                         console.log('edit title', tmp, editCategoryTitle)
                         setEditCategoryTitle(tmp)
                    }}>
                      <EditIcon/>
                    </IconButton>
                      <IconButton
                        onClick={(e) =>{
                        handleDatapointCategoryDelete(index)
                        e.stopPropagation();
                        }}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    {/* </div> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="attribute-main-div">
                      {/* <h3>Farmer profile</h3> */}
                      <p className="standardization-accordion-description">{item.datapoint_description}</p>
                      <div>
                        <TextField
                        required
                          className="datapoint-attribute-input-box"
                          id="datapoint-attribute-input-box-id"
                          label="Datapoint attributes"
                          variant="outlined"
                          value={allAttributes[index]?.[0]}
                          onChange={(e) =>
                            hanldeAttributeInputChange(index, 0, e.target.value)
                          }
                          inputProps={{ maxLength: 250 }}
                        />
                        <TextField
                        required
                          className="datapoint-attribute-input-box"
                          id="datapoint-attribute-input-box-id"
                          label="Datapoint attributes description"
                          variant="outlined"
                          value={allAttributesDes[index]?.[0]}
                          onChange={(e) =>
                            hanldeAttributeDesInputChange(
                              index,
                              0,
                              e.target.value
                            )
                          }
                          inputProps={{ maxLength: 250 }}
                        />
                        <span
                          className="add-datapoint-svg"
                          onClick={() => handleAddDatapointAttribute(index)}
                        >
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="24"
                              cy="24"
                              r="23.5"
                              fill="white"
                              stroke="#D5DADE"
                            />
                            <AddIcon id="add-attribute-icon-id" fontSize="small"/>
                            {/* <g clip-path="url(#clip0_651_27789)">
                              <path
                                d="M31 25H25V31H23V25H17V23H23V17H25V23H31V25Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_651_27789">
                                <rect
                                  width="24"
                                  height="24"
                                  fill="white"
                                  transform="translate(12 12)"
                                />
                              </clipPath>
                            </defs> */}
                          </svg>
                        </span>
                      </div>
                      <div>
                        {allAttributes?.[index]?.map((inputValue, arrIndex) => {
                            console.log('in category map ',allAttributesDes?.[index]?.[arrIndex], allAttributesDes?.[index])
                          return (
                            <>
                              {arrIndex != 0 ? (
                                <TextField
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                      <Tooltip title={allAttributesDes?.[index]?.[arrIndex]}>
                                      <InfoIcon/>
                                      </Tooltip>
                                      <IconButton
                                        onClick={(e) =>
                                            handleDatapointAtticuteDelete(
                                                index,
                                                arrIndex
                                                )
                                            }
                                            >
                                        <DeleteOutlineIcon />
                                      </IconButton>
                                          </>
                                      // </span>
                                    ),
                                  }}
                                  className="datapoint-attribute-input-box"
                                  id="datapoint-attribute-input-box-id"
                                  label="Datapoint attributes"
                                  variant="outlined"
                                  value={inputValue}
                                  //   onChange={(e) =>
                                  //     // hanldeAttributeInputChange(index, 0, e.target.value)
                                  //   }
                                />
                              ) : (
                                ""
                              )}
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </>
            );
          })}

          {/* <h1>Datapoint attributes</h1>

          <div className="attribute-main-div">
            <h3>Farmer profile</h3>
            <p>Add Datapoint attributes</p>
            <div>
              <TextField
                className="datapoint-attribute-input-box"
                id="datapoint-attribute-input-box-id"
                label="Datapoint attributes"
                variant="outlined"
              />
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="23.5"
                  fill="white"
                  stroke="#D5DADE"
                />
                <g clip-path="url(#clip0_651_27789)">
                  <path
                    d="M31 25H25V31H23V25H17V23H23V17H25V23H31V25Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_651_27789">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(12 12)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div> */}
        </div>
      </div>
      <div className="datapoint-add-button-classname">
        {inSettings ? (
          <>
            <Button
              variant="contained"
              className="datapoint-add-button"
              id="addte-add-datapoint-button"
              onClick={handleSubmit}
              disabled={!allDatapoints.length || !saveButtonEnabled}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              className="finish-later-button"
              id="add-finish-later-datapoint-button"
              onClick={showBrandingScreen}
            >
              Finish later
            </Button>
            <Button
              variant="contained"
              className="datapoint-add-button"
              id="add-next-datapoint-button"
              onClick={handleSubmit}
            >
              Next
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default StandardizationInOnbord;

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
import { IconButton } from "@mui/material";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import HTTPService from "../../Services/HTTPService";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import UrlConstant from "../../Constants/UrlConstants";
import Loader from "../Loader/Loader";
import { message, Space } from "antd";
import RegexConstants from "../../Constants/RegexConstants";

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

    if(e.target.value.length<256 && e.target.value.match(RegexConstants.NEW_NAME_REGEX)) setDatapointName(e.target.value)
  }

  const handleDatapointCategoryDescription = (e) =>{

    if(e.target.value.length<256 && e.target.value.match(RegexConstants.NEW_NAME_REGEX)) setDatapointDes(e.target.value)
    
  }

  const handleAddDatapoint = () => {
      if(!datapointName || !datapointDes ){
        return
      }
    let tmpAllDatapoints = [...allDatapoints];
    let newDatapoint = {
      datapoint_category: datapointName,
      datapoint_description: datapointDes,
    };

    let tmpAllAttributes = { ...allAttributes };
    let tmpAllAttributesDes = { ...allAttributesDes };

    let keys = Object.keys(allAttributes);
    console.log("keys", keys);

    tmpAllAttributes[keys.length] = [];
    tmpAllAttributesDes[keys.length] = [];

    console.log("all attribute tmp in add", tmpAllAttributes);

    setAllAttributes({ ...tmpAllAttributes });
    setAllAttributesDes({ ...tmpAllAttributesDes });

    tmpAllDatapoints.push(newDatapoint);
    setAllDataPoints(tmpAllDatapoints);
    setDatapointName("");
    setDatapointDes("");
  };
  const hanldeAttributeInputChange = (
    index,
    allAttributesArrIndex,
    newValue
  ) => {
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
      success("Category deleted successfully.", "success");
    }
  };

  //   API calls

  const handleSubmit = () => {
    let payload = [...allDatapoints];

    for (let index = 0; allAttributes[index]; index++) {
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
    HTTPService(method, url, payload, false, true, isaccesstoken)
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
        }
      })
      .catch((e) => {
        setIsLoading(false);
        //   success('Standardization template created successfully')
        console.log(e);
        if (
          e.response != null &&
          e.response != undefined &&
          e.response.status === 401
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
          e.response.status === 401
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
          e.response.status === 401
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
            value={datapointName}
            onChange={(e) => handleDatapointCategoryName(e)}
            className="datapoint-name-input-box"
            id="datapoint-name-input-box-id"
            label="Datapoint category name"
            variant="outlined"
          />
          <TextField
            value={datapointDes}
            onChange={(e) => handleDatapointCategoryDescription(e)}
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
                    <Typography className="accordion-title" variant="h5">
                      {item.datapoint_category}
                    </Typography>
                    <div>
                      <IconButton
                        onClick={(e) => handleDatapointCategoryDelete(index)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="attribute-main-div">
                      {/* <h3>Farmer profile</h3> */}
                      <p>{item.datapoint_description}</p>
                      <div>
                        <TextField
                          className="datapoint-attribute-input-box"
                          id="datapoint-attribute-input-box-id"
                          label="Datapoint attributes"
                          variant="outlined"
                          value={allAttributes[index]?.[0]}
                          onChange={(e) =>
                            hanldeAttributeInputChange(index, 0, e.target.value)
                          }
                        />
                        <TextField
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
              id="update-add-datapoint-button"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              className="datapoint-add-button finish-later-button"
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

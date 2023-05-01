import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./standardizationInOnbording.css";
// import { Button } from 'antd';
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import HTTPService from "../../Services/HTTPService";

import add_icon from "../../Assets/Img/Farmstack V2.0/add_icon.svg";

import {
  GetErrorHandlingRoute,
  getUserLocal,
  goToTop,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import UrlConstant from "../../Constants/UrlConstants";
import Loader from "../Loader/Loader";
import { message, Space } from "antd";
import RegexConstants from "../../Constants/RegexConstants";
import { handleUnwantedSpace } from "../../Utils/Common";
import global_style from "../../Assets/CSS/global.module.css";
import styles from "../NewOnboarding/onboarding.module.css";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { Col, Row } from "react-bootstrap";

const StandardizationInOnbord = (props) => {
  const { callLoader, callToast } = useContext(FarmStackContext);
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
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [editCategoryTitle, setEditCategoryTitle] = useState([]);
  const [datapointNameError, setDatapointNameError] = useState("");
  const [accordionDatapointNameError, setAccordionDatapointNameError] =
    useState([]);
  const [attributeErrorMessage, setAttributeErrorMessage] = useState([]);
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

  const handleDatapointCategoryName = (e) => {
    setDatapointNameError("");
    if (e.target.value.length < 51) setDatapointName(e.target.value);
  };

  const handleDatapointCategoryDescription = (e) => {
    if (e.target.value.length < 251) setDatapointDes(e.target.value);
  };

  const handleNameField = (e) => {
    handleUnwantedSpace(datapointName, e);
  };

  const handledescriptionKeydowndes = (e) => {
    handleUnwantedSpace(datapointDes, e);
  };

  const handleAddDatapoint = () => {
    if (!datapointName || !datapointDes) {
      return;
    }
    setSaveButtonEnabled(true);
    let tmpAllDatapoints = [...allDatapoints];
    let newDatapoint = {
      datapoint_category: datapointName,
      datapoint_description: datapointDes,
    };
    // Check if category name already exist or not
    let returnFromFuntion = false;
    tmpAllDatapoints.forEach((category, index) => {
      if (category.datapoint_category === datapointName) {
        setDatapointNameError("Category already exists!");
        returnFromFuntion = true;
        return;
      }
    });
    if (returnFromFuntion) return;

    let tmpAllAttributes = { ...allAttributes };
    let tmpAllAttributesDes = { ...allAttributesDes };

    let keys = Object.keys(allAttributes);
    console.log("keys", keys);

    tmpAllAttributes[keys.length] = [];
    tmpAllAttributesDes[keys.length] = [];

    console.log("all attribute tmp in add", tmpAllAttributes);

    setAllAttributes({ ...tmpAllAttributes });
    setAllAttributesDes({ ...tmpAllAttributesDes });

    console.log("tmpAllDatapoints in add", tmpAllDatapoints);

    tmpAllDatapoints.push(newDatapoint);
    setAllDataPoints(tmpAllDatapoints);
    setDatapointName("");
    setDatapointDes("");
  };
  const handleUpdateCategoryName = (index, newValue) => {
    setSaveButtonEnabled(true);

    let tmpAllDatapoints = [...allDatapoints];
    console.log("error array", accordionDatapointNameError);
    if (newValue.length < 51) {
      tmpAllDatapoints[index].datapoint_category = newValue.trimStart();
      setAllDataPoints(tmpAllDatapoints);
    } else {
      return;
    }
  };
  const handleNameExistsUpdate = (index, newValue) => {
    let tmpAllDatapoints = [...allDatapoints];
    let newCategoryName = newValue.trim();

    // Check if category name already exists or not
    let categoryAlreadyExists = tmpAllDatapoints.some((category, i) => {
      return i !== index && category.datapoint_category === newCategoryName;
    });

    if (categoryAlreadyExists) {
      let errorofnewValue = [...accordionDatapointNameError];
      errorofnewValue[
        index
      ] = `"${newCategoryName}" is already taken. Please choose a different name.`;
      setAccordionDatapointNameError(errorofnewValue);
    } else if (newCategoryName === "") {
      let errorofnewValue = [...accordionDatapointNameError];
      errorofnewValue[index] = "This field may not be blank";
      setAccordionDatapointNameError(errorofnewValue);
    } else {
      let tmpDatapointNameError = [...accordionDatapointNameError];
      tmpDatapointNameError[index] = "";
      setAccordionDatapointNameError(tmpDatapointNameError);
      handleUpdateCategoryName(index, newCategoryName);
      let tmp = [...editCategoryTitle];
      tmp[index] = false;
      console.log("edit title", tmp, editCategoryTitle);
      setEditCategoryTitle(tmp);
    }
  };

  const hanldeAttributeInputChange = (
    index,
    allAttributesArrIndex,
    newValue
  ) => {
    if (newValue.length >= 251) {
      return;
    }
    setSaveButtonEnabled(true);
    console.log("allAttribute in start of function", allAttributes);
    let tmpAllAttributes = { ...allAttributes };

    tmpAllAttributes[index][allAttributesArrIndex] = newValue.trimStart();
    setAllAttributes(tmpAllAttributes);
    console.log("allAttribute", allAttributes);
  };
  const hanldeAttributeDesInputChange = (
    index,
    allAttributesArrIndex,
    newValue
  ) => {
    if (newValue.length >= 251) {
      return;
    }
    if (newValue == " ") {
      newValue.replace("");
    }
    setSaveButtonEnabled(true);

    console.log("allAttribute Des in start of function", allAttributesDes);
    let tmpAllAttributesDes = { ...allAttributesDes };

    tmpAllAttributesDes[index][allAttributesArrIndex] = newValue;
    setAllAttributesDes(tmpAllAttributesDes);
    console.log("allAttributeDes", allAttributesDes);
  };

  const handleAddDatapointAttribute = (index) => {
    if (!allAttributes[index] || !allAttributes[index][0]) {
      return;
    }
    setSaveButtonEnabled(true);

    let tmpAllAttributes = { ...allAttributes };
    const newAttribute = tmpAllAttributes[index][0].trimStart();
    if (
      tmpAllAttributes[index].slice(1).some((attr) => attr === newAttribute)
    ) {
      console.error(
        `Attribute "${newAttribute}" already exists for datapoint ${tmpAllAttributes[index][1]}`
      );
      let nameAlreadyExist = [...attributeErrorMessage];
      nameAlreadyExist[
        index
      ] = `"${newAttribute}" already exists for datapoint`;
      setAttributeErrorMessage(nameAlreadyExist);
      return;
    }
    tmpAllAttributes[index].push(tmpAllAttributes[index][0]);
    tmpAllAttributes[index][0] = "";
    setAllAttributes(tmpAllAttributes);

    // For Des
    let tmpAllAttributesDes = { ...allAttributesDes };
    tmpAllAttributesDes[index].push(tmpAllAttributesDes[index][0]);
    tmpAllAttributesDes[index][0] = "";
    setAllAttributesDes(tmpAllAttributesDes);
    setAttributeErrorMessage("");
    console.log("all Des", tmpAllAttributesDes);
  };
  const handleDatapointAtticuteDelete = (index, arrIndex) => {
    let tmpAllAttributes = { ...allAttributes };
    tmpAllAttributes[index].splice(arrIndex, 1);
    setAllAttributes(tmpAllAttributes);
    setSaveButtonEnabled(true);
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

      let tmpAllAttributes = { ...allAttributes };
      tmpAllAttributes[index] = [];
      setAllAttributes(tmpAllAttributes);
      callToast("Category deleted successfully.", "success", true);
    }
  };

  //   API calls

  const handleSubmit = () => {
    let payload = [...allDatapoints];

    console.log("payload before setting up", payload);

    for (let index = 0; allDatapoints[index]; index++) {
      let attributeObj = {};
      for (let i = 1; i < allAttributes[index].length; i++) {
        attributeObj[allAttributes[index][i]] = allAttributesDes[index][i];
      }
      payload[index]["datapoint_attributes"] = attributeObj;
    }

    console.log("final payload", payload);

    let method, url;
    if (inSettings) {
      method = "PUT";
      url = UrlConstant.base_url + UrlConstant.standardization_update_data;
    } else if (
      isOnborading &&
      (!allDatapoints === null || allDatapoints.length > 0)
    ) {
      method = "PUT";
      url = UrlConstant.base_url + UrlConstant.standardization_update_data;
    } else {
      method = isOnborading ? "POST" : "POST";
      url = UrlConstant.base_url + UrlConstant.standardization_post_data;
    }
    setIsLoading(true);
    HTTPService(
      method,
      url,
      payload,
      false,
      true,
      isOnborading ? isaccesstoken : false
    )
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response.status == 201) {
          if (inSettings) {
            callToast("Standardization template updated!", "success", true);
          } else {
            // callToast("Onboarding successfull", "success", true);
          }
          console.log("success");

          if (isOnborading) {
            setOnBoardedTrue();
          } else if (inSettings) {
            getStandardiziedTemplate();
          }
        }
      })
      .catch((e) => {
        setIsLoading(false);
        //   success('Standardization template created successfully')
        console.log(e, e?.response?.data);
        if (
          e.response != null &&
          e.response != undefined &&
          (e.response.status === 401 || e.response.status === 502)
        ) {
          setError(true);
          callToast(
            JSON.stringify(e?.response?.data[0]) ?? "Some error occured",
            "error",
            true
          );
          // success(
          //   e.response.data && e.response.data.message
          //     ? e.response.data.message
          //     : "User not registered", "error"
          // );
          // GetErrorHandlingRoute(e).then((errorObject) => {
          //   callToast(errorObject?.message, "error", true);
          // });
        } else {
          setError(true);
          callToast(
            JSON.stringify(e?.response?.data[0]) ?? "Some error occured",
            "error",
            true
          );
        }
      });
  };

  const getStandardiziedTemplate = () => {
    callLoader(true);
    let url = UrlConstant.base_url + UrlConstant.standardization_get_data;
    HTTPService("GET", url, false, false, true)
      .then((response) => {
        callLoader(false);
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
          console.log("tmp in get call attributes", tmp, tmpDes, allAttributes);
        }
      })
      .catch((e) => {
        callLoader(false);

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
          callToast(
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
        let tmpAllAttributes = { ...allAttributes };
        tmpAllAttributes[index] = [];
        setAllAttributes(tmpAllAttributes);
        callToast("Category deleted successfully.", "success");

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
          GetErrorHandlingRoute(e).then((errorObject) => {
            console.log(errorObject);
            callToast(
              errorObject?.message ? errorObject?.message : "",
              "error",
              true
            );
          });
        } else {
          setError(false);
          callToast(
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
  const setOnBoardedTrue = () => {
    let data = {
      user_id: getUserLocal(),
      on_boarded: true,
    };
    var url = UrlConstant.base_url + UrlConstant.onboarded;
    var bodyFormData = new FormData();
    bodyFormData.append("user_id", getUserLocal());
    bodyFormData.append("on_boarded", true);

    // setIsLoader(true);
    HTTPService("POST", url, data, false, true, isaccesstoken)
      .then((response) => {
        callToast("Onboarding successfull", "success", true);
        // setIsLoader(false);
        console.log("onboarded true response", response.data);
        if (isLoggedInUserAdmin()) {
          history.push("/datahub/new_datasets");
        } else if (isLoggedInUserParticipant()) {
          history.push("/participant/datasets");
        } else if (isLoggedInUserCoSteward()) {
          history.push("/datahub/new_datasets");
        }
      })
      .catch((e) => {
        // setIsLoader(false);
        // console.log(e);
        callToast(
          JSON.stringify(e?.response?.data ?? "Some error occurred"),
          "error",
          true
        );
      });
  };
  useEffect(() => {
    // if (inSettings) {
    getStandardiziedTemplate();
    // }
    goToTop(0);
  }, []);

  console.log("all attribute", allAttributes);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      {contextHolder}
      <div className={styles.main_box}>
        <div className={styles.main_label}>
          <div>Datapoint category details</div>
          <div className={styles.sub_label}>
            Enter the datapoints and datapoints attributes, we will show to
            others!
          </div>
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
            error={datapointNameError ? datapointNameError : ""}
            helperText={datapointNameError ? datapointNameError : ""}
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
            // className="datapoint-add-button"
            className={global_style.primary_button + " " + styles.next_button}
            id="add-datapoint-button"
            onClick={handleAddDatapoint}
            disabled={!datapointName || !datapointDes}
          >
            Add
          </Button>
        </div>

        <div className="attribute-container">
          {allDatapoints?.length > 0 && (
            <div className={styles.main_label}>Datapoint attributes</div>
          )}
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

                    {editCategoryTitle[index] ? (
                      <TextField
                        value={item.datapoint_category}
                        required
                        onChange={(e) =>
                          handleUpdateCategoryName(index, e.target.value, e)
                        }
                        sx={{
                          "&.MuiTextField-root": {
                            textAlign: "left",
                          },
                        }}
                        inputProps={{ maxLength: 250 }}
                        className="datapoint-name-input-box"
                        id="datapoint-name-input-box-id"
                        label="Datapoint category name"
                        variant="outlined"
                        helperText={
                          accordionDatapointNameError[index]
                            ? accordionDatapointNameError[index]
                            : accordionDatapointNameError[index]
                        }
                        error={
                          accordionDatapointNameError[index]
                            ? accordionDatapointNameError[index]
                            : accordionDatapointNameError[index]
                        }
                      />
                    ) : (
                      <div>
                        <Typography
                          className="accordion-title text-left"
                          variant="h4"
                        >
                          {item.datapoint_category}
                        </Typography>
                      </div>
                    )}
                    {editCategoryTitle[index] ? (
                      <IconButton>
                        <Button
                          onClick={() =>
                            handleNameExistsUpdate(
                              index,
                              item.datapoint_category
                            )
                          }
                          // this funtion will make a particular index of editCategoryTitle array false
                          // className="update-category-button"
                          className={
                            global_style.primary_button +
                            " " +
                            styles.next_button
                          }
                        >
                          Update
                        </Button>
                      </IconButton>
                    ) : null}
                    {/* <div> */}
                    {/* <IconButton
                      onClick={(e) => {
                        // this funtion will make a particular index of editCategoryTitle array true
                        e.stopPropagation();
                        let tmp = [...editCategoryTitle];
                        tmp[index] = true;
                        console.log("edit title", tmp, editCategoryTitle);
                        setEditCategoryTitle(tmp);
                      }}
                    >
                      <EditIcon />
                    </IconButton> */}
                    {/* <IconButton
                      onClick={(e) => {
                        handleDatapointCategoryDelete(index);
                        e.stopPropagation();
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton> */}
                    {/* </div> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="attribute-main-div">
                      {/* <h3>Farmer profile</h3> */}
                      <p className="standardization-accordion-description">
                        {item.datapoint_description}
                      </p>
                      <div
                        style={{ textAlign: "left" }}
                        className={
                          global_style.bold600 +
                          " " +
                          global_style.size20 +
                          " " +
                          styles.margintopbottom10
                        }
                      >
                        Add Datapoint attributes
                      </div>
                      <Row>
                        <Col lg={6}>
                          <TextField
                            sx={{
                              "&.MuiTextField-root": {
                                textAlign: "left",
                              },
                            }}
                            required
                            className="datapoint-attribute-input-box"
                            id="datapoint-attribute-input-box-id"
                            label="Datapoint attributes"
                            variant="outlined"
                            value={allAttributes[index]?.[0]}
                            onChange={(e) =>
                              hanldeAttributeInputChange(
                                index,
                                0,
                                e.target.value
                              )
                            }
                            inputProps={{ maxLength: 250 }}
                            helperText={
                              attributeErrorMessage[index]
                                ? attributeErrorMessage[index]
                                : attributeErrorMessage[index]
                            }
                            error={
                              attributeErrorMessage[index]
                                ? attributeErrorMessage[index]
                                : attributeErrorMessage[index]
                            }
                          />
                          {/* <TextField
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
                        /> */}
                        </Col>
                        <Col
                          lg={6}
                          style={{ textAlign: "left", display: "flex" }}
                        >
                          <img
                            style={{ alignSelf: "center", cursor: "pointer" }}
                            src={add_icon}
                            alt="add"
                            onClick={() => handleAddDatapointAttribute(index)}
                          />
                        </Col>
                      </Row>

                      <Row>
                        {allAttributes?.[index]?.map((inputValue, arrIndex) => {
                          console.log(
                            "in category map ",
                            allAttributesDes?.[index]?.[arrIndex],
                            allAttributesDes?.[index]
                          );
                          return (
                            <>
                              {arrIndex != 0 ? (
                                <Col
                                  lg={6}
                                  sm={12}
                                  className={styles.margintopbottom10}
                                >
                                  <TextField
                                    fullWidth
                                    InputProps={{
                                      endAdornment: (
                                        <>
                                          {/* <Tooltip
                                            title={
                                              allAttributesDes?.[index]?.[
                                                arrIndex
                                              ]
                                            }
                                          >
                                            <InfoIcon />
                                          </Tooltip> */}
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
                                    // className="datapoint-attribute-input-box1"
                                    id="datapoint-attribute-input-box-id"
                                    label="Datapoint attributes"
                                    variant="outlined"
                                    value={inputValue}
                                    //   onChange={(e) =>
                                    //     // hanldeAttributeInputChange(index, 0, e.target.value)
                                    //   }
                                  />
                                </Col>
                              ) : (
                                ""
                              )}
                            </>
                          );
                        })}
                      </Row>
                    </div>
                    <Row>
                      <Col style={{ textAlign: "right", margin: "20px" }}>
                        <Button
                          id="apply_policies"
                          variant="outlined"
                          style={{ margin: "20px" }}
                          className={
                            global_style.secondary_button_error +
                            " " +
                            styles.delete_button_policy
                          }
                          onClick={(e) => {
                            handleDatapointCategoryDelete(index);
                            e.stopPropagation();
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          id="apply_policies"
                          variant="outlined"
                          style={{ margin: "20px" }}
                          className={
                            global_style.primary_button +
                            " " +
                            styles.edit_button
                          }
                          onClick={(e) => {
                            // this funtion will make a particular index of editCategoryTitle array true
                            e.stopPropagation();
                            let tmp = [...editCategoryTitle];
                            tmp[index] = true;
                            console.log("edit title", tmp, editCategoryTitle);
                            setEditCategoryTitle(tmp);
                          }}
                        >
                          Edit
                        </Button>
                      </Col>
                    </Row>
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
        <Row style={{ display: "none" }}>
          <Col lg={6} md={12} sm={12}>
            <div className={styles.main_label}> Geography</div>
            <div>
              <FormControl required fullWidth>
                <InputLabel id="geography_label"> Select geography</InputLabel>
                <Select
                  required
                  labelId="geography_label"
                  id="geography"
                  // value={organisationDetails.organisation_country}
                  name="geography"
                  // onChange={(e) => handleOrgChange(e)}
                  label="Select geography"
                  // error={
                  //   organisationDetailsError.organisation_country_error
                  //     ? true
                  //     : false
                  // }
                  // helperText={organisationDetailsError.organisation_country_error}
                >
                  <MenuItem value={"in"}>India</MenuItem>
                  <MenuItem value={"eth"}>Ethiopia</MenuItem>
                  <MenuItem value={"kenya"}>Kenya</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <div className={styles.main_label}>Value chain</div>
            <div>
              <FormControl required fullWidth>
                <InputLabel id="value_label">Select value chain</InputLabel>
                <Select
                  required
                  labelId="value_label"
                  id="value_chain"
                  // value={organisationDetails.organisation_country}
                  name="value_chain"
                  // onChange={(e) => handleOrgChange(e)}
                  label="Select value chain"
                  // error={
                  //   organisationDetailsError.organisation_country_error
                  //     ? true
                  //     : false
                  // }
                  // helperText={organisationDetailsError.organisation_country_error}
                >
                  <MenuItem value={"in"}>India</MenuItem>
                  <MenuItem value={"eth"}>Ethiopia</MenuItem>
                  <MenuItem value={"kenya"}>Kenya</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Col>
        </Row>
      </div>
      <div className="datapoint-add-button-classname">
        {inSettings ? (
          <>
            <Button
              variant="contained"
              className={global_style.secondary_button}
              id="addte-add-datapoint-button"
              onClick={() => history.push("/datahub/new_datasets")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className={global_style.primary_button + " " + styles.next_button}
              id="addte-add-datapoint-button"
              onClick={handleSubmit}
              disabled={!allDatapoints.length || !saveButtonEnabled}
            >
              Submit
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              className={global_style.secondary_button}
              id="add-finish-later-datapoint-button"
              onClick={() => setOnBoardedTrue()}
            >
              Finish later
            </Button>
            <Button
              variant="contained"
              // className="datapoint-add-button"
              className={global_style.primary_button + " " + styles.next_button}
              id="add-next-datapoint-button"
              onClick={handleSubmit}
            >
              Finish
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default StandardizationInOnbord;

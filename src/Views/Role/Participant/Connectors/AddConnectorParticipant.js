import React, { useState, useEffect } from "react";
import ConnectorForm from "../../../../Components/Connectors/ConnectorForm";
import {
  validateInputField,
  handleUnwantedSpace,
} from "../../../../Utils/Common";
import RegexConstants from "../../../../Constants/RegexConstants";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import labels from "../../../../Constants/labels";
import Button from "@mui/material/Button";
import THEME_COLORS from "../../../../Constants/ColorConstants";
import Success from "../../../../Components/Success/Success";
import Loader from "../../../../Components/Loader/Loader";
import HTTPService from "../../../../Services/HTTPService";
import UrlConstants from "../../../../Constants/UrlConstants";

import HandleSessionTimeout, {
  setTokenLocal,
  getTokenLocal,
  setUserId,
  getUserLocal,
  handleAddressCharacters,
  setUserMapId,
  setOrgId,
  getOrgLocal,
} from "../../../../Utils/Common";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const useStyles = {
  btncolor: {
    color: "white",
    "border-color": THEME_COLORS.THEME_COLOR,
    "background-color": THEME_COLORS.THEME_COLOR,
    float: "right",
    "border-radius": 0,
  },
  marginrowtop: { "margin-top": "20px" },
  marginrowtop8px: { "margin-top": "0px" },
};

export default function AddConnectorParticipant() {
  const history = useHistory();
  //   dataset values
  const [datasets, setdatasets] = React.useState([]);
  const [department_variable, setdepartment_variable] = React.useState([]);
  const [project_variable, setproject_variable] = React.useState([
    { id: "3526bd39-4514-43fe-bbc4-ee0980bde252", project_name: "default" },
  ]);
  const [screenlabels, setscreenlabels] = useState(labels["en"]);

  const [department, setdepartment] = React.useState("");
  const [project, setproject] = React.useState("");
  const [connector, setconnector] = React.useState("");
  const [connectorName, setconnectorName] = React.useState("");
  const [description, setdescription] = React.useState("");
  const [Dataset, setDataset] = React.useState("");
  const [docker, setdocker] = React.useState("");
  const [port, setport] = React.useState("");

  const [file, setFile] = useState(null);
  const [fileValid, setfileValid] = useState("");

  //   success screen
  const [isSuccess, setisSuccess] = useState(false);

  //   loader
  const [isLoader, setIsLoader] = useState(false);

  //   get dataset
  //   const getDatasetDetails = async () => {
  //     var id = getUserLocal();
  //     console.log("user id", id);
  //     setIsLoader(true);

  //     await HTTPService(
  //       "GET",
  //       UrlConstants.base_url + UrlConstants.list_of_dataset,
  //       { user_id: id },
  //       false,
  //       true
  //     )
  //       .then((response) => {
  //         setIsLoader(false);
  //         console.log("get request for dataset", response.data);
  //         setdatasets(response.data);
  //         console.log("datasets", datasets);
  //       })
  //       .catch((e) => {
  //         setIsLoader(false);
  //         // history.push(GetErrorHandlingRoute(e));
  //       });
  //   };

  //   get Department
  const getDepartmentDetails = async () => {
    // var id = getUserLocal();
    // console.log("user id", id);
    setIsLoader(true);

    await HTTPService(
      "GET",
      UrlConstants.base_url + UrlConstants.departments_connector_list,
      { org_id: getOrgLocal() },
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
        console.log("get request for Department", response.data);
        setdepartment_variable(response.data);
      })
      .catch((e) => {
        setIsLoader(false);
        // history.push(GetErrorHandlingRoute(e));
      });
  };

  useEffect(() => {
    // getDatasetDetails();
    getDepartmentDetails();
    setdepartment("e459f452-2b4b-4129-ba8b-1e1180c87888");
    setproject("3526bd39-4514-43fe-bbc4-ee0980bde252");
  }, []);

  const handleFileChange = (file) => {
    setFile(file);
    console.log(file);
    setfileValid("");
  };

  const handleChangeDepartment = async (event) => {
    console.log(event.target.value);
    setdepartment(event.target.value);
    setIsLoader(true);
    setproject("3526bd39-4514-43fe-bbc4-ee0980bde252");

    await HTTPService(
      "GET",
      UrlConstants.base_url + UrlConstants.project_list,
      { department: event.target.value },
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
        console.log("get request for project", response.data);
        setproject_variable(response.data);
      })
      .catch((e) => {
        setIsLoader(false);
        // history.push(GetErrorHandlingRoute(e));
      });
  };
  const handleChangeProject = (event) => {
    console.log(event.target.value);
    setproject(event.target.value);
  };
  const handleChangeConnector = async (event) => {
    console.log("connector", event.target.value);
    setconnector(event.target.value);
    setDataset("");
    var id = getUserLocal();
    console.log("user id", id);
    setIsLoader(true);

    if (event.target.value == "Provider") {
      await HTTPService(
        "GET",
        UrlConstants.base_url + UrlConstants.list_of_dataset,
        { user_id: id },
        false,
        true
      )
        .then((response) => {
          setIsLoader(false);
          console.log("get request for dataset", response.data);
          setdatasets(response.data);
          console.log("datasets", datasets);
        })
        .catch((e) => {
          setIsLoader(false);
          // history.push(GetErrorHandlingRoute(e));
        });
    } else {
      await HTTPService(
        "GET",
        UrlConstants.base_url + UrlConstants.list_of_dataset,
        false,
        true
      )
        .then((response) => {
          setIsLoader(false);
          console.log("get request for dataset", response.data);
          setdatasets(response.data);
          console.log("datasets", datasets);
        })
        .catch((e) => {
          setIsLoader(false);
          // history.push(GetErrorHandlingRoute(e));
        });
    }
  };
  const handleChangeConnectorName = (e) => {
    validateInputField(e.target.value, RegexConstants.DATA_SET_REGEX)
      ? setconnectorName(e.target.value)
      : e.preventDefault();
    console.log(e.target.value);
    // setconnectorName(event.target.value);
  };
  const handleChangedescription = (e) => {
    console.log(e.target.value);
    validateInputField(e.target.value, RegexConstants.DES_SET_REGEX)
      ? setdescription(e.target.value)
      : e.preventDefault();
  };
  const handledescriptionKeydown = (e) => {
    handleUnwantedSpace(description, e);
  };
  const handleChangeDataset = (e) => {
    console.log(e.target.value);
    setDataset(e.target.value);
  };
  const handleChangeDocker = (e) => {
    console.log(e.target.value);
    setdocker(e.target.value);
  };
  const handleChangeport = (e) => {
    console.log(e.target.value);
    // setport(e.target.value);
    validateInputField(e.target.value, RegexConstants.PINCODE_REGEX)
      ? setport(e.target.value)
      : e.preventDefault();
  };
  const handleAddDatasetSubmit = async (e) => {
    e.preventDefault();
    // setisSuccess(true);
    setIsLoader(true);
    var bodyFormData = new FormData();
    bodyFormData.append("connector_name", connectorName);
    bodyFormData.append("connector_type", connector);
    bodyFormData.append("connector_description", description);
    bodyFormData.append("application_port", port);
    bodyFormData.append("department", department);
    bodyFormData.append("docker_image_url", docker);
    bodyFormData.append("project", project);
    bodyFormData.append("dataset", Dataset);

    await HTTPService(
      "POST",
      UrlConstants.base_url + UrlConstants.connector,
      bodyFormData,
      true,
      true
    )
      .then((response) => {
        setIsLoader(false);
        setisSuccess(true);
        console.log("connector uploaded!", response.data);
      })
      .catch((e) => {
        setIsLoader(false);
        console.log(e);
        // history.push(GetErrorHandlingRoute(e));
      });
  };
  return (
    <>
      {isLoader ? <Loader /> : ""}
      {isSuccess ? (
        <Success
          okevent={() => history.push("/participant/connectors")}
          route={"/participant/connectors"}
          imagename={"success"}
          btntext={"ok"}
          heading={"Successfully Saved"}
          imageText={"Success!"}
          msg={
            "The connector configuration is saved successfully and a request for a certificate has been sent to the admin. You may receive the certificate via email soon. "
          }></Success>
      ) : (
        <form noValidate autoComplete="off" onSubmit={handleAddDatasetSubmit}>
          <ConnectorForm
            title={"Configure a new Connector"}
            connector={connector}
            department={department}
            project={project}
            connectorName={connectorName}
            Dataset={Dataset}
            docker={docker}
            port={port}
            file={file}
            fileValid={fileValid}
            description={description}
            handleFileChange={handleFileChange}
            handleChangeDepartment={handleChangeDepartment}
            handleChangeProject={handleChangeProject}
            handleChangeConnector={handleChangeConnector}
            handleChangeConnectorName={handleChangeConnectorName}
            handleChangedescription={handleChangedescription}
            handledescriptionKeydown={handledescriptionKeydown}
            handleChangeDataset={handleChangeDataset}
            handleChangeDocker={handleChangeDocker}
            handleChangeport={handleChangeport}
            names={names}
            upload={false}
            datasets={datasets}
            department_variable={department_variable}
            project_variable={project_variable}
          />
          <Row>
            <Col xs={12} sm={12} md={6} lg={3}></Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              {connector &&
              //   department &&
              //   project &&
              connectorName &&
              Dataset &&
              docker &&
              port ? (
                <Button
                  //   onClick={() => addNewParticipants()}
                  variant="contained"
                  className="submitbtn"
                  type="submit">
                  {screenlabels.connector_form.submit}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  disabled
                  className="disbalesubmitbtn">
                  {screenlabels.connector_form.submit}
                </Button>
              )}
            </Col>
          </Row>
          <Row style={useStyles.marginrowtop8px}>
            <Col xs={12} sm={12} md={6} lg={3}></Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button
                onClick={() => history.push("/participant/connectors")}
                variant="outlined"
                className="cancelbtn">
                {screenlabels.common.cancel}
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </>
  );
}

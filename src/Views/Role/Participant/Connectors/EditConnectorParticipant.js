import React, { useState, useEffect } from "react";
import ConnectorForm from "../../../../Components/Connectors/ConnectorForm";
import {
  validateInputField,
  handleUnwantedSpace,
  getOrgLocal,
  getUserLocal,
  fileUpload,
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
import { useParams } from "react-router-dom";

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

export default function EditConnectorParticipant() {
  const history = useHistory();
  const [datasets, setdatasets] = React.useState([]);
  const [department_variable, setdepartment_variable] = React.useState([]);
  const [project_variable, setproject_variable] = React.useState([]);
  const [screenlabels, setscreenlabels] = useState(labels["en"]);

  //   retrive id for dataset
  const { id } = useParams();

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

  //   get connector data
  const getConnectorDetails = async () => {
    // var id = getUserLocal();
    // console.log("user id", id);
    setIsLoader(true);
    console.log(id);

    await HTTPService(
      "GET",
      UrlConstants.base_url + UrlConstants.connector + id + "/",
      false,
      true
    )
      .then((response) => {
        setIsLoader(false);
        console.log("get request for edit connector", response.data);
        setconnectorName(response.data.connector_name);
        setconnector(response.data.connector_type);
        setproject(response.data.project);
        setdepartment(response.data.department_details.id);
        setdescription(response.data.connector_description);
        setDataset(response.data.dataset_details.id);
        setdocker(response.data.docker_image_url);
        setport(response.data.application_port);
        setFile(response.data.certificate);

        if (response.data.department_details.id) {
          HTTPService(
            "GET",
            UrlConstants.base_url + UrlConstants.project_list,
            { department: department },
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
        }
        // console.log(typeof typeof file);
        console.log(typeof response.data.certificate);
        console.log(response.data.connector_description);
        console.log(response.data.dataset_details.name);
        console.log(response.data.project_details.id);
        console.log(response.data.department_details.department_name);
      })
      .catch((e) => {
        setIsLoader(false);
        // history.push(GetErrorHandlingRoute(e));
      });
  };

  //   get dataset
  const getDatasetDetails = async () => {
    var id = getUserLocal();
    console.log("user id", id);
    setIsLoader(true);

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
  };

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
    getConnectorDetails();
    getDatasetDetails();
    getDepartmentDetails();
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

    await HTTPService(
      "GET",
      UrlConstants.base_url + UrlConstants.project_list,
      { department: department },
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
  const handleChangeConnector = (event) => {
    console.log(event.target.value);
    setconnector(event.target.value);
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
    setport(e.target.value);
  };

  //   put request
  const handleEditConnectorSubmit = async (e) => {
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
    // file upload
    fileUpload(bodyFormData, file, "certificate");

    await HTTPService(
      "PUT",
      UrlConstants.base_url + UrlConstants.connector+ id + "/",
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
          heading={"Changes are updated"}
          imageText={"Success!"}
          msg={"The connector configuration is saved successfully. "}></Success>
      ) : (
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleEditConnectorSubmit}>
          <ConnectorForm
            title={"Edit Connector"}
            connector={connector}
            department={department}
            project={project}
            connectorName={connectorName}
            Dataset={Dataset}
            docker={docker}
            port={port}
            description={description}
            file={file}
            fileValid={fileValid}
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
            upload={true}
            datasets={datasets}
            department_variable={department_variable}
            project_variable={project_variable}
          />
          <Row>
            <Col xs={12} sm={12} md={6} lg={3}></Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              {connector &&
              department &&
              project &&
              connectorName &&
              Dataset &&
              docker &&
              port &&
              file ? (
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

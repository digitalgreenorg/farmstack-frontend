import React, { useContext, useEffect, useState } from "react";
import HTTPService from "../../../Services/HTTPService";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import GeneratedKeyCopySystem from "./GeneratedKeyCopySystem";
import local_style from "./generate_key_copy_sysytem.module.css";
import { Col, Row } from "react-bootstrap";
import { getUserMapId } from "../../../Utils/Common";
import UrlConstant from "../../../Constants/UrlConstants";
import { FarmStackContext } from "../../Contexts/FarmStackContext";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const RequestForKey = (props) => {
  const { refetcher, setRefetcher } = props;
  const { callLoader, callToast } = useContext(FarmStackContext);
  const { datasetid } = useParams();
  const [listOfAllRequest, setlistOfAllRequest] = useState([]);
  //Main component for handling api request for consumer
  let currentViewingFileForApi = props.selectedFile;

  //get the api key status
  const getDetailsOfDataset = () => {
    callLoader(true);
    let method = "GET";
    let url =
      UrlConstant.base_url +
      UrlConstant.datasetview +
      datasetid +
      "/?user_map=" +
      getUserMapId();
    let payload = {
      dataset_file: props.data[props.selectedFile].id,
      user_organization_map: getUserMapId(),
      type: "",
    };
    HTTPService(method, url, "", false, true)
      .then((response) => {
        callLoader(false);

        setlistOfAllRequest(response.data.datasets);
      })
      .catch((error) => {
        callLoader(false);
        callToast("Error in getting usage policy", "error", true);
      });
  };

  const handleClickForRequest = (type, policy_id) => {
    callLoader(true);
    let url = UrlConstant.base_url + "datahub/usage_policies/";
    let payload = {
      dataset_file: props.data[props.selectedFile].id,
      user_organization_map: getUserMapId(),
      type: "api",
    };
    let method = "POST";

    //if type == "recall" then the url and method has to be changed to delete the entry
    if (type == "recall") {
      url = UrlConstant.base_url + "datahub/usage_policies/" + policy_id + "/";
      payload = "";
      method = "DELETE";
    }
    HTTPService(method, url, payload, false, true)
      .then((res) => {
        callLoader(false);
        if (type == "request") {
          callToast("Request successfully sent!", "success", true);
        } else {
          callToast("Request recalled successfully", "success", true);
        }
        setRefetcher(!refetcher);
      })
      .catch((err) => {
        callLoader(false);
        callToast("Request failed", "error", true);
      });
  };

  //get api key status of component mount
  useEffect(() => {
    getDetailsOfDataset();
  }, [refetcher]);

  return (
    <>
      <Row>
        {console.log(
          "🚀 ~ file: RequestForKey.jsx:94 ~ RequestForKey ~ listOfAllRequest:",
          listOfAllRequest
        )}
        {listOfAllRequest[currentViewingFileForApi ?? 0]?.usage_policy?.type ==
        "api" ? (
          <Col lg={12}>
            {listOfAllRequest[currentViewingFileForApi ?? 0]?.usage_policy
              ?.approval_status == "approved" && (
              <GeneratedKeyCopySystem
                data={
                  listOfAllRequest[currentViewingFileForApi ?? 0]?.usage_policy
                }
                file={listOfAllRequest[currentViewingFileForApi ?? 0]?.file}
              />
            )}
            {listOfAllRequest[currentViewingFileForApi ?? 0]?.usage_policy
              ?.approval_status == "requested" && (
              <div style={{ margin: "100px auto" }}>
                <div style={{ margin: "30px auto" }}>
                  {
                    "If you do not want to access this dataset file api, raise a recall!"
                  }
                </div>

                <Button
                  className={local_style.recall_access}
                  onClick={() =>
                    handleClickForRequest(
                      "recall",
                      listOfAllRequest[currentViewingFileForApi ?? 0]
                        ?.usage_policy?.id
                    )
                  }
                >
                  Recall
                </Button>
              </div>
            )}

            {listOfAllRequest[currentViewingFileForApi ?? 0]?.usage_policy &&
              (Object.keys(
                listOfAllRequest[currentViewingFileForApi ?? 0]?.usage_policy
              )?.length == 0 ||
                listOfAllRequest[currentViewingFileForApi ?? 0]?.usage_policy
                  ?.approval_status == "rejected") && (
                <div style={{ margin: "100px auto" }}>
                  <div style={{ margin: "30px auto" }}>
                    {
                      "If you want to access this dataset, raise a access request!"
                    }
                  </div>

                  <Button
                    className={local_style.request_access}
                    onClick={() => handleClickForRequest("request")}
                  >
                    Request access
                  </Button>
                </div>
              )}
          </Col>
        ) : (
          <>
            <div style={{ margin: "100px auto" }}>
              <div style={{ margin: "30px auto" }}>
                {"If you want to access this dataset, raise a access request!"}
              </div>

              <Button
                className={local_style.request_access}
                onClick={() => handleClickForRequest("request")}
              >
                Request access
              </Button>
            </div>
          </>
        )}
      </Row>
    </>
  );
};

export default RequestForKey;

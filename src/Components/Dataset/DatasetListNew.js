import React, { useState, useEffect, useContext } from "react";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import LocalStyle from "./DatasetListNew.module.css";
import { Col, Row } from "react-bootstrap";
import NoData from "../NoData/NoData";
import DatasetCart from "../DatasetCard/DatasetCard";
import { Box } from "@mui/system";
import UrlConstants from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const DatasetListNew = (props) => {
  const { isCosteward, isParticipantRequest, userId, orgId, user } = props;
  const history = useHistory();
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [datasetList, setDatasetList] = useState([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");

  const getDatasetOfParticipantOrCoSteward = (loadMore, user_id, org_id) => {
    let url = UrlConstants.base_url + UrlConstants.costeward_onboarded_dataset;
    if (loadMore) {
      if (isCosteward) callLoader(true);
      url = loadMoreUrl;
    }
    let payload = {
      //   user_id: user_id,
      //   org_id: org_id,
      others: true,
    };

    if (user === "guest") {
      payload = "";
      url = UrlConstants.base_url + UrlConstants.guest_dataset_filtered_data;
    }

    HTTPService("POST", url, payload, false, false)
      .then((res) => {
        if (isParticipantRequest) {
          callLoader(false);
        }
        console.log("res", res);
        let data = [...datasetList, ...res?.data?.results];
        setDatasetList(data);
        if (res?.data?.next) setLoadMoreUrl(res.data.next);
        else setLoadMoreUrl("");
      })
      .catch((e) => {
        callLoader(false);
        let error = GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        callToast(error.message, "error", true);
        console.log("err", e);
      });
  };

  useEffect(() => {
    getDatasetOfParticipantOrCoSteward();
  }, []);

  return (
    <>
      {user !== "guest" ? (
        <Row className={LocalStyle.section}>
          <Col xs={12} sm={12} md={6} xl={6}>
            <Typography
              // id={title + "-form-title"}
              className={`${GlobalStyle.size24} ${GlobalStyle.bold600} ${LocalStyle.title}`}
            >
              List of Datasets
            </Typography>
          </Col>
        </Row>
      ) : (
        ""
      )}
      <Row>
        {datasetList?.map((dataset, index) => {
          console.log("datasets ", dataset);
          return (
            <Col
              onClick={() =>
                history.push(`/datahub/dataset/view/${dataset.id}`)
              }
              xs={12}
              sm={12}
              md={6}
              xl={4}
            >
              <DatasetCart
                publishDate={dataset?.created_at}
                title={dataset?.name}
                orgnisationName={dataset?.organization?.name}
                city={dataset?.organization?.address?.city}
                category={Object.keys(dataset?.category)}
                update={dataset?.updated_at}
              />
            </Col>
          );
        })}
        {datasetList.length == 0 ? (
          <Box className={LocalStyle.noDataBox} p={3}>
            <NoData
              title={"There are no dataset"}
              subTitle={"As of now there are no dataset"}
              // primaryButton={"Add participant"}
              // primaryButtonOnClick={() =>
              //   history.push("/datahub/participants/add")
              // }
            />
          </Box>
        ) : (
          ""
        )}
      </Row>

      {user === "guest" ? (
        <>
          <Row className={LocalStyle.buttonContainer}>
            <Col xs={0} sm={0} md={2} lg={4}></Col>
            <Col xs={12} sm={12} md={8} lg={4}>
              <Button
                id={"details-page-load-more-dataset-button"}
                variant="outlined"
                className={`${GlobalStyle.primary_button} ${LocalStyle.loadMoreButton}`}
                onClick={() => history.push("/home/datasets")} // passing true will call loadmore api
              >
                View all datasets
              </Button>
            </Col>
          </Row>
        </>
      ) : loadMoreUrl ? (
        <Row className={LocalStyle.buttonContainer}>
          <Col xs={0} sm={0} md={2} lg={4}></Col>
          <Col xs={12} sm={12} md={8} lg={4}>
            <Button
              id={"details-page-load-more-dataset-button"}
              variant="outlined"
              className={`${GlobalStyle.outlined_button} ${LocalStyle.loadMoreButton}`}
              onClick={() =>
                getDatasetOfParticipantOrCoSteward(true, userId, orgId)
              } // passing true will call loadmore api
            >
              Load more
            </Button>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </>
  );
};

export default DatasetListNew;

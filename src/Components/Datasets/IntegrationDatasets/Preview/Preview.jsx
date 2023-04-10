import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../dataset_integration.module.css";
import download_data from "../../../../Assets/Img/download_data.svg";
import { DataGrid } from "@mui/x-data-grid";
import NoDataAvailable from "../../../Dashboard/NoDataAvailable/NoDataAvailable";
import { Affix } from "antd";
import { message, Popconfirm } from "antd";

function NoResultsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No results in DataGrid
      {/* <pre>(rows=&#123;rowData&#125;)</pre> */}
      {/* But local filter returns no result */}
    </Stack>
  );
}
function NoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      {/* No data available for preview */}
      <NoDataAvailable />
      {/* <pre>(rows=&#123;[]&#125;)</pre> */}
    </Stack>
  );
}
const Preview = (props) => {
  const {
    temporaryDeletedCards,
    noOfRecords,
    isConditionForConnectorDataForSaveMet,
    isAllConditionForSaveMet,
    connectorData,
    generateData,
    setIsDatasetIntegrationListModeOn,
    deleteConnector,
    counterForIntegrator,
    completeData,
    isEditModeOn,
    integrateMore,
    resetAll,
    generatedConnectorData,
    finalDatasetAfterIntegration,
    downloadDocument,
  } = props;
  const [col, setCol] = useState([]);
  const [row, setRow] = useState([]);

  const confirm = (e) => {
    // console.log(e);
    deleteConnector();
    message.success("Connector deleted successfully!");
  };

  const cancel = (e) => {
    // console.log(e);
    message.error("Connector deletion cancelled!");
  };
  useEffect(() => {
    if (finalDatasetAfterIntegration.length > 0) {
      let val = [];

      for (let key in finalDatasetAfterIntegration[0]) {
        let obj = { field: key, headerName: key, width: 300 };
        val.push(obj);
      }
      let rowArr = [];
      for (let i = 0; i < finalDatasetAfterIntegration.length; i++) {
        let obj1;
        if (finalDatasetAfterIntegration[i]["id"]) {
          obj1 = { ...finalDatasetAfterIntegration[i] };
          //console.log(obj1)
        } else {
          //console.log(obj1)
          obj1 = { id: i, ...finalDatasetAfterIntegration[i] };
        }
        rowArr.push(obj1);
      }
      //console.log(val, rowArr)
      setCol([...val]);
      setRow([...rowArr]);
    }
  }, [finalDatasetAfterIntegration]);
  console.log(row);
  console.log(col);
  return (
    <Box>
      <Row
        id="previewTable"
        className={styles.select_dataset_logo + " " + styles.mt100}
      >
        <Col lg={12} sm={12} sx={12}>
          Preview
        </Col>
      </Row>
      <Row style={{ marginBottom: "50px" }}>
        <Col lg={12} sm={12}>
          <div style={{ height: 338, width: "100%" }}>
            {/* <DataGrid
              rows={row}
              columns={col}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // disableColumnFilter
              // disableColumnMenu
              // disableColumnSelector
              // disableSelectionOnClick
              // disableDensitySelector
              components={{ NoRowsOverlay, NoResultsOverlay }}
            /> */}
            <DataGrid
              rows={row}
              columns={col}
              hideFooterPagination={true}
              hideFooter
              disableColumnMenu
              disableRowSelectionOnClick={true}
              disableColumnSelector={true}
              components={{ NoRowsOverlay, NoResultsOverlay }}
              sx={{
                "&>.MuiDataGrid-main": {
                  "&>.MuiDataGrid-columnHeaders": {
                    borderBottom: "none",
                    background: "#D8FBDE",
                  },
                  "& div div div div >.MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                },
                "& > .MuiDataGrid-columnSeparator": {
                  visibility: "hidden",
                },
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-iconButtonContainer": {
                  visibility: "hidden !important",
                  display: "hidden !important",
                },
                "&.MuiDataGrid-root .MuiDataGrid-iconSeparator": {
                  display: "none",
                },
              }}
            />
          </div>
        </Col>
      </Row>
      <Box className={styles.select_dataset_logo}>Download</Box>
      <Row
        style={{
          textAlign: "left",
          justifyContent: "space-between",
          margin: "0px 1px 0px 1px",
        }}
      >
        <div className={styles.data_before_download}>
          <div className={`${styles.light_text}`}>File name</div>
          <div className={`${styles.dark_text} text-truncate`}>
            {connectorData?.name}.csv
          </div>
        </div>
        <div className={styles.data_before_download}>
          <div className={`${styles.light_text}`}>Datasets</div>
          <ol
            style={{
              width: "250px",
              height: "150px",
              overflowY: "auto",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
            className={`${styles.dark_text}`}
          >
            {completeData?.map((each) => (
              <li>
                {" "}
                {each.dataset_name +
                  " - " +
                  decodeURI(each.file_name.split("/").at(-1))}{" "}
                <hr />
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.data_before_download}>
          <div className={`${styles.light_text}`}>No. of records</div>
          <div className={`${styles.dark_text} text-truncate`}>
            {noOfRecords}
          </div>
        </div>
        <div className={styles.generate_btn_parent_col}>
          {/* <Affix onChange={(affixed) => console.log(affixed, "read for dowload")} style={{ backgrond: "white", transition: "all 2s", visibility: counterForIntegrator != completeData.length ? "hidden" : "visible" }} offsetBottom={20}> */}
          {/* <div style={{ textAlign: "right" }}> */}
          {/* <Fab onClick={() => integrateMore(1)} style={{ color: "white", background: "#c09507", }} variant="extended" aria-label="add">
                        <AddIcon /> Integrate more
                    </Fab> */}
          <Button
            id="download_button"
            disabled={
              Object.keys(finalDatasetAfterIntegration).length > 0
                ? false
                : true
            }
            className={
              (Object.keys(finalDatasetAfterIntegration).length > 0
                ? styles.generate_data_btn
                : styles.generate_data_btn_dis) +
              " " +
              styles.heightwidth +
              " " +
              styles.flexForBtn
            }
            sx={{ width: "300px !important", height: "182px !important" }}
            onClick={() => downloadDocument()}
          >
            <img
              src={download_data}
              alt="Download"
              className={styles.download_btn}
            />{" "}
            <span className="mt-20">Download CSV file</span>
          </Button>
          {/* </div> */}
          {/* </Affix> */}
        </div>
      </Row>
      <hr />
      <Row style={{ marginTop: "50px" }}>
        <Col lg={3}></Col>
        <Col
          lg={9}
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Button
            onClick={() => resetAll(true, true, true, true, setCol, setRow)}
            className={styles.cancelBtn}
          >
            Cancel
          </Button>
          {/* </Col> */}
          {/* <Col lg={3}> */}
          <Button
            onClick={() => integrateMore(1)}
            variant="contained"
            sx={{
              fontFamily: "Public Sans",
              fontWeight: 700,
              fontSize: "15px",
              width: "215px",
              height: "48px",
              borderRadius: "8px",
              color: "white",
              textTransform: "none",
              marginRight: "30px",
              background: "#00AB55",
              "&:hover": {
                background: "#00AB55",
              },
            }}
          >
            Integrate more datasets
          </Button>
          {/* </Col> */}
          {/* <Col lg={2}> */}
          {console.log(
            isConditionForConnectorDataForSaveMet,
            isAllConditionForSaveMet,
            "isAllConditionForSaveMet "
          )}
          {finalDatasetAfterIntegration.length > 0 &&
            isAllConditionForSaveMet &&
            isConditionForConnectorDataForSaveMet &&
            completeData.length != 1 && (
              <Button
                onClick={() => {
                  temporaryDeletedCards.forEach((item, i) => {
                    if (item) {
                      console.log(item);
                      generateData(i, "delete_map_card", item);
                    }
                  });
                  generateData(completeData.length - 2, "save");
                }}
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "15px",
                  width: "200px",
                  height: "48px",
                  background: "#00AB55",
                  borderRadius: "8px",
                  textTransform: "none",
                  color: "white !important",
                  "&:hover": {
                    backgroundColor: "#00AB55",
                    color: "#fffff",
                  },
                }}
              >
                Save connector
              </Button>
            )}
          {/* </Col> */}
          {/* <Col lg={2}> */}
          {isEditModeOn && (
            <Popconfirm
              title="Delete the connector"
              description="Are you sure to delete this connector?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                //  onClick={() => deleteConnector()}
                sx={{
                  fontFamily: "Public Sans",
                  fontWeight: 700,
                  fontSize: "15px",
                  width: "200px",
                  height: "48px",
                  borderRadius: "8px",
                  color: "white",
                  textTransform: "none",
                  marginRight: "30px",
                  background: "#FF5630",
                  "&:hover": {
                    background: "#FF5630",
                  },
                }}
              >
                Delete connector
              </Button>
            </Popconfirm>
          )}
        </Col>
      </Row>
    </Box>
  );
};

export default Preview;

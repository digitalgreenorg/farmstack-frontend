import React, { useContext, useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import HTTPService from "../../Services/HTTPService";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import UrlConstant from "../../Constants/UrlConstants";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { getTokenLocal } from "../../Utils/Common";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import localStyle from "./table_with_filtering_for_api.module.css";
import global_style from "./../../Assets/CSS/global.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NormalDataTable = (props) => {
  const { selectedFileDetails } = useContext(FarmStackContext);
  const history = useHistory();
  const [data, setData] = useState();
  const [pages, setPages] = useState({
    current: 1,
    next: false,
  });
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 50,
      total: 100,
    },
  });

  const datasetDownloader = (fileUrl, name, type) => {
    let accessToken = getTokenLocal() ?? false;
    fetch(fileUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        console.log("12");
        return response.blob();
      })
      .then((blob) => {
        // callLoader(false);
        // callToast("File downloaded successfully!", "success", true);
        // Create a temporary link element
        console.log("success");
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name; // Set the desired file name here
        console.log("1");

        // Simulate a click event to download the file
        link.click();

        // Clean up the object URL
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        // callLoader(false);
        // callToast(
        //   "Something went wrong while downloading the file.",
        //   "error",
        //   true
        // );
      });
  };

  const handleDownload = (id) => {
    let accessToken = getTokenLocal() ?? false;
    let url = UrlConstant.base_url + UrlConstant.download_file + id;
    // callLoader(true);
    datasetDownloader(url, "dataset");
  };

  const [columns, setColumns] = useState([]);
  const fetchData = (action) => {
    console.log("calling", Date.now());
    setLoading(true);
    // callLoader(true);
    let method = "GET";
    let file_path = selectedFileDetails?.standardised_file;
    let url =
      UrlConstant.base_url +
      "/microsite/datasets/get_json_response/" +
      "?page=" +
      `${pages.current + action}` +
      "&&file_path=" +
      file_path;
    // if user does have the access to that particular file or it belongs to his/her own dataset
    if (
      history?.location?.state?.value === "my_organisation" ||
      selectedFileDetails?.usage_policy?.approval_status === "approved"
    ) {
      HTTPService(method, url, "", false, true)
        .then((response) => {
          console.log("got response", Date.now());
          setColumns(response?.data?.columns);
          setPages({
            current: response?.data?.current_page,
            next: response?.data?.next,
          });
          setData(response?.data?.data);
          console.log("setting done1", Date.now());
          setLoading(false);
          // callLoader(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setData(selectedFileDetails.content);
      let cols = [];
      let first = 0;
      for (let key in selectedFileDetails.content[0]) {
        let obj = {
          title: key.trim().split("_").join(" "),
          dataIndex: key,
          ellipsis: true,
          width: 200,
        };
        if (first == 0) {
          obj["fixed"] = "left";
          first++;
        }
        cols.push(obj);
      }
      setColumns(cols);
      setLoading(false);
      //returning array of object
    }
  };

  useEffect(() => {
    fetchData(0);
    setPages({ current: 1, next: false });
  }, [props.selectedFile]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const memoCol = useMemo(() => {
    console.log("inside memo");
    return columns;
  }, [JSON.stringify(columns)]);

  return (
    <>
      <div
        style={{ width: "90%", margin: "auto" }}
        className="data_table_inside_dataset_details_view"
      >
        <Table
          title={() => (
            <div
              style={{
                fontFamily: "Montserrat !important",
                fontWeight: "600",
                fontSize: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {" "}
                Farmer profile - Data table
                {history?.location?.state?.value === "my_organisation" ||
                selectedFileDetails?.usage_policy?.approval_status ===
                  "approved"
                  ? ""
                  : " (Meta data)"}
              </div>
              {history?.location?.state?.value === "my_organisation" ||
              selectedFileDetails?.usage_policy?.approval_status ===
                "approved" ? (
                <div>
                  <Button
                    sx={{
                      border: "1px solid #3366FF",
                      color: "#3366FF",
                      textTransform: "capitalize",
                      size: "20px",
                    }}
                    onClick={() => handleDownload(selectedFileDetails.id)}
                  >
                    <DownloadIcon
                      fontSize="small"
                      sx={{ color: "#3366FF !important" }}
                    />{" "}
                    Download
                  </Button>{" "}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
          columns={memoCol}
          rowKey={(record, index) => {
            return record.id ?? index;
          }}
          dataSource={data}
          pagination={false}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ y: 500, x: 1200 }}
          bordered={true}
          rowClassName="row-hover" // Apply the custom row class
          size="dense"
        />

        <div
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            gap: "25px",
            marginTop: "10px",
          }}
        >
          <div
            className={global_style.secondary_button}
            // disabled={loading ? true : false}
            style={{
              cursor: "pointer",
              visibility: pages.current <= 1 ? "hidden" : "visible",
            }}
            onClick={() => fetchData(-1)}
          >
            <ArrowBackIosNewIcon />
            Prev
          </div>
          <div
            style={{
              height: "25px",
              width: "25px",
              background: "#00ab55",
              color: "white",
              borderRadius: "5px",
            }}
          >
            {pages.current}
          </div>
          <div
            className={global_style.secondary_button}
            // disabled={loading ? true : false}
            style={{
              cursor: "pointer",
              visibility: pages.next ? "visible" : "hidden",
            }}
            onClick={() => fetchData(1)}
          >
            Next <ArrowForwardIosIcon color="#00ab55" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NormalDataTable;

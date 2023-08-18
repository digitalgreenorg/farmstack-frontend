import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import HTTPService from "../../Services/HTTPService";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import UrlConstant from "../../Constants/UrlConstants";
import ReactJson from "react-json-view";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { getTokenLocal } from "../../Utils/Common";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     sorter: true,
//     render: (name) => `${name.first} ${name.last}`,
//     width: "20%",
//   },
//   {
//     title: "Gender",
//     dataIndex: "gender",
//     filters: [
//       { text: "Male", value: "male" },
//       { text: "Female", value: "female" },
//     ],
//     width: "20%",
//   },
//   {
//     title: "Email",
//     dataIndex: "email",
//   },
// ];

// const getRandomuserParams = (params) => ({
//   results: params.pagination?.pageSize,
//   page: params.pagination?.current,
//   ...params,
// });

const NormalDataTable = (props) => {
  const { selectedFileDetails } = useContext(FarmStackContext);
  const [data, setData] = useState();
  const [total, setTotal] = useState(100);
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
      .then((response) => response.blob())
      .then((blob) => {
        // callLoader(false);
        // callToast("File downloaded successfully!", "success", true);
        // Create a temporary link element
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name; // Set the desired file name here

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

    // HTTPService("GET", url, "", false, true, accessToken)
    //   .then((res) => {
    //     callLoader(false);
    //     console.log(typeof res?.data, res?.data, name, "res?.data, name");
    //     datasetDownloader(url, name);

    //     callToast("File downloaded successfully!", "success", true);
    //   })
    //   .catch((err) => {
    //     callLoader(false);
    //     callToast(
    //       "Something went wrong while downloading the file.",
    //       "error",
    //       true
    //     );
    //   });
  };

  const [columns, setColumns] = useState([]);
  const fetchData = (action) => {
    console.log(pages.current + action);
    setLoading(true);
    let method = "GET";
    let file_path = "";
    let url =
      UrlConstant.base_url +
      "/microsite/datasets/get_json_response/" +
      "?page=" +
      `${pages.current + action}` +
      "&&file_path=" +
      selectedFileDetails?.standardised_file;
    //if user does not have the access to that particular file
    if (selectedFileDetails.usage_policy.approval_status !== "approved") {
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
    } else {
      HTTPService(method, url, "", false, true)
        .then((response) => {
          // if (tableParams.pagination.current == 1) {
          //   props.setPreviewForJsonFile(response.data.data);
          // }
          setData(response.data.data);
          setPages({
            current: response.data.current_page,
            next: response.data.next,
          });
          // setTotal(response.data.total);
          // setTotal(response.data.total);
          let cols = [];
          let first = 0;
          for (let key in response.data.data[0]) {
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
          // setTableParams({
          //   ...tableParams,
          //   pagination: {
          //     ...tableParams.pagination,
          //     total: response.data.total,
          //   },
          // });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // fetch(`https://api.instantwebtools.net/v1/passenger?page=0&size=10`)
    //   .then((res) => res.json())
    //   .then(({ results }) => {
    //     setData(results);
    //     setLoading(false);
    //     setTableParams({
    //       ...tableParams,
    //       pagination: {
    //         ...tableParams.pagination,
    //         total: response,
    //         // 200 is mock data, you should read it from server
    //         // total: data.totalCount,
    //       },
    //     });
    //   });
  };

  // useEffect(() => {
  //   console.log("fetching data");
  //   fetchData();
  // }, [JSON.stringify(tableParams), props.selectedFile]);

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
                {selectedFileDetails.usage_policy.approval_status !== "approved"
                  ? " (Meta data)"
                  : ""}
              </div>
              {selectedFileDetails.usage_policy.approval_status !==
              "approved" ? (
                ""
              ) : (
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
              )}
            </div>
          )}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={false}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ y: 500, x: 1200 }}
          bordered={true}
          rowClassName="row-hover" // Apply the custom row class
          size="large"
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
            style={{
              cursor: "pointer",
              visibility: pages.current <= 1 || loading ? "hidden" : "visible",
            }}
            onClick={() => fetchData(-1)}
          >
            <ArrowBackIosNewIcon />
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
            style={{
              cursor: "pointer",
              visibility: !pages.next || loading ? "hidden" : "visible",
            }}
            onClick={() => fetchData(1)}
          >
            <ArrowForwardIosIcon color="#00ab55" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NormalDataTable;

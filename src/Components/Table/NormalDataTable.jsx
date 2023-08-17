import React, { useEffect, useState } from "react";
import { Table } from "antd";
import HTTPService from "../../Services/HTTPService";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import UrlConstant from "../../Constants/UrlConstants";
import ReactJson from "react-json-view";

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
  const [data, setData] = useState();
  const [my_json_object, setmy_json_object] = useState(null);
  const [total, setTotal] = useState(50);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 50,
    },
  });
  const [columns, setColumns] = useState([]);
  const fetchData = () => {
    setLoading(true);
    let method = "GET";
    let file_path = "";
    let url =
      UrlConstant.base_url +
      "/microsite/datasets/get_json_response/" +
      "?page=" +
      tableParams.pagination.current +
      "&&file_path=" +
      props.data[props.selectedFile].file;

    HTTPService(method, url, "", false, true)
      .then((response) => {
        // if (tableParams.pagination.current == 1) {
        //   props.setPreviewForJsonFile(response.data.data);
        // }
        setData(response.data.data);
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
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: total,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });

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

  useEffect(() => {
    fetchData();
    console.log("called", tableParams);
  }, [JSON.stringify(tableParams), props.selectedFile]);

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
              <div> Farmer profile - Data table</div>
              <div>
                {" "}
                <Button
                  sx={{
                    border: "1px solid #3366FF",
                    color: "#3366FF",
                    textTransform: "capitalize",
                    size: "20px",
                  }}
                >
                  <DownloadIcon
                    fontSize="small"
                    sx={{ color: "#3366FF !important" }}
                  />{" "}
                  Download
                </Button>{" "}
              </div>
            </div>
          )}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ y: 500, x: 1200 }}
          bordered={true}
          rowClassName="row-hover" // Apply the custom row class
          size="large"
        />
      </div>
    </>
  );
};

export default NormalDataTable;

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import HTTPService from "../../Services/HTTPService";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
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

const NormalDataTable = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [columns, setColumns] = useState([]);

  const fetchData = () => {
    setLoading(true);
    let method = "POST";
    let url =
      "https://datahubethdev.farmstack.co/be/microsite/datasets/dataset_filters/?page=" +
      tableParams.pagination.current;

    HTTPService(method, url, "", false, false)
      .then((response) => {
        setData(response.data.results);
        let cols = [];
        let first = 0;
        for (let key in response.data.results[0]) {
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
        console.log(cols);
        setColumns(cols);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response.data.count,
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
  }, [JSON.stringify(tableParams)]);

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
  );
};

export default NormalDataTable;

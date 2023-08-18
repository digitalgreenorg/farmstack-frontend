import React, { useContext, useEffect, useMemo, useState } from "react";
import TableForApiRequest from "../Datasets_New/TableForApiRequest";
import { FarmStackContext } from "../Contexts/FarmStackContext";
const TableWithFilteringForApi = (props) => {
  const { allDatasetFilesAvailableInsideTheDatasetViewed } =
    useContext(FarmStackContext);

  const [approvalStatus, setApprovalStatus] = useState(false);
  const [
    listOfAllRequestReceivedForSelectedFile,
    setListOfAllRequestReceivedForSelectedFile,
  ] = useState([]);

  //get all api reuqest for the provider to give or deny the request for access
  // const getAllApiRequestList = () => {
  //   console.log(props, "props");
  //   let method = "POST";
  //   let url =
  //     UrlConstant.base_url + "datahub/new_dataset_v2/requested_datasets/";
  //   let payload = {
  //     user_map: getUserMapId(),
  //     type: "api",
  //     dataset_file: props.data[props.selectedFile].id,
  //   };
  //   HTTPService(method, url, payload, false, true, false)
  //     .then((response) => {
  //       setListOfAllRequestReceivedForSelectedFile([...response.data.recieved]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleFilterChange = (e, index) => {
  //   let key = allFilters[index];
  //   setFilterPayload({ ...filterPayload, [key]: e.target.checked });
  //   setFilterByOption(true);
  //   setReRun((prev) => prev + 1);
  // };

  // const handleChangeStatus = (status) => {
  //   console.log(status);
  // };

  //filter function
  // const filterData = () => {
  //   console.log(filterPayload, "filterPayload");
  //   if (filterByOption)
  //     setRows(
  //       data.filter((each) => {
  //         console.log(filterPayload[each.status], "filterPayload");
  //         return filterPayload[each.status];
  //       })
  //     );
  //   else setRows(data);
  // };

  // const getButtons = (status) => {
  //   if (status) {
  //     return (
  //       <span
  //         span
  //         style={{
  //           display: "flex",
  //           justifyContent: "left",
  //           alignItems: "center",
  //         }}
  //       >
  //         <div style={{ width: "120px" }}>
  //           <Button
  //             onClick={() => handleChangeStatus(status)}
  //             disabled={status == "rejected" ? true : false}
  //             className={
  //               status == "rejected" ? local_style.rejected : local_style.reject
  //             }
  //           >
  //             {status == "rejected"
  //               ? "Rejected"
  //               : status == "approved"
  //               ? "Recall"
  //               : "Reject"}
  //           </Button>
  //         </div>
  //         {status !== "rejected" && (
  //           <div>
  //             <Button
  //               onClick={() => handleChangeStatus(status)}
  //               disabled={status == "rejected" ? true : false}
  //               className={
  //                 status == "approved"
  //                   ? local_style.approved
  //                   : local_style.approve
  //               }
  //             >
  //               {status == "approved" ? "Approved" : "Approve"}
  //             </Button>
  //           </div>
  //         )}
  //       </span>
  //     );
  //   }
  // };
  React.useEffect(() => {
    //setting the rows data as per filter
    // filterData();
    props.setRefetchAllRequest(!props.refetchAllRequest);
  }, []);

  useEffect(() => {
    //initial column setting once
    // setColumns(Object.keys(data[0]));
    // getAllApiRequestList();
    setListOfAllRequestReceivedForSelectedFile(
      allDatasetFilesAvailableInsideTheDatasetViewed
    );
  }, [JSON.stringify(allDatasetFilesAvailableInsideTheDatasetViewed)]);
  //   heading = "List of requests";

  return (
    <>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
        className={local_style.main_table_div + " main_table_req_api"}
      >
        <div
          style={{
            fontSize: "20px",
            fontFamily: "Montserrat",
            lineHeight: "24px",
            fontWeight: "600",
          }}
        >
          {heading}
        </div>
        <div
          style={{
            border: "0.5px solid grey",
            padding: "3px 5px",
            borderRadius: "8px",
          }}
        >
          <Space
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setIsFilterSideDrawer(true)}
          >
            <FilterListIcon
              sx={{
                color: "grey !important",
              }}
              fontSize="small"
              color="grey"
            />
            Filter
          </Space>
        </div>
      </div> */}
      {/* <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((eachCol, indexCol) => {
                return (
                  <TableCell
                    key={eachCol}
                    data-testid={eachCol + indexCol}
                    align="left"
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {eachCol.split("_").join(" ")}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                data-testid={"eachRow" + rowIndex}
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((eachCol, index) => {
                  return (
                    <TableCell
                      key={rowIndex + "-" + index}
                      data-testid={rowIndex + "-" + index}
                      component="th"
                      scope="row"
                      align="left"
                      style={{
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                        fontWeight: "400",
                        fontSize: "16px",
                      }}
                    >
                      {eachCol == "status"
                        ? getButtons(row[eachCol])
                        : row[eachCol]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <TableForApiRequest
        setRefetchAllRequest={props.setRefetchAllRequest}
        refetchAllRequest={props.refetchAllRequest}
        selectedFile={props.selectedFile}
        dataForSelectedFile={allDatasetFilesAvailableInsideTheDatasetViewed}
        refetcher={props.refetcher}
        setRefetcher={props.setRefetcher}
        data={listOfAllRequestReceivedForSelectedFile}
        setApprovalStatus={setApprovalStatus}
        approvalStatus={approvalStatus}
      />
      {/* <div style={{ zIndex: "100 !important" }}>
        <Drawer
          className="ant_drawer_in_req_api"
          title="Filter by"
          placement={"right"}
          width={500}
          onClose={() => setIsFilterSideDrawer(false)}
          open={isFilterSideDrawer}
          closeIcon={false}
          extra={
            <Space>
              <Button
                type="primary"
                onClick={() => setIsFilterSideDrawer(false)}
              >
                <CloseIcon sx={{ color: "grey !important" }} />
              </Button>
            </Space>
          }
        >
          <div>
            {allFilters.map((eachFilter, index) => {
              return (
                <>
                  <div
                    style={{
                      textTransform: "capitalize",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontWeight: 350,
                      fontSize: "16px",
                      lineHeight: "22px",
                    }}
                  >
                    <span>{eachFilter}</span>
                    <span>
                      <Checkbox
                        defaultChecked={filterPayload[eachFilter]}
                        onChange={(e) => handleFilterChange(e, index)}
                        sx={{ color: "grey !important" }}
                      />{" "}
                    </span>
                  </div>

                  <hr style={{ color: "#D9DFE7" }} />
                </>
              );
            })}
          </div>
        </Drawer>
      </div> */}
    </>
  );
};

export default TableWithFilteringForApi;

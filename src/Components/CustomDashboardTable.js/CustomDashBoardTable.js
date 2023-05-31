import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import localStyle from "./customDashBoardTable.module.css";
import { useHistory } from "react-router-dom";
import EmptyFile from "../Datasets_New/TabComponents/EmptyFile";
import { Button } from "@mui/material";
import GlobalStyle from "../../Assets/CSS/global.module.css";

function CustomDashBoardTable(props) {
  const { data, title, recentConnectorsTable, recentDatasetTable, subTitle } =
    props;
  const history = useHistory();
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  console.log("data in table", title, data);
  const rows = [
    createData("Frozen yoghurt", "Wheat", "Oromia", 24, 4.0),
    createData("Frozen yoghurt", "Wheat", "Oromia", 24, 4.0),

    createData("Frozen yoghurt", "Wheat", "Oromia", 24, 4.0),

    createData("Frozen yoghurt", "Wheat", "Oromia", 24, 4.0),
  ];
  return (
    <Box className={localStyle.container}>
      <TableContainer component={Paper}>
        {!data?.length ? (
          <>
            <div className={`${localStyle.title}`}>
              <p>{title}</p>
            </div>
            <div className={localStyle.noDatasetText}>
              <EmptyFile
                text={recentDatasetTable ? "No datasets" : "No connectors"}
              />
              <Button
                id="add-participant-submit-button"
                onClick={() =>
                  recentDatasetTable
                    ? history.push("/datahub/new_datasets/add")
                    : history.push("/datahub/connectors/add")
                }
                className={`${GlobalStyle.primary_button} ${localStyle.primary}`}
              >
                {recentDatasetTable ? "Add New Dataset" : "Add connector"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={`${localStyle.title}`}>
              <div>
                {title}
                <div className={localStyle.subTitle}>
                  <p>{subTitle}</p>
                </div>
              </div>
              <div
                onClick={() =>
                  recentDatasetTable
                    ? history.push("/datahub/new_datasets")
                    : history.push("/datahub/connectors")
                }
                style={{
                  color: "#00AB55",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                align="right"
              >
                View all
              </div>
            </div>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow className={localStyle.tableHead}>
                  <TableCell>Name</TableCell>
                  {recentDatasetTable ? (
                    <>
                      <TableCell>Category</TableCell>
                      <TableCell>Geography</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="right">Total datasets</TableCell>
                    </>
                  )}
                  {/* <TableCell align="right"></TableCell> */}

                  <TableCell
                    onClick={() =>
                      recentDatasetTable
                        ? history.push("/datahub/new_datasets")
                        : history.push("/datahub/connectors")
                    }
                    // sx={{ color: "#00AB55", cursor: "pointer" }}
                    align="right"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{ fontWeight: "600" }}
                      minWidth={"150px"}
                      component="th"
                      scope="row"
                    >
                      {item?.name ?? "Not available"}
                    </TableCell>
                    {recentDatasetTable ? (
                      <>
                        <TableCell>
                          {item?.category?.name ?? "Not available"}
                        </TableCell>
                        <TableCell>
                          {item?.category?.name ?? "Not available"}
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            history.push(
                              `/datahub/new_datasets/view/${item?.id}`
                            )
                          }
                          sx={{ color: "#00AB55", cursor: "pointer" }}
                          align="right"
                        >
                          View
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell align="right">
                          {item?.dataset_count
                            ? item?.dataset_count + " Datasets"
                            : "Not available"}
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            history.push(`/datahub/connectors/edit/${item?.id}`)
                          }
                          sx={{ color: "#00AB55", cursor: "pointer" }}
                          align="right"
                        >
                          View
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </TableContainer>
    </Box>
  );
}

export default CustomDashBoardTable;

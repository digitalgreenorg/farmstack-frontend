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

function CustomDashBoardTable(props) {
  const { data, title, recentConnectorsTable, recentDatasetTable } = props;
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", "Wheat", "Oromia", 24, 4.0),
    createData("Frozen yoghurt", "Wheat", "Oromia", 24, 4.0),

    createData("Frozen yoghurt", "Wheat", "Oromia", 24, 4.0),

    createData("Frozen yoghurt", "Wheat", "Oromia", 24, 4.0),
  ];
  return (
    <Box className={localStyle.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow className={localStyle.tableHead}>
              <TableCell>{title}</TableCell>
              {recentDatasetTable ? <TableCell align="right"></TableCell> : ""}
              <TableCell align="right"></TableCell>

              <TableCell align="right">View all</TableCell>
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
                    <TableCell align="right">
                      {item?.category?.name ?? "Not available"}
                    </TableCell>
                    <TableCell align="right">
                      {item?.category?.name ?? "Not available"}
                    </TableCell>
                    <TableCell align="right">View</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell align="right">
                      {item?.dataset_count
                        ? item?.dataset_count + " Datasets"
                        : "Not available"}
                    </TableCell>
                    <TableCell align="right">View</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CustomDashBoardTable;

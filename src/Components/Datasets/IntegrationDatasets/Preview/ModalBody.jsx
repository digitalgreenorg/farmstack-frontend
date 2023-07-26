import {
  Button,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import globalStyle from "../../../../Assets/CSS/global.module.css";
import local_style from "./modalbody.module.css";
// Custom cell renderer for the input field
const StyledTableCell = styled(TableCell)(({ theme, width }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#D8FBDE",
    color: theme.palette.common.black,
    width: width == "small" ? "15%" : "30%",
    overflowWrap: "anywhere",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "20px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    overflowWrap: "anywhere",
    textAlign: "left",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme, width }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ModalBody = (props) => {
  console.log(props, "inside modal");

  const {
    row,
    col,
    nameRenameConfigData,
    setNameRenameConfigData,
    setIsConditionForConnectorDataForSaveMet,
    connectorData,
    saveConfigData,
    datasetForPrePupulatingRename,
    setDatasetForPrePupulatingRename,
  } = props;
  const [allColumns, setAllColumns] = useState([]);

  const prepareRows = () => {
    // field: 'REGION', headerName: 'REGION', width: 300 col
    // {id: 0, REGION: 'Region1', test1: 'Woreda1', check check check: 'Kebele1', FIRST_NAME_x: 'FName1', …

    const obj = col.reduce((result, element, index) => {
      result[index] = element;
      element["renamed_to"] =
        datasetForPrePupulatingRename[element.headerName.trim()] ?? "";
      return result;
    }, {});

    setAllColumns({ ...obj });

    // let allRowArr = [];
    // for (let i = 0; i < col.length; i++) {
    //   allRowArr.push({
    //     ...col[i],
    //     id: i,
    //   });
    // }
    // setAllRows([...allRowArr]);
  };

  const handleChangeRenameName = (e, index) => {
    console.log(connectorData, "connectorData");

    let obj = { ...allColumns };
    obj[`${index}`].renamed_to = e.target.value.trimStart();
    setAllColumns({ ...obj });
    setNameRenameConfigData({ ...obj });
  };

  const handleChange = (event, index) => {
    if (connectorData?.desc?.trim()) {
      setIsConditionForConnectorDataForSaveMet(true);
    }
    let obj = { ...allColumns };
    obj[`${index}`].selectedForExport = event.target.checked;
    setAllColumns({ ...obj });
    setNameRenameConfigData({ ...obj });
  };

  const selectDeSelectAll = (selectAllFlag) => {
    let obj = { ...allColumns };
    for (var key in obj) {
      obj[key].selectedForExport = selectAllFlag;
    }
    setAllColumns({ ...obj });
    setNameRenameConfigData({ ...obj });
  };

  const resetAllNameToDefault = () => {
    let obj = { ...allColumns };
    for (var key in obj) {
      if (obj[key].renamed_to) {
        obj[key].renamed_to = "";
      }
      obj[key].selectedForExport = true;
    }
    console.log(
      "🚀 ~ file: ModalBody.jsx:118 ~ resetAllNameToDefault ~ obj:",
      obj
    );

    setAllColumns({ ...obj });
    setNameRenameConfigData({ ...obj });
    setDatasetForPrePupulatingRename({});
  };

  const prePopulateRenameData = () => {};

  useEffect(() => {
    console.log(
      "🚀 ~ file: ModalBody.jsx:122 ~ useEffect ~ datasetForPrePupulatingRename:",
      datasetForPrePupulatingRename,
      allColumns,
      "allColumns"
    );
    prepareRows();
  }, []);
  return (
    // <div style={{ height: 338, width: "100%" }}>
    //   <DataGrid
    //     rows={allRows}
    //     columns={allColumnsName}
    //     hideFooterPagination={true}
    //     hideFooter
    //     disableColumnMenu
    //     disableRowSelectionOnClick={true}
    //     disableColumnSelector={true}
    //     //   components={{ NoRowsOverlay, NoResultsOverlay }}
    //     sx={{
    //       "&>.MuiDataGrid-main": {
    //         "&>.MuiDataGrid-columnHeaders": {
    //           borderBottom: "none",
    //           background: "#D8FBDE",
    //         },
    //         "& div div div div >.MuiDataGrid-cell": {
    //           borderBottom: "none",
    //         },
    //       },
    //       "& > .MuiDataGrid-columnSeparator": {
    //         visibility: "hidden",
    //       },
    //       "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
    //         outline: "none",
    //       },
    //       "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus": {
    //         outline: "none",
    //       },
    //       "& .MuiDataGrid-iconButtonContainer": {
    //         visibility: "hidden !important",
    //         display: "hidden !important",
    //       },
    //       "&.MuiDataGrid-root .MuiDataGrid-iconSeparator": {
    //         display: "none",
    //       },
    //     }}
    //   />
    // </div>
    <TableContainer
      className={globalStyle.font_family}
      style={{ height: "400px" }}
      component={Paper}
    >
      <Table
        sx={{ minWidth: "100%" }}
        className={globalStyle.font_family}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell width={"small"}>
              Select
              {/* <Checkbox
                  // checked={}
                  onChange={(e) => selectDeSelectAll(e.target.checked)}
                  defaultChecked={true}
                />{" "} */}
            </StyledTableCell>
            <StyledTableCell>From</StyledTableCell>
            <StyledTableCell>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>To</span>
                <Button
                  onClick={() => resetAllNameToDefault()}
                  //   style={{ marginLeft: "50px" }}
                  className={
                    globalStyle.secondary_button +
                    " " +
                    local_style.clear_all_button
                  }
                >
                  Reset all
                </Button>
              </div>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(allColumns).map((eachCol, index) => {
            console.log(eachCol);
            return (
              <StyledTableRow key={eachCol.headerName}>
                <StyledTableCell width={"small"}>
                  {" "}
                  <Checkbox
                    checked={eachCol.selectedForExport}
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={
                      nameRenameConfigData[eachCol.selectedForExport]
                    }
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {eachCol.headerName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  <TextField
                    size="small"
                    label="New column name"
                    inputProps={{
                      maxLength: 50,
                    }}
                    // defaultValue={
                    //   eachCol.renamed_to
                    //     ? eachCol.renamed_to
                    //     : datasetForPrePupulatingRename[
                    //         eachCol.headerName.trim()
                    //       ]
                    //     ? datasetForPrePupulatingRename[
                    //         eachCol.headerName.trim()
                    //       ]
                    //     : ""
                    // }
                    value={eachCol.renamed_to}
                    // value={
                    //   eachCol.renamed_to ?
                    //   datasetForPrePupulatingRename[
                    //     eachCol.headerName.trim()
                    //   ] ??
                    //   ""
                    // }
                    placeholder="Enter column name"
                    onChange={(e) => handleChangeRenameName(e, index)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModalBody;

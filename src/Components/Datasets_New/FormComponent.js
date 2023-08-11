import React, { useState /*useCallback, useRef, useEffect */ } from "react";
import { TextField, Button } from "@mui/material";
import { Select, MenuItem } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import Imgform from "./Imgform";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import "./FormComponent.css";

const FormComponent = ({
  isOpen,
  onClose,
  onCreateMeasure,
  selectedColumns,
  valueFieldName = "value",
  title,
  setTitle,
  selectedRowIds,
  setSelectedRowIds,
  rows,
  setRows,
  selectedRows,
  sum
}) => {
  const colArray = [...selectedColumns];
  const optArray = ["Equal to", "Less than", "Greater than"];

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCreateMeasureClick = (item) => {
    const newRows = item.selectedRows.map((selectedRow) => ({
      id: rows.length + 1,
      columnName: selectedRow.columnName,
      operator: selectedRow.operator,
      value: selectedRow.value
    }));

    setRows((prevRows) => [...prevRows, ...newRows]);
  };

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, value: "" };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleRowValueChange = (rowId, newValue) => {
    const updatedRows = rows.map((row) =>
      row.id === rowId ? { ...row, [valueFieldName]: newValue } : row
    );
    setRows(updatedRows);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allRowIds = rows.map((row) => row.id);
      setSelectedRowIds(allRowIds);
    } else {
      setSelectedRowIds([]);
    }
  };

  function ColumnsCell(params) {
    const handleCategoryChange = (event) => {
      const updatedRows = rows.map((row) =>
        row.id === params.row.id
          ? { ...row, columnName: event.target.value }
          : row
      );
      setRows(updatedRows);
    };

    return (
      <div className="select-dropdown">
        <Select
          value={params.row.columnName}
          onChange={handleCategoryChange}
          style={{ minWidth: "100px" }}
        >
          {colArray.map((col) => (
            <MenuItem key={col} value={col}>
              {col}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }

  function OperatorCell(params) {
    const handleCategoryChange = (event) => {
      const updatedRows = rows.map((row) =>
        row.id === params.row.id
          ? { ...row, operator: event.target.value }
          : row
      );
      setRows(updatedRows);
    };

    return (
      <div className="selectop">
        <Select
          value={params.row.operator}
          onChange={handleCategoryChange}
          style={{ minWidth: "100px" }}
        >
          {optArray.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }

  const ValueEditCell = React.memo(function ValueEditCell({
    row,
    valueFieldName,
    onRowValueChange
  }) {
    const handleChange = (event) => {
      const { value } = event.target;
      onRowValueChange(row.id, value);
    };

    return (
      <TextField
        fullWidth
        variant="filled"
        value={row[valueFieldName]}
        onChange={handleChange}
        id={`value-field-${row.id}`}
      />
    );
  });

  function CheckboxCell(params) {
    const handleCheckboxChange = (event) => {
      const checked = event.target.checked;

      if (checked) {
        setSelectedRowIds((prevSelectedRowIds) => [
          ...prevSelectedRowIds,
          params.row.id
        ]);
      } else {
        setSelectedRowIds((prevSelectedRowIds) =>
          prevSelectedRowIds.filter((id) => id !== params.row.id)
        );
      }

      const updatedRows = rows.map((row) =>
        row.id === params.row.id ? { ...row, selected: checked } : row
      );
      setRows(updatedRows);
    };

    return (
      <TableCell padding="checkbox">
        <input
          type="checkbox"
          checked={selectedRowIds.includes(params.row.id)}
          onChange={handleCheckboxChange}
        />
      </TableCell>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Input submitted:", title);
  };

  const handleCMClick = (event) => {
    event.preventDefault();
    // ...
    const measureData = {
      title: title,
      selectedRows: selectedRows,
      sum: sum
    };
    onCreateMeasure(measureData);
    setTitle("");
    setSelectedRowIds([]);
    setRows([]);
    onClose(); // Close the form
  };

  return (
    <div
      style={{
        display: isOpen ? "grid" : "none",
        gridTemplateColumns: "auto-fit",
        gridGap: "20px"
      }}
      className="formpage"
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          id="outlined-basic"
          variant="outlined"
          fullWidth
          value={title}
          onChange={handleTitleChange}
          style={{ textAlign: "center" , paddingTop: "10px",paddingBottom: "30px"}}
        />
        {/* <Imgform style={{display: "grid", alignContent:"left"}}/> */}

        <TableContainer style={{padding: "10px"}}>
          <Table style={{borderRadius: "5px"}}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <input
                    type="checkbox"
                    checked={selectedRowIds.length === rows.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Operator</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <CheckboxCell row={row} />
                  <TableCell>
                    <ColumnsCell row={row} />
                  </TableCell>
                  <TableCell>
                    <OperatorCell row={row} />
                  </TableCell>
                  <TableCell>
                    <ValueEditCell
                      row={row}
                      valueFieldName={valueFieldName}
                      onRowValueChange={handleRowValueChange}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="icon" onClick={handleAddRow}>
          <AddCircleOutlineIcon
            className="add-condition-icon"
            fontSize="large"
          />
          <div className="text" style={{ paddingBottom: "10px" }}>
            ADD CONDITION
          </div>
        </div>
        <div className="formbtncontainer">
          <Button
            variant="contained"
            sx={{ backgroundColor: "green" }}
            onClick={handleCMClick}
            className="formbtn"
          >
            Create Measure
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;

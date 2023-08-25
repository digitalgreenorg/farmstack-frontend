import React,{useState} from "react";
import { TextField, Button } from "@mui/material";
import { Select, MenuItem } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { Tooltip } from '@mui/material';
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
  sum,
  classes,
}) => {
  const [inputValues, setInputValues] = useState({}); 
  const [selectedOptions, setSelectedOptions] = useState({});
  const colArray = [...selectedColumns];
  const optArray = ["Equal to", "Less than", "Greater than"];

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
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
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [params.row.id]: event.target.value,
      }));
    };

    return (
      <div className="select-dropdown">
        <Tooltip title={selectedOptions[params.row.id] || 'Select'}>
        <Select
          value={params.row.columnName}
          onChange={handleCategoryChange}
          style={{ minWidth: '100px' }}
          displayEmpty
          renderValue={() => (
            <div className={classes.ellipsis}>
              {selectedOptions[params.row.id] || 'Select'}
            </div>
          )}
        >
          {colArray.map((col) => (
            <MenuItem key={col} value={col}>
              {col}
            </MenuItem>
          ))}
        </Select>
        </Tooltip>
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
  
  const handleInputValueChange = (ev, row) => {
    const newInputValues = { ...inputValues, [row.id]: ev.target.value };
    setInputValues(newInputValues);
    handleRowValueChange(row.id, ev.target.value);
  };

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
  };

  const handleCMClick = (event) => {
    event.preventDefault();
    const measureData = {
      title: title,
      selectedRows: selectedRows,
      sum: sum
    };
    onCreateMeasure(measureData);
    setTitle("");
    setSelectedRowIds([]);
    setRows([]);
    onClose(); 
  };

  return (
    <div
      style={{
        display: isOpen ? "grid !important" : "none",
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
                    <TextField
                      id={row.id.toString()}
                      fullWidth
                      variant="filled"
                      value={inputValues[row.id] || ''} 
                      onChange={(ev) => handleInputValueChange(ev, row)}
                      style={{padding: "5px"}}
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

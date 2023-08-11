import React, { useState } from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const ColumnsSidebar = ({ columns, selectedColumns,onColumnCheckboxChange,onSelectColumns }) => {

  // onSelectColumns(selectedColumns);
  return (
    <div className="colgrp">
      <FormGroup>
        {columns.map((columnName) => (
          <FormControlLabel
            sx={{
              padding: "10px"
            }}
            key={columnName}
            control={
              <Checkbox
                checked={selectedColumns.includes(columnName)}
                onChange={() => onColumnCheckboxChange(columnName)}
                sx={{ fontFamily: "Verdana, Arial, Helvetica, sans-serif" }}
              />
            }
            label={columnName}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default ColumnsSidebar;

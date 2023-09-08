import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";
import style from "../index.module.css";
import globalStyle from "../../../../Assets/CSS/global.module.css";

const DynamicFilter = ({ filters, getDashboardForDataset }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  console.log(
    "🚀 ~ file: DynamicFilters.js:17 ~ DynamicFilter ~ selectedFilters:",
    selectedFilters
  );
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (typeof filters === "string") {
      setFilterData([]);
    } else {
      setFilterData(filters);
    }
  }, [filters]);

  const handleFilterChange = (filterKey, selectedValue) => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      [filterKey]: selectedValue,
    }));
  };

  const handleSelectAll = (filterKey) => {
    const allValues = filterData[filterKey] || [];
    setSelectedFilters((prevSelectedFilters) => {
      if (prevSelectedFilters[filterKey]?.length === allValues?.length) {
        // If all values were previously selected, deselect all
        setTimeout(() => {
          handleFilterChange(filterKey, []);
        }, 0);
        return {
          ...prevSelectedFilters,
          [filterKey]: [],
        };
      } else {
        setTimeout(() => {
          handleFilterChange(filterKey, allValues);
        }, 0);
        return {
          ...prevSelectedFilters,
          [filterKey]: allValues,
        };
      }
    });
  };

  const handleChipDelete = (filterKey, index) => {
    setSelectedFilters((prevSelectedFilters) => {
      const updatedFilters = { ...prevSelectedFilters };
      if (Array.isArray(updatedFilters[filterKey])) {
        updatedFilters[filterKey].splice(index, 1);
      } else {
        updatedFilters[filterKey] = [];
      }
      return updatedFilters;
    });
  };

  const handleApplyFilter = () => {
    getDashboardForDataset(selectedFilters);
  };

  const handleClearFilter = () => {
    setSelectedFilters({});
    getDashboardForDataset();
  };

  return (
    <div style={{ margin: "auto" }}>
      <Col className={style.padding0} sm={12} md={12} lg={12}>
        {Object?.keys(filterData)?.map((filterKey) => (
          <FormControl
            className={style.formControl}
            key={filterKey}
            sx={{ minWidth: 190, maxWidth: 200 }}
          >
            <InputLabel>{`Select ${filterKey}`}</InputLabel>
            <Select
              multiple
              value={selectedFilters[filterKey] || []}
              onChange={(e) => {
                if (e.target.value?.[e.target.value?.length - 1] == "All") {
                } else {
                  handleFilterChange(filterKey, e.target.value);
                }
              }}
              renderValue={(selected) =>
                selected.length === 0 ? "All" : selected.join(", ")
              }
            >
              <MenuItem
                style={{ textAlign: "left" }}
                onClick={() => handleSelectAll(filterKey)}
                value="All"
              >
                <Checkbox
                  checked={
                    selectedFilters[filterKey]?.length ===
                    (filterData[filterKey] || []).length
                  }
                />
                <ListItemText primary="All" />
              </MenuItem>
              {filterData[filterKey]?.map((option) => (
                <MenuItem
                  style={{ textAlign: "left" }}
                  key={option}
                  value={option}
                >
                  <Checkbox
                    checked={
                      selectedFilters[filterKey]?.includes(option) || false
                    }
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
        {selectedFilters && Object.keys(selectedFilters)?.length > 0 ? (
          <div className={style.buttonContainer}>
            <Button
              className={`${style.primary_button} ${globalStyle.primary_button}`}
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
            <Button
              className={`${style.outlined_button} ${globalStyle.outlined_button}`}
              onClick={handleClearFilter}
            >
              Clear Filter
            </Button>
          </div>
        ) : (
          ""
        )}
      </Col>
      <Row>
        <Box sx={{ textAlign: "left", margin: "15px 0 15px 100px" }}>
          {Object.keys(selectedFilters)?.map(
            (filterKey) =>
              selectedFilters[filterKey].length > 0 &&
              !(
                selectedFilters[filterKey].length ===
                (filters[filterKey] || []).length
              ) &&
              selectedFilters[filterKey]?.map((value, index) => (
                <Chip
                  sx={{ margin: "2px 5px" }}
                  key={index}
                  label={value}
                  onDelete={() => handleChipDelete(filterKey, index)}
                />
              ))
          )}
        </Box>
      </Row>
    </div>
  );
};

export default DynamicFilter;

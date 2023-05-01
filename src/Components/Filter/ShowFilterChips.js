import { Box, Chip } from "@mui/material";
import React from "react";
import { dateTimeFormat } from "../../Utils/Common";
import DeleteIcon from "@mui/icons-material/Delete";
const ShowFilterChips = ({
  geographies,
  categorises,
  dates,

  setDates,
  setFromDate,
  setToDate,
  setGeography,
  setGeographies,
  setAllCategories,
  setCategorises,
  handleCheckBox,
}) => {
  // console.log(dates);

  const handleDelete = (main, keyName, value, index, filter_type) => {
    console.log(main, keyName, value, filter_type);
    switch (filter_type) {
      case filter_type == "to_date":
        console.log(dates, value);
        // code block
        break;
      case filter_type == "from_date":
        // code block
        break;
      case filter_type == "geography":
        // code block
        break;
      case "category":
        handleCheckBox(keyName, value);
        break;
      default:
        // code block
        return;
    }
  };

  return (
    <Box
      sx={{
        marginLeft: "144px",
        marginRight: "144px",
        textAlign: "left",
        marginTop: "20px",
      }}
    >
      {geographies?.map((each, ind) => {
        if (!each) return;
        return (
          <Chip
            sx={{
              marginLeft: "5px",
              marginRight: "15px",
              marginBottom: "15px",
            }}
            label={each}
            // onDelete={() =>
            //   handleDelete(geographies, "", each, ind, "geography")
            // }
          />
        );
      })}
      {Object.keys(categorises).map((key, index) => {
        return (
          <>
            {categorises[key].map((res, ind) => {
              return (
                <Chip
                  sx={{
                    marginLeft: "5px",
                    marginRight: "15px",
                    marginBottom: "15px",
                  }}
                  label={res}
                  // onDelete={() =>
                  //   handleDelete(categorises, key, res, ind, "category")
                  // }
                />
              );
            })}
          </>
        );
      })}
      {dates?.map((each) => {
        return (
          <>
            {each.fromDate ? (
              <Chip
                sx={{
                  marginLeft: "5px",
                  marginRight: "15px",
                  marginBottom: "15px",
                }}
                label={dateTimeFormat(each.fromDate, false)}
                // onDelete={() =>
                //   handleDelete(dates, "", each.fromDate, "", "from_date")
                // }
              />
            ) : (
              <></>
            )}
            {each.toDate ? (
              <Chip
                sx={{
                  marginLeft: "5px",
                  marginRight: "15px",
                  marginBottom: "15px",
                }}
                label={dateTimeFormat(each.toDate, false)}
                // onDelete={() => handleDelete(dates, "", each.toDate, "to_date")}
              />
            ) : (
              <></>
            )}
          </>
        );
      })}
    </Box>
  );
};

export default ShowFilterChips;

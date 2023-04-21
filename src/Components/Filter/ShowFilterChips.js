import { Box, Chip } from "@mui/material";
import React from "react";
import { dateTimeFormat } from "../../Utils/Common";

const ShowFilterChips = ({ geographies, categorises, dates }) => {
  console.log(dates);
  return (
    <Box
      sx={{
        marginLeft: "144px",
        marginRight: "144px",
        textAlign: "left",
        marginTop: "20px",
      }}
    >
      {geographies?.map((each) => {
        if (!each) return;
        return (
          <Chip
            sx={{
              marginLeft: "5px",
              marginRight: "15px",
              marginBottom: "15px",
            }}
            label={each}
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

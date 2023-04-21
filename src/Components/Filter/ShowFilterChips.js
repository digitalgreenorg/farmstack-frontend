import { Box, Chip } from "@mui/material";
import React from "react";

const ShowFilterChips = ({ geographies, categorises }) => {
  console.log(categorises);
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
              console.log(res, "suuta");
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
    </Box>
  );
};

export default ShowFilterChips;

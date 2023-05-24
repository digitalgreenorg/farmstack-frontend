import React, { useState, useRef } from "react";
import {
  Box,
  Card,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Collapse,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
const Sidebar = ({ sideMenus }) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);

  const [open, setOpen] = useState("");

  const executeScroll = (index) => {
    let myRef = "ref" + index;
    myRef.current.scrollIntoView();
  };
  const handleClick = (index) => {
    // setOpen(index);
  };
  return (
    <Box>
      <Card
        sx={{
          border: "1px solid #00AB55",
          marginLeft: "70px",
          marginRight: "144px",
          display: "flex",
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            maxHeight: 490,
            overflowX: "auto",
            bgcolor: "background.paper",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {sideMenus?.map((sMenu, index) => {
            return (
              <>
                <ListItemButton onClick={() => handleClick(index)}>
                  <ListItemText primary={sMenu?.menu} />
                  {sMenu?.menuItems?.length ? (
                    open === index ? (
                      <ExpandLess onClick={() => setOpen("")} />
                    ) : (
                      <ExpandMore onClick={() => setOpen(index)} />
                    )
                  ) : (
                    <></>
                  )}
                </ListItemButton>
                <Collapse
                  in={open === index ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {sMenu?.menuItems?.map((mItem) => (
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={mItem} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            );
          })}
        </List>
        <Box sx={{ width: "70%" }} className="text-left">
          <Box ref={ref1} className="text-left">
            <Typography sx={{ fontSize: "22px" }}>Overview</Typography>
          </Box>
          <Box ref={ref2} className="text-left">
            <Typography sx={{ fontSize: "22px" }}>
              Introducing Farmstack
            </Typography>
          </Box>
          <Box ref={ref3} className="text-left">
            <Typography sx={{ fontSize: "22px" }}>
              Stewards: The Guardians of Data
            </Typography>
          </Box>
          <Box ref={ref4} className="text-left">
            <Typography sx={{ fontSize: "22px" }}>
              Participants: The Data Pioneers
            </Typography>
          </Box>
          <Box ref={ref5} className="text-left">
            <Typography sx={{ fontSize: "22px" }}>
              Dataset Management
            </Typography>
          </Box>
          <Box ref={ref6} className="text-left">
            <Typography sx={{ fontSize: "22px" }}>
              Data Integration Connectors: Unleashing the Power of Collective
              Data
            </Typography>
          </Box>
          <Box ref={ref7} className="text-left">
            <Typography sx={{ fontSize: "22px" }}>
              Category and Subcategory Management
            </Typography>
          </Box>
          <Box ref={ref8} className="text-left">
            <Typography sx={{ fontSize: "22px" }}>
              Data Standardisation Templates
            </Typography>
          </Box>
          <Box ref={ref9} className="text-left">
            <Typography sx={{ fontSize: "22px" }}>
              Frequently asked questions
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Sidebar;

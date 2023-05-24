import React from "react";
import style from "./getStarted.module.css";
import { Box } from "@mui/material";
import Sidebar from "../../Components/SideBar/Sidebar";

const GetStarted = () => {
  const sideMenus = [
    {
      menu: "Overview",
      menuItems: ["Problem Statement", "Solution"],
    },
    {
      menu: "Introducing Farmstack",
      menuItems: ["Revolutionising Data Exchange in Agriculture"],
    },
    {
      menu: "Stewards: The Guardians of Data",
      menuItems: [],
    },
    {
      menu: "Participants: The Data Pioneers",
      menuItems: ["Participant Management"],
    },
    {
      menu: "Dataset Management",
      menuItems: [],
    },
    {
      menu: "Data Integration Connectors: Unleashing the Power of Collective Data",
      menuItems: [],
    },
    {
      menu: "Category and Subcategory Management",
      menuItems: [],
    },
    {
      menu: "Data Standardisation Templates",
      menuItems: [],
    },
    {
      menu: "Frequently asked questions",
      menuItems: [],
    },
  ];
  return (
    <Box>
      <Sidebar sideMenus={sideMenus} />
    </Box>
  );
};

export default GetStarted;

import React from "react";
import LocalStyle from "../../../Views/GuestUser/GuestUserHomeNew.module.css";
import GlobalStyles from "../../../Assets/CSS/global.module.css";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import micro1 from "../../../Assets/Img/micro1.jpeg";
import eadp_micro1 from "../../../Assets/Img/eadp/micro_1.jpg";
import { useHistory } from "react-router-dom";
const Section = () => {
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const desktop = useMediaQuery(theme.breakpoints.up("xl"));
  const largeDesktop = useMediaQuery(theme.breakpoints.up("xxl"));

  return (
    <>
      <Box
        className={
          mobile
            ? LocalStyle.center_banner_mobile
            : tablet
            ? LocalStyle.center_banner_tablet
            : desktop
            ? LocalStyle.center_banner_desktop
            : LocalStyle.center_banner
        }
      >
        <Box>
          <img
            src={
              process.env.REACT_APP_INSTANCE === "EADP" ||
              process.env.REACT_APP_INSTANCE === "KADP"
                ? eadp_micro1
                : micro1
            }
            width={mobile ? "152px" : "none"}
            height={"250px"}
            loading="lazy"
          />
        </Box>
        <Box>
          <Typography
            className={`${LocalStyle.title} ${GlobalStyles.bold500} ${
              mobile
                ? GlobalStyles.size12
                : tablet || miniLaptop
                ? GlobalStyles.size16
                : largeDesktop
                ? GlobalStyles.size28
                : GlobalStyles.size28
            } ${GlobalStyles.highlighted_text_in_home} ${
              mobile
                ? ""
                : tablet
                ? LocalStyle.lineheight_27
                : LocalStyle.lineheight_39
            } ${mobile ? LocalStyle.mt45 : ""}`}
            sx={{
              width:
                mobile || miniLaptop || desktop || largeDesktop
                  ? "auto !important"
                  : "350px !important",
              marginRight: mobile || tablet || miniLaptop ? "" : "28px",
            }}
          >
            {process.env.REACT_APP_INSTANCE === "EADP" ||
            process.env.REACT_APP_INSTANCE === "KADP"
              ? "With Data sharing great things will happen"
              : process.env.REACT_APP_INSTANCE === "VISTAAR"
              ? "With Content distribution great things will happen"
              : "With Content distribution great things will happen"}

            <br />
            <Button
              style={{
                unset: "all",
              }}
              className={LocalStyle.contact_us_button_home}
              onClick={() => history.push("/home/contact")}
            >
              Contact us
            </Button>
          </Typography>
        </Box>
        <Box>
          <Typography
            style={{ width: "90%" }}
            className={`${
              mobile
                ? LocalStyle.descriptionSm
                : tablet || miniLaptop
                ? LocalStyle.descriptionMd
                : desktop
                ? LocalStyle.descriptionlg
                : largeDesktop
                ? LocalStyle.descriptionXlg
                : LocalStyle.description
            } ${GlobalStyles.bold400} ${
              tablet || miniLaptop ? GlobalStyles.size12 : GlobalStyles.size22
            } ${GlobalStyles.highlighted_text_in_home}`}
          >
            <b style={{ fontWeight: "bold" }}></b>
            {process.env.REACT_APP_INSTANCE === "EADP" ||
            process.env.REACT_APP_INSTANCE === "KADP"
              ? `We enable seamless data sharing, breaks down silos, 
              and builds trust among organisations.  
              The platform consolidates fragmented data, standardises data, and aids in 
              better data categorization, enhancing its usability and value.`
              : process.env.REACT_APP_INSTANCE === "VISTAAR"
              ? `We enable seamless content upload of all formats, and builds unified
            approach. The platforms integrate all data or content across all
            states and departments and effectively delivers to front line
            workers in a conversational format enhancing its usability and
            value.`
              : `We enable seamless content upload of all formats, and builds unified
            approach. The platforms integrate all data or content across all
            states and departments and effectively delivers to front line
            workers in a conversational format enhancing its usability and
            value.`}

            <b style={{ fontWeight: "bold" }}></b>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Section;

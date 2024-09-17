import micro3 from "../../Assets/Img/micro3.jpeg";
import micro_4 from "../../Assets/Img/eadp/micro_4.jpg";
import fourth_home from "../../Assets/Img/kenya/fourth_home.jpg";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Row } from "react-bootstrap";
import GlobalStyles from "../../Assets/CSS/global.module.css";
import DatasetListNew from "../../Components/Dataset/DatasetListNew";
import ParticipantsCarouselNew from "../../Components/Participants/ParticipantsCarouselNew";
import LocalStyle from "./GuestUserHomeNew.module.css";
import { useHistory } from "react-router-dom";
import ScrollToTop from "../../Components/ScrollTop/ScrollToTop";
import Connectors from "../../Components/Connectors_New/Connectors";
import GuestUserLandingResource from "../Resources/Guest/GuestUserLandingResource";
import { toTitleCase } from "../../Utils/Common";
import labels from "../../Constants/labels";
import DefaultFirstSection from "../../common/sections/first/default/FirstSection";
import EadpFirstSection from "../../common/sections/first/eadp/FirstSection";
import KadpFirstSection from "../../common/sections/first/kadp/FirstSection";
import VistaarFirstSection from "../../common/sections/first/vistaar/FirstSection";
import ETHMoAFirstSection from "../../common/sections/first/ethmoa/FirstSection"
import ETHfourth_image from "../../../../../features/default/src/Assets/Img/ethmoa/MoA_3.jpg"

import globalConfig from "globalConfig";
import SecondSection from "../../common/sections/second/Section";
import ThirdSection from "../../common/sections/third/Section";
const GuestUserHome = () => {
  let history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const largeDesktop = useMediaQuery(theme.breakpoints.up("xxl"));
  let Resources = toTitleCase(labels.renaming_modules.resources);
  let Resource = toTitleCase(labels.renaming_modules.resource);
  return (
    <>
      <ScrollToTop />
      {globalConfig?.enableBanner && globalConfig?.banner === "DEFAULT" && (
        <DefaultFirstSection />
      )}
      {globalConfig?.enableBanner && globalConfig?.banner === "EADP" && (
        <EadpFirstSection />
      )}
      {globalConfig?.enableBanner && globalConfig?.banner === "KADP" && (
        <KadpFirstSection />
      )}
      {globalConfig?.enableBanner && globalConfig?.banner === "VISTAAR" && (
        <VistaarFirstSection />
      )}
      {globalConfig?.enableBanner && globalConfig?.banner === "ETH_MOA" && (
        <ETHMoAFirstSection />
      )}
      {globalConfig?.enableSections?.datasets && (
        <Box
          className={
            mobile
              ? LocalStyle.main_box_for_datasets_mobile
              : tablet
              ? LocalStyle.main_box_for_datasets_tablet
              : LocalStyle.main_box_for_datasets
          }
        >
          <Typography
            className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
          >
            {globalConfig?.dynamicLabelling?.datasets ?? "Datasets"}
          </Typography>
          <Typography
            className={`${LocalStyle.textDescription} text-left ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
          >
            Discover and explore the potential of data to generate ideal
            datasets with Dataset Explorer.
          </Typography>
          <DatasetListNew user={"guest"} />
        </Box>
      )}
      {globalConfig?.enableSections?.connectors && (
        <>
          <Box
            className={
              mobile
                ? LocalStyle.main_box_for_connector_mobile
                : tablet
                ? LocalStyle.main_box_for_connector_tablet
                : LocalStyle.main_box_for_connector
            }
            // className={
            //   mobile || tablet
            //     ? LocalStyle.container_marginMd
            //     : LocalStyle.container_margin
            // }
          >
            <Typography
              className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
            >
              {globalConfig?.dynamicLabelling?.connectors ??
                globalConfig?.dynamicLabelling?.connectors ??
                "Connectors"}
            </Typography>
            <Typography
              className={`${LocalStyle.textDescription} text-left ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
            >
              Integrates two datasets to form a novel dataset with merged
              information.
            </Typography>
          </Box>
          <Box>
            <Connectors isGuestUser={true} />
          </Box>
        </>
      )}
      {globalConfig?.enableSections?.resources && (
        <Box
          className={
            mobile
              ? LocalStyle.main_box_for_datasets_mobile
              : tablet
              ? LocalStyle.main_box_for_datasets_tablet
              : LocalStyle.main_box_for_datasets
          }
        >
          <Typography
            className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text} text-left`}
          >
            {globalConfig?.dynamicLabelling?.contents ?? "Contents"}
          </Typography>
          <Typography
            className={`${LocalStyle.textDescription} text-left ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
          >
            {globalConfig?.dynamicLabelling?.contents ?? "Contents"} discovery
            is the key to unlocking awareness and growth by identifying unknowns
            and efficiently delivering valuable information about best
            practices, pests and disease managements, schemes etc benefiting
            farmers.
          </Typography>
          <GuestUserLandingResource user={"guest"} />
        </Box>
      )}
      {globalConfig?.enableSubBanners?.first && (
        <>
          <SecondSection />
        </>
      )}
      <Box className="mainBoxForGuestHome">
        {globalConfig?.enableSections?.co_stewards && (
          <div
            style={{
              marginTop: "50px",
              padding: mobile || tablet ? "0px 25px" : "0px 144px",
            }}
          >
            <div className={LocalStyle.participanttitleContainer}>
              <Typography
                style={{ textAlign: "left" }}
                className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
              >
                {globalConfig?.dynamicLabelling?.co_steward ?? "Co-steward"}
              </Typography>
              <Typography
                className={`${LocalStyle.textDescription} text-left ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
              >
                <b style={{ fontWeight: "bold" }}></b>
                Organisations who facilitate their own partners with content for
                efficient content distribution.
                <b style={{ fontWeight: "bold" }}></b>
              </Typography>
            </div>
            <ParticipantsCarouselNew
              title="Our co-steward network"
              isCosteward={true}
            />
            <Row
              style={{
                margin: "50px 25px !important",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button
                id="home-view-all-costeward-btn-id"
                variant="outlined"
                className={`${GlobalStyles.primary_button} ${GlobalStyles.homeButtonWidth}`}
                sx={{
                  padding: "15px 30px",
                }}
                onClick={() => history.push("/home/costeward")}
              >
                View all{" "}
                {globalConfig?.dynamicLabelling?.co_steward ?? "Co-steward"}
              </Button>
            </Row>
          </div>
        )}
        {globalConfig?.enableSections?.participants && (
          <>
            <div
              style={{
                padding: mobile || tablet ? "0px 25px" : "0px 144px",
                marginTop: "25px",
              }}
              className={LocalStyle.participanttitleContainer}
            >
              <Typography
                style={{ textAlign: "left" }}
                className={`${LocalStyle.title} ${GlobalStyles.bold600} ${GlobalStyles.size32} ${GlobalStyles.highlighted_text}`}
              >
                {globalConfig?.dynamicLabelling?.participants ?? "Participants"}
              </Typography>
              <Typography
                className={`${LocalStyle.textDescription} text-left ${GlobalStyles.bold400} ${GlobalStyles.size22} ${GlobalStyles.highlighted_text}`}
              >
                <b style={{ fontWeight: "bold" }}></b>
                Organisations that has the public or private content and can
                uplod into system seamlessly.
                <b style={{ fontWeight: "bold" }}></b>
              </Typography>
            </div>
            <div
              style={{ padding: mobile || tablet ? "0px 25px" : "0px 144px" }}
            >
              <ParticipantsCarouselNew title="Our Partners are" />
            </div>
            <Row
              style={{
                margin: "50px 25px !important",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button
                id="home-view-all-participants-btn-id"
                variant="outlined"
                className={`${GlobalStyles.primary_button} ${GlobalStyles.homeButtonWidth}`}
                sx={{
                  padding: "15px 30px",
                }}
                onClick={() => history.push("/home/participants")}
              >
                View all{" "}
                {globalConfig?.dynamicLabelling?.participants ?? "Participants"}
              </Button>
            </Row>
          </>
        )}
        {globalConfig?.enableSubBanners?.second && (
          <>
            <ThirdSection />
          </>
        )}
      </Box>
      {globalConfig?.enableSubBanners?.third && (
        <Box>
          <div
            className={
              mobile || tablet
                ? LocalStyle.image_container_mobile
                : LocalStyle.image_container
            }
          >
            <img
              className={
                largeDesktop ? LocalStyle.image_for_big : LocalStyle.image
              }
              src={
                process.env.REACT_APP_INSTANCE === "EADP"
                  ? micro_4
                  : process.env.REACT_APP_INSTANCE === "KADP"
                  ? fourth_home
                  : process.env.REACT_APP_INSTANCE === "VISTAAR"
                  ? micro3 
                  : process.env.REACT_APP_INSTANCE === "ETH_MOA"
                  ? ETHfourth_image
                  : micro3
              }
              width={"100%"}
              loading="lazy"
            />
          </div>
        </Box>
      )}
    </>
  );
};

export default GuestUserHome;

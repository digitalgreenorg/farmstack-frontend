import React from "react";
import LocalStyle from "../../../../Views/GuestUser/GuestUserHomeNew.module.css";
import {
  Box,
  Button,
  Card,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";
import insight1 from "../../../../Assets/Img/insight1.svg";
import insight2 from "../../../../Assets/Img/insight2.svg";
import insight3 from "../../../../Assets/Img/insight3.svg";
import insight4 from "../../../../Assets/Img/insight4.svg";
import modi from "../../../../Assets/Img/modi.png";
import qrcode from "../../../../Assets/Img/qrcode.png";

const FirstSection = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const miniLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const desktop = useMediaQuery(theme.breakpoints.up("xl"));
  const responsive_top_row = {
    padding: mobile || tablet ? "0px 10px" : "0px 0px 0px 40px",
  };
  return (
    <>
      <Box
        sx={{ width: "100%" }}
        className={
          (mobile
            ? LocalStyle.container_mobile
            : tablet
            ? LocalStyle.container_tablet
            : desktop
            ? LocalStyle.container_desktop
            : LocalStyle.container_large) + " mainBoxForGuestHome"
        }
      >
        <Row
          className={
            mobile && tablet
              ? LocalStyle.top_row_in_home_mobile
              : LocalStyle.top_row_in_home
          }
          style={responsive_top_row}
        >
          <Col xs={12} sm={12} md={4} xl={4}>
            <img
              src={modi}
              // className={`${mobile || tablet ? LocalStyle.modijiImg : ""}`}
              style={{ width: "100%", height: "100%" }}
            />
          </Col>
          <Col xs={12} sm={12} md={8} xl={8}>
            <Box
              className={`d-flex ${mobile || tablet ? "flex-column" : ""}`}
              sx={{ marginTop: "70px" }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "32px",
                    fontWeight: "700",
                    lineHeight: "44px",
                    letterSpacing: "0px",
                    textAlign: "left",
                    color: "#3D4A52",
                  }}
                >
                  Virtually Integrated Systems to Access Agricultural Resources
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "22px",
                    fontWeight: "400",
                    lineHeight: "27px",
                    letterSpacing: "0px",
                    textAlign: "left",
                    color: "#3D4A52",
                    marginTop: "14px",
                  }}
                >
                  Where Technology and Agriculture intertwine, creating a
                  network of Departments, Farmers, and FLEWs.
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: mobile ? "5px" : "-21px",
                  textAlign: mobile ? "center" : "",
                }}
              >
                <img src={qrcode} style={{ height: "220px" }} />
              </Box>
            </Box>
            <Box
              className={
                mobile
                  ? LocalStyle.buttonContainer_mobile
                  : tablet
                  ? LocalStyle.buttonContainer_tablet
                  : LocalStyle.cover_btn_container
              }
              sx={{
                display: "flex",
                justifyContent: mobile ? "center" : "end",
                marginRight: mobile ? "0px" : "23px",
              }}
            >
              <Button
                // onClick={() => !getTokenLocal() && history.push("/login")}
                id="home-get-started-btn"
                data-testid={"home-get-started-btn-test"}
                className={`${
                  mobile || tablet
                    ? LocalStyle.primaryButton_mobile
                    : LocalStyle.primaryButton
                } ${LocalStyle.scan_button}`}
                sx={{ color: "#000000 !important" }}
                disabled
              >
                Scan for bot
              </Button>
            </Box>
          </Col>
        </Row>
        <Box
          sx={{
            margin: mobile ? "20px 20px 0px 10px" : "-45px 40px 0px 40px",
          }}
        >
          <Row
            style={{
              gap: mobile ? "0px" : "0px",
              rowGap: mobile || tablet || miniLaptop ? "20px" : "0px",
              justifyContent: "center",
            }}
          >
            <Col xs={12} sm={12} md={5} xl={3}>
              <Card className={`${LocalStyle.insight_card}`}>
                <Box className={`${LocalStyle.insight_card_child}`}>
                  <Box>
                    <img src={insight1} />
                  </Box>
                  <Typography className={`${LocalStyle.insight_card_text}`}>
                    Increase efficiency of your Frontline workers
                  </Typography>
                </Box>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={5} xl={3}>
              <Card className={`${LocalStyle.insight_card}`}>
                <Box className={`${LocalStyle.insight_card_child}`}>
                  <Box>
                    <img src={insight2} />
                  </Box>
                  <Typography className={`${LocalStyle.insight_card_text}`}>
                    Host and manage content in one place
                  </Typography>
                </Box>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={5} xl={3}>
              <Card className={`${LocalStyle.insight_card}`}>
                <Box className={`${LocalStyle.insight_card_child}`}>
                  <Box>
                    <img src={insight3} />
                  </Box>
                  <Typography className={`${LocalStyle.insight_card_text}`}>
                    Create tasks and trainings for your Frontline workers in one
                    place
                  </Typography>
                </Box>
              </Card>
            </Col>
            <Col xs={12} sm={12} md={5} xl={3}>
              <Card className={`${LocalStyle.insight_card}`}>
                <Box className={`${LocalStyle.insight_card_child}`}>
                  <Box>
                    <img src={insight4} />
                  </Box>
                  <Typography className={`${LocalStyle.insight_card_text}`}>
                    Incentivise your Frontline worker by measuring impact
                    created
                  </Typography>
                </Box>
              </Card>
            </Col>
          </Row>
        </Box>
      </Box>
    </>
  );
};

export default FirstSection;

import React from "react";
import LocalStyle from "../../../../Views/GuestUser/GuestUserHomeNew.module.css";
import {
  Box,
  Card,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";
import insight1 from "../../../../Assets/Img/insight1.svg";
import insight2 from "../../../../Assets/Img/insight2.svg";
import insight3 from "../../../../Assets/Img/insight3.svg";
import insight4 from "../../../../Assets/Img/insight4.svg";

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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  marginTop: "20px",
                  px: { xs: 2, sm: 4 },
                  py: { xs: 2, md: 4 },
                  borderRadius: "20px",
                  textAlign: "left",
                }}
              >
                <Typography
                  variant={mobile ? "subtitle1" : "h1"}
                  color="#1ca069"
                  marginBottom={2}
                >
                  <span style={{ color: "#a5de48" }}>AI</span> for agricultural
                  extension
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                style={{
                  overflow: "hidden",
                  borderBottomLeftRadius: "100px",

                  minHeight: "400px",
                  textAlign: "right",
                }}
              >
                <video
                  src="https://digitalgreen.org/wp-content/uploads/2023/12/Digital-Green-Header.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: "80%",
                    maxWidth: "80%",
                  }}
                />
              </div>
            </Grid>
          </Grid>
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

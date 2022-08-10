import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Col, Row } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import styles from "./guestUserContactForm.module.css";
import downloadIcon from "../../Assets/Img/downloadsvgicon.svg";
import viewbuttonsvgicon from "../../Assets/Img/viewbuttonsvgicon.svg";
import styles from "./guestUserLegal.module.css";
import UrlConstant from "../../Constants/UrlConstants";
import { useHistory } from "react-router-dom";
import parse from "html-react-parser";
import labels from "../../Constants/labels";
export default function GuestUserLegalPage({ legalData }) {
  const [value, setValue] = React.useState(1);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    // console.log(legalData)
  }, []);

  return (
    <Box
      sx={{
        fontFamily: "Open Sans",
        fontStyle: "normal",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "1300px",
          typography: "body1",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "left",
        }}
      >
        <span
          style={{
            textAlign: "left",
            fontSize: "40px",
            fontWeight: "600",
            lineHeight: "54px",
            color: "#585D60",
            marginTop: "50px",
            marginBottom: "32.5px",
          }}
        >
          Legal
        </span>
        <Box
          onClick={() => history.push("/guest/home")}
          className={styles.backButtonMainDiv}
          sx={{
            display: "flex",
            justifyContent: "left",
            marginBottom: "32.5px",
          }}
        >
          <ArrowBackIcon></ArrowBackIcon>{" "}
          <span style={{ marginLeft: "14px" }}>{labels.en.common.back}</span>{" "}
        </Box>
      </Box>
      <Box
        sx={{
          width: "1300px",
          typography: "body",
          margin: "auto",
          padding: "0",
          background: "#FCFCFC",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "#C09507", padding: "0" }}>
            <TabList
              sx={{ maxHeight: "42px" }}
              onChange={handleChange}
              aria-label="lab API tabs example"
              textColor="white"
              indicatorColor="#C09507"
            >
              {legalData.map((eachLegalPolicy, index) => (
                <Tab
                  sx={{
                    width: "220px",
                    background: "#C09507",
                    color: value == `${index + 1}` ? "white" : "black",
                    textTransform: "capitalize",
                    fontSize: "14px",
                  }}
                  label={eachLegalPolicy.title}
                  value={index + 1}
                />
              ))}
            </TabList>
          </Box>
          <div style={{ marginTop: "50px" }}>
            {legalData.map((eachLegalPolicy, index) => (
              <TabPanel sx={{ padding: "0", margin: "0" }} value={index + 1}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    textAlign: "left",
                    fontFamily: "Open Sans",
                    fontStyle: "normal",
                    marginLeft: "110px",
                    marginRight: "110px",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#3D4A52",
                      }}
                    >
                      {" "}
                      {eachLegalPolicy.title}
                    </div>

                    <div style={{ display: "flex" }}>
                      <a
                        target="blank"
                        href={UrlConstant.base_url + eachLegalPolicy.download}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#3491EE",
                          marginRight: "34px",
                        }}
                      >
                        {" "}
                        <img
                          style={{
                            width: "22px",
                            height: "15px",
                            marginRight: "11px",
                          }}
                          src={viewbuttonsvgicon}
                          alt={eachLegalPolicy.title}
                        />{" "}
                        <spna>View document</spna>{" "}
                      </a>
                      <a
                        target="blank"
                        href={UrlConstant.base_url + eachLegalPolicy.download}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#3491EE",
                        }}
                      >
                        {" "}
                        <img
                          style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "14px",
                          }}
                          src={downloadIcon}
                          alt={eachLegalPolicy.title}
                        />{" "}
                        <spna>Download document</spna>{" "}
                      </a>
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "19px",
                      color: "#3D4A52",
                    }}
                  >
                    {" "}
                    {parse(`${eachLegalPolicy.content}`)}
                  </div>
                </div>
              </TabPanel>
            ))}
          </div>
        </TabContext>
      </Box>
    </Box>
  );
}

import React, { useContext } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Col, Row } from "react-bootstrap";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import { getUserMapId } from "../../Utils/Common";

const Generate = ({ userType, resourceId }) => {
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [showGenerateApi, setShowGenerateApi] = React.useState(false);
  const [endPointUrl, setEndPointUrl] = React.useState(
    `${UrlConstant.base_url}microsite/datasets_file/resource/`
  );
  const [apiKey, setApiKey] = React.useState("");
  const [isEmbeddings, setIsEmbeddings] = React.useState(false);

  const generateToken = async () => {
    let url = UrlConstant.base_url + UrlConstant.resource_ask_for_permission;
    let body = {
      user_organization_map: getUserMapId(),
      resource: resourceId,
      type: isEmbeddings ? "embeddings" : "resource_api",
    };
    callLoader(true);
    console.log("🚀 ~ generateToken ~ body:", body);

    await HTTPService(
      "POST",
      url,
      body,
      false,
      userType === "guest" ? false : true
    )
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        callLoader(false);
        setShowGenerateApi(true);
      })
      .catch((err) => {
        callLoader(false);
        callToast("Something went wrong while recalling.", "error", true);
      });
  };

  return (
    <Box>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{
            marginTop: "30px",
            marginBottom: showGenerateApi ? "30px" : "0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: "65px !important",
              width: "510px",
              border: "dotted",
            }}
          >
            {showGenerateApi ? (
              <>
                <Typography
                  sx={{
                    textAlign: "left",
                    fontSize: "20px",
                    fontFamily: "Roboto",
                    fontWeight: 600,
                  }}
                >
                  Generate API
                </Typography>
                <TextField
                  fullWidth
                  sx={{
                    marginTop: "30px",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#919EAB",
                      },
                      "&:hover fieldset": {
                        borderColor: "#919EAB",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#919EAB",
                      },
                    },
                  }}
                  placeholder={`Endpoint URL Preview`}
                  label={`Endpoint URL Preview`}
                  value={endPointUrl}
                  disabled={true}
                  required
                  onChange={(e) => {
                    if (e.target.value.toString().length) {
                      setEndPointUrl(e.target.value.trimStart());
                    }
                  }}
                  id="add-dataset-name"
                />
                <TextField
                  fullWidth
                  sx={{
                    marginTop: "30px",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#919EAB",
                      },
                      "&:hover fieldset": {
                        borderColor: "#919EAB",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#919EAB",
                      },
                    },
                  }}
                  placeholder={`API Key`}
                  label={`API Key`}
                  value={apiKey}
                  required
                  onChange={(e) => {
                    if (e.target.value.toString().length) {
                      setApiKey(e.target.value.trimStart());
                    }
                  }}
                  id="add-dataset-name"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <img src={require("../../Assets/Img/copy.svg")} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Divider
                  sx={{ marginTop: "25px", border: "1px solid #E5E7EB" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    sx={{
                      background: "#01A94F",
                      color: "#FFF",
                      textTransform: "none",
                      height: "30px",
                      fontFamily: "Arial",
                      width: "100px",
                      borderRadius: "100px",
                      ":hover": {
                        background: "#01A94F",
                      },
                    }}
                    onClick={() => {}}
                  >
                    Copy Curl
                  </Button>
                  <Button
                    sx={{
                      background: "#FBD5D5",
                      color: "#E02324",
                      textTransform: "none",
                      height: "30px",
                      width: "100px",
                      fontFamily: "Arial",
                      borderRadius: "100px",
                      ":hover": {
                        background: "#FBD5D5",
                      },
                    }}
                    onClick={() => {
                      setShowGenerateApi(false);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Box>
                  <InfoIcon />
                </Box>
                <Typography
                  className="mt10"
                  sx={{ color: "#A3B0B8", fontSize: "13px" }}
                >
                  Click on <strong>'Generate Token'</strong> to view API
                  details.
                </Typography>
                {!showGenerateApi && (
                  <>
                    <Box sx={{ marginTop: "12px" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              "&.Mui-checked": {
                                color: "#4759FF !important",
                              },
                              "& .MuiSvgIcon-root": {
                                fill: "#4759FF",
                              },
                            }}
                            defaultChecked={true}
                            checked={isEmbeddings}
                            onChange={() => setIsEmbeddings(!isEmbeddings)}
                          />
                        }
                        label="With Embeddings"
                      />
                    </Box>
                    <Button
                      sx={{
                        background: "#01A94F",
                        color: "#FFF",
                        textTransform: "none",
                        height: "30px",
                        fontFamily: "Arial",
                        borderRadius: "100px",
                        padding: "25px 45px",
                        marginTop: "5px",
                        ":hover": {
                          background: "#01A94F",
                        },
                      }}
                      onClick={() => generateToken()}
                    >
                      Generate Token
                    </Button>
                  </>
                )}
              </>
            )}
          </Paper>
        </Col>
      </Row>
    </Box>
  );
};

export default Generate;

import React from "react";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Col, Row } from "react-bootstrap";

const Generate = () => {
  const [showGenerateApi, setShowGenerateApi] = React.useState(false);
  const [endPointUrl, setEndPointUrl] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");

  const generateToken = () => {
    setShowGenerateApi(true);
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
                  <Button
                    sx={{
                      background: "#01A94F",
                      color: "#FFF",
                      textTransform: "none",
                      height: "30px",
                      fontFamily: "Arial",
                      borderRadius: "100px",
                      padding: "25px 45px",
                      marginTop: "30px",
                      ":hover": {
                        background: "#01A94F",
                      },
                    }}
                    onClick={() => generateToken()}
                  >
                    Generate Token
                  </Button>
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

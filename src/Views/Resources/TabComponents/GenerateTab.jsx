import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ overflowY: "auto", width: "100%", marginTop: "15px" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function GenerateTab() {
  const [value, setValue] = React.useState(0);
  const [selectedAsset, setSelectedAsset] = React.useState("");
  const [endPointUrl, setEndPointUrl] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");
  const [showGenerateApi, setShowGenerateApi] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAssetChange = (event) => {
    setSelectedAsset(event.target.value);
    if (event.target.value === "") {
      setShowGenerateApi(false);
    }
  };

  const generateApi = () => {
    setShowGenerateApi(true);
  };

  return (
    <Paper
      sx={{
        margin: "30px",
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
        display: "flex",
        maxHeight: 490,
        minHeight: 260,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="fullwidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          minWidth: "140px",
          ".MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab
          sx={{
            "&.MuiTab-root": {
              color: "#000",
              backgroundColor: value === 0 ? "#E9FEF5" : "",
              fontWeight: value === 0 ? 600 : 400,
              alignItems: "flex-start",
              textAlign: "left",
              justifyContent: "left",
              textTransform: "none",
              fontSize: "16px",
              fontFamily: "Roboto",
            },
            ":hover": {
              backgroundColor: "#E9FEF5",
            },
          }}
          component={React.forwardRef((props, ref) => (
            <>
              <Typography {...props} ref={ref}>
                Assets
              </Typography>
              <Divider />
            </>
          ))}
          {...a11yProps(0)}
        />
        <Tab
          sx={{
            "&.MuiTab-root": {
              color: "#000",
              backgroundColor: value === 1 ? "#E9FEF5" : "",
              fontWeight: value === 1 ? 600 : 400,
              alignItems: "flex-start",
              textAlign: "left",
              justifyContent: "left",
              textTransform: "none",
              fontSize: "16px",
              fontFamily: "Roboto",
            },
            ":hover": {
              backgroundColor: "#E9FEF5",
            },
          }}
          component={React.forwardRef((props, ref) => (
            <>
              <Typography {...props} ref={ref}>
                Embedding
              </Typography>
              <Divider />
            </>
          ))}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Row>
          <Col xs={12} sm={12} md={5} lg={5}>
            <Paper elevation={3} style={{ padding: 16 }}>
              <FormControl fullWidth>
                <InputLabel id="asset-label">Select Asset *</InputLabel>
                <Select
                  labelId="asset-label"
                  id="asset-select"
                  value={selectedAsset}
                  label="Select Asset *"
                  onChange={handleAssetChange}
                  sx={{
                    textAlign: "left",
                    "& .MuiSelect-icon": {
                      color: "rgba(0, 0, 0, 0.54) !important",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="corp">Corp</MenuItem>
                  <MenuItem value="wheat">Wheat</MenuItem>
                </Select>
              </FormControl>
              <Box className="text-right">
                <Button
                  sx={{
                    background: "#01A94F",
                    color: "#FFF",
                    textTransform: "none",
                    height: "30px",
                    fontFamily: "Arial",
                    width: "116px",
                    borderRadius: "100px",
                    marginTop: "16px",
                    ":hover": {
                      background: "#01A94F",
                    },
                  }}
                  onClick={() => generateApi()}
                  disabled={!selectedAsset}
                >
                  Generate API
                </Button>
              </Box>
            </Paper>
          </Col>
          <Col xs={12} sm={12} md={7} lg={7}>
            <Paper elevation={3} style={{ padding: showGenerateApi ? 35 : 65 }}>
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
                          <img src={require("../../../Assets/Img/copy.svg")} />
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
                        setSelectedAsset("");
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
                  <Typography>
                    Choose the asset and then click on 'Generate API' to access
                    the API details.
                  </Typography>
                </>
              )}
            </Paper>
          </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Paper>
  );
}

import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const ApiConfiguration = (props) => {
  return (
    <Box style={{ width: "80%", margin: "auto" }}>
      <Typography
        sx={{
          fontFamily: "Montserrat !important",
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "24px",
          color: "#212B36",
          textAlign: "left",
        }}
      >
        Connection Name
      </Typography>
      <TextField
        id={`upload-dataset-api-url-id`}
        fullWidth
        required
        size="small"
        helperText={
          <Typography
            sx={{
              fontFamily: "Montserrat !important",
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "18px",
              color: "#FF0000",
              textAlign: "left",
            }}
          >
            {!props.validator &&
            (!props.api !== null ||
              !props.api !== undefined ||
              !props.api !== "")
              ? ""
              : "Please enter the api is a mandatory field."}
          </Typography>
        }
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
        placeholder="API"
        label="API"
        value={props.api}
        onChange={(e) => props.setApi(e.target.value.trimStart())}
        InputProps={{
          startAdornment: <InputAdornment position="start">GET</InputAdornment>,
        }}
      />
      <FormControl fullWidth sx={{ marginTop: "30px" }}>
        <InputLabel>Auth Type</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id={`upload-dataset-api-select-auth-type-id`}
          required
          value={props.authType}
          onChange={(e) => props.setAuthType(e.target.value)}
          sx={{
            textAlign: "left",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#919EAB",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#919EAB",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#919EAB",
            },
          }}
          label="Auth Type"
          placeholder="Auth Type"
        >
          {props.authTypes?.map((item, index) => {
            return (
              <MenuItem
                id={`upload-dataset-api-auth-type-${index}`}
                key={item}
                value={item}
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {props.authType && props.authType !== "NO_AUTH" ? (
        props.authType === "BEARER" ? (
          <Box>
            <TextField
              size="small"
              id={`upload-dataset-api-auth-token-id`}
              fullWidth
              required
              helperText={
                <Typography
                  sx={{
                    fontFamily: "Montserrat !important",
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#FF0000",
                    textAlign: "left",
                  }}
                >
                  {!props.validator &&
                  (!props.authToken !== null ||
                    !props.authToken !== undefined ||
                    !props.authToken !== "")
                    ? ""
                    : "Please enter the auth token is a mandatory field."}
                </Typography>
              }
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
              placeholder="Auth token"
              label="Auth token"
              value={props.authToken}
              onChange={(e) => props.setAuthToken(e.target.value.trimStart())}
            />
          </Box>
        ) : (
          <Box>
            <TextField
              id={`upload-dataset-api-key-id`}
              fullWidth
              required
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
              placeholder="Api Key Name"
              label="Api Key Name"
              value={props.authApiKeyName}
              onChange={(e) =>
                props.setAuthApiKeyName(e.target.value.trimStart())
              }
            />
            <TextField
              id={`upload-dataset-api-key-value-id`}
              size="small"
              fullWidth
              required
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
              placeholder="Api Key Value"
              label="Api Key Value"
              value={props.authApiKeyValue}
              onChange={(e) =>
                props.setAuthApiKeyValue(e.target.value.trimStart())
              }
            />
          </Box>
        )
      ) : (
        <></>
      )}
      <TextField
        id={`upload-dataset-api-name-of-import-file-id`}
        fullWidth
        required
        size="small"
        helperText={
          <Typography
            sx={{
              fontFamily: "Montserrat !important",
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "18px",
              color: "#FF0000",
              textAlign: "left",
            }}
          >
            {!props.validator &&
            (!props.exportFileName !== null ||
              !props.exportFileName !== undefined ||
              !props.exportFileName !== "")
              ? ""
              : "Please enter the export file name is a mandatory field."}
          </Typography>
        }
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
        placeholder="Name of import file"
        label="Name of import file"
        value={props.exportFileName}
        onChange={(e) => {
          props.setExportFileName(e.target.value.trimStart());
        }}
      />
      <Box sx={{ textAlign: "end", marginTop: "31px" }}>
        <Button
          id={`upload-dataset-api-import-btn`}
          sx={{
            color: "white",

            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "14px",
            width: "fit-content",
            height: "40px",
            background: "#00A94F",
            borderRadius: "8px",
            textTransform: "none",
            marginLeft: "25px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#008b3d",
              boxShadow: "0px 4px 15px rgba(0, 171, 85, 0.4)",
              color: "#ffffff",
            },
            "&:disabled": {
              backgroundColor: "#d0d0d0",
              color: "#ffffff",
            },
          }}
          variant="outlined"
          disabled={
            props.api &&
            (props.authType === "NO_AUTH"
              ? true
              : props.authType === "API_KEY"
              ? props.authApiKeyName && props.authApiKeyValue
              : props.authType === "BEARER" && props.authToken
              ? true
              : false) &&
            props.exportFileName
              ? false
              : true
          }
          onClick={() => props.handleExport()}
          data-testid="restapi_import_btn"
        >
          Import
        </Button>
      </Box>
    </Box>
  );
};

export default ApiConfiguration;

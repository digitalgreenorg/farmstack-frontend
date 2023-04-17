import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Button, IconButton } from "@mui/material";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import CloseIcon from "@mui/icons-material/Close";
export default function Toast({ message, type }) {
  const { toastDetail, callToast } = React.useContext(FarmStackContext);

  const handleClose = (event, reason) => {
    callToast("", "", false);
  };

  const action = (
    <React.Fragment onClick={handleClose}>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      spacing={2}
      open={toastDetail?.status}
      autoHideDuration={3000}
      disableWindowBlurListener={true}
      sx={{ width: "100%" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={handleClose}
      action={action}
    >
      <Alert severity={type} sx={{ width: "860px" }} action={action}>
        {message}
      </Alert>
    </Snackbar>
  );
}

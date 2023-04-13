import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { FarmStackContext } from "../Contexts/FarmStackContext";

export default function Toast({ message, type }) {
  const { toastDetail, callToast } = React.useContext(FarmStackContext);

  const handleClose = (event, reason) => {
    callToast("", "", false);
  };

  return (
    <Snackbar
      spacing={2}
      open={toastDetail?.status}
      autoHideDuration={3000}
      sx={{ width: "100%" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={handleClose}
    >
      <Alert severity={type} sx={{ width: "860px" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

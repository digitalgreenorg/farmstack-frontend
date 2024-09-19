import React, { useState, useEffect, useContext } from "react";
import styles from "./Settings.module.css";
import {
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import { getUserLocal, GetErrorKey, flushLocalstorage, GetErrorHandlingRoute } from "../../Utils/Common";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import global_style from "../../Assets/CSS/global.module.css";

const ResetPassword = () => {
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordsErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const history = useHistory();

  useEffect(() => {
    // Retrieve email from localStorage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmitResetPassword = (e) => {
    console.log("inside submit call");
    e.preventDefault();
    let method = "POST";
    let url = UrlConstant.base_url + UrlConstant.reset_password;
    var bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("old_password", passwords.oldPassword);
    bodyFormData.append("new_password", passwords.newPassword);
    callLoader(true);
    HTTPService(method, url, bodyFormData, false, true)
      .then((res) => {
        callLoader(false);
        if (res.status === 200) {
          callToast("Password updated successfully!", "success", true);
        }
      })
      .catch(async (e) => {
        callLoader(false);
        if (e.response.status === 400) {
          

        } else {
          let error = await GetErrorHandlingRoute(e);
          console.log("Error obj", error);
          console.log(e);
          if (error.toast) {
            callToast(
              error?.message,
              error?.status === 200 ? "success" : "error",
              true
            );
          }
          if (error.path) {
            history.push(error.path);
          }
        }
      });
  };
  const handleClickShowPassword = (passwordType) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [passwordType]: !prevState[passwordType],
    }));
  };

  const handlePasswordChange = (e, passwordType) => {
    setPasswords((prevState) => ({
      ...prevState,
      [passwordType]: e.target.value,
    }));
  };

  return (
    <>
      <div className={styles.main_box}>
        <div className={styles.main_label}>
          <div>Change your password</div>
          <Typography className={styles.textDescription}>
  {`It's time to update the password for your account: `}
  <span style={{ fontWeight: 600 }}>{email || "your email"}</span>
</Typography>
        </div>

        <div className={styles.inputs}>
          <Typography className={styles.text}>Old Password</Typography>
          <TextField
            fullWidth
            variant="outlined"
            required
            value={passwords.oldPassword}
            onChange={(e) => handlePasswordChange(e, "oldPassword")}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
            type={showPassword.oldPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("oldPassword")}
                    edge="end"
                  >
                    {showPassword.oldPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className={styles.inputs}>
          <Typography className={styles.text}>New Password</Typography>
          <TextField
            fullWidth
            variant="outlined"
            required
            value={passwords.newPassword}
            onChange={(e) => handlePasswordChange(e, "newPassword")}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
            type={showPassword.newPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("newPassword")}
                    edge="end"
                  >
                    {showPassword.newPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className={styles.inputs}>
          <Typography className={styles.text}>Confirm Password</Typography>
          <TextField
            fullWidth
            variant="outlined"
            required
            value={passwords.confirmPassword}
            onChange={(e) => handlePasswordChange(e, "confirmPassword")}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
            type={showPassword.confirmPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("confirmPassword")}
                    edge="end"
                  >
                    {showPassword.confirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={styles.reset_button}>
            <Button
              onClick={() => {
                // Resetting all input fields
                setPasswords({
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: ""
                });
              
              }}
              className={global_style.primary_button + " " + styles.next_button}
              id="finish-later-button"
              style={{ paddingRight: "25px" }}
            >
              {" "}
            Clear
            </Button>
            <Button
               disabled={
                !(passwords.newPassword && passwords.confirmPassword && passwords.newPassword === passwords.confirmPassword)
              }
              onClick={(e) => handleSubmitResetPassword(e)}
              className={global_style.primary_button + " " + styles.next_button}
              id="nextbutton_account_onboard"
            >
              {" "}
              Submit
            </Button>
          </div>
      </div>
    </>
  );
};

export default ResetPassword;

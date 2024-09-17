import React, { useContext, useState } from "react";
import styles from "./onboarding.module.css";
import {
  Button,
  Checkbox,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import global_style from "../../Assets/CSS/global.module.css";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import {
  GetErrorHandlingRoute,
  GetErrorKey,
  getRoleLocal,
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
  setOrgId,
  setRefreshTokenLocal,
  setRoleLocal,
  setTokenLocal,
  setUserId,
  setUserMapId,
} from "../../Utils/Common";
import { useHistory } from "react-router-dom";
import { FarmStackContext } from "common/components/context/DefaultContext/FarmstackProvider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const VerifyEmailStep = (props) => {
  const { callLoader, callToast } = useContext(FarmStackContext);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [agreementChecked, setAgreementChecked] = useState(
    localStorage.getItem("dev_mode") ? true : false
  );
  const { setActiveStep } = props;
  const [loginError, setLoginError] = useState("");
  const [emailId, setEmailId] = useState("");
  const [agreement, showAgreement] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const history = useHistory();

  const handleSubmit = async (action) => {
    console.log("handleSubmit", action);
    setLoginError("");
    let data;
    let url;
    let method;
    if (action == "email") {
      url = UrlConstant.base_url + UrlConstant.login;
      data = {
        email: emailId,
      };
      method = "POST";
    }
    callLoader(true);

    HTTPService(method, url, data, false, false, false, false)
      .then((response) => {
        callLoader(false);
        console.log(response);
        setLoginError("");
        console.log(action, response);
        if (response.status === 201) {
          localStorage.setItem("email", response?.data?.email);
          setRefreshTokenLocal(response?.data?.refresh);
          setTokenLocal(response?.data?.access);
          setRoleLocal(response?.data?.role);
          setUserMapId(response?.data?.user_map);
          setOrgId(response?.data?.org_id);
          setUserId(response?.data?.user);
          console.log(getRoleLocal());
          if (response?.data?.on_boarded) {
            if (isLoggedInUserAdmin()) {
              history.push("/datahub/new_datasets");
            } else if (isLoggedInUserParticipant()) {
              history.push("/participant/new_datasets");
            } else if (isLoggedInUserCoSteward()) {
              history.push("/datahub/new_datasets");
            }
          } else {
            setActiveStep((prev) => prev + 1);
            return;
          }
        } else {
          setLoginError("Some error occurred");
          return;
        }
        setActiveStep((prev) => prev + 1);
      })
      .catch(async (e) => {
        console.log("e.response.status", e.response?.status, e);
        callLoader(false);
        if (
          e.response != null &&
          e.response != undefined &&
          e.response.status === 401
        ) {
          setLoginError(
            e.response.data && e.response.data.message
              ? e.response.data.message
              : "User not registered"
          );
        } else if (
          e.response != null &&
          e.response != undefined &&
          e.response.status === 403
        ) {
          setLoginError(
            e.response.data && e.response.data.message
              ? e.response.data.message
              : "User suspended. Please try after sometime."
          );
        } else if (
          e.response != null &&
          e.response != undefined &&
          e.response.status === 400
        ) {
          var returnValues = GetErrorKey(
            e,
            action == "email" ? ["email"] : ["otp"]
          );
          var errorKeys = returnValues[0];
          var errorMessages = returnValues[1];
          if (errorKeys.length > 0) {
            for (var i = 0; i < errorKeys.length; i++) {
              switch (errorKeys[i]) {
                case "email":
                  setLoginError(errorMessages[i]);
                  break;
                case "password":
                  setLoginError(errorMessages[i]);
                  break;
                default:
                  break;
              }
            }
          } else {
            let error = await GetErrorHandlingRoute(e);
            if (error) {
              callToast(error?.message, "error", true);
            }
          }
        } else {
          let error = await GetErrorHandlingRoute(e);
          if (error) {
            callToast(error?.message, "error", true);
          }
        }
      });
  };

  return (
    <div style={{ margin: mobile ? "30px" : "", minHeight: "400px" }}>
      <div className={styles.email_id_label}>
        Enter your email ID and password to seamlessly sign in.
      </div>
      <div className={styles.inputs}>
        <TextField
          fullWidth
          placeholder={"Enter mail id"}
          id="email_id_for_login"
          data-testid="email_id_for_login_test"
          label={"Enter mail id"}
          variant="outlined"
          //   value={emailId}
          //   onChange={(e) =>
          //     !isValidEmailSent
          //       ? setEmailId(e.target.value.toLowerCase())
          //       : setOtp(
          //           e.target.value.length <= 6 && !isNaN(e.target.value)
          //             ? e.target.value
          //             : otp // If the input is not a valid 6-digit number, keep the current value
          //         )
          //   }
          required
          error={loginError ? true : false}
          helperText={loginError}
        />
      </div>
      <div className={styles.inputs}>
        <TextField
          fullWidth
          label={"Enter your password"}
          placeholder={"Enter your password"}
          variant="outlined"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == " ") {
              e.preventDefault();
            }
          }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles.resend_otp_button + " " + global_style.font700}>
        <Button
          data-testid="resend-otp-button-test"
          onClick={(e) => e}
          className={styles.resend_main_button + " " + global_style.blue}
        >
          Forget Password?
        </Button>
      </div>
      {agreement && (
        <div className={styles.agreement}>
          <Checkbox
            id="login-agree-terms-and-condition-check-box"
            data-testid="login-agree-terms-and-condition-check-box-test"
            checked={agreementChecked}
            onClick={(e) => setAgreementChecked(e.target.checked)}
            className={styles.checkbox}
          />{" "}
          <span className={styles.agreement_line}>
            {" "}
            Agree to the following{" "}
            <span
              className={styles.termsAndConditionClass}
              onClick={() => history.push("/home/legal")}
            >
              terms and privacy policy.
            </span>{" "}
          </span>
        </div>
      )}

      <div className={styles.send_otp_div}>
        <Button
          // disabled={
          //   isEmailValid && !isValidEmailSent && agreementChecked
          //     ? false
          //     : isValidEmailSent && otp && otp.length == 6
          //     ? false
          //     : true
          // }
          //   onClick={() =>
          //     !isValidEmailSent && emailId
          //       ? handleSubmit("email")
          //       : isValidEmailSent && otp
          //       ? handleSubmit("otp")
          //       : ""
          //   }
          className={global_style.primary_button + " " + styles.send_otp}
          id="send-otp-btn"
          data-testid="send-otp-btn-test"
          disabled={!agreementChecked ? true : false}
        >
          {" "}
          {"Submit"}
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailStep;

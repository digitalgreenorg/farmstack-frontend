import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OtpCountDownTimer from "./OtpCountDownTimer";

export default function SignupOtp(props) {
  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={props.handleSubmitOtp}>
        <TextField
          type="number"
          id="filled-basic"
          inputProps={{ maxLength: 6 }}
          label="Enter 6 Digit OTP"
          variant="filled"
          className="signupemail "
          onChange={props.handleOtp}
          inputRef={props.otp}
          error={props.isOtperror}
          helperText={props.isOtperror ? "Enter vaild OTP" : ""}
        />
        <div>
          {props.button ? (
            <Button variant="contained" className="Signupbtn" type="submit">
              <span className="signupbtnname">Verify</span>
            </Button>
          ) : (
            <Button variant="outlined" disabled className="disablebtn">
              Verify
            </Button>
          )}
          <OtpCountDownTimer
            hanleResendOTp={props.hanleResendOTp}
            restartcounter={props.restartcounter}
            disable={props.disable}
            setDisable={props.setDisable}
          />
        </div>
      </form>
    </div>
  );
}

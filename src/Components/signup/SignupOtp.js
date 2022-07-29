import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import OtpCountDownTimer from './OtpCountDownTimer'
import './SignupEmail.css'
import './SignupOTP.css'
import Footerimg from '../../Components/signup/Footerimg'

export default function SignupOtp(props) {
  return (
    <div>
      <Footerimg />
      <form noValidate autoComplete="off" onSubmit={props.handleSubmitOtp}>
        <TextField
          type="number"
          id="filled-basic"
          maxLength={6}
          inputProps={{ maxLength: 6 }}
          label="Enter 6 Digit OTP"
          variant="filled"
          className="signupotp"
          onChange={props.handleOtp}
          //value={props.otpValue}
          onKeyDown={(e) => {if(e.key == '-' || e.key == 'e' || e.key == '+') {e.preventDefault()}}}
          inputRef={props.otp}
          error={props.isOtperror || props.isuserSuspenderror}
          helperText={
            // props.isuserSuspenderror ? "user invaliad" : ""
            props.isOtperror
              ? 'Enter vaild OTP'
              : props.isuserSuspenderror
              ? 'Maximum attempts taken, please retry after some time'
              : ''
          }
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
            remainingCounterTime={props.remainingCounterTime}
            setRemainingCounterTime = {props.setRemainingCounterTime}
          />
        </div>
      </form>
    </div>
  )
}

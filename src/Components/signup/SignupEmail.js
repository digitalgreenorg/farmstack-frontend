import React, { useState, useRef } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './SignupEmail.css'
// import validator from "validator";

export default function SignupEmail(props) {
  //   const [email, setEmail] = useState("");

  // const [button, setButton] = useState(false);
  // const email = useRef();
  // const [iserror, setError] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(email.current.value);
  //   const valid = validator.isEmail(email.current.value);
  //   console.log(valid);
  //   if (!valid) {
  //     setError(true);
  //   } else {
  //     setError(false);
  //   }
  // };

  // const handleEmail = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   if (e.target.value.length > 0) {
  //     setButton(true);
  //   } else {
  //     setButton(false);
  //   }
  // };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={props.handleSubmit}>
        <TextField
          required
          id="filled-basic"
          label="Email"
          variant="filled"
          className="signupemail"
          onChange={props.handleEmail}
          inputRef={props.email}
          error={props.iserror}
          helperText={
            props.iserror
              ? 'Enter Valid Email id'
              : props.userSuspenderror
              ? 'user suspended'
              : ''
          }
        />
        <div>
          {props.button ? (
            <Button variant="contained" className="Signupbtn" type="submit">
              <span className="signupbtnname">Send OTP</span>
            </Button>
          ) : (
            <Button variant="outlined" disabled className="disablebtn">
              Send OTP
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

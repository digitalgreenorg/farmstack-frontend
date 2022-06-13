import React from "react";
import "./otpcounter.css";
import Countdown from "react-countdown";

export default function OtpCountDownTimer(props) {
  // Random component
  const Completionist = () => <span>0:00</span>;
  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      // Render a countdown
      return props.disable ? (
        <span>
          {(minutes < 10 ? "0" : "") + minutes}:
          {(seconds < 10 ? "0" : "") + seconds}
        </span>
      ) : (
        <span>00:00</span>
      );
    }
  };

  return (
    <>
      <div className="counter">
        <Countdown
          date={Date.now() + 10000}
          renderer={renderer}
          key={props.restartcounter}
          precision={3}
          onComplete={() => props.setDisable(false) && <Completionist />}
        />
      </div>
      <button
        type="button"
        className={props.disable ? "disabledotp" : "resendotp"}
        onClick={props.hanleResendOTp}
        disabled={props.disable}>
        Resend OTP
      </button>
    </>
  );
}

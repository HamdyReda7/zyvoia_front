import React from "react";
import "./Auth.css";

const VerifyCode = () => {
  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className="auth-card">

        {/* Logo */}
        <div className="text-center mb-5">
          <div className="logo-box">
            <i className="fa-solid fa-shield-halved"></i>
          </div>

          <h1 className="app-name">Verify Code</h1>

          <p className="auth-subtitle">
            Enter the 6 digit code sent to your email.
          </p>
        </div>

        <form>

          {/* OTP */}
          <div className="otp-wrapper">

            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />

          </div>

          <button className="auth-btn mt-4">
            Verify Code
          </button>

        </form>

      </div>
    </div>
  );
};

export default VerifyCode;
import React, { useState } from "react";
import "./Auth.css";

const ResetPassword = () => {
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className="auth-card">

        {/* Logo */}
        <div className="text-center mb-5">
          <div className="logo-box">
            <i className="fa-solid fa-lock"></i>
          </div>

          <h1 className="app-name">
            Reset Password
          </h1>

          <p className="auth-subtitle">
            Create your new password.
          </p>
        </div>

        <form>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label">
              New Password
            </label>

            <div className="input-box">
              <i className="fa-solid fa-lock input-icon"></i>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="form-control custom-input"
                placeholder="New password"
              />

              <button
                type="button"
                className="show-password-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                <i
                  className={
                    showPassword
                      ? "fa-regular fa-eye-slash"
                      : "fa-regular fa-eye"
                  }
                ></i>
              </button>
            </div>
          </div>

          {/* Confirm */}
          <div className="mb-4">
            <label className="form-label">
              Confirm Password
            </label>

            <div className="input-box">
              <i className="fa-solid fa-lock input-icon"></i>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                className="form-control custom-input"
                placeholder="Confirm password"
              />

              <button
                type="button"
                className="show-password-btn"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                <i
                  className={
                    showConfirmPassword
                      ? "fa-regular fa-eye-slash"
                      : "fa-regular fa-eye"
                  }
                ></i>
              </button>
            </div>
          </div>

          <button className="auth-btn">
            Reset Password
          </button>

        </form>

      </div>
    </div>
  );
};

export default ResetPassword;
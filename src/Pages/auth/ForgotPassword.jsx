import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return (
        <div className="auth-page d-flex align-items-center justify-content-center">
            <div className="auth-card">
                {/* Logo */}
                <div className="text-center mb-5">
                    <div className="logo-box">
                        <i className="fa-solid fa-key"></i>
                    </div>

                    <h1 className="app-name">Forgot Password</h1>

                    <p className="auth-subtitle">
                        Enter your email to receive a verification code.
                    </p>
                </div>

                <form>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="form-label">Email Address</label>

                        <div className="input-box">
                            <i className="fa-regular fa-envelope input-icon"></i>

                            <input
                                type="email"
                                className="form-control custom-input"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <button className="auth-btn">Send Code</button>

                </form>

                <p className="bottom-text">
                    Remember password?
                    <Link to="/" className="link-bottom-text">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;

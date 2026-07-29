import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router";

const Login = ({
    theme,
    setTheme,
}) => {
        const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="auth-page d-flex align-items-center justify-content-center">
            <div className="auth-card">
                {/* Logo */}
                <div className="text-center mb-5">
                    <div className="img-box mt-2">
                        <img
                            width={"200px"}
                            src="/img/file_000000008870720a9451cf3151724e4e.png"
                            alt=""
                        />
                    </div>

                    {/* <h1 className="app-name">Zyvoa</h1> */}

                    <p className="auth-subtitle">
                        Welcome back! Sign in to continue Zyvoia.
                    </p>
                </div>

                {/* Form */}
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

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label">Password</label>

                        <div className="input-box">
                            <i className="fa-solid fa-lock input-icon"></i>

                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control custom-input"
                                placeholder="Enter your password"
                            />

                            <button
                                type="button"
                                className="show-password-btn"
                                onClick={() => setShowPassword(!showPassword)}
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

                    {/* Options */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="remember"
                            />

                            <label
                                className="form-check-label remember-text"
                                htmlFor="remember"
                            >
                                Remember me
                            </label>
                        </div>


                        <Link to={"forgotPassword"} className="forgot-btn">
                            {" "}
                            Forgot password?
                        </Link>
                    </div>

                    {/* Button */}

                    <button className="auth-btn">Sign In</button>
                </form>

                {/* Divider */}
                <div className="divider">
                    <span>OR</span>
                </div>

                {/* Bottom */}
                <p className="bottom-text">
                    Don’t have an account?
                    <Link to={"register"} className="link-bottom-text">
                        {" "}
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router";
import Cropper from "react-easy-crop";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [image, setImage] = useState(null);

    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
    });

    const [zoom, setZoom] = useState(1);

    return (
        <div className="auth-page d-flex align-items-center justify-content-center">
            <div className="auth-card">
                {/* Logo */}
                <div className="text-center mb-5">
                    <div className="logo-box">
                        <i className="fa-solid fa-user-plus"></i>
                    </div>

                    <h1 className="app-name">Create Account</h1>

                    <p className="auth-subtitle">
                        Create your new account and start chatting.
                    </p>
                </div>

                {/* Form */}
                <form>
                    {/* Profile Image */}
                    <div className="mb-4 text-center">
                        <div className="profile-upload">
                            <input
                                type="file"
                                id="profileImage"
                                hidden
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    if (file) {
                                        setImage(URL.createObjectURL(file));
                                    }
                                }}
                            />

                            <label
                                htmlFor="profileImage"
                                className="profile-label"
                            >
                                <div className="profile-circle">
                                    {image ? (
                                        <div className="crop-container">
                                            <Cropper
                                                image={image}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={1}
                                                cropShape="round"
                                                showGrid={false}
                                                onCropChange={setCrop}
                                                onZoomChange={setZoom}
                                            />
                                        </div>
                                    ) : (
                                        <i className="fa-solid fa-camera"></i>
                                    )}
                                </div>
                            </label>
                        </div>

                        <p className="upload-text mt-3">
                            {image
                                ? "Profile picture uploaded successfully"
                                : "Upload Profile Picture"}
                        </p>

                        {image && (
                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={(e) => setZoom(e.target.value)}
                                className="zoom-slider"
                            />
                        )}
                    </div>

                    {/* Username */}
                    <div className="mb-4">
                        <label className="form-label">Username</label>

                        <div className="input-box">
                            <i className="fa-regular fa-user input-icon"></i>

                            <input
                                type="text"
                                className="form-control custom-input"
                                placeholder="Enter username"
                            />
                        </div>
                    </div>

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
                    <div className="mb-4">
                        <label className="form-label">Password</label>

                        <div className="input-box">
                            <i className="fa-solid fa-lock input-icon"></i>

                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control custom-input"
                                placeholder="Create password"
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

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className="form-label">Confirm Password</label>

                        <div className="input-box">
                            <i className="fa-solid fa-lock input-icon"></i>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control custom-input"
                                placeholder="Confirm password"
                            />

                            <button
                                type="button"
                                className="show-password-btn"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
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

                    {/* Button */}
                    <button className="auth-btn">Create Account</button>
                </form>

                {/* Divider */}
                <div className="divider">
                    <span>OR</span>
                </div>

                {/* Bottom */}
                <p className="bottom-text">
                    Already have an account?
                    <Link to={"/"} className="link-bottom-text">
                        {" "}
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

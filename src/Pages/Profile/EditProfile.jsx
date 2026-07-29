import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { useTranslation } from "react-i18next";
import "./Profile.css";

const EditProfile = ({ goBack, currentUser, setCurrentUser }) => {
    const { t } = useTranslation("editProfile");
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser.name,

        username: currentUser.username,

        email: currentUser.email,

        oldPassword: "",

        newPassword: "",

        confirmPassword: "",
    });

    const [image, setImage] = useState(currentUser.image);
    const [crop, setCrop] = useState({
        x: 0,

        y: 0,
    });

    const [zoom, setZoom] = useState(1);

    const [showPassword, setShowPassword] = useState({
        old: false,

        new: false,

        confirm: false,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,

            [e.target.name]: e.target.value,
        });
    };



    const handleUpdate = () => {
        if (
            formData.newPassword ||
            formData.confirmPassword ||
            formData.oldPassword
        ) {
            if (formData.oldPassword !== "123456") {
                alert("Old password is incorrect");

                return;
            }

            if (formData.newPassword !== formData.confirmPassword) {
                alert("Passwords do not match");

                return;
            }
        }

        alert("Profile Updated");
    };

    return (
        <div className="profile-page">
            <div className="profile-top">
                <button className="profile-back-btn" onClick={goBack}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                <h4>{t("editProfile")}</h4>
            </div>
            <div className="profile-card">
                <div className="mb-4 text-center">
                    <div
                        className="
            profile-upload
        "
                    >
                        <input
                            type="file"
                            id="editProfileImage"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];

                                if (file) {
                                    setImage(URL.createObjectURL(file));
                                }
                            }}
                        />

                        <div
                            className="
        profile-circle
    "
                        >
                            {image ? (
                                <div
                                    className="
                crop-container
            "
                                >
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
                    </div>
                    <button
                        type="button"
                        className="
        edit-photo-btn
    "
                        onClick={() =>
                            document.getElementById("editProfileImage")?.click()
                        }
                    >
                        {t("edit")}
                    </button>
                    {image && (
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(e.target.value)}
                            className="
                zoom-slider
            "
                        />
                    )}
                </div>

                <div className="edit-form">
                    <div className="profile-section">
                        <span className="profile-label">{t("name")}</span>

                        <input
                            name="name"
                            value={currentUser.name}
                            onChange={handleChange}
                            className="
                                profile-input
                            "
                        />
                    </div>

                    <div className="profile-section">
                        <span className="profile-label">{t("username")}</span>

                        <input
                            name="username"
                            value={currentUser.username}
                            onChange={handleChange}
                            className="
                                profile-input
                            "
                        />
                    </div>

                    <div className="profile-section">
                        <span className="profile-label">{t("email")}</span>

                        <input
                            name="email"
                            value={currentUser.email}
                            onChange={handleChange}
                            className="
                                profile-input
                            "
                        />
                    </div>

                    <div className="profile-section">
                        <span className="profile-label">{t("bio")}</span>

                        <input
                            name="email"
                            value={currentUser.bio}
                            onChange={handleChange}
                            className="
                                profile-input
                            "
                        />
                    </div>

                    <button
                        type="button"
                        className="
        change-password-btn
    "
                        onClick={() => setShowPasswordFields((prev) => !prev)}
                    >
                        <i className="fa-solid fa-key"></i>

                        {showPasswordFields
                            ? t("hidePasswordFields")
                            : t("changePassword")}
                    </button>

                    {showPasswordFields && (
                        <>
                            {/* OLD */}

                            <div className="profile-section">
                                <span className="profile-label">
                                    {t("oldPassword")}
                                </span>

                                <div className="password-input-box">
                                    <input
                                        type={
                                            showPassword.old
                                                ? "text"
                                                : "password"
                                        }
                                        name="oldPassword"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        className="
                        profile-input
                    "
                                    />

                                    <button
                                        type="button"
                                        className="
                        password-toggle
                    "
                                        onClick={() =>
                                            setShowPassword((prev) => ({
                                                ...prev,

                                                old: !prev.old,
                                            }))
                                        }
                                    >
                                        <i
                                            className={
                                                showPassword.old
                                                    ? "fa-regular fa-eye-slash"
                                                    : "fa-regular fa-eye"
                                            }
                                        ></i>
                                    </button>
                                </div>
                            </div>

                            {/* NEW */}

                            <div className="profile-section">
                                <span className="profile-label">
                                    {t("newPassword")}
                                </span>

                                <div className="password-input-box">
                                    <input
                                        type={
                                            showPassword.new
                                                ? "text"
                                                : "password"
                                        }
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="
                        profile-input
                    "
                                    />

                                    <button
                                        type="button"
                                        className="
                        password-toggle
                    "
                                        onClick={() =>
                                            setShowPassword((prev) => ({
                                                ...prev,

                                                new: !prev.new,
                                            }))
                                        }
                                    >
                                        <i
                                            className={
                                                showPassword.new
                                                    ? "fa-regular fa-eye-slash"
                                                    : "fa-regular fa-eye"
                                            }
                                        ></i>
                                    </button>
                                </div>
                            </div>

                            {/* CONFIRM */}

                            <div className="profile-section">
                                <span className="profile-label">
                                    {t("confirmPassword")}
                                </span>

                                <div className="password-input-box">
                                    <input
                                        type={
                                            showPassword.confirm
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="
                        profile-input
                    "
                                    />

                                    <button
                                        type="button"
                                        className="
                        password-toggle
                    "
                                        onClick={() =>
                                            setShowPassword((prev) => ({
                                                ...prev,

                                                confirm: !prev.confirm,
                                            }))
                                        }
                                    >
                                        <i
                                            className={
                                                showPassword.confirm
                                                    ? "fa-regular fa-eye-slash"
                                                    : "fa-regular fa-eye"
                                            }
                                        ></i>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    <button
                        className="
                            edit-profile-btn
                        "
                        onClick={handleUpdate}
                    >
                        {t("updateProfile")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

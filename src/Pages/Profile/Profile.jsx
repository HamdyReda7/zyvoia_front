import React from "react";
import { useTranslation } from "react-i18next";
import "./Profile.css";

const Profile = ({ goBack, onEdit, currentUser }) => {
    const { t } = useTranslation("profile");
    return (
        <div className="profile-page">
            <div className="profile-top">
                <button
                    className="
            profile-back-btn
        "
                    onClick={goBack}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                <h4 >{t("profile")}</h4>
            </div>
            <div className="profile-card">
                <img
                    src={currentUser.image}
                    alt=""
                    className="
                        profile-avatar
                    "
                />

                <h2
                    className="
                        profile-name
                    "
                >
                    {currentUser.name}
                </h2>

                <p
                    className="
                        profile-username
                    "
                >
                    @{currentUser.username}
                </p>

                <div
                    className="
                        profile-section
                    "
                >
                    <span
                        className="
                            profile-label
                        "
                    >
                        {t("name")}
                    </span>

                    <p>{currentUser.name}</p>
                </div>

                <div
                    className="
                        profile-section
                    "
                >
                    <span
                        className="
                            profile-label
                        "
                    >
                        {t("username")}
                    </span>

                    <p>@{currentUser.username}</p>
                </div>

                <div
                    className="
                        profile-section
                    "
                >
                    <span
                        className="
                            profile-label
                        "
                    >
                        {t("email")}
                    </span>

                    <p>{currentUser.email}</p>
                </div>

                <div
                    className="
                        profile-section
                    "
                >
                    <span
                        className="
                            profile-label
                        "
                    >
                        {t("bio")}
                    </span>

                    <p>{currentUser.bio}</p>
                </div>

                <button
                    className="
        edit-profile-btn
    "
                    onClick={onEdit}
                >
                    {t("editProfile")}
                </button>
            </div>
        </div>
    );
};

export default Profile;

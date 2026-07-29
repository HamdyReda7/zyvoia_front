import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import "./Settings.css";

const Settings = ({
    goBack,
    openProfile,
    openBlocked,
    blockedCount,
    currentUser,
    openFriends,
}) => {
    const { t } = useTranslation("settings");

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const changeTheme = (newTheme) => {
        setTheme(newTheme);

        localStorage.setItem("theme", newTheme);

        document.body.setAttribute("data-theme", newTheme);
    };

    const [showThemeMenu, setShowThemeMenu] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [language, setLanguage] = useState(
        localStorage.getItem("language") === "ar" ? "Arabic" : "English",
    );
    console.log(theme);
    console.log(setTheme);
    return (
        <div className="settings-page">
            {/* Header */}

            <div className="settings-header">
                <button
                    className="
                        settings-back-btn
                    "
                    onClick={goBack}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                <h4>{t("settings")}</h4>
            </div>

            {/* User */}

            <div
                className="
                    settings-user
                "
                onClick={openProfile}
            >
                <img src={currentUser.image} alt="" />

                <div>
                    <h5>{currentUser.name}</h5>
                    <p>{currentUser.bio}</p>
                </div>
            </div>

            {/* Theme */}

            <div
                className="
                    settings-item
                "
                onClick={() => {
                    setShowThemeMenu(!showThemeMenu);

                    setShowLanguageMenu(false);
                }}
            >
                <div
                    className="
                        settings-left
                    "
                >
                    <i className="fa-regular fa-moon"></i>

                    <div>
                        <h6>{t("theme")}</h6>

                        <span>{theme}</span>
                    </div>
                </div>

                <i className="fa-solid fa-chevron-right"></i>

                {showThemeMenu && (
                    <div
                        className="
                            settings-popup
                        "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h6>{t("chooseTheme")}</h6>

                        {["light", "dark"].map((item) => (
                            <button
                                key={item}
                                className="settings-option"
                                onClick={() => {
                                    changeTheme(item.toLowerCase());
                                    setShowThemeMenu(false);
                                }}
                            >
                                {item === "light" ? "Light" : "Dark"}

                                {theme === item && (
                                    <i className="fa-solid fa-check"></i>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Language */}

            <div
                className="
                    settings-item
                "
                onClick={() => {
                    setShowLanguageMenu(!showLanguageMenu);

                    setShowThemeMenu(false);
                }}
            >
                <div
                    className="
                        settings-left
                    "
                >
                    <i className="fa-solid fa-language"></i>

                    <div>
                        <h6>{t("language")}</h6>

                        <span>{language}</span>
                    </div>
                </div>

                <i className="fa-solid fa-chevron-right"></i>

                {showLanguageMenu && (
                    <div
                        className="
                            settings-popup
                        "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h6>{t("chooseLanguage")}</h6>

                        {["Arabic", "English"].map((item) => (
                            <button
                                key={item}
                                className="
                                        settings-option
                                    "
                                onClick={() => {
                                    const lang =
                                        item === "Arabic" ? "ar" : "en";

                                    setLanguage(item);

                                    i18n.changeLanguage(lang);

                                    localStorage.setItem("language", lang);

                                    document.documentElement.dir =
                                        lang === "ar" ? "rtl" : "ltr";

                                    document.documentElement.lang = lang;

                                    setShowLanguageMenu(false);
                                }}
                            >
                                {item}

                                {language === item && (
                                    <i className="fa-solid fa-check"></i>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Friends */}

            <div
                className="
        settings-item
    "
                onClick={openFriends}
            >
                <div
                    className="
            settings-left
        "
                >
                    <i className="fa-solid fa-user-group"></i>

                    <div>
                        <h6>{t("friends")}</h6>

                        <span>{t("managefriends")}</span>
                    </div>
                </div>

                <i className="fa-solid fa-chevron-right"></i>
            </div>

            {/* Blocked */}

            <div
                className="
                    settings-item
                "
                onClick={openBlocked}
            >
                <div
                    className="
                        settings-left
                    "
                >
                    <i className="fa-solid fa-ban"></i>

                    <div>
                        <h6>{t("blockedAccounts")}</h6>

                        <span>
                            {blockedCount} {t("accounts")}
                        </span>
                    </div>
                </div>

                <i className="fa-solid fa-chevron-right"></i>
            </div>

            {/* Logout */}

            <button
                className="
        logout-btn
    "
                onClick={() => setShowLogoutModal(true)}
            >
                <i className="fa-solid fa-right-from-bracket"></i>
                {t("logout")}
            </button>

            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="confirm-modal">
                        <h4>{t("logout")}</h4>

                        <p>{t("logoutConfirm")}</p>

                        <div className="modal-actions">
                            <button
                                className="
                        cancel-btn
                    "
                                onClick={() => setShowLogoutModal(false)}
                            >
                                {t("cancel")}
                            </button>

                            <button
                                className="
                        confirm-btn
                        danger-btn
                    "
                                onClick={() => {
                                    setShowLogoutModal(false);
                                }}
                            >
                                {t("logout")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;

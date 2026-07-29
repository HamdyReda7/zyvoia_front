import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const SidebarHeader = ({
    activeFilter,
    setActiveFilter,
    search,
    setSearch,
    setShowProfile,
    setSelectedChat,
    setShowStarred,
    setShowSettings,
}) => {
    const { t } = useTranslation("home");
    const [showMenu, setShowMenu] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="sidebar-header">
            {/* Logo */}
            <div className="logo-side">
                <div className="logo-mini pt-3">
                    <img
                        width={"100px"}
                        src="/img/file_000000008870720a9451cf3151724e4e.png"
                        alt=""
                    />{" "}
                </div>
                <div className="menu-wrapper" ref={menuRef}>
                    <button
                        className="chat-menu-btn"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>

                    {showMenu && (
                        <div className="chat-dropdown">
                            {/* Profile */}

                            <button
                                type="button"
                                className="
        dropdown-item-custom
    "
                                onClick={() => {
                                    setShowProfile(true);

                                    setSelectedChat(null);
                                }}
                            >
                                <i className="fa-regular fa-user"></i>
                                {t("profile")}
                            </button>
                            {/* Starred */}

                            <button
                                type="button"
                                className="
        dropdown-item-custom
    "
                                onClick={() => {
                                    setShowStarred(true);

                                    setShowProfile(false);

                                    setSelectedChat(null);
                                }}
                            >
                                <i className="fa-regular fa-star"></i>
                                {t("starredMessages")}
                            </button>

                            {/* Settings */}

                            <button
                                type="button"
                                className="
        dropdown-item-custom
    "
                                onClick={() => {
                                    setShowSettings(true);

                                    setShowProfile(false);

                                    setShowStarred(false);

                                    setSelectedChat(null);
                                }}
                            >
                                <i className="fa-solid fa-gear"></i>
                                {t("settings")}
                            </button>

                            {/* Logout */}

                            <Link
                                onClick={() => setShowLogoutModal(true)}
                                className="dropdown-item-custom logout-item"
                            >
                                <i className="fa-solid fa-right-from-bracket"></i>
                                {t("logout")}
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Search */}

            <div className="search-box">
                <i className="fa-solid fa-search search-icon"></i>

                <input
                    type="text"
                    placeholder={t("search")}
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Filters */}

            <div className="chat-filters">
                <button
                    className={`filter-btn ${
                        activeFilter === "all" ? "active-filter" : ""
                    }`}
                    onClick={() => setActiveFilter("all")}
                >
                    {t("all")}
                </button>

                <button
                    className={`filter-btn ${
                        activeFilter === "friends" ? "active-filter" : ""
                    }`}
                    onClick={() => setActiveFilter("friends")}
                >
                    {t("friends")}
                </button>

                <button
                    className={`filter-btn ${
                        activeFilter === "unread" ? "active-filter" : ""
                    }`}
                    onClick={() => setActiveFilter("unread")}
                >
                    {t("unread")}
                </button>

                <button
                    className={`filter-btn ${
                        activeFilter === "favorites" ? "active-filter" : ""
                    }`}
                    onClick={() => setActiveFilter("favorites")}
                >
                    {t("favorites")}
                </button>

                <button
                    className={`filter-btn ${
                        activeFilter === "requests" ? "active-filter" : ""
                    }`}
                    onClick={() => setActiveFilter("requests")}
                >
                    {t("requests")}
                </button>

                <button
                    className={`filter-btn ${
                        activeFilter === "blocked" ? "active-filter" : ""
                    }`}
                    onClick={() => setActiveFilter("blocked")}
                >
                    {t("blocked")}
                </button>
            </div>

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

export default SidebarHeader;

import React from "react";
import { useTranslation } from "react-i18next";
import "./BlockedAccounts.css";

const BlockedAccounts = ({ goBack, blockedUsers, unblockUser }) => {
    const { t } = useTranslation("blocked");
    return (
        <div className="blocked-page">
            {/* Header */}

            <div className="blocked-header">
                <button
                    className="
                        blocked-back-btn
                    "
                    onClick={goBack}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                <h4>{t("blockedAccounts")}</h4>
            </div>

            {blockedUsers.length > 0 ? (
                <div
                    className="
                        blocked-list
                    "
                >
                    {blockedUsers.map((user) => (
                        <div
                            key={user.id}
                            className="
                                    blocked-card
                                "
                        >
                            <div
                                className="
                                        blocked-user
                                    "
                            >
                                <img src={user.image} alt="" />

                                <div>
                                    <h6>{user.name}</h6>

                                    <span>@{user.username}</span>
                                </div>
                            </div>

                            <button
                                className="
                                        unblock-btn
                                    "
                                onClick={() => unblockUser(user.id)}
                            >
                                {t("unblock")}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="
                        blocked-empty
                    "
                >
                    <i className="fa-solid fa-ban"></i>

                    <p>{t("noBlockedAccounts")}</p>
                </div>
            )}
        </div>
    );
};

export default BlockedAccounts;

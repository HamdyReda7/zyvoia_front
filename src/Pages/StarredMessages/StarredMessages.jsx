import React from "react";
import { useState } from "react";
import "./StarredMessages.css";
import { useTranslation } from "react-i18next";

const StarredMessages = ({ goBack, starredMessages, removeStar }) => {
    const { t } = useTranslation("starred");
    const [activeMenu, setActiveMenu] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    return (
        <div className="starred-page">
            <div className="starred-header">
                <button
                    className="
                        starred-back-btn
                    "
                    onClick={goBack}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                <h4>{t("starredMessages")}</h4>
            </div>

            {starredMessages.length > 0 ? (
                <div
                    className="
                        starred-list
                    "
                >
                    {starredMessages.map((message) => (
                        <div
                            key={message.id}
                            className="
        starred-card
    "
                        >
                            <div
                                className="
            starred-top
        "
                            >
                                <div
                                    className="
                starred-user
            "
                                >
                                    <img
                                        src={message.image}
                                        alt=""
                                        className="
                    starred-avatar
                "
                                    />

                                    <h6>{message.sender}</h6>
                                </div>

                                <button
                                    className="
                starred-menu-btn
            "
                                    onClick={() =>
                                        setActiveMenu(
                                            activeMenu === message.id
                                                ? null
                                                : message.id,
                                        )
                                    }
                                >
                                    <i className="fa-solid fa-ellipsis"></i>
                                </button>
                            </div>

                            <p>{message.text}</p>

                            <div
                                className="
            starred-bottom
        "
                            >
                                <span>{message.time}</span>
                            </div>

                            {activeMenu === message.id && (
                                <div
                                    className="
                starred-menu
            "
                                >
                                    <button
                                        className="
                    dropdown-item-custom
                "
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                message.text,
                                            );

                                            setCopiedId(message.id);

                                            setTimeout(
                                                () => setCopiedId(null),
                                                1500,
                                            );
                                        }}
                                    >
                                        <i
                                            className={
                                                copiedId === message.id
                                                    ? "fa-solid fa-check"
                                                    : "fa-regular fa-copy"
                                            }
                                        ></i>

                                        {copiedId === message.id
                                            ? t("copied")
                                            : t("copy")}
                                    </button>

                                    <button
                                        className="
                    dropdown-item-custom
                "
                                        onClick={() => {
                                            removeStar(message.id);

                                            setActiveMenu(null);
                                        }}
                                    >
                                        <i className="fa-regular fa-star"></i>
                                        {t("removeStar")}
                                    </button>

                                    <button
                                        className="
                    dropdown-item-custom
                "
                                    >
                                        <i className="fa-regular fa-trash-can"></i>
                                        {t("delete")}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="
                        starred-empty
                    "
                >
                    <i className="fa-regular fa-star"></i>

                    <p>{t("noStarredMessages")}</p>
                </div>
            )}
        </div>
    );
};

export default StarredMessages;

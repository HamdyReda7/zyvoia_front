import React from "react";
import { useTranslation } from "react-i18next";

const MessageMenu = ({
    isMine,
    onReact,
    onCopy,
    copied,
    onReply,
    onEdit,
    onStar,
    isStarred,
    message,
    onViewImage,
    onDownloadImage,
}) => {
    const { t } = useTranslation("chat");

    const isImageMessage = !!message?.image;

    const isVoiceMessage = !!message?.voice;

    return (
        <div className="chat-dropdown">
            {/* My Message */}

            {isMine ? (
                <>
                    <button
                        type="button"
                        className="dropdown-item-custom"
                        onClick={(e) => {
                            e.stopPropagation();

                            onReply?.();
                        }}
                    >
                        {" "}
                        <i className="fa-solid fa-reply"></i>
                        {t("Reply")}
                    </button>

                    {!isImageMessage && !isVoiceMessage && (
                        <button
                            type="button"
                            className="dropdown-item-custom"
                            onClick={(e) => {
                                e.stopPropagation();

                                onEdit?.();
                            }}
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                            {t("Edit")}
                        </button>
                    )}

                    {!isImageMessage && !isVoiceMessage && (
                        <button
                            type="button"
                            className="dropdown-item-custom"
                            onClick={(e) => {
                                e.stopPropagation();

                                onCopy?.();
                            }}
                        >
                            <i
                                className={
                                    copied
                                        ? "fa-solid fa-check"
                                        : "fa-regular fa-copy"
                                }
                            ></i>

                            {copied ? t("copied") : t("copy")}
                        </button>
                    )}

                    <button className="dropdown-item-custom">
                        <i className="fa-solid fa-trash"></i>
                        {t("DeleteforMe")}
                    </button>

                    <button className="dropdown-item-custom delete-item">
                        <i className="fa-solid fa-trash-can"></i>
                        {t("DeleteforEveryone")}
                    </button>
                </>
            ) : (
                <>
                    <button
                        type="button"
                        className="dropdown-item-custom"
                        onClick={(e) => {
                            e.stopPropagation();

                            onReply?.();
                        }}
                    >
                        {" "}
                        <i className="fa-solid fa-reply"></i>
                        {t("Reply")}
                    </button>

                    <button
                        type="button"
                        className="
        dropdown-item-custom
    "
                        onClick={() => onStar?.()}
                    >
                        <i
                            className={
                                isStarred
                                    ? "fa-solid fa-star"
                                    : "fa-regular fa-star"
                            }
                        ></i>

                        {isStarred ? t("removeStar") : t("starMessage")}
                    </button>

                    <button
                        type="button"
                        className="dropdown-item-custom"
                        onClick={(e) => {
                            e.stopPropagation();

                            onCopy?.();
                        }}
                    >
                        <i
                            className={
                                copied
                                    ? "fa-solid fa-check"
                                    : "fa-regular fa-copy"
                            }
                        ></i>

                        {copied ? t("copied") : t("copy")}
                    </button>

                    <button className="dropdown-item-custom">
                        <i className="fa-solid fa-trash"></i>
                        {t("delete")}
                    </button>
                </>
            )}

            {message.image && (
                <>
                    <button
                        className="dropdown-item-custom"
                        onClick={() => onViewImage(message.image)}
                    >
                        <i className="fa-regular fa-image"></i>
                        {t("View")}
                    </button>

                    <button
                        className="dropdown-item-custom"
                        onClick={() => onDownloadImage(message.image)}
                    >
                        <i className="fa-solid fa-download"></i>
                        {t("Download")}
                    </button>
                </>
            )}

            {/* Divider */}

            {/* Reactions */}
            <div className="reaction-bar">
                <button className="reaction-icon" onClick={() => onReact("👍")}>
                    👍
                </button>

                <button className="reaction-icon" onClick={() => onReact("❤️")}>
                    ❤️
                </button>

                <button className="reaction-icon" onClick={() => onReact("😂")}>
                    😂
                </button>

                <button className="reaction-icon" onClick={() => onReact("😍")}>
                    😍
                </button>

                <button className="reaction-icon" onClick={() => onReact("🥰")}>
                    🥰
                </button>

                <button className="reaction-icon" onClick={() => onReact("😘")}>
                    😘
                </button>

                <button className="reaction-icon" onClick={() => onReact("😭")}>
                    😭
                </button>

                <button className="reaction-icon" onClick={() => onReact("😢")}>
                    😢
                </button>

                <button className="reaction-icon" onClick={() => onReact("👎")}>
                    👎
                </button>

                <button className="reaction-icon" onClick={() => onReact("😡")}>
                    😡
                </button>

                <button className="reaction-icon" onClick={() => onReact("😯")}>
                    😯
                </button>

                <button className="reaction-icon" onClick={() => onReact("👏")}>
                    👏
                </button>
            </div>
        </div>
    );
};

export default MessageMenu;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./ChatUserProfile.css";

const ChatUserProfile = ({
    chat,
    goBack,
    favoriteIds,
    blockedIds,
    toggleFavorite,
    toggleBlock,
    toggleFriendRequest,
    removeFriend,
}) => {
    const { t } = useTranslation("chat");

    const [showFriendModal, setShowFriendModal] = useState(false);

    const [showBlockModal, setShowBlockModal] = useState(false);

    const [showUnblockModal, setShowUnblockModal] = useState(false);

    const isFavorite = favoriteIds.includes(chat.id);

    const isBlocked = blockedIds.includes(chat.id);

    return (
        <div className="chat-user-profile">
            {/* Header */}

            <div className="chat-user-header">
                <button
                    className="
                        chat-user-back-btn
                    "
                    onClick={goBack}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
            </div>

            {/* Info */}

            <div className="chat-user-top">
                <img
                    src={chat.image}
                    alt=""
                    className="
                        chat-user-avatar
                    "
                />

                <h3>{chat.name}</h3>

                <span>@{chat.username}</span>

                <p>{chat.bio || "No bio yet."}</p>
            </div>

            {/* Options */}

            <div className="chat-user-options">
                {/* Favorite */}

                <button
                    className="
        profile-action-btn
    "
                    onClick={() => toggleFavorite(chat.id)}
                >
                    <i
                        className={
                            isFavorite
                                ? "fa-solid fa-star"
                                : "fa-regular fa-star"
                        }
                    ></i>

                    {isFavorite
                        ? t("RemovefromFavorites")
                        : t("AddtoFavorites")}
                </button>

                {/* Friend */}

                <button
                    className="
        profile-action-btn
    "
                    onClick={() => {
                        if (chat.isFriend) {
                            setShowFriendModal(true);
                        } else {
                            toggleFriendRequest(chat.id);
                        }
                    }}
                >
                    <i
                        className={
                            chat.isFriend
                                ? "fa-solid fa-user-group"
                                : chat.isRequested
                                  ? "fa-solid fa-xmark"
                                  : "fa-solid fa-user-plus"
                        }
                    ></i>

                    {chat.isFriend
                        ? t("Friend")
                        : chat.isRequested
                          ? t("CancelRequest")
                          : t("AddFriend")}
                </button>

                {/* Block */}

                <button
                    className="
                        profile-action-btn
                    "
                    onClick={() => {
                        if (isBlocked) {
                            setShowUnblockModal(true);
                        } else {
                            setShowBlockModal(true);
                        }
                    }}
                >
                    <i className="fa-solid fa-ban"></i>
                    {isBlocked ? t("UnblockUser") : t("Block")}{" "}
                </button>
            </div>

            {showFriendModal && (
                <div className="modal-overlay">
                    <div className="block-modal">
                        <div className="block-modal-header">
                            <h5 className="text-center">{t("removeFriend")}</h5>
                        </div>

                        <p className="block-modal-text text-center">
                            {t("removeFriendConfirm")}

                            <b> {chat.name} </b>

                            {t("fromFriends")}
                        </p>

                        <div className="block-modal-actions">
                            <button
                                className="cancel-modal-btn"
                                onClick={() => setShowFriendModal(false)}
                            >
                                {t("Cancel")}
                            </button>

                            <button
                                className="confirm-block-btn"
                                onClick={() => {
                                    if (chat.isFriend) {
                                        removeFriend?.(chat.id);
                                    } else {
                                        toggleFriendRequest(chat.id);
                                    }

                                    setShowFriendModal(false);
                                }}
                            >
                                {t("removeFriend")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showBlockModal && (
                <div className="modal-overlay">
                    <div className="block-modal">
                        <div className="block-modal-header">
                            <h5 className="text-center">
                                {document.documentElement.dir === "rtl"
                                    ? `${isBlocked ? "إلغاء حظر" : "حظر"} ${chat?.name} ؟`
                                    : `${isBlocked ? "Unblock" : "Block"} ${chat?.name} ?`}
                            </h5>
                        </div>

                        <p className="block-modal-text text-center">
                            {t("blockUserMessage")}
                        </p>

                        <div className="block-modal-actions">
                            <button
                                className="cancel-modal-btn"
                                onClick={() => setShowBlockModal(false)}
                            >
                                {t("Cancel")}
                            </button>

                            <button
                                className="confirm-block-btn"
                                onClick={() => {
                                    toggleBlock(chat.id);

                                    setShowBlockModal(false);
                                }}
                            >
                                {isBlocked ? t("UnblockUser") : t("Block")}{" "}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showUnblockModal && (
                <div className="modal-overlay">
                    <div className="block-modal">
                        <div className="block-modal-header">
                            <h5 className="text-center">
                                {document.documentElement.dir === "rtl"
                                    ? `${t("UnblockUser")} ${chat?.name} ؟`
                                    : `${t("UnblockUser")} ${chat?.name} ?`}
                            </h5>
                        </div>

                        <p className="block-modal-text text-center">
                            {t("unblockUserMessage")}
                        </p>

                        <div className="block-modal-actions">
                            <button
                                className="cancel-modal-btn"
                                onClick={() => setShowUnblockModal(false)}
                            >
                                {t("Cancel")}
                            </button>

                            <button
                                className="confirm-block-btn"
                                onClick={() => {
                                    toggleBlock(chat.id);

                                    setShowUnblockModal(false);
                                }}
                            >
                                {t("UnblockUser")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatUserProfile;

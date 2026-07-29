import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Friends.css";

const Friends = ({ goBack, friends, removeFriend }) => {
    const { t } = useTranslation("friends");
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    return (
        <div className="friends-page">
            {/* Header */}

            <div className="friends-header">
                <button
                    className="
                        friends-back-btn
                    "
                    onClick={goBack}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                <h4>{t("friends")}</h4>
            </div>

            {friends.length > 0 ? (
                <div
                    className="
                        friends-list
                    "
                >
                    {friends.map((friend) => (
                        <div
                            key={friend.id}
                            className="
                                    friends-card
                                "
                        >
                            <div
                                className="
                                        friends-user
                                    "
                            >
                                <img src={friend.image} alt="" />

                                <div>
                                    <h6>{friend.name}</h6>

                                    <span>@{friend.username}</span>
                                </div>
                            </div>

                            <button
                                className="
                                        remove-friend-btn
                                    "
                                onClick={() => {
                                    setSelectedFriend(friend);

                                    setShowRemoveModal(true);
                                }}
                            >
                                {t("remove")}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="
                        friends-empty
                    "
                >
                    <i className="fa-solid fa-user-group"></i>

                    <p>{t("noFriends")}</p>
                </div>
            )}

            {showRemoveModal && selectedFriend && (
                <div
                    className="
                        modal-overlay
                    "
                >
                    <div
                        className="
                            confirm-modal
                        "
                    >
                        <h4>{t("removeFriend")}</h4>

                        <p>
                            {t("removeFriendConfirm")}

                            <b> {selectedFriend.name} </b>

                            {t("fromFriends")}
                        </p>

                        <div
                            className="
                                modal-actions
                            "
                        >
                            <button
                                className="
                                    cancel-btn
                                "
                                onClick={() => setShowRemoveModal(false)}
                            >
                                {t("cancel")}
                            </button>

                            <button
                                className="
                                    confirm-btn
                                    danger-btn
                                "
                                onClick={() => {
                                    removeFriend(selectedFriend.id);

                                    setShowRemoveModal(false);
                                }}
                            >
                                {t("remove")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Friends;

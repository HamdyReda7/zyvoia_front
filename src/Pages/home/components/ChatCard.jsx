import React, { useState } from "react";
import { useTranslation } from "react-i18next";


const ChatCard = ({ chat, onClick, toggleFriendRequest }) => {
        const { t } = useTranslation("chat");
    
    return (
        <div className="chat-card" onClick={onClick}>
            {/* Image */}

            <div className="chat-avatar-wrapper">
                <img src={chat.image} alt="" className="chat-avatar" />

                {chat.online && <span className="online-dot"></span>}
            </div>

            {/* Info */}

            <div className="chat-info">
                <div className="chat-top">
                    <div className="chat-name-box">
                        <h6>{chat.name}</h6>

                        {chat.isFriend ? (
                            <i
                                className="fa-solid fa-user-group friend-icon"
                                title="Friend"
                            ></i>
                        ) : chat.isRequested ? (
                            <i
                                className="fa-solid fa-xmark cancel-request-icon"
                                title="Cancel Request"
                                onClick={(e) => {
                                    e.stopPropagation();

                                    toggleFriendRequest(chat.id);
                                }}
                            ></i>
                        ) : (
                            <i
                                className="fa-solid fa-user-plus add-friend-icon"
                                title="Add Friend"
                                onClick={(e) => {
                                    e.stopPropagation();

                                    toggleFriendRequest(chat.id);
                                }}
                            ></i>
                        )}
                    </div>

                    <span>{chat.time}</span>
                </div>

                <div className="chat-bottom">
                    <p>
                        {chat.mineLast ? (
                            <>
                                <i className="fa-solid fa-check-double message-sent-icon"></i>
                                {t("Sent")}
                            </>
                        ) : (
                            t("Newmessage")
                        )}
                    </p>

                    {!chat.mineLast && chat.unread > 0 && (
                        <div className="unread-badge">{chat.unread}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatCard;

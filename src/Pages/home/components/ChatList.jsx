import React from "react";
import ChatCard from "./ChatCard";

const ChatList = ({ chats, onSelect, toggleFriendRequest }) => {
    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <ChatCard
                    key={chat.id}
                    chat={chat}
                    onClick={() => onSelect(chat)}
                    toggleFriendRequest={toggleFriendRequest}
                />
            ))}
        </div>
    );
};

export default ChatList;

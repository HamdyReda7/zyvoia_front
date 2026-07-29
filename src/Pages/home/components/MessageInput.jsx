import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MessageInput = ({
    replyMessage,
    setReplyMessage,
    messageInput,
    setMessageInput,
    editingMessage,
    setEditingMessage,
    handleSend,
    selectedImage,
    setSelectedImage,
    isRecording,
    audioUrl,
    startRecording,
    stopRecording,
    setAudioUrl,
    mediaRecorderRef,
    setIsRecording,
    sendVoiceMessage,
    voiceCanceledRef,
}) => {
    const { t } = useTranslation("chat");

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showAttachMenu, setShowAttachMenu] = useState(false);

    const fileInputRef = useRef(null);
    const inputRef = useRef(null);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setSelectedImage(URL.createObjectURL(file));
    };

    const emojis = [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "😂",
        "🤣",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😉",
        "😌",
        "😍",
        "🥰",
        "😘",
        "😗",
        "😙",
        "😚",
        "😋",
        "😛",
        "😝",
        "😜",
        "🤪",
        "🤨",
        "🧐",
        "🤓",
        "😎",
        "🥸",
        "🤩",
        "🥳",
        "😏",
        "😒",
        "😞",
        "😔",
        "😟",
        "😕",
        "🙁",
        "☹️",
        "😣",
        "😖",
        "😫",
        "😩",
        "🥺",
        "😢",
        "😭",
        "😤",
        "😠",
        "😡",
        "🤬",
        "😳",
        "🥵",
        "🥶",
        "😱",
        "😨",
        "😰",
        "😥",
        "😓",
        "🤗",
        "🤔",
        "🫣",
        "🤭",
        "🫢",
        "🫡",
        "🤫",
        "🫠",
        "🤥",
        "😶",
        "🫥",
        "😐",
        "🫤",
        "😑",
        "😬",
        "🙄",
        "😯",
        "😦",
        "😧",
        "😮",
        "😲",
        "🥱",
        "😴",
        "🤤",
        "😪",
        "😵",
        "🤯",
        "🤠",
        "🥴",
        "😵‍💫",
        "🤢",
        "🤮",
        "🤧",
        "😷",
        "🤒",
        "🤕",
        "🤑",
        "🤡",
        "👻",
        "💀",
        "☠️",
        "👽",
        "🤖",
        "🎃",
        "😺",
        "😸",
        "😹",
        "😻",
        "😼",
        "😽",
        "🙀",
        "😿",
        "😾",

        "👍",
        "👎",
        "👌",
        "✌️",
        "🤞",
        "🤟",
        "🤘",
        "🤙",
        "👋",
        "🖐️",
        "✋",
        "🖖",
        "👏",
        "🙌",
        "👐",
        "🤲",
        "🤝",
        "🙏",
        "✍️",
        "💪",
        "🦾",
        "🫶",
        "🖕",
        "👈",
        "👉",
        "👆",
        "👇",
        "☝️",
        "✊",
        "👊",
        "🤛",
        "🤜",

        "❤️",
        "🩷",
        "🧡",
        "💛",
        "💚",
        "💙",
        "🩵",
        "💜",
        "🖤",
        "🩶",
        "🤍",
        "🤎",
        "💔",
        "❣️",
        "💕",
        "💞",
        "💓",
        "💗",
        "💖",
        "💘",
        "💝",
        "💟",
        "♥️",
        "🔥",
        "✨",
        "⭐",
        "🌟",
        "💫",
        "⚡",
        "💥",
        "💯",

        "🌹",
        "🌸",
        "🌺",
        "🌷",
        "🌻",
        "🌼",
        "🌿",
        "🍀",
        "🌴",
        "🌵",
        "🌈",
        "☀️",
        "🌙",
        "⭐",
        "☁️",
        "⛈️",
        "❄️",
        "☃️",

        "🍎",
        "🍔",
        "🍕",
        "🌭",
        "🍟",
        "🍗",
        "🍖",
        "🥩",
        "🍣",
        "🍜",
        "🍩",
        "🍪",
        "🍫",
        "🍿",
        "🥤",
        "☕",
        "🍵",
        "🥛",

        "⚽",
        "🏀",
        "🏈",
        "⚾",
        "🎾",
        "🏐",
        "🎮",
        "🎧",
        "🎵",
        "🎤",
        "📱",
        "💻",
        "⌚",
        "📷",
        "🚗",
        "✈️",
        "🚀",

        "🎉",
        "🎊",
        "🎁",
        "🏆",
        "🥇",
        "🥈",
        "🥉",
        "💎",
        "💰",
        "🛒",
        "📌",
        "📢",
        "📣",
        "✔️",
        "❌",
        "⚠️",
        "❓",
        "❗",
    ];

    useEffect(() => {
        if ((editingMessage || replyMessage) && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingMessage, replyMessage]);

    return (
        <>
            {editingMessage && (
                <div className="reply-preview">
                    <div className="reply-content">
                        <span className="reply-label">
                            {t("Editingmessage")}
                        </span>

                        <p>{messageInput}</p>
                    </div>

                    <button
                        className="cancel-reply-btn"
                        onClick={() => {
                            setEditingMessage(null);

                            setMessageInput("");
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}

            {replyMessage && (
                <div className="reply-preview">
                    <div className="reply-content">
                        <span className="reply-label">{t("Replyingto")}</span>

                        <p>{replyMessage?.text}</p>
                    </div>

                    <button
                        className="cancel-reply-btn"
                        onClick={() => setReplyMessage(null)}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}

            {selectedImage && (
                <div className="image-preview-overlay">
                    <button
                        className="close-preview-btn"
                        onClick={() => {
                            setSelectedImage(null);

                            if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                            }
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <img src={selectedImage} alt="" className="preview-image" />

                    <button className="send-image-btn" onClick={handleSend}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            )}

            {isRecording && (
                <div className="voice-preview">
                    <button
                        className="cancel-voice"
                        onClick={() => {
                            voiceCanceledRef.current = true;

                            mediaRecorderRef.current?.stop();
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <span className="text-white">{t("Recording")}</span>

                    <button onClick={sendVoiceMessage} className="send-voice">
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            )}
            <div className="message-input-wrapper">
                <button
                    type="button"
                    className="
        input-icon-btn
    "
                    onClick={() => {
                        setShowAttachMenu(false);

                        setShowEmojiPicker((prev) => !prev);
                    }}
                >
                    <i className="fa-regular fa-face-smile"></i>
                </button>

                {showEmojiPicker && (
                    <div
                        className="
            emoji-picker
        "
                    >
                        {emojis.map((emoji, index) => (
                            <button
                                key={index}
                                type="button"
                                className="
                        emoji-btn
                    "
                                onClick={() => {
                                    setMessageInput((prev) => prev + emoji);
                                }}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    className="input-icon-btn"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <i className="fa-regular fa-image"></i>
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];

                        if (!file) return;

                        setSelectedImage(URL.createObjectURL(file));

                        setShowAttachMenu(false);
                        e.target.value = "";
                    }}
                />

                <input
                    type="text"
                    ref={inputRef}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder={t("typeMessage")}
                    className="message-input"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();

                            handleSend();
                        }
                    }}
                />

                <button
                    type="button"
                    className="input-icon-btn"
                    onClick={startRecording}
                >
                    <i className="fa-solid fa-microphone"></i>
                </button>
                <button className="send-btn" onClick={handleSend}>
                    {" "}
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </>
    );
};

export default MessageInput;

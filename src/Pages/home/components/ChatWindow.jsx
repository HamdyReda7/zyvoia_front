import React, { useState, useRef, useEffect } from "react";
import MessageInput from "./MessageInput";
import MessageMenu from "./MessageMenu";
import { useTranslation } from "react-i18next";

const ChatWindow = ({
  chat,
  goBack,
  favoriteIds,
  toggleFavorite,
  blockedIds,
  toggleBlock,
  toggleFriendRequest,
  chatMessages,
  setChatMessages,
  removeFriend,
  toggleStar,
  starredMessages,
  setShowChatProfile,
}) => {
  const { t } = useTranslation("chat");

  const isFavorite = favoriteIds.includes(chat?.id);
  const isBlocked = blockedIds.includes(chat?.id);

  const [showRemoveFriendModal, setShowRemoveFriendModal] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [activeMessageMenu, setActiveMessageMenu] = useState(null);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [replyMessage, setReplyMessage] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const [highlightedMessage, setHighlightedMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewImage, setViewImage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const recorder = new MediaRecorder(stream);

    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      if (voiceCanceledRef.current) {
        voiceCanceledRef.current = false;

        setAudioBlob(null);

        setAudioUrl(null);

        setIsRecording(false);

        return;
      }

      const blob = new Blob(chunksRef.current, {
        type: "audio/webm",
      });

      setAudioBlob(blob);

      setAudioUrl(URL.createObjectURL(blob));
      const voiceUrl = URL.createObjectURL(blob);

      const newMessage = {
        id: Date.now(),

        voice: voiceUrl,

        time: "Now",

        mine: true,

        seen: true,
      };

      setChatMessages((prev) => ({
        ...prev,

        [chat.id]: [...(prev[chat.id] || []), newMessage],
      }));

      setAudioUrl(null);

      setIsRecording(false);
    };

    recorder.start();

    mediaRecorderRef.current = recorder;

    setIsRecording(true);
  };

  const sendVoiceMessage = () => {
    mediaRecorderRef.current?.stop();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();

    setIsRecording(false);
  };

  const messages = chatMessages[chat?.id] || [];

  const searchInputRef = useRef(null);
  const meMessageRef = useRef(null);
  const otherMessageRef = useRef(null);
  const chatMenuRef = useRef(null);
  const messageMenuRef = useRef(null);
  const messageRefs = useRef({});
  const messagesAreaRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const voiceCanceledRef = useRef(false);
  const chunksRef = useRef([]);

  useEffect(() => {
    if (!searchText) return;

    const query = searchText.toLowerCase();

    const foundMessage = messages.find((msg) =>
      msg.text.toLowerCase().includes(query),
    );

    if (foundMessage) {
      if (foundMessage.mine) {
        meMessageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        otherMessageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [searchText, messages]);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatMenuRef.current && !chatMenuRef.current.contains(e.target)) {
        setShowChatMenu(false);
      }

      if (
        messageMenuRef.current &&
        !messageMenuRef.current.contains(e.target)
      ) {
        setActiveMessageMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
    }
  }, [chat?.id]);

  useEffect(() => {
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTo({
        top: messagesAreaRef.current.scrollHeight,

        behavior: "smooth",
      });
    }
  }, [messages.length]);

  const copyMessage = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(text);
    } catch (err) {
      console.log("Copy failed");
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");

    return text.replace(regex, '<span class="highlight-word">$1</span>');
  };

  const handleSend = () => {
    if (!messageInput.trim() && !selectedImage) return;
    if (editingMessage) {
      setChatMessages((prev) => ({
        ...prev,

        [chat.id]: (prev[chat.id] || []).map((msg) =>
          msg.id === editingMessage
            ? {
                ...msg,
                text: messageInput,
              }
            : msg,
        ),
      }));

      setEditingMessage(null);

      setMessageInput("");

      return;
    }

    const newMessage = {
      id: Date.now(),

      text: messageInput,
      image: selectedImage,

      time: "Now",

      mine: true,
      voice: audioUrl,
      seen: true,
      replyTo: replyMessage
        ? {
            id: replyMessage.id,
            text: replyMessage.text,
          }
        : null,
    };

    setChatMessages((prev) => ({
      ...prev,

      [chat.id]: [...(prev[chat.id] || []), newMessage],
    }));

    setMessageInput("");

    setReplyMessage(null);
    setSelectedImage(null);
    setAudioUrl(null);
  };

  const jumpToMessage = (id) => {
    const target = messageRefs.current[id];

    if (!target) return;

    setHighlightedMessage(null);

    setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setHighlightedMessage(id);

      setTimeout(() => {
        setHighlightedMessage(null);
      }, 2200);
    }, 10);
  };

  if (!chat) {
    return (
      <div className="empty-chat">
        <div className="empty-box">
          <i className="fa-solid fa-comments"></i>
          <h3>{t("selectChat")}</h3>
          <p>{t("startMessaging")}</p>
        </div>
      </div>
    );
  }

  const downloadImage = (imageUrl) => {
    const link = document.createElement("a");

    link.href = imageUrl;

    link.download = `image-${Date.now()}.jpg`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        {showSearch ? (
          <div className="chat-search-header">
            <button
              className="search-back-btn"
              onClick={() => {
                setShowSearch(false);

                setSearchText("");
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            <input
              ref={searchInputRef}
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={t("Search")}
              className="chat-search-input"
            />
          </div>
        ) : (
          <>
            <div className="chat-user">
              <button className="back-btn d-lg-none" onClick={goBack}>
                <i className="fa-solid fa-arrow-left"></i>
              </button>

              <div
                onClick={() => setShowChatProfile(true)}
                style={{
                  cursor: "pointer",
                }}
                className="d-flex gap-2 align-items-center"
              >
                <img src={chat.image} alt="" className="chat-header-avatar" />

                <div>
                  <h6>{chat.name}</h6>

                  <span>{chat.online ? t("online") : t("Lastseen")}</span>
                </div>
              </div>
            </div>

            <div className="chat-menu-wrapper" ref={chatMenuRef}>
              <button
                className="chat-menu-btn"
                onClick={() => setShowChatMenu(!showChatMenu)}
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>

              {showChatMenu && (
                <div className="chat-dropdown">
                  <button
                    className="dropdown-item-custom"
                    onClick={() => {
                      setShowSearch(true);

                      setShowChatMenu(false);
                    }}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                    {t("Searchchat")}
                  </button>

                  {/* Favorite */}

                  <button
                    className="dropdown-item-custom"
                    onClick={() => toggleFavorite(chat.id)}
                  >
                    <i
                      className={
                        isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"
                      }
                    ></i>

                    {isFavorite
                      ? t("RemovefromFavorites")
                      : t("AddtoFavorites")}
                  </button>

                  {/* Clear */}

                  <button className="dropdown-item-custom">
                    <i className="fa-solid fa-broom"></i>
                    {t("ClearChatContent")}
                  </button>

                  {/* Delete */}

                  <button className="dropdown-item-custom delete-item">
                    <i className="fa-solid fa-trash"></i>
                    {t("DeleteChat")}
                  </button>

                  {/* Friend */}

                  {chat?.isFriend ? (
                    <button
                      type="button"
                      className="dropdown-item-custom"
                      onClick={(e) => {
                        e.stopPropagation();

                        setShowRemoveFriendModal(true);
                      }}
                    >
                      <i className="fa-solid fa-user-group"></i>
                      {t("Friend")}
                    </button>
                  ) : chat?.isRequested ? (
                    <button
                      type="button"
                      className="dropdown-item-custom"
                      onClick={(e) => {
                        e.stopPropagation();

                        toggleFriendRequest(chat.id);
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                      {t("CancelRequest")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="dropdown-item-custom"
                      onClick={(e) => {
                        e.stopPropagation();

                        toggleFriendRequest(chat.id);
                      }}
                    >
                      <i className="fa-solid fa-user-plus"></i>
                      {t("AddFriend")}
                    </button>
                  )}

                  {/* Block */}

                  <button
                    className="dropdown-item-custom block-item"
                    onClick={() => {
                      setShowChatMenu(false);

                      if (isBlocked) {
                        setShowUnblockModal(true);
                      } else {
                        setShowBlockModal(true);
                      }
                    }}
                  >
                    <i className="fa-solid fa-ban"></i>

                    {isBlocked ? t("UnblockUser") : t("Block")}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {viewImage && (
        <div className="image-view-overlay">
          <button className="back-image-btn" onClick={() => setViewImage(null)}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <img src={viewImage} alt="" className="view-image" />

          <button
            className="download-image-btn"
            onClick={() => downloadImage(viewImage)}
          >
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
      )}
      {/* Messages */}
      <div ref={messagesAreaRef} className="messages-area">
        {" "}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-wrapper ${
              highlightedMessage === message.id ? "jump-highlight" : ""
            } ${message.mine ? "me-wrapper" : "other-wrapper"}`}
          >
            <div
              ref={(el) => (messageRefs.current[message.id] = el)}
              className={`message ${
                message.mine ? "me-message" : "other-message"
              }`}
              onClick={() =>
                setActiveMessageMenu(
                  activeMessageMenu === message.id ? null : message.id,
                )
              }
            >
              {message.replyTo && (
                <div
                  className="message-reply"
                  onClick={(e) => {
                    e.stopPropagation();

                    jumpToMessage(message.replyTo.id);
                  }}
                >
                  {" "}
                  <small>{t("Replyingto")}</small>
                  <p>{message.replyTo.text}</p>
                </div>
              )}

              {message.image && (
                <img src={message.image} alt="" className="chat-image" />
              )}

              {message.voice && <audio controls src={message.voice} />}

              <span
                dangerouslySetInnerHTML={{
                  __html: highlightText(message.text, searchText),
                }}
              ></span>

              {message.reaction && (
                <div
                  className="
            message-reaction
        "
                >
                  {message.reaction}
                </div>
              )}
            </div>

            {activeMessageMenu === message.id && (
              <div
                ref={messageMenuRef}
                className={`message-menu-box ${
                  message.mine ? "me-menu" : "other-menu"
                }`}
              >
                <MessageMenu
                  onStar={() => {
                    toggleStar?.(message);
                  }}
                  isStarred={starredMessages.some(
                    (item) => item.id === message.id,
                  )}
                  isMine={message.mine}
                  onCopy={async () => {
                    await copyMessage(message.text);

                    setCopiedMessageId(message.id);

                    setTimeout(() => {
                      setCopiedMessageId(null);
                    }, 1500);
                  }}
                  copied={copiedMessageId === message.id}
                  onReply={() => {
                    setReplyMessage(message);

                    setActiveMessageMenu(null);
                  }}
                  onEdit={() => {
                    setEditingMessage(message.id);

                    setMessageInput(message.text);

                    setActiveMessageMenu(null);
                  }}
                  onReact={(emoji) => {
                    setChatMessages((prev) => ({
                      ...prev,

                      [chat.id]: (prev[chat.id] || []).map((msg) =>
                        msg.id === message.id
                          ? {
                              ...msg,

                              reaction: emoji,
                            }
                          : msg,
                      ),
                    }));

                    setActiveMessageMenu(null);
                  }}
                  onViewImage={(image) => {
                    setViewImage(image);
                    setActiveMessageMenu(null);
                  }}
                  onDownloadImage={downloadImage}
                  message={message}
                />
              </div>
            )}

            <div className="message-info">
              <span className="message-time">{message.time}</span>

              {message.mine && message.seen && (
                <i className="fa-solid fa-check-double seen-icon"></i>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Input */}
      {/* Block Modal */}
      {showBlockModal && (
        <div className="modal-overlay">
          <div className="block-modal">
            {/* Header */}

            <div className="block-modal-header">
              <h5 className="text-center">
                {document.documentElement.dir === "rtl" ? (
                  <>
                    {t("Block")} <span dir="rtl">{chat?.name}</span> ؟
                  </>
                ) : (
                  <>
                    {t("Block")} {chat?.name} ?
                  </>
                )}
              </h5>
            </div>

            {/* Text */}

            <p className="block-modal-text text-center">
              {t("blockUserMessage")}
            </p>

            {/* Actions */}

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
                {t("Block")}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Unblock Modal */}
      {showUnblockModal && (
        <div className="modal-overlay">
          <div className="block-modal">
            {/* Header */}

            <div className="block-modal-header text-center">
              <h5>
                {document.documentElement.dir === "rtl"
                  ? `${isBlocked ? "إلغاء حظر" : "حظر"} ${chat?.name} ؟`
                  : `${isBlocked ? "Unblock" : "Block"} ${chat?.name} ?`}
              </h5>{" "}
            </div>

            {/* Text */}

            <p className="block-modal-text text-center">
              {t("unblockUserMessage")}
            </p>

            {/* Actions */}

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
      {isBlocked ? (
        <div className="blocked-chat-bar">
          <p>{t("blockedChatMessage")}</p>

          <button
            className="unblock-bar-btn"
            onClick={() => setShowUnblockModal(true)}
          >
            {t("UnblockUser")}
          </button>
        </div>
      ) : (
        <MessageInput
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          editingMessage={editingMessage}
          setEditingMessage={setEditingMessage}
          handleSend={handleSend}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isRecording={isRecording}
          audioUrl={audioUrl}
          startRecording={startRecording}
          stopRecording={stopRecording}
          setAudioUrl={setAudioUrl}
          mediaRecorderRef={mediaRecorderRef}
          setIsRecording={setIsRecording}
          sendVoiceMessage={sendVoiceMessage}
          voiceCanceledRef={voiceCanceledRef}
        />
      )}{" "}
      {showRemoveFriendModal && (
        <div className="modal-overlay">
          <div className="confirm-modal text-center">
            <h4>{t("removeFriend")}</h4>

            <p>
              {t("removeFriendConfirm")}

              <b> {chat.name} </b>

              {t("fromFriends")}
            </p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowRemoveFriendModal(false)}
              >
                {t("Cancel")}
              </button>

              <button
                className="
                        confirm-btn
                        danger-btn
                    "
                onClick={() => {
                  removeFriend(chat.id);

                  setShowRemoveFriendModal(false);

                  setShowChatMenu(false);
                }}
              >
                {t("removeFriend")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;

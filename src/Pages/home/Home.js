import React, { useState } from "react";
import "./Home.css";

import SidebarHeader from "./components/SidebarHeader";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import EmptyState from "./components/EmptyState";
import RequestCard from "./components/RequestCard";
import Profile from "../Profile/Profile";
import EditProfile from "../Profile/EditProfile";
import StarredMessages from "../StarredMessages/StarredMessages";
import Settings from "../Settings/Settings";
import BlockedAccounts from "../BlockedAccounts/BlockedAccounts";
import Friends from "../Friends/Friends";
import ChatUserProfile from "../ChatUserProfile/ChatUserProfile";
import { useTranslation } from "react-i18next";

const chats = [
    {
        id: 1,
        name: "Ahmed",
        username: "ahmed01",
        message: "Hey bro 👋",
        time: "10:45 PM",
        unread: 2,
        isFriend: true,
        image: "https://i.pravatar.cc/150?img=1",
        online: true,
    },

    {
        id: 2,
        name: "Marc",
        username: "mohamed_dev",
        message: "Please do not complete this platform.",
        bio: "lorem rgtrgrtgtrgtr ergg edgedfgtfe",
        time: "9:30 PM",
        unread: 0,
        isFriend: true,
        image: "img/images.webp",
        online: false,
        isFavorite: true,
    },

    {
        id: 243,
        name: "Haifa wehbe",
        username: "mohamed_dev",
        message: "ممكن ترد عليا وحشتني اوييي",
        bio: "lorem rgtrgrtgtrgtr ergg edgedfgtfe",
        time: "9:30 PM",
        unread: 0,
        isFriend: true,
        image: "img/images (1).webp",
        online: false,
        isFavorite: true,
    },

    {
        id: 3,
        name: "Sara",
        username: "sara22",
        message: "Where are you?",
        time: "7:20 PM",
        unread: 4,
        isFriend: false,
        image: "https://i.pravatar.cc/150?img=5",
        online: true,
    },

    {
        id: 4,
        name: "Omar",
        username: "omarx",
        message: "Let's play later",
        time: "6:15 PM",
        unread: 0,
        isFriend: true,
        image: "https://i.pravatar.cc/150?img=8",
        online: false,
    },
    {
        id: 5,
        name: "Hossam",
        username: "hossam",
        message: "Hey bro 👋",
        time: "10:45 PM",
        unread: 2,
        isFriend: true,
        image: "https://i.pravatar.cc/150?img=12",
        online: true,
    },

    {
        id: 6,
        name: "Ayman",
        username: "aymen",
        message: "See you tomorrow",
        time: "9:30 PM",
        unread: 0,
        isFriend: true,
        image: "https://i.pravatar.cc/150?img=7",
        online: false,
        isFavorite: true,
    },

    {
        id: 7,
        name: "Zeyad",
        username: "zeyad",
        message: "Where are you?",
        time: "7:20 PM",
        unread: 4,
        isFriend: false,
        image: "https://i.pravatar.cc/150?img=13",
        online: true,
    },

    {
        id: 8,
        name: "Reda",
        username: "reda",
        message: "Let's play later",
        time: "6:15 PM",
        unread: 0,
        isFriend: true,
        image: "https://i.pravatar.cc/150?img=11",
        online: false,
    },
    {
        id: 1001,

        name: "Sarah Ahmed",

        username: "sarah_ahmed",

        image: "https://i.pravatar.cc/300?img=15",

        online: true,

        message: "Sent you a friend request",

        time: "2m",

        unread: 0,

        isFriend: false,

        isRequested: true,
    },

    {
        id: 1002,

        name: "salma Ali",

        username: "salma_ali",

        image: "https://i.pravatar.cc/300?img=20",

        online: false,

        message: "Sent you a friend request",

        time: "1h",

        unread: 0,

        isFriend: false,

        isRequested: true,
    },

    {
        id: 1003,

        name: "Lina Hassan",

        username: "lina_hassan",

        image: "https://i.pravatar.cc/300?img=30",

        online: true,

        message: "Sent you a friend request",

        time: "5h",

        unread: 0,

        isFriend: false,

        isRequested: true,
    },
];

const users = [
    {
        id: 9,
        name: "Hamdy Reda",
        username: "hamdyreda",
        image: "https://i.pravatar.cc/150?img=8",
        isFriend: false,
        isRequested: false,
    },

    {
        id: 10,
        name: "Reham Mohamed",
        username: "rehamemohamed",
        image: "https://i.pravatar.cc/150?img=9",
        isFriend: false,
        isRequested: false,
    },
];

const Home = ({ theme, setTheme }) => {
    const { t } = useTranslation("home");
    const [blockedIds, setBlockedIds] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [chatList, setChatList] = useState(chats);
    const [showProfile, setShowProfile] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showStarred, setShowStarred] = useState(false);
    const [starredMessages, setStarredMessages] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [showBlockedAccounts, setShowBlockedAccounts] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const [showChatProfile, setShowChatProfile] = useState(false);

    const [currentUser, setCurrentUser] = useState({
        image: "https://i.pravatar.cc/300",

        name: "Hamdy Reda",

        username: "hamdy_reda",

        email: "hamdy@gmail.com",

        bio: "Full Stack developer and coffee lover ☕",
    });

    const [chatMessages, setChatMessages] = useState({
        243: [
            // {
            //     id: 1,
            //     text: "Hello Ahmed 👋",
            //     time: "10:45 PM",
            //     mine: true,
            //     seen: true,
            // },
            {
                id: 2,
                text: "ممكن ترد عليا وحشتني اوييي",
                time: "10:47 PM",
                mine: false,
                seen: false,
            },
        ],

        2: [
            {
                id: 3,
                text: "Hello Mark, fuck you first and fuck WhatsApp. My name is Hamdi Reda, remember this name well. Hello Mark, fuck you first and fuck WhatsApp. My name is Hamdi Reda, remember this name well. Hello Mark, fuck you first and fuck WhatsApp. My name is Hamdi Reda, remember this name well. Hello Mark, fuck you first and fuck WhatsApp. My name is Hamdi Reda, remember this name well. Hello Mark, fuck you first and fuck WhatsApp. My name is Hamdi Reda, remember this name well. Hello Mark, fuck you first and fuck WhatsApp. My name is Hamdi Reda, remember this name well.",
                time: "9:30 PM",
                mine: false,
                seen: false,
            },
        ],
    });

    const toggleFavorite = (id) => {
        setFavoriteIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const toggleBlock = (id) => {
        setBlockedIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const toggleFriendRequest = (id) => {
        setChatList((prev) => {
            const exists = prev.find((chat) => chat.id === id);

            if (exists) {
                return prev.map((chat) =>
                    chat.id === id
                        ? {
                              ...chat,

                              isRequested: !chat.isRequested,
                          }
                        : chat,
                );
            }

            const user = users.find((u) => u.id === id);

            if (!user) return prev;

            return [
                ...prev,
                {
                    ...user,
                    isRequested: true,
                },
            ];
        });
    };

    const removeFriend = (id) => {
        setChatList((prev) =>
            prev.map((chat) =>
                chat.id === id
                    ? {
                          ...chat,

                          isFriend: false,

                          isRequested: false,
                      }
                    : chat,
            ),
        );
    };

    // const acceptFriendRequest = (id) => {
    //     setChatList((prev) =>
    //         prev.map((chat) =>
    //             chat.id === id
    //                 ? {
    //                       ...chat,
    //                       isFriend: true,
    //                       isRequested: false,
    //                   }
    //                 : chat,
    //         ),
    //     );
    // };

    const handleAcceptRequest = (id) => {
        setChatList((prev) =>
            prev.map((user) =>
                user.id === id
                    ? {
                          ...user,

                          isRequested: false,

                          isFriend: true,
                      }
                    : user,
            ),
        );
    };

    const handleDeclineRequest = (id) => {
        setChatList((prev) =>
            prev.map((user) =>
                user.id === id
                    ? {
                          ...user,

                          isRequested: false,
                      }
                    : user,
            ),
        );
    };

    const toggleStar = (message) => {
        setStarredMessages((prev) => {
            const exists = prev.some((item) => item.id === message.id);

            if (exists) {
                return prev.filter((item) => item.id !== message.id);
            }

            return [
                ...prev,

                {
                    ...message,

                    sender: selectedChat?.name,

                    image: selectedChat?.image,
                },
            ];
        });
    };

    const requests = chatList.filter((chat) => chat.isRequested);
    const friends = chatList.filter((chat) => chat.isFriend);

    const unreadChats = chatList.filter((chat) => chat.unread > 0);

    const favoriteChats = chatList.filter((chat) =>
        favoriteIds.includes(chat.id),
    );

    const blockedChats = chatList.filter((chat) =>
        blockedIds.includes(chat.id),
    );

    const filteredBlocked = blockedChats.filter(
        (chat) =>
            chat.name.toLowerCase().includes(search.toLowerCase()) ||
            chat.username.toLowerCase().includes(search.toLowerCase()),
    );

    const mergedUsers = [
        ...chatList,
        ...users
            .filter((user) => !chatList.some((chat) => chat.id === user.id))
            .map((user) => {
                const updated = chatList.find((c) => c.id === user.id);

                return updated || user;
            }),
    ];

    // const filteredUsers = mergedUsers.filter(
    //     (user) =>
    //         user.name.toLowerCase().includes(search.toLowerCase()) ||
    //         user.username.toLowerCase().includes(search.toLowerCase()),
    // );

    const chatsWithLastMessage = mergedUsers
        .map((user) => {
            const msgs = chatMessages?.[user.id] || [];

            const lastMessage = msgs[msgs.length - 1];

            return {
                ...user,

                hasChat: msgs.length > 0,

                message: lastMessage?.text || "",

                time: lastMessage?.time || "",

                unread: msgs.filter((m) => !m.mine && !m.seen).length,

                mineLast: lastMessage?.mine,

                lastMessageId: lastMessage?.id || 0,
            };
        })

        .filter((user) => user.hasChat)

        .sort((a, b) => b.lastMessageId - a.lastMessageId);

    const filteredAllChats = search
        ? mergedUsers.filter(
              (user) =>
                  user.name.toLowerCase().includes(search.toLowerCase()) ||
                  user.username.toLowerCase().includes(search.toLowerCase()),
          )
        : chatsWithLastMessage;
    const filteredFriends = friends.filter(
        (chat) =>
            chat.name.toLowerCase().includes(search.toLowerCase()) ||
            chat.username.toLowerCase().includes(search.toLowerCase()),
    );

    const filteredUnread = unreadChats.filter(
        (chat) =>
            chat.name.toLowerCase().includes(search.toLowerCase()) ||
            chat.username.toLowerCase().includes(search.toLowerCase()),
    );

    const filteredFavorites = favoriteChats.filter(
        (chat) =>
            chat.name.toLowerCase().includes(search.toLowerCase()) ||
            chat.username.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="home-page">
            {/* Sidebar */}

            <div
                className={`sidebar ${
                    selectedChat && !showProfile && !showStarred
                        ? "mobile-hide"
                        : ""
                }`}
            >
                {" "}
                {showSettings ? (
                    showFriends ? (
                        <Friends
                            goBack={() => setShowFriends(false)}
                            friends={chatList.filter((user) => user.isFriend)}
                            removeFriend={removeFriend}
                        />
                    ) : showBlockedAccounts ? (
                        <BlockedAccounts
                            goBack={() => setShowBlockedAccounts(false)}
                            blockedUsers={chatList.filter((user) =>
                                blockedIds.includes(user.id),
                            )}
                            unblockUser={toggleBlock}
                        />
                    ) : (
                        <Settings
                            goBack={() => setShowSettings(false)}
                            openProfile={() => {
                                setShowSettings(false);

                                setShowProfile(true);
                            }}
                            openFriends={() => setShowFriends(true)}
                            openBlocked={() => setShowBlockedAccounts(true)}
                            blockedCount={blockedIds.length}
                            currentUser={currentUser}
                            theme={theme}
                            setTheme={setTheme}
                        />
                    )
                ) : showProfile ? (
                    showEditProfile ? (
                        <EditProfile
                            goBack={() => setShowEditProfile(false)}
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                        />
                    ) : (
                        <Profile
                            goBack={() => setShowProfile(false)}
                            onEdit={() => setShowEditProfile(true)}
                            currentUser={currentUser}
                        />
                    )
                ) : showStarred ? (
                    <StarredMessages
                        goBack={() => setShowStarred(false)}
                        starredMessages={starredMessages}
                        removeStar={(id) => {
                            setStarredMessages((prev) =>
                                prev.filter((item) => item.id !== id),
                            );
                        }}
                    />
                ) : (
                    <>
                        <SidebarHeader
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                            search={search}
                            setSearch={setSearch}
                            setShowProfile={setShowProfile}
                            setSelectedChat={setSelectedChat}
                            setShowStarred={setShowStarred}
                            setShowSettings={setShowSettings}
                        />

                        {/* ALL */}

                        {activeFilter === "all" &&
                            (filteredAllChats.length > 0 ? (
                                <ChatList
                                    chats={filteredAllChats}
                                    onSelect={(chat) => {
                                        const existingChat = chatList.find(
                                            (c) => c.id === chat.id,
                                        );

                                        setSelectedChat(existingChat || chat);
                                    }}
                                    toggleFriendRequest={toggleFriendRequest}
                                />
                            ) : (
                                <EmptyState
                                    icon="fa-regular fa-comments"
                                    title={t("noChats")}
                                    subtitle={t("startConversation")}
                                />
                            ))}

                        {/* FRIENDS */}

                        {activeFilter === "friends" &&
                            (friends.length > 0 ? (
                                <ChatList
                                    chats={filteredFriends}
                                    onSelect={setSelectedChat}
                                    toggleFriendRequest={toggleFriendRequest}
                                />
                            ) : (
                                <EmptyState
                                    icon="fa-solid fa-user-group"
                                    title={t("noFriends")}
                                    subtitle={t("startAddingFriends")}
                                />
                            ))}

                        {/* UNREAD */}

                        {activeFilter === "unread" &&
                            (unreadChats.length > 0 ? (
                                <ChatList
                                    chats={filteredUnread}
                                    onSelect={setSelectedChat}
                                    toggleFriendRequest={toggleFriendRequest}
                                />
                            ) : (
                                <EmptyState
                                    icon="fa-solid fa-envelope-open"
                                    title={t("noUnread")}
                                    subtitle={t("allCaughtUp")}
                                />
                            ))}

                        {/* FAVORITES */}

                        {activeFilter === "favorites" &&
                            (filteredFavorites.length > 0 ? (
                                <ChatList
                                    chats={filteredFavorites}
                                    onSelect={setSelectedChat}
                                    toggleFriendRequest={toggleFriendRequest}
                                />
                            ) : (
                                <EmptyState
                                    icon="fa-solid fa-star"
                                    title={t("noFavoritesFound")}
                                    subtitle={t("addFavorites")}
                                />
                            ))}

                        {/* REQUESTS */}

                        {activeFilter === "requests" &&
                            (requests.length > 0 ? (
                                requests.map((request) => (
                                    <RequestCard
                                        key={request.id}
                                        requests={request}
                                        onAccept={handleAcceptRequest}
                                        onDecline={handleDeclineRequest}
                                    />
                                ))
                            ) : (
                                <EmptyState
                                    icon="fa-solid fa-user-plus"
                                    title={t("noRequests")}
                                    subtitle={t("noRequestsSubtitle")}
                                />
                            ))}

                        {/* BLOCKED */}

                        {activeFilter === "blocked" &&
                            (filteredBlocked.length > 0 ? (
                                <ChatList
                                    chats={filteredBlocked}
                                    onSelect={setSelectedChat}
                                    toggleFriendRequest={toggleFriendRequest}
                                />
                            ) : (
                                <EmptyState
                                    icon="fa-solid fa-ban"
                                    title={t("noBlocked")}
                                    subtitle={t("blockedSubtitle")}
                                />
                            ))}
                    </>
                )}
            </div>

            {/* Chat */}

            <div
                className={`chat-section ${
                    !selectedChat && !showProfile && !showStarred
                        ? "mobile-chat-hide"
                        : ""
                } ${
                    selectedChat && !showProfile && !showStarred
                        ? "mobile-chat-show"
                        : ""
                }`}
            >
                {showSettings ? (
                    <div className="empty-chat">
                        <div className="empty-box">
                            <i className="fa-solid fa-gear"></i>

                            <h3>{t("settings")}</h3>
                        </div>
                    </div>
                ) : showProfile ? (
                    <div className="empty-chat">
                        <div className="empty-box">
                            <i className="fa-solid fa-user"></i>

                            <h3>{t("profile")}</h3>
                        </div>
                    </div>
                ) : showStarred ? (
                    <div className="empty-chat">
                        <div className="empty-box">
                            <i className="fa-regular fa-star"></i>

                            <h3>{t("starredMessages")}</h3>
                        </div>
                    </div>
                ) : selectedChat ? (
                    showChatProfile ? (
                        <ChatUserProfile
                            chat={
                                chatList.find(
                                    (item) => item.id === selectedChat?.id,
                                ) || selectedChat
                            }
                            goBack={() => setShowChatProfile(false)}
                            favoriteIds={favoriteIds}
                            blockedIds={blockedIds}
                            toggleFavorite={toggleFavorite}
                            toggleBlock={toggleBlock}
                            toggleFriendRequest={toggleFriendRequest}
                            removeFriend={removeFriend}
                        />
                    ) : (
                        <ChatWindow
                            chat={
                                chatList.find(
                                    (item) => item.id === selectedChat?.id,
                                ) || selectedChat
                            }
                            goBack={() => setSelectedChat(null)}
                            favoriteIds={favoriteIds}
                            toggleFavorite={toggleFavorite}
                            blockedIds={blockedIds}
                            toggleBlock={toggleBlock}
                            toggleFriendRequest={toggleFriendRequest}
                            chatMessages={chatMessages}
                            setChatMessages={setChatMessages}
                            removeFriend={removeFriend}
                            toggleStar={toggleStar}
                            starredMessages={starredMessages}
                            setShowChatProfile={setShowChatProfile}
                        />
                    )
                ) : (
                    <div className="empty-chat">
                        <div className="empty-box">
                            <i className="fa-regular fa-comments"></i>

                            <h3>{t("selectchat")}</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

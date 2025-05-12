import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create(
    persist(
        (set, get) => ({
            messages: [],
            users: [],
            selectedUser: null,
            isUserLoading: false,
            isMessagesLoading: false,
            lastMessageMap: {},

            getUsers: async () => {
                set({ isUserLoading: true });
                try {
                    const res = await axiosInstance.get("/messages/users");
                    const users = res.data;

                    set({ users });

                    // ✅ Rebuild lastMessageMap with unread counts
                    const currentUserId = useAuthStore.getState().authUser?._id;
                    const resMap = {};

                    for (const user of users) {
                        const lastMsg = user.lastMessage;
                        const unreadCount = user.unreadCount || 0;

                        if (!lastMsg) continue;

                        const otherUserId = user._id;
                        const isUnread = unreadCount > 0;

                        resMap[otherUserId] = {
                            timestamp: Date.parse(lastMsg.createdAt || new Date()),
                            unreadCount: isUnread ? unreadCount : 0,
                        };
                    }

                    set({ lastMessageMap: resMap });

                } catch (err) {
                    console.log("GET /messages/users failed:", err);
                    toast.error(err.response?.data?.message || "Failed to load users");
                } finally {
                    set({ isUserLoading: false });
                }
            },

            getMessages: async () => {
                const { selectedUser } = get();
                if (!selectedUser?._id) return;

                set({ isMessagesLoading: true });

                try {
                    const res = await axiosInstance.get(`/messages/${selectedUser._id}`);
                    const messageList = res.data;

                    set({ messages: messageList });

                    // ✅ Set last message in the map (for sorting)
                    if (messageList.length > 0) {
                        const lastMsg = messageList[messageList.length - 1];
                        get().setLastMessage(lastMsg);
                    }

                    // ✅ Clear unread count since user opened chat
                    get().clearUnread(selectedUser._id);

                } catch (err) {
                    console.log("GET /messages/:id failed:", err);
                    toast.error(err.response?.data?.message || "Failed to load messages");
                } finally {
                    set({ isMessagesLoading: false });
                }
            },

            sendMessage: async (messageData) => {
                const { selectedUser, messages } = get();
                try {
                    const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
                    set({ messages: [...messages, res.data] });
                    get().setLastMessage(res.data);
                    get().clearUnread(selectedUser._id);
                } catch (err) {
                    toast.error(err.response?.data?.message || "Failed to send message");
                }
            },

            suscribeToMessages: () => {
                const socket = useAuthStore.getState().socket;
                if (!socket) return;

                socket.off("newMessage");

                socket.on("newMessage", (newMessage) => {
                    const { selectedUser, messages } = get();

                    get().setLastMessage(newMessage);

                    const isRelevant =
                        selectedUser?._id === newMessage.senderId ||
                        selectedUser?._id === newMessage.receiverId;

                    if (isRelevant) {
                        set({ messages: [...messages, newMessage] });
                    }
                });
            },

            unSuscribeFromMessages: () => {
                const socket = useAuthStore.getState().socket;
                if (socket) socket.off("newMessage");
            },

            setLastMessage: (message) => {
                const { lastMessageMap, selectedUser } = get();
                const currentUserId = useAuthStore.getState().authUser?._id;
                if (!currentUserId) return;

                const otherUserId =
                    message.senderId === currentUserId ? message.receiverId : message.senderId;

                const isFromOtherUser = message.senderId !== currentUserId;
                const isChatOpenWithSender = selectedUser?._id === otherUserId;

                const isUnread = isFromOtherUser && !isChatOpenWithSender;

                set({
                    lastMessageMap: {
                        ...lastMessageMap,
                        [otherUserId]: {
                            timestamp: Date.parse(message.createdAt || new Date()),
                            unreadCount: isUnread
                                ? (lastMessageMap[otherUserId]?.unreadCount || 0) + 1
                                : lastMessageMap[otherUserId]?.unreadCount || 0, // keep same if not unread
                        },
                    },
                });
            },


            clearUnread: (userId) => {
  set((state) => {
    const map = { ...state.lastMessageMap };
    if (map[userId]) {
      map[userId].unreadCount = 0;
    }
    return { lastMessageMap: map };
  });
},

            setSelectedUser: (user) => {
                set({ selectedUser: user });
                get().getMessages(); // Auto-load messages when selected
            }
        }),
        {
            name: "chat-storage",
        }
    )
);

const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const userSocketMap = {}; // { userId: socketId }

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL],
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("🔌 user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log("✅ Registered userId:", userId);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("❌ user disconnected", socket.id);

        for (const [id, sId] of Object.entries(userSocketMap)) {
            if (sId === socket.id) {
                delete userSocketMap[id];
                break;
            }
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

module.exports = {
    app,
    server,
    io,
    getReceiverSocketId,
};

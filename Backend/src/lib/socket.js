const http = require('http');
const express = require('express');
const { Server } = require('socket.io');  // ✅ Corrected line

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL]
    }
});

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});

module.exports = {
    io,
    server,
    app
};

const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const cors = require('cors')

const messageRoutes = require('./routes/message.route.js');
const authRoutes = require('./routes/auth.route.js');
const connectDB = require('./lib/db.js');
const {app, server } = require('./lib/socket.js');

PORT = process.env.PORT || 5001;

dotenv.config()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
}); 

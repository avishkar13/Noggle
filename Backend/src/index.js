const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const path = require('path');

const messageRoutes = require('./routes/message.route.js');
const authRoutes = require('./routes/auth.route.js');
const connectDB = require('./lib/db.js');
const {app, server } = require('./lib/socket.js');

const PORT = process.env.PORT || 5001;


dotenv.config()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    })
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
}); 

const User = require("../models/user.model.js");
const Message = require("../models/message.model.js");
const cloudinary = require("../lib/cloudinary.js");
const { io, getReceiverSocketId } = require("../lib/socket.js");


const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        const usersWithExtras = await Promise.all(users.map(async (user) => {
            const userId = user._id.toString();

            // 1. Fetch the latest message between logged-in user and this user
            const lastMessage = await Message.findOne({
                $or: [
                    { senderId: loggedInUserId, receiverId: userId },
                    { senderId: userId, receiverId: loggedInUserId }
                ]
            }).sort({ createdAt: -1 }).lean();

            // 2. Count unread messages from this user to the logged-in user
            const unreadCount = await Message.countDocuments({
                senderId: userId,
                receiverId: loggedInUserId,
                seen: false
            });

            return {
                ...user.toObject(),
                lastMessage: lastMessage || null,
                unreadCount
            };
        }));

        res.status(200).json(usersWithExtras);
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getmessages = async (req, res) => {
    try {
        const { id: userTochatId } = req.params;
        const MyId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: MyId, receiverId: userTochatId },
                { senderId: userTochatId, receiverId: MyId }
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            //upload base64 image to cloudinary and get the url
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // Create the new message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();

        // Get timestamp and unread count for the emitted message
        const timestamp = new Date().toISOString();
        const unreadCount = 0; // Initialize unread count as 0 for the sender's first message

        // Realtime message sending using socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // Send the full message data with timestamp and unreadCount
            io.to(receiverSocketId).emit("newMessage", { ...newMessage.toObject(), timestamp, unreadCount });
        }

        // Send the new message as the response with timestamp and unreadCount for the sender
        res.status(200).json({ ...newMessage.toObject(), timestamp, unreadCount });

    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    getUsersForSidebar,
    getmessages,
    sendMessage
}
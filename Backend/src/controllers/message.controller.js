const User = require("../models/user.model.js");
const Message = require("../models/message.model.js");


const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id; 
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    }catch (error) {
        console.error("Error fetching users for sidebar:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getmessages = async (req, res) => {   
     try{
        const { id:userTochatId } = req.params;
        const MyId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId:MyId, receiverId: userTochatId },
                { senderId: userTochatId, receiverId: MyId }
            ]
        })

        res.status(200).json(messages);
     }catch{
        console.error("Error fetching messages:", error);
        return res.status(500).json({ message: "Internal server error" });
     }
}

const sendMessage = async (req, res) => {
     try{
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            //upload base64 image to cloudinary and get the url
            const uploadResponse = await cloudinar.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId, 
            text,   
            image: imageUrl
        })
        await newMessage.save();

        //Realtime message sending using socket.io


        res.status(200).json(newMessage);

     }catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Internal server error" });
     }  
}


module.exports = {
    getUsersForSidebar,
    getmessages,
    sendMessage
}
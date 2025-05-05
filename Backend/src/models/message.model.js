const mongoose = require('mongoose');
const { image } = require('../lib/cloudinary');

const messageSchema = new mongoose.Schema({ 
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    
} , { timestamps: true });


module.exports = mongoose.model('Message', messageSchema);
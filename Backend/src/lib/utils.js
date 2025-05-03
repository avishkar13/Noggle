const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.cookie("jwt",token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Set to true if using HTTPS
        sameSite: 'strict', 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });
    return token; // Return the token if needed for further processing
}



module.exports = {
    generateToken
}
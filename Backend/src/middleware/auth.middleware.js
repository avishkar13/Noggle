const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ message: "Unauthorized, no token" });
        }
        const user = await User.findById(decoded.userId).select("-password -__v");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized, no user" });
        }

        req.user = user;
        next(); // Call the next middleware or route handler


    }catch (error) {
        return res.status(500).json({ message: "Server error!" });
    }

};


module.exports = protectRoute;


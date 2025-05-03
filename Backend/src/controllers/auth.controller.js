const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../lib/utils.js");



const signup = async (req, res) => {
  const {fullName,email,password} = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser) {
            //JWT Token
            generateToken(newUser._id,res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                // token: generateToken(newUser._id,res)
                profilePic: newUser.profilePic,
             });
        }else {
            return res.status(400).json({ message: "User not created! Invalid Credentials." });
        }

   } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}


const login = (req, res) => {
    res.send("login Route");
}

const logout = (req, res) => {
    res.send("logout Route");
}


module.exports = {
    signup,
    login,
    logout
  };
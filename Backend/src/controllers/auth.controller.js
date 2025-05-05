const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../lib/utils.js");
const cloudinary = require("../lib/cloudinary.js");


const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        if (password.length < 6) {
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

        if (newUser) {
            //JWT Token
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                // token: generateToken(newUser._id,res)
                profilePic: newUser.profilePic,
            });
        } else {
            return res.status(400).json({ message: "User not created! Invalid Credentials." });
        }

    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

const login = (req, res) =>  {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        // Check if user exists
        User.findOne({ email })
            .then(async (user) => {
                if (!user) {
                    return res.status(400).json({ message: "User not found" });
                }
                // Check password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }
                //JWT Token
                generateToken(user._id, res);
                return res.status(200).json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    profilePic: user.profilePic,
                });
            })

    } catch (error) {
        return res.status(500).json({ message: "Server error!" });
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie("jwt", { path: "/" });
        res.status(200).json({ message: "Logged out successfully" });
        // res.redirect("/login");
    } catch (error) {
        return res.status(500).json({ message: "Server error!" });
    }

}

const updateProfile = async (req, res) => {
    try{
        const { profilePic } = req.body;
        const userId = req.user._id;
        if (!profilePic) {
            return res.status(400).json({ message: "Profile Picture is Required" });
        }

        // Upload image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        // Update user profile picture in database
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
        res.status(200).json(updatedUser);

    }catch (error) {
        return res.status(500).json({ message: "Server error!" });
    }
}

const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    }catch (error) {
        return res.status(500).json({ message: "Server error!" });
    }
}



module.exports = {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth
};
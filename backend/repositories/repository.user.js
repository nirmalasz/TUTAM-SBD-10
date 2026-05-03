const bcrypt = require('bcrypt');
const User = require("../models/UserModel");
const Whisper = require("../models/WhisperModel");

async function addUser(req, res) {
    try {
        const { username, displayName, email, password } = req.body;

        const user = new User({ 
            username: username, 
            displayName: displayName, 
            email: email, 
            password: password 
        });
        
        await user.save();

        res.status(201).json({ success: true, message: "Successfully Registered User", data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email: email });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid Password");

        res.status(200).json({ 
            success: true, 
            message: "Found user", 
            data: {
                id: user._id,
                username: user.username,
                displayName: user.displayName
            } 
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}


async function getAllUser(req, res) {
    try {
        // get semua user dan sort berdasarkan UpdatedAt dengan descending order
        let result = await  User.find().sort({ updatedAt:-1});
        // kirimkan response dengan status 200
        res
            .status(200)
            .json({success:"true", message: "Successfully get all users", data: result});
    } catch (err) {
        // kirimkan response dengan status 400
        res.status(400);
        console.log(err);
    }
}

async function getUserById(req, res) {
    try {
        const { userId } = req.params;
        let user = await User.findOne({_id: userId});
        if(!user) throw new Error("User not found");
        // get user berdasarkan id di param
        // jika user tidak ditemukan throw error
        // kirimkan response dengan status 200
        res
            .status(200)
            .json({success:"true", message: `Found user with id ${userId}`, data: user});
    } catch (err) {
        // kirimkan response dengan status 400
        res.status(400);
        console.log(err);
    }
}

async function getUserWhispers(req, res){
    try {
        const { userId } = req.params;
        const whispers = await Whisper
            .find({owner: userId})
            .sort({upatedAt:-1})
            .populate("owner")
            .populate({
                path: "comments",
                populate: {
                    path: "author"
                }
            });
        res
            .status(200)
            .json({success:"true", message: "Successfully get user whispers", data: scores});
    } catch (err) {
        res.status(400);
        console.log(err);
    }
}

const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username: username });
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


module.exports = {
    addUser,
    login,
    getAllUser,
    getUserById,
    getUserWhispers,
    getUserByUsername,
}
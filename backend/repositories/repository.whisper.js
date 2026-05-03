const User = require("../models/UserModel");
const Whisper = require("../models/WhisperModel");


// 5. Post Whisper
async function postWhisper(req, res) {
    try {
        // targetOwnerId: The user whose page is being visited
        // senderId: The ID of the person typing (if logged in, otherwise null)
        // senderName: Derived from the frontend ("anon" or their Display Name)
        const { targetOwnerId, content, senderId, senderName } = req.body;

        // Only non page owner can send the whisper
        if (senderId && senderId === targetOwnerId) {
            throw new Error("You cannot send a whisper to your own page.");
        }

        let targetUser = await User.findById(targetOwnerId);
        if (!targetUser) throw new Error("Target page owner not found");

        const whisper = new Whisper({
            owner: targetOwnerId, 
            content: content,
            senderName: senderName || "anon" 
        });

        await whisper.save();

        res.status(201).json({ success: true, message: "Whisper successfully sent", data: whisper });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

// 6. Answer to Whisper
async function answerWhisper(req, res) {
    try {
        const { whisperId, userId, replyText } = req.body;

        let whisper = await Whisper.findById(whisperId);
        if (!whisper) throw new Error("Whisper not found");

        // Only the page owner can answer
        if (whisper.owner.toString() !== userId) {
            throw new Error("Unauthorized: Only the page owner can answer this whisper.");
        }

        // Update the whisper
        whisper.reply = replyText;
        whisper.isAnswered = true;
        await whisper.save();

        res.status(200).json({ success: true, message: "Reply successfully posted", data: whisper });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function deleteWhisper(req, res) {
    try {
        const { whisperId, userId } = req.body;

        let whisper = await Whisper.findById(whisperId);
        if (!whisper) throw new Error("Whisper not found");

        // Only the page owner can delete
        if (whisper.owner.toString() !== userId) {
            throw new Error("Unauthorized: Only the page owner can delete this whisper.");
        }

        await Whisper.findByIdAndDelete(whisperId);

        res.status(200).json({ success: true, message: "Whisper permanently deleted" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function getUserPageWhispers(req, res) {
    try {
        const { userId } = req.params;
        
        const whispers = await Whisper
            .find({ owner: userId })
            .sort({ createdAt: -1 }); // Sort newest first

        res.status(200).json({ success: true, message: "Successfully fetched whispers", data: whispers });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
        console.log(error);
    }
}

module.exports = {
    postWhisper,
    answerWhisper,
    deleteWhisper,
    getUserPageWhispers,
}
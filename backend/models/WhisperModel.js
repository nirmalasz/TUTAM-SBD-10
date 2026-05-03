const mongoose = require("mongoose");

const whisperSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: { type: String, required: true },
        reply: { type: String, default: null },
        isAnswered: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        senderName: { type: String, default: "anon" }, // 'anon' for logged out, 'Display Name' for logged in
    },
    { timestamps: true },
);

const Whisper = mongoose.model("Whisper", whisperSchema);

module.exports = Whisper;

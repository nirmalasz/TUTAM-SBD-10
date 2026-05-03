const express = require("express");
const whisperRepo = require("../repositories/repository.whisper");
const router = express.Router();


// get all whispers of specific user
router.get("/user/:userId", whisperRepo.getUserPageWhispers);

// delete whisper
router.delete("/", whisperRepo.deleteWhisper);

// post whisper
router.post("/", whisperRepo.postWhisper);

// answer to whisper
router.patch("/answer", whisperRepo.answerWhisper);

module.exports = router;
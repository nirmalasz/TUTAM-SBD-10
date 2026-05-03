const express = require("express");
const userRepo = require("../repositories/repository.user");
const router = express.Router();

// get all user
router.get("", userRepo.getAllUser);

// get user by credential
router.post("/login", userRepo.login);

// get user by id
router.get("/:userId", userRepo.getUserById);

// add user
router.post("/addUser", userRepo.addUser);

router.get("/username/:username", userRepo.getUserByUsername);


module.exports = router;
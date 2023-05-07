const express = require("express");

// controllers
const { createUser, getProfile, getUsers, login } = require("../controllers/userController");

const { checkUserToken } = require("../middlewares/checkToken");

const router = express.Router();

router.post("/create", createUser);
router.get("/profile", checkUserToken, getProfile);
router.get("/users", checkUserToken, getUsers);
router.post("/login", login);

module.exports = router;

const express = require("express");
const router = express.Router();
// controller functions
const { loginUser, signupUser } = require("../controllers/userController");

//-> POST login credentials
router.post("/login", loginUser);

//-> POST signup credentials
router.post("/signup", signupUser);

module.exports = router;

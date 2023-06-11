const authController = require("../controllers/authController");

const express = require("express");
const router = express.Router();

// CREATE ACC
router.route("/signup").post(authController.signup);

// LOGIN
router.route("/signin").post(authController.signin);

// GOOGLE
// router.route("/google").post(authController.test);

module.exports = router;

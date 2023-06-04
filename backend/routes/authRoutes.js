const authController = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router.route("/test").get(authController.test);

module.exports = router;

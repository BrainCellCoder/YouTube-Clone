const userController = require("../controllers/userController");

const express = require("express");
const router = express.Router();

router.route("/test").get(userController.test);

module.exports = router;

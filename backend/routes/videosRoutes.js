const videoController = require("../controllers/videoController");

const express = require("express");
const router = express.Router();

router.route("/test").get(videoController.test);

module.exports = router;

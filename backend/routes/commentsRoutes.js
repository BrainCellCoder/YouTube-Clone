const commentController = require("../controllers/commentControllers");

const express = require("express");
const router = express.Router();

router.route("/test").get(commentController.test);

module.exports = router;

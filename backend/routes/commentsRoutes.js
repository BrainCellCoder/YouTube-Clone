const commentController = require("../controllers/commentControllers");

const express = require("express");
const { verifyToken } = require("../verifyToken");
const router = express.Router();

router.route("/").post(verifyToken, commentController.addComment);
router.route("/:id").delete(verifyToken, commentController.deleteComment);
router.route("/:videoId").get(commentController.getComments);

module.exports = router;

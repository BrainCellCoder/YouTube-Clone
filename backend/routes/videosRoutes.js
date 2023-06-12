const videoController = require("../controllers/videoController");

const express = require("express");
const { verifyToken } = require("../verifyToken");
const router = express.Router();

router.route("/").post(verifyToken, videoController.addVideo);
router.route("/:id").put(verifyToken, videoController.updateVideo);
router.route("/:id").delete(verifyToken, videoController.deleteVideo);
router.route("/find/:id").get(videoController.getVideo);

module.exports = router;

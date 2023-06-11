const userController = require("../controllers/userController");

const express = require("express");
const { verifyToken } = require("../verifyToken");
const router = express.Router();

router.route("/:id").put(verifyToken, userController.updateUser);
router.route("/:id").delete(userController.deleteUser);
router.route("/find/:id").get(userController.getUser);
router.route("/sub/:id").put(userController.subscribe);
router.route("/unsub/:id").put(userController.unsubscribe);
router.route("/like/:videoId").put(userController.like);
router.route("/dislike/:videoId").put(userController.dislike);

module.exports = router;

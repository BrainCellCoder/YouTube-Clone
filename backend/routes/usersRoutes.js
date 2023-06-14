const userController = require("../controllers/userController");

const express = require("express");
const { verifyToken } = require("../verifyToken");
const router = express.Router();

// /users
router.route("/:id").put(verifyToken, userController.updateUser);
router.route("/:id").delete(verifyToken, userController.deleteUser);
router.route("/find/:id").get(userController.getUser);
router.route("/sub/:id").put(verifyToken, userController.subscribe);
router.route("/unsub/:id").put(verifyToken, userController.unsubscribe);
router.route("/like/:videoId").put(verifyToken, userController.like);
router.route("/dislike/:videoId").put(verifyToken, userController.dislike);

module.exports = router;

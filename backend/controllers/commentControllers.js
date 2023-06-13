const { createError } = require("../error");
const Comment = require("../models/commentModel");
const Video = require("../models/videoModel");

exports.addComment = async (req, res, next) => {
  try {
    const { videoId, desc } = req.body;
    const comment = await Comment.create({
      userId: req.user.id,
      videoId,
      desc,
    });
    res.status(200).json({
      success: true,
      comment,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Comment has been deleted!",
      });
    } else {
      return next(createError(403, "You can delete only your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    next(err);
  }
};

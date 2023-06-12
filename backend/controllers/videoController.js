const { createError } = require("../error");
const Video = require("../models/videoModel");

exports.addVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({
      userId: req.user.id,
      ...req.body,
    });
    const savedVideo = await newVideo.save();
    res.status(200).json({
      success: true,
      message: "Video created",
      savedVideo,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
    }
    res.status(200).json({
      success: true,
      message: "Video updated!",
      updatedVideo,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteVideo = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.getVideo = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

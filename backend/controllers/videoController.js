const { createError } = require("../error");
const Video = require("../models/videoModel");
const User = require("../models/userModel");

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
      res.status(200).json({
        success: true,
        message: "Video updated!",
        updatedVideo,
      });
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Video Deleted!",
      });
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

exports.getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json({
      success: true,
      video,
    });
  } catch (err) {
    next(err);
  }
};

exports.addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json({
      success: true,
      message: "The view has been increased",
    });
  } catch (err) {
    next(err);
  }
};

exports.random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json({
      success: true,
      videos,
    });
  } catch (err) {
    next(err);
  }
};

exports.trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 }); //returns most viewed videos
    res.status(200).json({
      success: true,
      videos,
    });
  } catch (err) {
    next(err);
  }
};

exports.sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        console.log(channelId);
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json({
      success: true,
      videos: list.flat().sort((a, b) => b.createdAt - a.createdAt),
    });
  } catch (err) {
    next(err);
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    const tags = req.query.tags.split(",");
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json({
      success: true,
      videos,
    });
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const query = req.query.q;
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    });
    res.status(200).json({
      success: true,
      videos,
    });
  } catch (err) {
    next(err);
  }
};

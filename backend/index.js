const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/usersRoutes");
const commentRoutes = require("./routes/commentsRoutes");
const videoRoutes = require("./routes/videosRoutes");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/videos", videoRoutes);

app.listen(8000, () => {
  console.log("Listening on PORT: 8000");
});

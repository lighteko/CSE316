// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const CommentRoutes = require("./routes/comment.route");
const PostRoutes = require("./routes/post.route");
const CommunityRoutes = require("./routes/community.route");
const LinkFlairRoutes = require("./routes/linkflair.route");
const SearchRoutes = require("./routes/search.route");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/comments", CommentRoutes);
app.use("/posts", PostRoutes);
app.use("/communities", CommunityRoutes);
app.use("/linkflairs", LinkFlairRoutes);
app.use("/search", SearchRoutes);

app.get("/", (_, res) => {
  res.send("API Running...");
});

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/phreddit");
    app.listen(8000, () => console.log("Server listenig on port 8000..."));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

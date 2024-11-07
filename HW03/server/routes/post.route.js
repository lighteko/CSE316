const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");

router.get("/:sortType", PostController.getAllPosts);
router.post("/", PostController.createPost);
router.get("/post/:id", PostController.getPostById);
router.put("/post/:id/view", PostController.increaseViewCount);
router.put("/post/:id", PostController.updatePost);
router.get("/community/:communityId/:sortType", PostController.getPostsOfCommunity);

module.exports = router;

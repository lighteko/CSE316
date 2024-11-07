const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment.controller");

router.get("/", CommentController.getAllComments);
router.post("/", CommentController.createComment);
router.post("/reply", CommentController.createReply);
router.get("/:id", CommentController.getCommentById);
router.put("/:id", CommentController.updateComment);
router.get("/post/:postId", CommentController.getCommentsOfPost);
router.get("/post/:postId/all", CommentController.getAllCommentsOfPost);

module.exports = router;

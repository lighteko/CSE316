const CommentService = require("../services/comment.service");

class CommentController {
  async createComment(req, res) {
    try {
      const comment = await CommentService.createComment(req.body);
      res.json(comment);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async createReply(req, res) {
    try {
      const comment = await CommentService.createReply(req.body);
      res.json(comment);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async getAllComments(_, res) {
    try {
      const comments = await CommentService.getAllComments();
      res.json(comments);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async getCommentsOfPost(req, res) {
    try {
      const comments = await CommentService.getCommentsOfPost(
        req.params.postId
      );
      res.json(comments);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async getAllCommentsOfPost(req, res) {
    try {
      const comments = await CommentService.getAllCommentsOfPost(
        req.params.postId
      );
      res.json(comments);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async getCommentById(req, res) {
    try {
      const comment = await CommentService.getCommentById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json(comment);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async updateComment(req, res) {
    try {
      const comment = await CommentService.updateComment(
        req.params.id,
        req.body
      );
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json(comment);
    } catch (error) {
      res.json({ message: error.message });
    }
  }
}

module.exports = new CommentController();

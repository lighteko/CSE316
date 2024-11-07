const Comment = require("../models/comments");

class CommentDAO {
  async getAllComments() {
    return await Comment.find({});
  }

  async getCommentsByQuery(query) {
    return await Comment.find({
      $or: [
        { content: { $regex: query, $options: "i" } },
      ],
    });
  }

  async getCommentById(id) {
    return await Comment.findById(id);
  }

  async createComment(commentData) {
    const comment = new Comment(commentData);
    return await comment.save();
  }

  async updateComment(commentID, updateData) {
    return await Comment.findByIdAndUpdate(commentID, updateData, {
      new: true,
    });
  }
}

module.exports = new CommentDAO();
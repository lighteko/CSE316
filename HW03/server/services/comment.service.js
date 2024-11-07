const CommentDAO = require("../daos/comment.dao");
const PostDAO = require("../daos/post.dao");

class CommentService {
  async createComment(commentData) {
    const { postId } = commentData;
    delete commentData.postId;
    const comment = await CommentDAO.createComment(commentData);
    const post = await PostDAO.getPostById(postId);
    await PostDAO.updatePost(postId, {
      commentIDs: [...post.commentIDs, comment._id],
    });
    return comment;
  }

  async createReply(replyData) {
    const { targetId } = replyData;
    delete replyData.targetId;
    const reply = await CommentDAO.createComment(replyData);
    const comment = await CommentDAO.getCommentById(targetId);
    await CommentDAO.updateComment(targetId, {
      commentIDs: [...comment.commentIDs, reply._id],
    });
    return reply;
  }

  async getAllComments() {
    return CommentDAO.getAllComments();
  }

  async getAllCommentsOfPost(postId) {
    const post = await PostDAO.getPostById(postId);
    const comments = [];
    const recursiveSearch = async (cmt) => {
      for (let commentID of cmt.commentIDs) {
        const current = await CommentDAO.getCommentById(commentID);
        comments.push(current);
        recursiveSearch(current);
      }
    };
    for (let commentID of post.commentIDs) {
      const current = await CommentDAO.getCommentById(commentID);
      comments.push(current);
      await recursiveSearch(current);
    }
    return comments;
  }

  async getCommentsByQuery(query) {
    return CommentDAO.getCommentsByQuery(query);
  }

  async getHighestParentComment(commentId) {
    let comment = await CommentDAO.getCommentById(commentId);
    const allComments = await CommentDAO.getAllComments();
    const recursiveSearch = (cmt) => {
      allComments.forEach((c) => {
        if (c.commentIDs.includes(cmt._id)) {
          cmt = c;
          recursiveSearch(cmt);
        }
      });
      return cmt;
    };
    comment = recursiveSearch(comment);
    return comment;
  }

  async getCommentsOfPost(postId) {
    const post = await PostDAO.getPostById(postId);
    const comments = [];
    for (let commentID of post.commentIDs) {
      comments.push(await CommentDAO.getCommentById(commentID));
    }
    return comments;
  }

  async getCommentById(commentId) {
    return CommentDAO.getCommentById(commentId);
  }

  async updateComment(commentId, comment) {
    return CommentDAO.updateComment(commentId, comment);
  }
}

module.exports = new CommentService();

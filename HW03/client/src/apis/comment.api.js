import axios from "axios";
import { SortType } from "../modules/types";

class CommentAPI {
  static async createComment(commentData) {
    try {
      const response = await axios.post(
        "http://localhost:8000/comments",
        commentData
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async createReply(replyData) {
    try {
      const response = await axios.post(
        "http://localhost:8000/comments/reply",
        replyData
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getAllComments() {
    try {
      const response = await axios.get("http://localhost:8000/comments");
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getCommentsOfPost(postId) {
    try {
      const response = await axios.get(
        `http://localhost:8000/comments/post/${postId}`
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getAllCommentsOfPost(postId) {
    try {
      const response = await axios.get(
        `http://localhost:8000/comments/post/${postId}/all`
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getCommentById(commentId) {
    try {
      const response = await axios.get(
        `http://localhost:8000/comments/${commentId}`
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async updateComment(commentId, commentData) {
    try {
      const response = await axios.put(
        `http://localhost:8000/comments/${commentId}`,
        commentData
      );
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static sortComments(comments, sortType) {

    switch (sortType) {
      case SortType.NEWEST:
        return comments.sort(
          (a, b) => new Date(b.commentedDate) - new Date(a.commentedDate)
        );
      case SortType.OLDEST:
        return comments.sort(
          (a, b) => new Date(a.commentedDate) - new Date(b.commentedDate)
        );
      case SortType.ACTIVE:
        return comments;
      default:
        return comments;
    }
  }
}

export default CommentAPI;

import axios from "axios";

class PostAPI {
  static async getAllPosts(sortType) {
    try {
      const response = await axios.get(`http://localhost:8000/posts/${sortType}`);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getPostById(postId) {
    try {
      const response = await axios.get(`http://localhost:8000/posts/post/${postId}`);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getPostsOfCommunity(communityId, sortType) {
    try {
      const response = await axios.get(`http://localhost:8000/posts/community/${communityId}/${sortType}`);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async createPost(postData) {
    try {
      const response = await axios.post("http://localhost:8000/posts", postData);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async updatePost(postId, postData) {
    try {
      const response = await axios.put(`http://localhost:8000/posts/post/${postId}`, postData);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async increaseViewCount(postId) {
    try {
      const response = await axios.put(`http://localhost:8000/posts/post/${postId}/view`);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default PostAPI;

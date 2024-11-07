const Post = require("../models/posts");

class PostDAO {
  async getAllPosts() {
    return await Post.find({});
  }

  async getPostsByQuery(query) {
    return await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });
  }

  async getPostById(id) {
    return await Post.findById(id);
  }

  async createPost(postData) {
    const post = new Post(postData);
    return await post.save();
  }

  async updatePost(postID, updateData) {
    return await Post.findByIdAndUpdate(postID, updateData, { new: true });
  }
}

module.exports = new PostDAO();

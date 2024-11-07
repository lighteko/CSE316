const PostService = require("../services/post.service");

class PostController {
  async getAllPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts(req.params.sortType);
      res.json(posts);
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  async getPostById(req, res) {
    try {
      const post = await PostService.getPostById(req.params.id);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }
      res.json(post);
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  async getPostsOfCommunity(req, res) {
    try {
      const posts = await PostService.getPostsOfCommunity(req.params.communityId, req.params.sortType);
      res.json(posts);
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  async createPost(req, res) {
    try {
      const post = await PostService.createPost(req.body);
      res.json(post);
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  async updatePost(req, res) {
    try {
      const post = await PostService.updatePost(req.params.id, req.body);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }
      res.json(post);
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  async increaseViewCount(req, res) {
    try {
      const post = await PostService.increaseViewCount(req.params.id);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }
      res.json(post);
    } catch (error) {
      res.json({ error: error.message });
    }
  }
}

module.exports = new PostController();

const PostService = require("./post.service");
const CommentService = require("./comment.service");

class SearchService {
  async searchPosts(searchQuery, sortType) {
    const queries = searchQuery.split(" ");
    const posts = [];

    for (let query of queries) {
      const postsByQuery = await PostService.getPostsByQuery(query);
      for (let post of postsByQuery) {
        if (posts.find((p) => p._id.equals(post._id))) continue;
        posts.push(post);
      }
      const comments = await CommentService.getCommentsByQuery(query);
      const highestParents = [];
      for (let comment of comments) {
        highestParents.push(
          await CommentService.getHighestParentComment(comment._id)
        );
      }

      for (let comment of highestParents) {
        const post = await PostService.getPostByCommentId(comment._id);
        if (post) {
          if (posts.find((p) => p._id.equals(post._id))) continue;
          posts.push(post);
        }
      }
    }

    return await PostService.sortPosts(posts, sortType);
  }
}

module.exports = new SearchService();

const SearchService = require("../services/search.service");

class SearchController {
  async searchPosts(req, res) {
    try {
      const posts = await SearchService.searchPosts(req.params.query, req.params.sortType);
      res.json(posts);
    } catch (error) {
      res.json({ error: error.message });
    }
  }
}

module.exports = new SearchController();

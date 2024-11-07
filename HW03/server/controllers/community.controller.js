const CommunityService = require("../services/community.service");

class CommunityController {
  async createCommunity(req, res) {
    try {
      const community = await CommunityService.createCommunity(req.body);
      res.json(community);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async getAllCommunities(_, res) {
    try {
      const communities = await CommunityService.getAllCommunities();
      res.json(communities);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async getCommunityById(req, res) {
    try {
      const community = await CommunityService.getCommunityById(req.params.id);
      if (!community) {
        return res.status(404).json({ message: "Community not found" });
      }
      res.json(community);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async getCommunityOfPost(req, res) {
    try {
      const community = await CommunityService.getCommunityOfPost(req.params.postId);
      if (!community) {
        return res.status(404).json({ message: "Community not found" });
      }
      res.json(community);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async updateCommunity(req, res) {
    try {
      const community = await CommunityService.updateCommunity(
        req.params.id,
        req.body
      );
      if (!community) {
        return res.status(404).json({ message: "Community not found" });
      }
      res.json(community);
    } catch (error) {
      res.json({ message: error.message });
    }
  }
}

module.exports = new CommunityController();

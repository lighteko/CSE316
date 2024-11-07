const CommunityDAO = require("../daos/community.dao");

class CommunityService {
  async createCommunity(communityData) {
    return CommunityDAO.createCommunity(communityData);
  }

  async getAllCommunities() {
    return CommunityDAO.getAllCommunities();
  }

  async getCommunityById(communityId) {
    return CommunityDAO.getCommunityById(communityId);
  }

  async getCommunityOfPost(postId) {
    const communities = await CommunityDAO.getAllCommunities();
    const community = communities.find((community) =>
      community.postIDs.includes(postId)
    );

    return community;
  }

  async updateCommunity(communityId, community) {
    return CommunityDAO.updateCommunity(communityId, community);
  }
}

module.exports = new CommunityService();

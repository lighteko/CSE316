const Community = require("../models/communities");

class CommunityDAO {
  async getAllCommunities() {
    return await Community.find({});
  }

  async getCommunityById(id) {
    return await Community.findById(id);
  }

  async createCommunity(communityData) {
    const community = new Community(communityData);
    return await community.save();
  }

  async updateCommunity(communityID, updateData) {
    return await Community.findByIdAndUpdate(communityID, updateData, {
      new: true,
    });
  }
}

module.exports = new CommunityDAO();

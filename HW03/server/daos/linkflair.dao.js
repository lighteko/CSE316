const LinkFlair = require("../models/linkflairs");

class LinkFlairDAO {
  async getAllLinkFlairs() {
    return await LinkFlair.find({});
  }

  async getLinkFlairById(id) {
    return await LinkFlair.findById(id);
  }

  async createLinkFlair(linkFlairData) {
    const linkFlair = new LinkFlair(linkFlairData);
    return await linkFlair.save();
  }
}

module.exports = new LinkFlairDAO();

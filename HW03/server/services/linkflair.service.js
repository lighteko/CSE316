const LinkFlairDAO = require("../daos/linkflair.dao");

class LinkFlairService {
  async createLinkFlair(linkFlairData) {
    return LinkFlairDAO.createLinkFlair(linkFlairData);
  }

  async getAllLinkFlairs() {
    return LinkFlairDAO.getAllLinkFlairs();
  }

  async getLinkFlairById(linkFlairId) {
    return LinkFlairDAO.getLinkFlairById(linkFlairId);
  }
}

module.exports = new LinkFlairService();

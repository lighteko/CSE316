const LinkFlairService = require("../services/linkflair.service");

class LinkFlairController {
  async createLinkFlair(req, res) {
    try {
      const linkflair = await LinkFlairService.createLinkFlair(req.body);
      res.json(linkflair);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async getAllLinkFlairs(req, res) {
    try {
      const linkflairs = await LinkFlairService.getAllLinkFlairs();
      res.json(linkflairs);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async getLinkFlairById(req, res) {
    try {
      const linkflair = await LinkFlairService.getLinkFlairById(req.params.id);
      if (!linkflair) {
        return res.status(404).json({ message: "Link Flair not found" });
      }
      res.json(linkflair);
    } catch (error) {
      res.json({ message: error.message });
    }
  }
}

module.exports = new LinkFlairController();

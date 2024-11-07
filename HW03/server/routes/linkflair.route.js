const express = require("express");
const router = express.Router();
const LinkFlairController = require("../controllers/linkflair.controller");

router.get("/", LinkFlairController.getAllLinkFlairs);
router.get("/:id", LinkFlairController.getLinkFlairById);
router.post("/", LinkFlairController.createLinkFlair);

module.exports = router;

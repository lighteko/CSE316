const express = require("express");
const router = express.Router();
const CommunityController = require("../controllers/community.controller");

router.get("/", CommunityController.getAllCommunities); 
router.post("/", CommunityController.createCommunity);
router.get("/:id", CommunityController.getCommunityById);
router.put("/:id", CommunityController.updateCommunity);
router.get("/post/:postId", CommunityController.getCommunityOfPost);

module.exports = router;

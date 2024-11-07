const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/search.controller");

router.get("/posts/:query/:sortType", SearchController.searchPosts);

module.exports = router;

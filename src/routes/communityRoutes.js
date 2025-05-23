const express = require("express");
const router = express.Router();
const controller = require("../controllers/communityController");

router.post("/", controller.createPost);
router.get("/", controller.getAllPosts);
router.delete("/:id", controller.deletePost);
router.post("/:id/comments", controller.addComment);

module.exports = router;

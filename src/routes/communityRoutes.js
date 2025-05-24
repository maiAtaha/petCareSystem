const express = require("express");
const router = express.Router();
const controller = require("../controllers/communityController");

/**
 * @swagger
 * /community/post:
 *   post:
 *     summary: Create a new community post
 *     tags:
 *       - Community
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - username
 *               - content
 *             properties:
 *               userId:
 *                 type: string
 *               username:
 *                 type: string
 *               content:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *     responses:
 *       201:
 *         description: Post created
 *       500:
 *         description: Error creating post
 */
router.post("/", controller.createPost);

/**
 * @swagger
 * /community/posts:
 *   get:
 *     summary: Get all community posts (most recent first)
 *     tags:
 *       - Community
 *     responses:
 *       200:
 *         description: List of posts
 *       500:
 *         description: Error fetching posts
 */
router.get("/", controller.getAllPosts);
/**
 * @swagger
 * /community/post/{id}:
 *   delete:
 *     summary: Delete a community post by ID
 *     tags:
 *       - Community
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted
 *       500:
 *         description: Error deleting post
 */
router.delete("/:id", controller.deletePost);

/**
 * @swagger
 * /community/post/{id}/comment:
 *   post:
 *     summary: Add a comment to a specific community post
 *     tags:
 *       - Community
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - username
 *               - comment
 *             properties:
 *               userId:
 *                 type: string
 *               username:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added
 *       500:
 *         description: Error adding comment
 */
router.post("/:id/comments", controller.addComment);

module.exports = router;

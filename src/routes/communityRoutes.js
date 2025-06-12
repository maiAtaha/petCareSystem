const express = require("express");
const router = express.Router();
const controller = require("../controllers/communityController");
const upload = require("../helpers/upload");

/**
 * @swagger
 * /api/community/upload:
 *   post:
 *     summary: Upload an image for a community post
 *     tags:
 *       - Community
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                   description: The Cloudinary URL of the uploaded image
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Error uploading image
 */
router.post("/upload", upload.single('image'), controller.uploadImage);

/**
 * @swagger
 * /api/community:
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
 * /api/community:
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
 * /api/community/{id}:
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
 * /api/community/{id}/comment:
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

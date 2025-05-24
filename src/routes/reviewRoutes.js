const express = require("express");
const router = express.Router();
const controller = require("../controllers/reviewController");

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a review for a clinic
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clinicId
 *               - userId
 *               - username
 *               - rating
 *               - comment
 *             properties:
 *               clinicId:
 *                 type: string
 *                 example: "clinic123"
 *               userId:
 *                 type: string
 *                 example: "user456"
 *               username:
 *                 type: string
 *                 example: "John Doe"
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               comment:
 *                 type: string
 *                 example: "Great service and friendly staff!"
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: string
 *       500:
 *         description: Error adding review
 */
router.post("/", controller.addReview);
/**
 * @swagger
 * /reviews/clinic/{clinicId}:
 *   get:
 *     summary: Get all reviews for a specific clinic
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         schema:
 *           type: string
 *         description: Clinic ID
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   clinicId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   username:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   comment:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching reviews
 */
router.get("/:clinicId", controller.getReviewsByClinic);


/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by its ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review document ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error deleting review
 */
router.delete("/:id", controller.deleteReview);

module.exports = router;

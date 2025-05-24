const express = require("express");
const router = express.Router();
const controller = require("../controllers/notificationController");

router.post("/", controller.sendNotification);

/**
 * @swagger
 * /api/notifications/{userId}:
 *   get:
 *     summary: Get all notifications for a specific user
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to fetch notifications for
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   title:
 *                     type: string
 *                   message:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching notifications
 */
router.get("/:userId", controller.getUserNotifications);

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Delete a specific notification by ID
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the notification to delete
 *     responses:
 *       200:
 *         description: Notification deleted
 *       500:
 *         description: Error deleting notification
 */
router.delete("/:id", controller.deleteNotification);

module.exports = router;

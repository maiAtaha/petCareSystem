const express = require("express");
const router = express.Router();
const controller = require("../controllers/notificationController");


/**
 * @swagger
 *   /api/notifications/clinic/{clinicId}:
 *     get:
 *       tags:
 *         - Notifications
 *       summary: Get notifications for a veterinary clinic
 *       parameters:
 *         - in: path
 *           name: clinicId
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the veterinary clinic
 *       responses:
 *         '200':
 *           description: List of notifications for the clinic
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   notifications:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         petName:
 *                           type: string
 *                           example: Bella
 *                         ownerName:
 *                           type: string
 *                           example: Ali
 *                         date:
 *                           type: string
 *                           example: 2025-06-15T10:00:00.000Z
 *                         service:
 *                           type: string
 *                           example: Vaccination
 *         '500':
 *           description: Server error
 */
router.post("/", controller.getClinicNotifications);

/**
 * @swagger
 *   /api/notifications/user/{ownerId}:
 *     get:
 *       tags:
 *         - Notifications
 *       summary: Get upcoming notifications for a user (within 2 days)
 *       parameters:
 *         - in: path
 *           name: ownerId
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the pet owner
 *       responses:
 *         '200':
 *           description: List of upcoming appointment notifications
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   notifications:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         petName:
 *                           type: string
 *                           example: Rex
 *                         date:
 *                           type: string
 *                           example: 2025-06-14T09:30:00.000Z
 *                         service:
 *                           type: string
 *                           example: Check-up
 *         '500':
 *           description: Server error
 */
router.get("/:userId", controller.getUserUpcomingNotifications);

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

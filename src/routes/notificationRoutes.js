const express = require("express");
const router = express.Router();
const controller = require("../controllers/notificationController");

router.post("/", controller.sendNotification);
router.get("/:userId", controller.getUserNotifications);
router.delete("/:id", controller.deleteNotification);

module.exports = router;

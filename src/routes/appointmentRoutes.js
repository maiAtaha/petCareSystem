const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointmentController");

router.post("/", controller.bookAppointment);
router.get("/:ownerId", controller.getAppointmentsByOwner);
router.put("/cancel/:id", controller.cancelAppointment);
router.put("/reschedule/:id", controller.rescheduleAppointment);
router.get("/next/:ownerId", controller.getNextAppointment);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointmentController");

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Book an appointment for a pet
 *     tags:
 *       - Appointments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - petId
 *               - clinicId
 *               - ownerId
 *               - date
 *               - service
 *             properties:
 *               petId:
 *                 type: string
 *               clinicId:
 *                 type: string
 *               ownerId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               service:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       500:
 *         description: Error booking appointment
 */
router.post("/", controller.bookAppointment);

/**
 * @swagger
 * /api/appointments/{ownerId}:
 *   get:
 *     summary: Get all appointments for a specific owner
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the owner
 *     responses:
 *       200:
 *         description: List of appointments
 *       500:
 *         description: Error fetching appointments
 */
router.get("/:ownerId", controller.getAppointmentsByOwner);

/**
 * @swagger
 * /api/appointments/cancel/{id}:
 *   patch:
 *     summary: Cancel an appointment
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 *       500:
 *         description: Error cancelling appointment
 */
router.put("/cancel/:id", controller.cancelAppointment);
/**
 * @swagger
 * /api/appointments/reschedule/{id}:
 *   patch:
 *     summary: Reschedule an appointment
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newDate
 *             properties:
 *               newDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Appointment rescheduled successfully
 *       500:
 *         description: Error rescheduling appointment
 */
router.put("/reschedule/:id", controller.rescheduleAppointment);
/**
 * @swagger
 * /api/appointments/next/{ownerId}:
 *   get:
 *     summary: Get the next upcoming appointment for an owner
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the owner
 *     responses:
 *       200:
 *         description: Next upcoming appointment
 *       500:
 *         description: Error fetching next appointment
 */
router.get("/next/:ownerId", controller.getNextAppointment);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get appointments by owner ID and status
 *     tags: [Appointment]
 *     parameters:
 *       - in: query
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pet owner
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, completed]
 *         description: The status of the appointment
 *     responses:
 *       200:
 *         description: List of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   ownerId:
 *                     type: string
 *                   clinicId:
 *                     type: string
 *                   petId:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                   reason:
 *                     type: string
 *       400:
 *         description: Missing ownerId or status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error fetching appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get("/byStatus", controller.getAppointmentsByStatus);


/**
 * @swagger
 * /api/appointments/pet/{petId}:
 *   get:
 *     summary: Get appointments by pet ID
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the pet
 *     responses:
 *       200:
 *         description: List of appointments for the specified pet
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   petId:
 *                     type: string
 *                   ownerId:
 *                     type: string
 *                   clinicId:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                   reason:
 *                     type: string
 *       500:
 *         description: Error fetching pet appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get("/pet/:petId", controller.getAppointmentsByPet);


module.exports = router;

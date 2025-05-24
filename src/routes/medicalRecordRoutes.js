const express = require("express");
const router = express.Router();
const controller = require("../controllers/medicalRecordController");


/**
 * @swagger
 * /api/medicalRecords:
 *   post:
 *     summary: Add a new medical record for a pet
 *     tags:
 *       - Medical Records
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - petId
 *               - clinicId
 *               - clinicName
 *               - date
 *               - diagnosis
 *               - treatment
 *             properties:
 *               petId:
 *                 type: string
 *               clinicId:
 *                 type: string
 *               clinicName:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               diagnosis:
 *                 type: string
 *               treatment:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medical record added
 *       500:
 *         description: Error adding medical record
 */

router.post("/", controller.addMedicalRecord);

/**
 * @swagger
 * api/medicalRecords/{petId}:
 *   get:
 *     summary: Get all medical records for a specific pet
 *     tags:
 *       - Medical Records
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the pet to retrieve records for
 *     responses:
 *       200:
 *         description: List of medical records
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
 *                   clinicId:
 *                     type: string
 *                   clinicName:
 *                     type: string
 *                   date:
 *                     type: string
 *                   diagnosis:
 *                     type: string
 *                   treatment:
 *                     type: string
 *                   notes:
 *                     type: string
 *       500:
 *         description: Error fetching medical records
 */
router.get("/:petId", controller.getMedicalRecordsByPet);

module.exports = router;

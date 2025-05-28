const express = require("express");
const router = express.Router();
const veterinaryClinicController = require("../controllers/veterinaryClinicController");


router.get("/profile/:id", veterinaryClinicController.getClinicProfile);
router.put("/profile/:id", veterinaryClinicController.updateClinicProfile);

/**
 * @swagger
 * /api/clinics/address/{address}:
 *   get:
 *     summary: Get up to 3 veterinary clinics by address
 *     tags: [Clinic]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Address to filter clinics
 *     responses:
 *       200:
 *         description: List of clinics by address
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               maxItems: 3
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   address:
 *                     type: string
 *                   showHours:
 *                     type: string
 *       500:
 *         description: Error fetching clinics
 */
router.get("/nearby/:address",veterinaryClinicController.getClinicsByAddress);

module.exports = router;

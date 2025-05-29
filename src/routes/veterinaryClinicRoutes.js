const express = require("express");
const router = express.Router();
const veterinaryClinicController = require("../controllers/veterinaryClinicController");



/**
 * @swagger
 * /api/clinics/{id}:
 *   get:
 *     summary: Get a clinic profile by ID
 *     tags: [Clinic]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Clinic ID
 *     responses:
 *       200:
 *         description: Clinic profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 specialty:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Clinic not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error fetching clinic profile
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
router.get("/profile/:id", veterinaryClinicController.getClinicProfile);

/**
 * @swagger
 * /api/clinics/{id}:
 *   put:
 *     summary: Update a clinic profile by ID
 *     tags: [Clinic]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Clinic ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Clinic Name"
 *               address:
 *                 type: string
 *                 example: "456 New Street, City"
 *               specialty:
 *                 type: string
 *                 example: "Dentistry"
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *     responses:
 *       200:
 *         description: Clinic profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error updating clinic profile
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

/**
 * @swagger
 * /api/clinics/search:
 *   get:
 *     summary: Search for clinics by keyword
 *     tags: [Clinic]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword (used to match against name, address, or specialty)
 *     responses:
 *       200:
 *         description: List of matching clinics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   specialty:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   email:
 *                     type: string
 *       400:
 *         description: Missing search keyword
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Search error
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
router.get("/search", veterinaryClinicController.searchClinics);

module.exports = router;

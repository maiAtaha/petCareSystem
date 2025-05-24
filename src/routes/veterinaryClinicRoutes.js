const express = require("express");
const router = express.Router();
const veterinaryClinicController = require("../controllers/veterinaryClinicController");



/**
 * @swagger
 * /api/clinics/register:
 *   post:
 *     summary: Register a new veterinary clinic
 *     tags: [Clinic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *               - phoneNumber
 *               - address
 *               - showHours
 *             properties:
 *               userName:
 *                 type: string
 *                 example: "Happy Pets Clinic"
 *               email:
 *                 type: string
 *                 example: "contact@happypets.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Pet St, Cityville"
 *               showHours:
 *                 type: string
 *                 example: "9 AM - 6 PM"
 *     responses:
 *       201:
 *         description: Clinic registered successfully
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
 *         description: Error registering clinic
 */
router.post("/register", veterinaryClinicController.registerClinic);

/**
 * @swagger
 * /api/clinics/login:
 *   post:
 *     summary: Login a veterinary clinic
 *     tags: [Clinic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "contact@happypets.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 clinic:
 *                   type: object
 *                   properties:
 *                     userName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     showHours:
 *                       type: string
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Error logging in
 */
router.post("/login", veterinaryClinicController.loginClinic);

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

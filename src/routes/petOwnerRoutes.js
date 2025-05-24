const express = require("express");
const router = express.Router();
const petOwnerController = require("../controllers/petOwnerController");



/**
 * @swagger
 * /api/petOwners/register:
 *   post:
 *     summary: Register a new pet owner
 *     tags:
 *       - Pet Owners
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
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pet Owner registered successfully
 *       500:
 *         description: Error registering Pet Owner
 */
router.post("/register", petOwnerController.registerPetOwner);

/**
 * @swagger
 * /api/petOwners/login:
 *   post:
 *     summary: Login as a pet owner
 *     tags:
 *       - Pet Owners
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
 *               password:
 *                 type: string
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
 *                 user:
 *                   type: object
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Error logging in
 */
router.post("/login", petOwnerController.loginPetOwner);

module.exports = router;

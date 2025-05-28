const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out the user (dummy endpoint)
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", authController.logout);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user (pet owner or veterinary clinic)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - email
 *               - password
 *               - username
 *               - phoneNumber
 *               - address
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [petOwner, veterinaryClinic]
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               username:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists or invalid role
 *       500:
 *         description: Signup error
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Login a user (pet owner or veterinary clinic)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - email
 *               - password
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [petOwner, veterinaryClinic]
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid role
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Signin error
 */
router.post("/signin", authController.signin);

module.exports = router;

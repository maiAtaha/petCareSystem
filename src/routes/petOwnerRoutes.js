const express = require("express");
const router = express.Router();
const petOwnerController = require("../controllers/petOwnerController");

/**
 * @swagger
 * /api/petOwners/profile/{id}:
 *   get:
 *     summary: Get pet owner profile by ID
 *     tags:
 *       - PetOwner
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet owner ID
 *     responses:
 *       200:
 *         description: Pet owner profile found
 *       404:
 *         description: Pet owner profile not found
 *       500:
 *         description: Error fetching pet owner profile
 */
router.get("/profile/:id", petOwnerController.getPetOwnerProfile);


/**
 * @swagger
 * /api/petOwners/profile/{id}:
 *   put:
 *     summary: Update pet owner profile
 *     tags:
 *       - PetOwner
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet owner ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Pet owner not found
 *       500:
 *         description: Error updating profile
 */
router.put("/profile/:id", petOwnerController.updatePetOwnerProfile);






module.exports = router;

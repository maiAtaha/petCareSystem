const express = require("express");
const router = express.Router();
const controller = require("../controllers/petProfileController");

/**
 * @swagger
 * /api/petProfiles:
 *   post:
 *     summary: Add a new pet profile
 *     tags: [PetProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ownerId
 *               - petId
 *               - name
 *               - birthDate
 *               - species
 *               - breed
 *               - wight
 *               - allergies
 *               - gender
 *             properties:
 *               ownerId:
 *                 type: string
 *                 example: "abc123"
 *               petId:
 *                 type: string
 *                 example: "pet456"
 *               name:
 *                 type: string
 *                 example: "Buddy"
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: "2021-05-10"
 *               species:
 *                 type: string
 *                 example: "Dog"
 *               breed:
 *                 type: string
 *                 example: "Labrador"
 *               wight:
 *                 type: number
 *                 example: 12.5
 *               allergies:
 *                 type: string
 *                 example: "None"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Pet added successfully
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
 *         description: Error adding pet
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

router.post("/", controller.addPetProfile);
/**
 * @swagger
 * /api/petProfiles/{ownerId}:
 *   get:
 *     summary: Get all pet profiles by owner ID
 *     tags: [PetProfile]
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Owner ID
 *     responses:
 *       200:
 *         description: List of pet profiles
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
 *                   petName:
 *                     type: string
 *                   type:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   age:
 *                     type: number
 *                   imageUrl:
 *                     type: string
 *       500:
 *         description: Error fetching pets
 */
router.get("/:ownerId", controller.getPetProfilesByOwner);
/**
 * @swagger
 * /api/petProfiles/{id}:
 *   put:
 *     summary: Update a pet profile
 *     tags: [PetProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet profile document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update (partial or full)
 *     responses:
 *       200:
 *         description: Pet profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error updating pet
 */
router.put("/:id", controller.updatePetProfile);

module.exports = router;

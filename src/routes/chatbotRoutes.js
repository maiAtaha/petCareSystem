const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");


/**
 * @swagger
 * /api/chatbot/ask:
 *   post:
 *     summary: Ask a question to ChatGPT (via OpenAI API)
 *     tags:
 *       - AI Assistant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Tell me a joke about cats."
 *     responses:
 *       200:
 *         description: ChatGPT reply
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *       500:
 *         description: Error communicating with ChatGPT API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/ask", chatbotController.askChatGPT);

module.exports = router;

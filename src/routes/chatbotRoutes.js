const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

router.post("/ask", chatbotController.askChatGPT);

module.exports = router;

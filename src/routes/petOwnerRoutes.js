const express = require("express");
const router = express.Router();
const petOwnerController = require("../controllers/petOwnerController");

router.post("/register", petOwnerController.registerPetOwner);

router.post("/login", petOwnerController.loginPetOwner);

module.exports = router;

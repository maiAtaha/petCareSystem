const express = require("express");
const router = express.Router();
const controller = require("../controllers/petProfileController");

router.post("/", controller.addPetProfile);
router.get("/:ownerId", controller.getPetProfilesByOwner);
router.put("/:id", controller.updatePetProfile);

module.exports = router;

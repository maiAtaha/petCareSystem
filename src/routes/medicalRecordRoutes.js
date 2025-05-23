const express = require("express");
const router = express.Router();
const controller = require("../controllers/medicalRecordController");

router.post("/", controller.addMedicalRecord);
router.get("/:petId", controller.getMedicalRecordsByPet);

module.exports = router;

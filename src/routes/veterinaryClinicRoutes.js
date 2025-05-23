const express = require("express");
const router = express.Router();
const veterinaryClinicController = require("../controllers/veterinaryClinicController");

router.post("/register", veterinaryClinicController.registerClinic);

router.post("/login", veterinaryClinicController.loginClinic);

router.get("/nearby/:address",veterinaryClinicController.getClinicsByAddress);

module.exports = router;

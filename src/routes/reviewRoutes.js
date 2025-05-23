const express = require("express");
const router = express.Router();
const controller = require("../controllers/reviewController");

router.post("/", controller.addReview);
router.get("/:clinicId", controller.getReviewsByClinic);
router.delete("/:id", controller.deleteReview);

module.exports = router;

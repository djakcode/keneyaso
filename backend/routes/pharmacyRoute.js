const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/pharmacyController");

router.post("/", CONTROLLER.addPharmacy);
router.get("/", CONTROLLER.getPharmacies);
router.get("/:id", CONTROLLER.getPharmacy);
router.put("/:id", CONTROLLER.updatePharmacy);
router.delete("/:id", CONTROLLER.deletePharmacy);

module.exports = router;

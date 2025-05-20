const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/prescriptionController");

router.post("/", CONTROLLER.addPrescription);
router.get("/", CONTROLLER.getPrescriptions);
router.get("/:id", CONTROLLER.getPrescription);
router.put("/:id", CONTROLLER.updatePrescription);
router.delete("/:id", CONTROLLER.deletePrescription);

module.exports = router;

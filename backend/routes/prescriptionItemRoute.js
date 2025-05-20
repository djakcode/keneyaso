const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/prescriptionItemController");

router.post("/", CONTROLLER.addPrescriptionItem);
router.get("/", CONTROLLER.getPrescriptionItems);
router.get("/:id", CONTROLLER.getPrescriptionItem);
router.put("/:id", CONTROLLER.updatePrescriptionItem);
router.delete("/:id", CONTROLLER.deletePrescriptionItem);

module.exports = router;

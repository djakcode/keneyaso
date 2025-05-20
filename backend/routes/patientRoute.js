const express = require("express");
const ENV = require("../config/index");
const CONTROLLER = require("../controllers/patientController");
const router = express.Router();

router.post("/", CONTROLLER.addPatient);
router.get("/", CONTROLLER.getPatients);
router.get("/:id", CONTROLLER.getPatient);
router.put("/:id", CONTROLLER.updatePatient);
router.delete("/:id", CONTROLLER?.deletePatient);

module.exports = router;

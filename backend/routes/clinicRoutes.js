const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/clinicController");

router.post("/", CONTROLLER.createClinic);
router.get("/", CONTROLLER.getClinics);
router.get("/:id", CONTROLLER.getClinic);
router.put("/:id", CONTROLLER.updateClinic);
router.delete("/:id", CONTROLLER.deleteClinic);

module.exports = router;

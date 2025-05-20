const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/appointmentController");

router.post("/", CONTROLLER.addAppointment);
router.get("/", CONTROLLER.getAppointments);
router.get("/:id", CONTROLLER.getAppointment);
router.put("/:id", CONTROLLER.updateAppointment);
router.delete("/:id", CONTROLLER.deleteAppointment);

module.exports = router;

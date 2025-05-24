const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/clinicController");
const verifyToken = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");

router.post("/add", verifyToken, CONTROLLER.createClinic);
router.get("/all", verifyToken, checkRole("admin"), CONTROLLER.getClinics);
router.get("/:id", verifyToken, CONTROLLER.getClinic);
router.put("/:id", verifyToken, checkRole("doctor"), CONTROLLER.updateClinic);
router.delete("/:id", verifyToken, checkRole("admin"), CONTROLLER.deleteClinic);

module.exports = router;

const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/insuranceController");

router.post("/", CONTROLLER.addInsurance);
router.get("/", CONTROLLER.getInsurances);
router.get("/:id", CONTROLLER.getInsurance);
router.put("/:id", CONTROLLER.updateInsurance);
router.delete("/:id", CONTROLLER.deleteInsurance);

module.exports = router;

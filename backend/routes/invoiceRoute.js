const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/invoiceController");

router.post("/", CONTROLLER.createInvoice);
router.get("/", CONTROLLER.getInvoices);
router.get("/:id", CONTROLLER.getInvoice);
router.put("/:id", CONTROLLER.updateInvoice);
router.delete("/:id", CONTROLLER.deleteInvoice);

module.exports = router;

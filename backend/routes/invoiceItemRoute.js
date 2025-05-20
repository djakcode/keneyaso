const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/invoiceItemController");

router.post("/", CONTROLLER.addInvoiceItem);
router.get("/", CONTROLLER.getInvoiceItems);
router.get("/:id", CONTROLLER.getInvoiceItem);
router.put("/:id", CONTROLLER.updateInvoiceItem);
router.delete("/:id", CONTROLLER.deleteInvoiceItem);

module.exports = router;

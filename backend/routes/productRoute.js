const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/productController");

router.post("/", CONTROLLER.addProduct);
router.get("/", CONTROLLER.getProducts);
router.get("/:id", CONTROLLER.getProduct);
router.put("/:id", CONTROLLER.updateProduct);
router.delete("/:id", CONTROLLER.deleteProduct);

module.exports = router;

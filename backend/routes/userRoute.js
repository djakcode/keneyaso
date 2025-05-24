const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/userController");
const verifyToken = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");

router.post("/signup", verifyToken, checkRole("admin"), CONTROLLER.signup);
router.post("/signin", verifyToken, CONTROLLER.signin);
router.get("/all", verifyToken, checkRole("admin"), CONTROLLER.getUsers);
router.get("/:id", verifyToken, CONTROLLER.getUser);
router.put("/:id", verifyToken, CONTROLLER.updateUser);
router.delete("/:id", verifyToken, checkRole("admin"), CONTROLLER.deleteUser);

module.exports = router;

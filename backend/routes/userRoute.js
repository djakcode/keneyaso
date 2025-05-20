const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/userController");

router.post("/signup", CONTROLLER.signup);
router.post("/signin", CONTROLLER.signin);
router.get("/", CONTROLLER.getUsers);
router.get("/:id", CONTROLLER.getUser);
router.put("/:id", CONTROLLER.updateUser);
router.delete("/:id", CONTROLLER.deleteUser);

module.exports = router;

const express = require("express");

const platesControllers = require("../controllers/plates-controller");

const router = express.Router();

router.get("/:pid", platesControllers.getPlateById);
router.get("/user/:uid", platesControllers.getPlateByUserId);

module.exports = router;

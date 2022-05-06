const express = require("express");
const validator = require("express-validator");

const usersControllers = require("../controllers/user-controller");

const router = express.Router();

router.get("/allusers", usersControllers.getAllUsers);

router.post(
    "/signup",
    [
        validator.check("name").not().isEmpty(),
        validator.check("password").isLength({ min: 5, max: 15 }),
        validator.check("email").normalizeEmail().isEmail(),
    ],
    usersControllers.signup
);
router.post("/login", usersControllers.login);

module.exports = router;

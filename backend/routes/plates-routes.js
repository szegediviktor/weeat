const express = require("express");
const validator = require("express-validator");

const platesControllers = require("../controllers/plates-controller");

const router = express.Router();

router.get("/:pid", platesControllers.getPlateById);
router.get("/user/:uid", platesControllers.getPlatesByUserId);

router.post(
    "/",
    [
        validator.check("title").not().isEmpty(),
        validator.check("description").isLength({ min: 5 }),
        validator.check("address").not().isEmpty(),
        validator.check("chefName").not().isEmpty(),
        validator.check("restaurantName").not().isEmpty(),
        validator.check("rate").isNumeric().isInt({ min: 0, max: 10 }),
    ],
    platesControllers.createPlate
);

router.patch(
    "/:pid",
    [
        validator.check("title").not().isEmpty(),
        validator.check("description").isLength({ min: 5 }),
    ],
    platesControllers.updatePlateById
);

router.delete("/:pid", platesControllers.deletePlateById);

module.exports = router;

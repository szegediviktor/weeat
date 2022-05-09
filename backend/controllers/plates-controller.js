const HttpError = require("../models/http-error");

const validator = require("express-validator");
const mongoose = require("mongoose");

const uuid = require("uuid");

// console.log(uuid.v4());

const getEuropeCoordinates = require("../location/location");

const Plate = require("../models/plate");
const User = require("../models/user");

const getPlateById = async (req, res, next) => {
    const plateId = req.params.pid;

    let plate;
    try {
        plate = await Plate.findById(plateId);
    } catch (err) {
        const error = new HttpError("Something went wrong.", 500);
        return next(error);
    }

    if (!plate) {
        const error = new HttpError(
            "Could not find a plate for the provided ID",
            404
        );
        return next(error);
    }

    res.json({ plate: plate.toObject({ getters: true }) });
};

const getPlatesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let platesFromSpecifiedUserId;
    try {
        platesFromSpecifiedUserId = await Plate.find({ creator: userId });
    } catch (err) {
        const error = new HttpError("Something went wrong", 500);
        return next(error);
    }

    if (!platesFromSpecifiedUserId || platesFromSpecifiedUserId.length <= 0) {
        const error = new HttpError("Could not find.", 404);

        return next(error);
    }

    // console.log(userId);
    // console.log(platesFromSpecifiedUserId);

    res.json({
        platesFromSpecifiedUserId: platesFromSpecifiedUserId.map((p) =>
            p.toObject({ getters: true })
        ),
    });
};

const updatePlateById = async (req, res, next) => {
    const err = validator.validationResult(req);
    if (!err.isEmpty()) {
        const error = new HttpError("Invalid inputs", 422);
        return next(error);
    }

    const { title, description } = req.body;
    const plateId = req.params.pid;
    let updatedPlate;

    try {
        updatedPlate = await Plate.findById(plateId);
    } catch (err) {
        const error = new HttpError("Something went wrong", 500);
        return next(error);
    }

    updatedPlate.title = title;
    updatedPlate.description = description;

    try {
        await updatedPlate.save();
    } catch (err) {
        const error = new HttpError("Something went wrong", 500);
        return next(error);
    }

    res.status(200).json({ plate: updatedPlate.toObject({ getters: true }) });
};

const deletePlateById = async (req, res, next) => {
    const plateId = req.params.pid;

    let deletingPlate;

    try {
        deletingPlate = await Plate.findById(plateId).populate("creator");
    } catch (err) {
        const error = new HttpError("Something went wrong", 500);
        return next(error);
    }

    if (!deletingPlate) {
        const error = new HttpError("Could not find plate for this id ", 404);
        return next(error);
    }

    try {
        const sessn = await mongoose.startSession();
        sessn.startTransaction();
        await deletingPlate.remove({ session: sessn });
        deletingPlate.creator.plates.pull(deletingPlate);
        await deletingPlate.creator.save({ session: sessn });
        await sessn.commitTransaction();
        console.log(deletingPlate);
    } catch (err) {
        const error = new HttpError("Something went wrong", 500);
        return next(error);
    }

    res.status(200).json({ message: "Deleted place" });
};

const createPlate = async (req, res, next) => {
    const err = validator.validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
        const error = new HttpError("Invalid inputs", 422);
        return next(error);
    }

    const {
        title,
        description,
        restaurantName,
        chefName,
        rate,
        address,
        creator,
    } = req.body;

    let coordinates;
    try {
        coordinates = await getEuropeCoordinates(address);
    } catch (err) {
        return next(err);
    }

    const createdPlate = new Plate({
        title,
        description,
        imageURL:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
        restaurantName,
        chefName,
        rate,
        address,
        location: coordinates,
        creator,
    });

    console.log(creator);
    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError("Creating process failed", 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError("Could not find the user", 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlate.save({ session: sess });
        user.plates.push(createdPlate);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Creating plate failed, please try again.",
            500
        );
        console.log(err);
        return next(error);
    }

    // console.log(user);

    res.status(201).json({ plate: createdPlate });
};

exports.getPlateById = getPlateById;
exports.getPlatesByUserId = getPlatesByUserId;
exports.createPlate = createPlate;
exports.updatePlateById = updatePlateById;
exports.deletePlateById = deletePlateById;

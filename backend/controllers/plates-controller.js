const HttpError = require("../models/http-error");

const validator = require("express-validator");

const uuid = require("uuid");

// console.log(uuid.v4());

const getEuropeCoordinates = require("../location/location");

let DUMMY_PLATES = [
    {
        id: "p1",
        title: "Tomato Pasta",
        restaurantName: "NotReal Italian Bistro ",
        chefName: "John Doe",
        description:
            "Delicious pasta from the heart of Milano. Parmeggiano Reggiano on the top makes it perfect.",
        rate: 8,
        imageURL:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
        address: "Castello Sforzesco, Milano, Italy",
        location: {
            lat: 45.4717713,
            lng: 9.1824161,
        },
        creator: "user1",
    },
    {
        id: "p2",
        title: "Classic Cheeseburger",
        restaurantName: "BurgerManiac Restaurant",
        chefName: "Bobby Burgermaker",
        description: "Angus, homemade bun, classic taste. I will be back!",
        rate: 9,
        imageURL:
            "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFtYnVyZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
        address: "NotExist street, Oslo, Norway",
        location: {
            lat: 59.9129437,
            lng: 10.7400021,
        },
        creator: "user1",
    },
];

const getPlateById = (req, res, next) => {
    const plateId = req.params.pid;
    const plate = DUMMY_PLATES.find((p) => {
        return p.id === plateId;
    });

    if (!plate) {
        throw new HttpError("Could not find a plate for the provided ID", 404);
    }

    res.json({ plate });
};

const getPlatesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const platesFromSpecifiedUserId = DUMMY_PLATES.filter((p) => {
        return p.creator === userId;
    });
    if (!platesFromSpecifiedUserId || platesFromSpecifiedUserId.length <= 0) {
        return next(
            new HttpError("Could not find a plate for the provided ID", 404)
        );
    }
    res.json({ platesFromSpecifiedUserId });
};

const updatePlateById = (req, res, next) => {
    const err = validator.validationResult(req);
    if (!err.isEmpty()) {
        throw new HttpError("Invalid inputs", 422);
    }
    console.log(err);

    const { title, description } = req.body;
    const plateId = req.params.pid;

    const updatedPlate = {
        ...DUMMY_PLATES.find((p) => {
            return p.id === plateId;
        }),
    };
    const plateIndex = DUMMY_PLATES.findIndex((p) => {
        return p.id === plateId;
    });
    updatedPlate.title = title;
    updatedPlate.description = description;

    DUMMY_PLATES[plateIndex] = updatedPlate;
    res.status(200).json({ plate: updatedPlate });
};

const deletePlateById = (req, res, next) => {
    const plateId = req.params.pid;
    const deletingPlate = DUMMY_PLATES.find((p) => p.id === plateId);
    if (!deletingPlate) {
        throw new HttpError("Plate do not exist", 404);
    }

    DUMMY_PLATES = DUMMY_PLATES.filter((p) => {
        return p.id !== plateId;
    });
    res.status(200).json({ message: "Deleted place" });
};

const createPlate = (req, res, next) => {
    const err = validator.validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
        throw new HttpError("Invalid inputs", 422);
    }

    const {
        title,
        description,
        restaurantName,
        chefName,
        rate,
        address,
        coordinates,
        creator,
    } = req.body;

    const createdPlate = {
        id: uuid.v4(),
        title,
        description,
        restaurantName,
        chefName,
        rate,
        address,
        creator,
        location: getEuropeCoordinates(),
    };

    DUMMY_PLATES.push(createdPlate);

    res.status(201).json({ plate: createdPlate });
};

exports.getPlateById = getPlateById;
exports.getPlatesByUserId = getPlatesByUserId;
exports.createPlate = createPlate;
exports.updatePlateById = updatePlateById;
exports.deletePlateById = deletePlateById;

const validator = require("express-validator");

const HttpError = require("../models/http-error");

const uuid = require("uuid");

const DUMMY_USERS = [
    {
        id: 111,
        name: "Viktor",
        email: "test@testing.com",
        password: "testing",
    },
];

const getAllUsers = (req, res, next) => {
    res.status(200).json({ users: DUMMY_USERS });
};
const signup = (req, res, next) => {
    const err = validator.validationResult(req);
    if (!err.isEmpty()) {
        throw new HttpError("Invalid inputs", 422);
    }
    console.log(err);

    const { name, email, password } = req.body;

    const alreadyHasUser = DUMMY_USERS.find((user) => user.email === email);
    if (alreadyHasUser) {
        throw new HttpError("This user has already exist", 422);
    }

    const newUser = {
        id: uuid.v4(),
        name: name,
        email: email,
        password: password,
    };

    DUMMY_USERS.push(newUser);

    res.status(201).json({ user: newUser });
};
const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError("Wrong credentials", 401);
    }

    res.json({ message: "Login has done" });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;

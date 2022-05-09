const validator = require("express-validator");
const uuid = require("uuid");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find({}, "-password");
        // console.log(users);
    } catch (err) {
        const error = new HttpError("Fetching users failed", 500);
        return next(error);
    }
    res.json({
        users: users.map((u) => {
            return u.toObject({ getters: true });
        }),
    });
};
const signup = async (req, res, next) => {
    const err = validator.validationResult(req);
    if (!err.isEmpty()) {
        const error = new HttpError("Invalid inputs", 422);
        return next(error);
    }
    console.log(err);

    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError("Signing up failed", 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError("User exists already", 422);
        return next(error);
    }

    const newUser = new User({
        name,
        email,
        image: "https://images.unsplash.com/photo-1579935110464-fcd041be62d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHlvZGF8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
        password,
        plates: [],
    });

    try {
        await newUser.save();
    } catch (err) {
        const error = new HttpError("Signing up failed", 500);
        return next(error);
    }

    res.status(201).json({ user: newUser.toObject({ getters: true }) });
};
const login = async (req, res, next) => {
    const { email, password } = req.body;

    let identifiedUser;
    try {
        identifiedUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError("Login failed", 500);
        return next(error);
    }

    if (!identifiedUser || identifiedUser.password !== password) {
        const error = new HttpError("Wrong credentials", 401);
        return next(error);
    }

    res.json({ message: "Login has done" });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;

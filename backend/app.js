const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const platesRoutes = require("./routes/plates-routes");
const usersRoutes = require("./routes/user-routes");

const HttpError = require("./models/http-error");

const app = express();

const url =
    "mongodb+srv://szegediviktor:weeatapp@cluster0.gqka5.mongodb.net/WeEatAppPlates?retryWrites=true&w=majority";

app.use(bodyParser.json());

app.use("/api/plates", platesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Could not find this URL", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({
        message: error.message || "An unknown error occured!",
    });
});

mongoose
    .connect(url)
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });

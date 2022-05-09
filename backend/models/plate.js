const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const plateSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
    restaurantName: { type: String, required: true },
    chefName: { type: String, required: true },
    rate: { type: Number, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number },
        lng: { type: Number },
    },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Plate", plateSchema);

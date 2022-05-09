const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5, maxlength: 15 },
    image: { type: String, required: true },
    plates: [{ type: mongoose.Types.ObjectId, required: true, ref: "Plate" }],
});

module.exports = mongoose.model("User", userSchema);

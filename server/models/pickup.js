const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    slotes: {
        type: Array,
        required: true,
    },
});

const Pickup = mongoose.model("pickupDates",pickupSchema)
module.exports = Pickup
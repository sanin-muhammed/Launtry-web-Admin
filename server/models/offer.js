const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
    offer: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
});

const Offer = mongoose.model("offers", offerSchema);
module.exports = Offer;

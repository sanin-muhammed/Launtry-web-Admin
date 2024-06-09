const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    serviceImage: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
});

const Service = mongoose.model("services", serviceSchema);
module.exports = Service;

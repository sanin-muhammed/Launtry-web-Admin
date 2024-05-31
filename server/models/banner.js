const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    bannerImage: {
        type: String,
        required: true,
    },
});

const Banner = mongoose.model("banners", bannerSchema);
module.exports = Banner;

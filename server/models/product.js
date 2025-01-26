const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;

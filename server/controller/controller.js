const Admin = require("../models/admin");
const Banner = require("../models/banner");
const Offer = require("../models/offer");
const Product = require("../models/product");
const Service = require("../models/service");
const User = require("../models/users");
const Pickup = require("../models/pickup");
const colors = require("colors");

// @des:admin api
// method:get
// api:/admin
exports.get_admin = async (req, res) => {
    try {
        const admin = await Admin.findOne({}, { password: 0 });
        console.log("admin = ", admin);
        res.status(200).json({ error: false, status: true, data: admin });
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

// @des:all user api
// method:get
// api:/users
exports.get_all_users = async (req, res) => {
    try {
        const users = await User.find();
        console.log("users = ", users);
        res.status(200).json({ error: false, status: true, data: users });
    } catch (error) {
        console.log("server error =", error);
        res.status(500).json({ error: true, status: false, message: "error finding all users" });
    }
};

// @des:edit banner api
// method:post
// api:/users
exports.edit_banner_img = async (req, res) => {
    console.log(req.file);

    try {
        const bannerImage = req.file.location;
        const updated = await Admin.updateMany({ bannerImage });
        console.log({ updated });
        res.status(200).json({ error: false, status: true, message: "banner image updated successfully" });
        console.log("banner image updated successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.add_banner = async (req, res) => {
    console.log(req.file);
    try {
        const bannerImage = req.file.location;
        const banner = new Banner({ bannerImage });
        await banner.save();
        console.log({ banner });
        res.status(200).json({ error: false, status: true, message: "banner added successfully" });
        console.log("banner added successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};
exports.all_banners = async (req, res) => {
    try {
        const banners = await Banner.find();
        console.log({ banners });
        res.status(200).json({ error: false, status: true, message: "find all banners successfully", data: banners });
        console.log("find all banners successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.delete_banner = async (req, res) => {
    console.log(req.query);
    try {
        const { id } = req.query;

        const deletedBanner = await Banner.findByIdAndDelete(id);
        console.log(deletedBanner);
        if (!deletedBanner) {
            res.status(400).json({ error: true, status: false, message: "error banner deletion " });
            return;
        }
        console.log("banner deleted ".bold.yellow);
        res.status(200).json({ error: false, status: true, message: "banner deleted" });
    } catch (error) {
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.edit_banner = async (req, res) => {
    console.log(req.file);
    console.log(req.body);

    try {
        const { id } = req.body;
        const bannerImage = req.file.location;
        const editedBanner = await Banner.findByIdAndUpdate(id, { bannerImage });
        console.log({ editedBanner });
        res.status(200).json({ error: false, status: true, message: "banner updated successfully" });
        console.log("banner updated successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};
exports.all_offers = async (req, res) => {
    try {
        const offers = await Offer.find();
        console.log("offers =", offers);
        res.status(200).json({ error: false, status: true, message: "find all offers successfully", data: offers });
        console.log("find all offers successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.add_offer = async (req, res) => {
    console.log("req body =", req.body);
    try {
        const { offer, price } = req.body;
        const newOffer = new Offer({ offer, price });
        await newOffer.save();
        console.log({ newOffer });
        res.status(200).json({ error: false, status: true, message: "offer added successfully" });
        console.log("offer added successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};
exports.edit_offer = async (req, res) => {
    console.log("req body =", req.body);
    console.log("req query =", req.query);
    try {
        const { offer, price } = req.body;
        const { id } = req.query;
        const editedOffer = await Offer.findByIdAndUpdate(id, { offer, price });
        console.log({ editedOffer });
        res.status(200).json({ error: false, status: true, message: "offer updated successfully" });
        console.log("offer updated successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};
exports.delete_offer = async (req, res) => {
    console.log("req query =", req.query);
    try {
        const { id } = req.query;
        const deletedOffer = await Offer.findByIdAndDelete(id);
        console.log(deletedOffer);
        if (!deletedOffer) {
            res.status(400).json({ error: true, status: false, message: "error offer deletion " });
            return;
        }
        res.status(200).json({ error: false, status: true, message: "offer deleted successfully" });
        console.log("offer deleted successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.all_services = async (req, res) => {
    try {
        const services = await Service.find();
        console.log({ services });
        res.status(200).json({ error: false, status: true, message: "find all services successfully", data: services });
        console.log("find all services successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.add_service = async (req, res) => {
    console.log("req body =", req.body);f
    console.log("req file =", req.file);

    try {
        const serviceImage = req.file.location;
        const { service } = req.body;
        const newService = new Service({ serviceImage, service });
        await newService.save();
        console.log({ newService });
        res.status(200).json({ error: false, status: true, message: "service added successfully" });
        console.log("service added successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.edit_service = async (req, res) => {
    console.log("req body =", req.body);
    console.log("req file =", req.file);
    console.log("req query =", req.query);
    try {
        const { service } = req.body;
        const { id } = req.query;
        if (req.file) {
            console.log(true);
            const serviceImage = req.file.location;
            const editedService = await Service.findByIdAndUpdate(id, { serviceImage, service });
            console.log({ editedService });
        } else {
            console.log(false);
            const editedService = await Service.findByIdAndUpdate(id, { service });
            console.log({ editedService });
        }

        res.status(200).json({ error: false, status: true, message: "service updated successfully" });
        console.log("service updated successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.delete_service = async (req, res) => {
    console.log("req query =", req.query);
    try {
        const { id } = req.query;
        const deletedService = await Service.findByIdAndDelete(id);
        console.log(deletedService);
        if (!deletedService) {
            res.status(400).json({ error: true, status: false, message: "error service deletion " });
            return;
        }
        res.status(200).json({ error: false, status: true, message: "service deleted successfully" });
        console.log("service deleted successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.all_products = async (req, res) => {
    try {
        const products = await Product.find();
        console.log({ products });
        res.status(200).json({ error: false, status: true, message: "find all products successfully", data: products });
        console.log("find all products successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.add_product = async (req, res) => {
    console.log("req body =", req.body);
    console.log("req file =", req.file);

    try {
        const productImage = req.file.location;
        const { product, price } = req.body;
        const newProduct = new Product({ productImage, product, price });
        await newProduct.save();
        console.log({ newProduct });
        res.status(200).json({ error: false, status: true, message: "product added successfully" });
        console.log("product added successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.edit_product = async (req, res) => {
    console.log("req body =", req.body);
    console.log("req file =", req.file);
    console.log("req query =", req.query);
    try {
        const { product, price } = req.body;
        const { id } = req.query;
        if (req.file) {
            const productImage = req.file.location;
            const editedProduct = await product.findByIdAndUpdate(id, { productImage, product, price });
            console.log({ editedProduct });
        } else {
            const editedProduct = await Product.findByIdAndUpdate(id, { product, price });
            console.log({ editedProduct });
        }

        res.status(200).json({ error: false, status: true, message: "product updated successfully" });
        console.log("product updated successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.delete_product = async (req, res) => {
    console.log("req query =", req.query);
    try {
        const { id } = req.query;
        const deletedProduct = await Product.findByIdAndDelete(id);
        console.log(deletedProduct);
        if (!deletedProduct) {
            res.status(400).json({ error: true, status: false, message: "error product deletion " });
            return;
        }
        res.status(200).json({ error: false, status: true, message: "product deleted successfully" });
        console.log("product deleted successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.all_pickups = async (req, res) => {
    try {
        const pickups = await Pickup.find();
        console.log({ pickups });
        res.status(200).json({ error: false, status: true, message: "find all pickups successfully", data: pickups });
        console.log("find all pickups successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.add_pickup = async (req, res) => {
    console.log(req.body);
    try {
        const { date, slotes } = req.body;
        const newPickup = new Pickup({ date, slotes });
        await newPickup.save();
        console.log(newPickup);
        console.log("Pick Up Date added".bold.yellow);
        res.status(200).json({ error: false, status: true, message: "Pick Up Date added" });
    } catch (error) {
        console.log("server error".bold.red);
        res.status(200).json({ error: true, status: false, message: "server error" });
    }
};

exports.edit_pickup = async (req, res) => {
    console.log("req body =", req.body);
    console.log("req query =", req.query);
    try {
        const { date, slotes } = req.body;
        const { id } = req.query;

        const editedPickup = await Pickup.findByIdAndUpdate(id, { date, slotes });
        console.log({ editedPickup });

        res.status(200).json({ error: false, status: true, message: "Pickup updated successfully" });
        console.log("Pickup updated successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

exports.delete_pickup = async (req, res) => {
    console.log("req query =", req.query);
    try {
        const { id } = req.query;
        const deletedPickup = await Pickup.findByIdAndDelete(id);
        console.log(deletedPickup);
        if (!deletedPickup) {
            res.status(400).json({ error: true, status: false, message: "error pickup deletion " });
            return;
        }
        res.status(200).json({ error: false, status: true, message: "pickup deleted successfully" });
        console.log("pickup deleted successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

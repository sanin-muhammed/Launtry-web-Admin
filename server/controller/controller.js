const Admin = require("../models/admin");
const Banner = require("../models/banner");
const User = require("../models/users");
const colors = require("colors");

exports.get_all_users = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log("users = ", users);
        res.status(200).json({ error: false, status: true, data: users });
    } catch (error) {
        res.status(500).json({ error: true, status: false, message: "error finding all users" });
    }
};
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
        const {id} = req.body
        const bannerImage = req.file.location;
        const editedBanner = await Banner.findByIdAndUpdate(id,{ bannerImage });
        console.log({ editedBanner });
        res.status(200).json({ error: false, status: true, message: "banner updated successfully" });
        console.log("banner updated successfully".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

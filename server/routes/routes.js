const express = require("express");
const { get_all_users, edit_banner_img, get_admin, add_banner, all_banners, delete_banner, edit_banner, add_offer, all_offers, edit_offer, delete_offer, add_service, all_services, delete_service, edit_service } = require("../controller/controller");
const { upload } = require("../utils/s3bucket");
const router = express.Router();

router.get("/users", get_all_users);
router.get("/admin", get_admin);

router.post("/edit_banner_img", upload.single("bannerImage"), edit_banner_img);

router.get("/all_banners", all_banners);
router.post("/add_banner", upload.single("bannerImage"), add_banner);
router.post("/edit_banner", upload.single("bannerImage"), edit_banner);
router.delete("/delete_banner", delete_banner);

router.get("/all_offers", all_offers);
router.post("/add_offer", add_offer);
router.post("/edit_offer", edit_offer);
router.delete("/delete_offer", delete_offer);

router.get("/all_services", all_services);
router.post("/add_service",upload.single("serviceImage"), add_service);
router.post("/edit_service",upload.single("serviceImage"), edit_service);
router.delete("/delete_service", delete_service);

module.exports = router;

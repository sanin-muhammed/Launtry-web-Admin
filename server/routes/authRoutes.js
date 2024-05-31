const express = require("express");
const { post_login } = require("../controller/authController");
const router = express.Router();

router.post("/login",post_login );

module.exports = router;

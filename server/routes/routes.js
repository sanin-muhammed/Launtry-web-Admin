const express = require('express');
const { get_all_users, edit_banner_img, get_admin, add_banner, all_banners, delete_banner, edit_banner } = require('../controller/controller');
const { upload } = require('../utils/s3bucket');
const router = express.Router()



router.get('/users',get_all_users)
router.get('/admin',get_admin)
router.post('/edit_banner_img',upload.single('bannerImage'),edit_banner_img)

router.get('/all_banners',all_banners)
router.post('/add_banner',upload.single('bannerImage'),add_banner)
router.post('/edit_banner',upload.single('bannerImage'),edit_banner)
router.delete('/delete_banner',delete_banner)


module.exports = router
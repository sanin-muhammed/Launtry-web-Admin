const express = require('express');
const { all_orders, edit_order_status } = require('../controller/orderController');

const router= express.Router()

router.get('/all_orders',all_orders)
router.patch('/edit_order_status',edit_order_status)



module.exports = router
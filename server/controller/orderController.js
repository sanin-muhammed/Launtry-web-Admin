const Order = require("../models/order");

// @des:all orders api
// method:get
// api:/all_orders

exports.all_orders = async (req, res) => {
    try {
        const aggregationPipeline = [
            {
                $lookup: {
                    from: "users", // The collection name
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },
            {
                $unwind: "$userDetails", // Unwind the userDetails array
            },
            {
                $lookup: {
                    from: "services", // The collection name
                    localField: "serviceId",
                    foreignField: "_id",
                    as: "serviceDetails",
                },
            },
            {
                $unwind: "$serviceDetails", // Unwind the serviceDetails array
            },
            {
                $lookup: {
                    from: "addresses", // The collection name
                    localField: "pickupAddressId",
                    foreignField: "_id",
                    as: "pickupAddressDetails",
                },
            },
            {
                $unwind: "$pickupAddressDetails", // Unwind the pickupAddressDetails array
            },
        ];
        const orders = await Order.aggregate(aggregationPipeline);
        console.log(orders, "==orders");

        res.status(200).json({ error: false, status: true, message: "orders finded", data: orders });
        console.log("orders finded".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red, error);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

// @des:edit order status api
// method:patch
// api:/edit_order_status

exports.edit_order_status = async (req, res) => {
    console.log("req body =", req.body);
    console.log("req query =", req.query);

    try {
        const { id } = req.query;
        const { orderStatus } = req.body;

        const editedOrder = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
        if (!editedOrder) {
            res.status(400).json({ error: true, status: false, message: "order not found" });
            return;
        }
        console.log("edited order ==", editedOrder);

        res.status(200).json({ error: false, status: true, message: "order status changed" });
        console.log("order status changed".bold.yellow);
    } catch (error) {
        console.log("server error".bold.red, error);
        res.status(500).json({ error: true, status: false, message: "server error" });
    }
};

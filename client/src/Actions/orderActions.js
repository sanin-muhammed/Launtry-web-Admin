import axios from "../config/axiosConfig";

export const allOrders = async () => {
    try {
        const response = await axios.get("/all_orders");
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};
export const editOrderStatus = async (id, orderStatus) => {
    try {
        const response = await axios.patch(`/edit_order_status?id=${id}`, {orderStatus});
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

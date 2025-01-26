import axios from "../config/axiosConfig";

export const allPickups = async () => {
    try {
        const response = await axios.get("/all_pickups");
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};
export const addPickup = async (formData) => {
    console.log('form = ',formData);
    try {
        const response = await axios.post("/add_pickup", formData);
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};
export const editPickup = async (id,formData) => {
    console.log('form = ',formData);
    try {
        const response = await axios.post(`/edit_pickup?id=${id}`, formData);
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};


export const deletePickup = async (id) => {
    try {
        const response = await axios.delete(`/delete_pickup?id=${id}`);
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};
import axiosInstance from "../config/axiosConfig";

export const loginUser = async (formData) => {
    try {
        const response = await axiosInstance.post("/login", formData);
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log("login error =", error.response.data);
        return error.response.data;
    }
};

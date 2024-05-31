import axios from "./axiosConfig";

export const loginUser = async (formData) => {
    try {
        const response = await axios.post("/login", formData);
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log("login error =", error.response.data);
        return error.response.data;
    }
};

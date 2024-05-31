import axios from "./axiosConfig";

export const allUsers = async () => {
    try {
        const response = await axios.get("/users");
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

export const editBannerImg = async (formData) => {
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    try {
        const response = await axios.post("/edit_banner_img", formData, { headers });
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};
export const addBanner = async (formData) => {
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    try {
        const response = await axios.post("/add_banner", formData, { headers });
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

export const editBanner = async (formData) => {
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    try {
        const response = await axios.post("/edit_banner", formData, { headers });
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

export const getAdmin = async () => {
    try {
        const response = await axios.get("/admin");
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

export const all_banners = async () => {
    try {
        const response = await axios.get("/all_banners");
        console.log(" successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};
export const deleteBanner = async (id) => {
    try {
        const response = await axios.delete(`/delete_banner?id=${id}`);
        console.log(" successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

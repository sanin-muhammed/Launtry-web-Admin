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

export const allBanners = async () => {
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

// offers

export const allOffers = async () => {
    try {
        const response = await axios.get("/all_offers");
        console.log(" successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

export const addOffer = async (formData) => {
    try {
        const response = await axios.post("/add_offer", formData);
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

export const editOffer = async (formData, id) => {
    try {
        const response = await axios.post(`/edit_offer?id=${id}`, formData);
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

export const deleteOffer = async (id) => {
    try {
        const response = await axios.delete(`/delete_offer?id=${id}`);
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

// services

export const allServices = async () => {
    try {
        const response = await axios.get("/all_services");
        console.log(" successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

export const addService = async (formData) => {
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    try {
        const response = await axios.post("/add_service", formData, { headers });
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

export const editService = async (formData, id) => {
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    try {
        const response = await axios.post(`/edit_service?id=${id}`, formData, { headers });
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

export const deleteService = async (id) => {
    try {
        const response = await axios.delete(`/delete_service?id=${id}`);
        console.log("successful:", response.data);
        return response.data;
    } catch (error) {
        console.log(" error =", error.response.data);
        return error.response.data;
    }
};

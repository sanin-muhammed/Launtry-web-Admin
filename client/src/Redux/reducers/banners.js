import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    banners: [],
};

const bannerSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setBanners(state, action) {
            state.banners = action.payload;

            console.log("banners =", action.payload);
        },
    },
});

export const { setBanners } = bannerSlice.actions;
export default bannerSlice.reducer;

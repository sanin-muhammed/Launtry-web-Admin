import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    offers: [],
};

const offerSlice = createSlice({
    name: "offer",
    initialState,
    reducers: {
        setOffers(state, action) {
            state.offers = action.payload;

            console.log("offers =", action.payload);
        },
    },
});

export const { setOffers } = offerSlice.actions;
export default offerSlice.reducer;

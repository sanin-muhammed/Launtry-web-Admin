import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pickups: [],
};

const pickupSlice = createSlice({
    name: "pickup",
    initialState,
    reducers: {
        setPickups(state, action) {
            state.pickups = action.payload;
            console.log("pickups =", action.payload);
        },
    },
});

export const { setPickups } = pickupSlice.actions;
export default pickupSlice.reducer;

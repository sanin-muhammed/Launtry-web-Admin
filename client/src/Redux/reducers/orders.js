import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder(state, action) {
            state.orders = action.payload;
            console.log("orders =", action.payload);
        },
    },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    totalUsers: 0,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
            state.totalUsers = action.payload.length;

            console.log("users =", action.payload);
            console.log("No.of users =", action.payload.length);
        },
    },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;

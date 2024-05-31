import { configureStore } from "@reduxjs/toolkit";

// Import your reducers
import userReducer from "./reducers/users";
import adminReducer from "./reducers/admin";
import bannerReducer from "./reducers/banners";

const store = configureStore({
    reducer: {
        users: userReducer,
        admin: adminReducer,
        banners: bannerReducer,
    },
});

export default store;

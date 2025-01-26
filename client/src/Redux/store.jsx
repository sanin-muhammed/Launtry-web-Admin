import { configureStore } from "@reduxjs/toolkit";

// Import your reducers
import userReducer from "./reducers/users";
import adminReducer from "./reducers/admin";
import bannerReducer from "./reducers/banners";
import offerReducer from "./reducers/offers";
import serviceReducer from "./reducers/services";
import productReducer from "./reducers/products";
import pickupReducer from "./reducers/pickups";
import orderReducer from "./reducers/orders";

const store = configureStore({
    reducer: {
        users: userReducer,
        admin: adminReducer,
        banners: bannerReducer,
        offers: offerReducer,
        services: serviceReducer,
        products: productReducer,
        pickups: pickupReducer,
        orders: orderReducer,
    },
});

export default store;

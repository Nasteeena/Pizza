import { configureStore } from "@reduxjs/toolkit";
import { keepData } from "./storage";

import userSlice from "./user.slice";
import cartSlice from "./cart.slice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    }
});

store.subscribe(()=> {
    keepData("token", store.getState().user.token);
});

export type StoreType = ReturnType<typeof store.getState>;
export type StoreDispatchType = typeof store.dispatch;

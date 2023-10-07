import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_COMBINED } from "../utils/API";

export interface CartItem {
    id: number,
    count: number
}

export interface CartState {
    products: CartItem[]
}

const initialState : CartState = {
    products: []
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<number>) => {
            const existed = state.products.find(item => item.id === action.payload);
            if(!existed) {
                state.products.push({id: action.payload, count: 1});
                return;
            }
            state.products.map(item => {
                if(item.id === action.payload) {
                    item.count += 1;
                }
                return item;
            });
        }
    },
    extraReducers: (builder) => {
        
    }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
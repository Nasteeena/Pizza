import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadData } from "./storage";
import axios from "axios";
import { LoginInterface } from "../components/pages/Login/Login.interface";
import { API_COMBINED } from "../utils/API";

export interface UserState {
    token: string | null,
    loginState: undefined | string,
    userData: {
        name : string  
        email: string
    }
}

const initialState : UserState = {
    token: loadData("token") ?? null,
    loginState: undefined,
    userData: {
        name: "",
        email: ""
    }
};

// const sendForm = async (email: string, password: string) => {
//     try {
//         const {data} = await axios.post<LoginInterface>(API_COMBINED.LOGIN, {
//         email,
//         password
//     });
//     dispatch(addToken(data.access_token));
//     setError(null);
//     navigate("/");
//     } catch (error) {
//         if(error instanceof AxiosError) {
//             setError(error.response?.data.message[0]);
//         }
//     }
// };

export const login = createAsyncThunk(
    "login",
    async (params: {email: string, password: string}) => {
        const {data} = await axios.post<LoginInterface>(API_COMBINED.LOGIN, {
            email: params.email,
            password: params.password
        });
        return data;
    }
);

export const register = createAsyncThunk(
    "register",
    async (params: {email: string, password: string, name: string}) => {
        const {data} = await axios.post<LoginInterface>(API_COMBINED.LOGIN, {
            email: params.email,
            password: params.password,
            name: params.name
        });
        return data;
    }
);

export const getUserData = createAsyncThunk(
    "userData",
    async (token: string) => {
        const {data} = await axios.get(API_COMBINED.USER, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // addToken: (state, action) => {
        //     state.token = action.payload;
        // },
        logOut: (state) => {
            state.token = null;
        },
        clearLoginForm: (state) => {
            state.loginState  = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginState = action.error.message;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.token = action.payload.access_token;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loginState = action.error.message;
        });
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.userData.email = action.payload.email;
            state.userData.name = action.payload.name;
        });
    }
});

export const { logOut, clearLoginForm } = userSlice.actions;

export default userSlice.reducer;
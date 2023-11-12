import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLoginStatus = ( loginDetails ) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const response = await axios.post("http://localhost:8080/auth/login", loginDetails);
            if(response.status === 200) {
                dispatch(getAuthenticationFulfiled(response.data));
                return response.data;
            }
            else {
                dispatch(rejected());
            }
        } catch (error) {
            dispatch(rejected());
        }
    }
}

export const loginSlice = createSlice({
    name: "loginSlice",
    initialState: {
        authentication: {
            jwtToken: "",
            email: ""
        },
        loading: false,
        error: null,
    },
    reducers: {
        getAuthenticationFulfiled: (state, action) => {
            state.loading = false;
            state.authentication.jwtToken = action.payload.jwtToken;
            state.authentication.email = action.payload.email;
        },
        loading: (state) => {
            state.loading = true;
        },
        rejected: (state) => {
            state.loading = false;
            state.error = true;
        }
    }
})

export const {
    getAuthenticationFulfiled,
    loading,
    rejected,
} = loginSlice.actions;

export default loginSlice.reducer;


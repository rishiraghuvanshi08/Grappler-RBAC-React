import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const sendOtp = (email) => {
    return async (dispatch) => {
        try {
            dispatch(loading());
            const response = await axios.post("http://localhost:8080/forgot-password/send-Password", email);
            dispatch(getOtpSuccess(response.data));
            return response.data;
        }
        catch (error) {
            if (error.response) {
                dispatch(rejected())
                return error.response.data;
            }
        }
    }
}
export const otpSlice = createSlice({
    name: "otpSlice",
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {
        getOtpSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
        },
        loading: (state) => {
            state.loading = true;
            state.error = false;
        },
        rejected: (state) => {
            state.loading = false;
            state.error = true;
        }
    }
})
export const {
    getOtpSuccess,
    loading,
    rejected,
} = otpSlice.actions;
export default otpSlice.reducer;
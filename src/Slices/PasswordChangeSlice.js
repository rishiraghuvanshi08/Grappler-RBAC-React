import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const passwordChange = (passwords) => {
    console.log("inside poassword change ",passwords);
    return async (dispatch) => {
        try {
            dispatch(loading());
            const response = await axios.post("http://localhost:8080/users/change-password", passwords);
            dispatch(getPasswordSuccess(response.data));
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
export const PasswordChangeSlice = createSlice({
    name: "PasswordChangeSlice",
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {
        getPasswordSuccess: (state, action) => {
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
    getPasswordSuccess,
    loading,
    rejected,
} = PasswordChangeSlice.actions;
export default PasswordChangeSlice.reducer;
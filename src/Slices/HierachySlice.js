import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
    hierarchy: [],
    isLoadingHeirarchy: false,
    hierarchyError: null,
}
export const getHeirarchyData = () =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingHierarchyRequest());
          const response = await axios.get('http://localhost:8080/hierarchy/reporting');
          const data = response.data;
          console.log("data here", data);
          dispatch(fetchingHierarchySuccess(data));
        } catch (error) {
          dispatch(fetchingHierarchyFailure(error));
        }
    }
}
export const getHeirarchyIdData = (index) =>{
    return async(dispatch) =>{
        try {
          dispatch(fetchingHierarchyRequest());
          const response = await axios.get(`http://localhost:8080/hierarchy/reporting/${index}`);
          const data = response.data;
          console.log("data here", data);
          dispatch(fetchingHierarchySuccess(data));
        } catch (error) {
          dispatch(fetchingHierarchyFailure(error));
        }
    }
}
const heirarchySlice = createSlice({
    name : 'hierarchy',
    initialState,
    reducers : {
        fetchingHierarchyRequest : (state) =>{
            state.isLoadingHeirarchy = true;
            state.hierarchyError = null;
        },
        fetchingHierarchySuccess : (state, action) =>{
            state.hierarchy = action.payload;
            state.isLoadingHeirarchy = false;
            state.hierarchyError = null;
        },
        fetchingHierarchyFailure : (state, action) =>{
            state.hierarchy = [];
            state.isLoadingHeirarchy = false;
            state.hierarchyError = action.payload;
        }
    }
})
export const {
    fetchingHierarchyRequest, fetchingHierarchySuccess, fetchingHierarchyFailure
} = heirarchySlice.actions;
export default heirarchySlice.reducer;
  

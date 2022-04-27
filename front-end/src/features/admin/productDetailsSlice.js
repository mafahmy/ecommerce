import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const detailsProduct = createAsyncThunk(
  "DETAILS_PRODUCT",
  async (productId, thunkAPI) => {
    

    try {
      const { data } = await axios.get(
        `/api/products/${productId}`
        
        
      );
      return data;
    } catch (error) {
      const message = error.response.data.message
        ? error.response.data.message
        : error.message;

      return thunkAPI.rejectWithValue(message);  
    }
  }
);
const initialState = {
  
};
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    // resetUpdateProduct(state, action) {
    //   return {};
    // },
  },
  extraReducers: {
    [detailsProduct.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [detailsProduct.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        product: action.payload,
        
      };
    },
    [detailsProduct.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
//export const { resetUpdateProduct } = productUpdateSlice.actions;
export default productDetailsSlice.reducer;
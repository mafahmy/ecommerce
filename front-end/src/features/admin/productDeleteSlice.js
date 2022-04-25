import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const deleteProduct = createAsyncThunk(
  "DELETE_PRODUCT",
  async (productId, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/products/${productId}`,

        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);
const initialState = {};
const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState,
  reducers: {
    resetDeleteProduct(state, action) {
      return {};
    },
  },
  extraReducers: {
    [deleteProduct.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [deleteProduct.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        success: true,
      };
    },
    [deleteProduct.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export const { resetDeleteProduct } = productDeleteSlice.actions;
export default productDeleteSlice.reducer;

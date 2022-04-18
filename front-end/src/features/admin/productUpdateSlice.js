import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../messages/messageSlice";
import axios from "axios";

export const updateProduct = createAsyncThunk(
  "UPDATE_PRODUCT",
  async (product, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/products/${product._id}`,
        product,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      return data;
    } catch (error) {
      const message = error.response.data.message
        ? error.response.data.message
        : error.message;
      thunkAPI.dispatch(setMessage(message));
    }
  }
);
const initialState = {
  isloading: false,
};
const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState,
  reducers: {
    resetUpdateProduct(state, action) {
      return {
        isloading: false
      };
    },
  },
  extraReducers: {
    [updateProduct.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [updateProduct.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        success: true,
        
      };
    },
    [updateProduct.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export const { resetUpdateProduct } = productUpdateSlice.actions;
export default productUpdateSlice.reducer;
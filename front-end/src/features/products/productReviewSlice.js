import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const reviewProduct = createAsyncThunk(
  "REVIEW_PRODUCT",
  async ({productId,  name, rating, comment }, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();
    try {
      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        {
          name,
          rating,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      return data.review;
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

const productReviewSlice = createSlice({
  name: "productsReview",
  initialState,

  reducers: {
    resetReview: (state, action) => {
      return {};
    },
  },

  extraReducers: {
    [reviewProduct.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [reviewProduct.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        review: action.payload,
        success: true,
      };
    },
    [reviewProduct.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export const { resetReview } = productReviewSlice.actions;
export default productReviewSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const listUserOrders = createAsyncThunk(
  "USER_ORDERS",
  async (userId, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.get(
        'http://localhost:4000/api/orders/mine',
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
const initialState = {
  
  order: []
};

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  extraReducers: {
    [listUserOrders.pending]: (state, action) => {
      state.isLoading = true;
    },
    [listUserOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    [listUserOrders.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default userOrdersSlice.reducer;
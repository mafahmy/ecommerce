import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const detailsUser = createAsyncThunk(
  "USER_DETAILS",
  async (userId, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.get(
        `/api/users/${userId}`,
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
  isLoading: true,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  extraReducers: {
    [detailsUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [detailsUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [detailsUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default userDetailsSlice.reducer;

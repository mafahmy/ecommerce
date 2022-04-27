import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const deleteUser = createAsyncThunk(
  "DELETE_USER",
  async (userId, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.delete(
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
const initialState = {};
const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState,
  reducers: {
    resetDeleteUser(state, action) {
      return {};
    },
  },
  extraReducers: {
    [deleteUser.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [deleteUser.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        success: true,
      };
    },
    [deleteUser.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export const { resetDeleteUser } = userDeleteSlice.actions;
export default userDeleteSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const updateUserProfile = createAsyncThunk(
  "USER_UPDATE_PROFILE",
  async (user, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(`/api/users/profile`, user, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
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

const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState,
  reducers: {
    resetUpdateProfile(state, action) {
      return {};
    },
  },

  extraReducers: {
    [updateUserProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.success = true;
    },
    [updateUserProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { resetUpdateProfile } = userUpdateProfileSlice.actions;
export default userUpdateProfileSlice.reducer;

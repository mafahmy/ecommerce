import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../messages/messageSlice";
import axios from "axios";

export const updateUser = createAsyncThunk(
  "UPDATE_USER",
  async (user, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/users/${user._id}`,
        user,
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
      return message;
    }
  }
);
const initialState = {
  isloading: false,
};
const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
    resetUpdateUser(state, action) {
      return {
        isloading: false
      };
    },
  },
  extraReducers: {
    [updateUser.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [updateUser.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        success: true,
        
      };
    },
    [updateUser.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export const { resetUpdateUser } = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
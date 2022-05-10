import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitTicket = createAsyncThunk(
  "USER_SUBMIT_TICKET",
  async (ticket, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();
    try {
      const { data } = await axios.post(
        `/api/users/tickets/${userInfo._id}`,
        {ticket},
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

const userSubmitTicketSlice = createSlice({
    name: "userSubmitTicket",
    initialState: {},
    reducers: {
      resetSubmitTicket(state, action)  {
        return {}
      }
    },
    extraReducers: {
        [submitTicket.pending]: (state, action) => {
            state.isLoading = true;
        },
        [submitTicket.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.success = true;
            state.ticket = action.payload
        },
        [submitTicket.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})
export const { resetSubmitTicket } = userSubmitTicketSlice.actions;
export default userSubmitTicketSlice.reducer;

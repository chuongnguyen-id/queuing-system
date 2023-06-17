import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserType } from "./userReducer";

interface UserState {
  users: UserType[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

export const getProfile = createAsyncThunk(
  "users/getProfile",
  async (uid: string) => {
    const response = await axios.get(
      "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/users.json"
    );
    const fetchedUsers: UserType[] = [];
    for (let key in response.data) {
      if (response.data[key].uid === uid) {
        fetchedUsers.push({
          ...response.data[key],
          id: key,
        });
      }
    }
    return fetchedUsers;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<UserType[]>) => {
          state.status = "idle";
          state.users = action.payload;
        }
      )
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch users";
      });
  },
});

export default profileSlice.reducer;

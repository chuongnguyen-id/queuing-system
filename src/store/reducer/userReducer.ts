import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserType {
  email: string;
  username: string;
  password: string;
  uid: string;
  fullname: string;
  phoneNumber: string;
  role: string;
  activeStatus: string;
}

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

export const getUser = createAsyncThunk("users/getUser", async () => {
  const response = await axios.get(
    "https://queuing-system-3b7d7-default-rtdb.firebaseio.com/users.json"
  );
  const fetchedUsers: UserType[] = [];
  for (let key in response.data) {
    fetchedUsers.push({
      ...response.data[key],
      id: key,
    });
  }
  return fetchedUsers;
});

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id: string) => {
    const response = await axios.get(
      `https://queuing-system-3b7d7-default-rtdb.firebaseio.com/users/${id}.json`
    );
    const fetchedUser: UserType = {
      ...response.data,
      id,
    };
    return fetchedUser;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<UserType[]>) => {
          state.status = "idle";
          state.users = action.payload;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch users";
      })
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getUserById.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.status = "idle";
          state.users = [action.payload];
        }
      )
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;

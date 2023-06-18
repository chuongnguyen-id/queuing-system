import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./userReducer";

interface AuthState {
  user: UserType | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
  success: string;
}

export interface SignUpData {
  [x: string]: any;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  authenticated: false,
  loading: false,
  error: "",
  needVerification: false,
  success: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.authenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.authenticated = false;
      state.loading = false;
      state.error = "";
    },
    needVerify: (state) => {
      state.needVerification = true;
    },
    setSuccess: (state, action: PayloadAction<any>) => {
      state.success = action.payload;
    },
    setAuthForm: (state) => {
      state.authenticated = true;
    },
  },
});

export const {
  login,
  logout,
  needVerify,
  setError,
  setLoading,
  setSuccess,
  setAuthForm,
} = authSlice.actions;

export default authSlice.reducer;

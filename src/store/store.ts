// import { configureStore } from "@reduxjs/toolkit";
// import { deviceSlice } from "./feathers/deviceSlice";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import authReducer from "./feathers/authSlice";
// import userReducer from "./feathers/userSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     user: userReducer,
//     ticket: deviceSlice.reducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export const useAppDispatch: () => typeof store.dispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export type AppDispatch = typeof store.dispatch;

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

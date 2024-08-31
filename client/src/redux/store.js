import { configureStore } from "@reduxjs/toolkit";
import compilerReducer from "./slices/compilerSlice";
import authReducer from "./slices/authSlice";
import { authApi } from "./slices/authApi";
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    compiler: compilerReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;

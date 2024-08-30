import { configureStore } from "@reduxjs/toolkit";
import compilerReducer from "./slices/compilerSlice";
import { authApi } from "./slices/authApi";
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    compiler: compilerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;

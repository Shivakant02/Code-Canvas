import { configureStore } from "@reduxjs/toolkit";
import compilerReducer from "./slices/compilerSlice";
const store = configureStore({
  reducer: {
    compiler: compilerReducer,
  },
});

export default store;

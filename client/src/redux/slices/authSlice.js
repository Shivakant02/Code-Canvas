import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: {},
};
const autSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default autSlice.reducer;
export const { updateCurrentUser, updateIsLoggedIn } = autSlice.actions;

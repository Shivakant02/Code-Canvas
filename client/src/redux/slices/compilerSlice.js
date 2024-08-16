import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullCode: {
    html: "Write html code",
    css: "Write css code",
    javascript: "Write javascript code",
  },
  currentLanguage: "html",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    updadeCodeValue: (state, action) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updadeCodeValue } = compilerSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { localSaveOptions } from "../constants";

export const storedDataReducer = createSlice({
  name: "storedDataReducer",
  initialState: {
    alloptions: { ...localSaveOptions },
    isSendCheck: 0,
  },
  reducers: {
    setAllOptionsData: (state, { payload }) => {
      state.alloptions = { ...state.alloptions, ...payload };
    },
    setCheckAnketa: (state, { payload }) => {
      state.isSendCheck = payload
    },
  },
});

export const {
  setAllOptionsData,
  setCheckAnketa,
} = storedDataReducer.actions;

export default storedDataReducer.reducer;

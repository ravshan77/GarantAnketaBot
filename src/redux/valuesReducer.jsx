import { createSlice } from "@reduxjs/toolkit";

export const valuesReducer = createSlice({
  name: "valuesReducer",
  initialState: {
    values: {},
  },
  reducers: {
    setValues: (state, { payload }) => {
      state.values = { ...payload };
    },
  },
});

export const { setValues } = valuesReducer.actions;
export default valuesReducer.reducer;

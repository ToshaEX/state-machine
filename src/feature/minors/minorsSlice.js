import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  minors: [],
};

export const minorsSlice = createSlice({
  name: "minor",
  initialState,
  reducers: {
    addMinor: (state, payload) => {
      state.total += state.total;
      state.minors = [...state.minors, payload];
    },
  },
});

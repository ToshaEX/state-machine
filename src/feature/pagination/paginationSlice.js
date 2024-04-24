import { createSlice } from "@reduxjs/toolkit";

const MAX_PAGE_SIZE = 4;
const MIN_PAGE_SIZE = 0;

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    page: 0,
  },
  reducers: {
    next: (state) => {
      state.page =
        MAX_PAGE_SIZE >= state.page + 1 ? state.page + 1 : state.page;
    },
    prev: (state) => {
      state.page =
        MIN_PAGE_SIZE <= state.page - 1 ? state.page - 1 : state.page;
    },
  },
});

export const { next, prev } = paginationSlice.actions;

export default paginationSlice.reducer;

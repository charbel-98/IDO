import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    errorState: false as boolean,
    error: null as string | null,
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload.error;
      state.errorState = action.payload.errorState;
    },
    setErrorState(state, action) {
      state.errorState = action.payload;
    },
  },
});
export default errorSlice.reducer;
export const { setError, setErrorState } = errorSlice.actions;

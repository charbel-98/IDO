import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import searchReducer from "./searchSlice";
import errorReducer from "./errorSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    error: errorReducer,
  },
});

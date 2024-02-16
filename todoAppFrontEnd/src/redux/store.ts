import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import searchReducer from "./searchSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
});

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";

interface AuthPayload {
  // Define the expected properties of your payload here
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  token: string;
  errors?: string[];
}

export const signup = createAsyncThunk(
  "auth/register",
  async (data: AuthPayload) => {
    const response = await axios.post(
      "/Authentication/Register",
      JSON.stringify(data),
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: AuthPayload) => {
    const response = await axios.post("/Authentication/Login", data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.get("logout", { withCredentials: true });
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as string | null,
    accessToken: null as string | null,
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  },
  reducers: {
    setAuth: (state, action) => {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
        status: action.payload.status,
      };
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginPayload>) => {
          state.status = "succeeded";
          state.user = action.payload.email;
          state.accessToken = action.payload.token;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;
